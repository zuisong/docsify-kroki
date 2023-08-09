import { rollup } from "$/deps.ts";
import { dirname, join } from "deno_std/path/mod.ts";

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

  if (
    FILE_IMPORT.exec(parsedSpecifier) &&
    !fileURL?.protocol?.startsWith("http")
  ) {
    if (!fileURL) {
      return new URL(import.meta.resolve(parsedSpecifier));
    }

    return new URL(join(fileURL.toString(), parsedSpecifier));
  }

  try {
    return new URL(parsedSpecifier, fileURL?.toString());
  } catch (_) {
    return undefined;
  }
}

export default function httpsResolve(): rollup.Plugin {
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

    async resolveId(importee: string, importer: string | undefined) {
      const importURL = toURL(importee, importer);

      if (!importURL || importURL.protocol === "file:") {
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

export function createDeno({
  cacheCache,
  infoCache,
  moduleCache,
  tempDirectory,
}: PluginConfig) {
  async function cache(name: string | URL): Promise<void> {
    const nameStr = name.toString();

    if (
      cacheCache.has(nameStr) ||
      (typeof name !== "string" && name.protocol === "file:")
    ) {
      return;
    }

    const p = new Deno.Command(Deno.execPath(), {
      args: ["cache", nameStr],
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
      args: ["info", nameStr, "--json"],
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
