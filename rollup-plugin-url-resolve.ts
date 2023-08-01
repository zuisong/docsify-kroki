import type { Plugin } from "esm.sh/rollup@3.26.3?bundle";

import { dirname } from "node:path";
import { pathToFileURL } from "node:url";

//////***** */
export type MediaType =
  | "Cjs"
  | "Cts"
  | "Dcts"
  | "Dmts"
  | "Dts"
  | "JavaScript"
  | "Json"
  | "JSX"
  | "Mjs"
  | "Mts"
  | "SourceMap"
  | "TsBuildInfo"
  | "TSX"
  | "TypeScript"
  | "Unknown"
  | "Wasm";

export interface ESModule {
  dependencies?: {
    code: {
      span: {
        start: { line: number; character: number };
        end: { line: number; character: number };
      };
      specifier: string;
    };
    specifier: string;
  }[];
  emit: string | null;
  kind: "esm";
  local: string;
  map: string | null;
  mediaType: MediaType;
  size: number;
  specifier: string;
}

export type Module = ESModule;
export interface ModuleInfo {
  modules: Module[];
  npmPackages: Record<
    string,
    { name: string; version: string; dependencies: string[] }
  >;
  redirects: Record<string, string>;
  roots: string[];
}

export interface PluginConfig {
  cacheCache: CacheCache;
  infoCache: InfoCache;
  moduleCache: ModuleCache;
  tempDirectory: string;
}

export type CacheCache = Map<string, true>;

export type InfoCache = Map<string, ModuleInfo>;

export type ModuleCache = Map<string, Module>;
/** */

const URL_NAMESPACE = "@url/";
const FILE_IMPORT = /^(\.?\/)/;
const HTTP_IMPORT_REGEX = /from ("|')(https?:\/\/.+)("|')/g;
const HANDLED_SPECIFIERS = /^(https?|file|\.\/|\/)/;

function toURLNamespace(specifier: URL) {
  return URL_NAMESPACE + specifier;
}

function toURL(specifier?: string, file?: string): URL | undefined {
  const fileURL = file ? toURL(dirname(file)) : undefined;

  if (!specifier) {
    return undefined;
  }

  const parsedSpecifier = specifier.replace(URL_NAMESPACE, "");

  if (!HANDLED_SPECIFIERS.exec(parsedSpecifier)) {
    return undefined;
  }

  if (FILE_IMPORT.exec(parsedSpecifier)) {
    return fileURL
      ? new URL(
        (fileURL + parsedSpecifier.replace("./", "/")).replaceAll("//", "/"),
      )
      : pathToFileURL(parsedSpecifier);
  }

  try {
    return new URL(parsedSpecifier);
  } catch (_) {
    return undefined;
  }
}

export default function httpsResolve(): Plugin {
  const cacheCache = new Map<string, true>();
  const moduleCache = new Map<string, Module>();
  const infoCache = new Map<string, ModuleInfo>();
  const tempDirectory = Deno.makeTempDirSync();

  const config = {
    cacheCache,
    infoCache,
    moduleCache,
    tempDirectory,
  };

  const deno = createDeno(config);

  return {
    name: "url-resolve",
    transform(code: string) {
      if (code.indexOf("from 'http") === -1) {
        return;
      }

      // We want to prepend any https imports with "deno:" so it can be picked
      // up by resolvedId(), else it skips it entirely and is loaded as native esm.
      const replaced = code.replaceAll(
        HTTP_IMPORT_REGEX,
        (str) => {
          return str.replace("from '", "from '" + URL_NAMESPACE);
        },
      );

      return replaced;
    },

    async resolveId(importee: string, importer: string | undefined) {
      const importURL = toURL(importee, importer);

      if (
        !importURL || importURL.protocol === "file:"
      ) {
        return null;
      }

      await deno.cache(importURL);

      return toURLNamespace(importURL);
    },

    async load(id: string) {
      const url = toURL(id);
      if (url && url.protocol !== "file:") {
        const module = await deno.module(url);

        if (!module) {
          throw new Error(`invariant: ${url} not found`);
        }

        return await Deno.readTextFile(module.emit || module.local);
      }

      return null;
    },
  };
}

/* */

export function createDeno(
  { cacheCache, infoCache, moduleCache, tempDirectory }: PluginConfig,
) {
  async function cache(name: string | URL): Promise<void> {
    const nameStr = name.toString();

    if (
      cacheCache.has(nameStr) ||
      (typeof name !== "string" && name.protocol === "file:")
    ) {
      return;
    }

    const p = new Deno.Command(Deno.execPath(), {
      args: [
        "cache",
        nameStr,
      ],
      cwd: tempDirectory,
      stdout: "inherit",
    });

    const status = await p.output();
    if (!status.success) {
      throw new Error(`invariant: could not cache ${nameStr}`);
    }

    cacheCache.set(nameStr, true);
  }

  async function module(name: string | URL): Promise<Module | undefined> {
    const nameStr = name.toString();
    const foundModule = moduleCache.get(nameStr);
    if (!foundModule) {
      try {
        await info(nameStr);
        return moduleCache.get(nameStr);
      } catch (_) {
        return undefined;
      }
    }

    return foundModule;
  }

  async function info(name: string | URL): Promise<ModuleInfo> {
    const nameStr = name.toString();
    const cachedInfo = infoCache.get(nameStr);
    if (cachedInfo) {
      return cachedInfo;
    }

    const p = new Deno.Command(Deno.execPath(), {
      args: [
        "info",
        nameStr,
        "--json",
      ],
      stdout: "piped",
      stderr: "piped",
      cwd: tempDirectory,
    });

    const output = await p.output();
    if (!output.success) {
      throw new Error(`invariant: could not get info on ${nameStr}`);
    }

    const moduleInfo: ModuleInfo = JSON.parse(
      new TextDecoder().decode(output.stdout),
    );

    infoCache.set(nameStr, moduleInfo);

    for (const module of moduleInfo.modules) {
      moduleCache.set(module.specifier, module);
    }

    return moduleInfo;
  }

  return {
    cache,
    info,
    module,
  };
}
