import { resolveUri, type rollup } from "./deps.ts";

function shouldResolveUri(str: string) {
  return str.startsWith("..") || str.startsWith("./") || str.startsWith("/");
}
interface ModuleInfo {
  modules: Module[];
  redirects: Record<string, string>;
  packages: Record<string, string>;
}

interface Module {
  emit: string;
  local: string;
  specifier: string;
}

export default function denoResolve(baseUrl: string): rollup.Plugin {
  const resolver = new DenoResolve();
  return {
    name: "deno-resolve",
    async resolveId(source: string, importer: string | undefined) {
      if (source.startsWith("node:")) {
        return undefined;
      }
      if (source.startsWith("bun:")) {
        return undefined;
      }

      if (shouldResolveUri(source)) {
        return resolveUri(source, importer);
      }
      if (source.startsWith("jsr:")) {
        return await resolver.resolveJsr(source);
      }
      return import.meta.resolve(source);
    },

    async load(id: string) {
      const url = new URL(id, baseUrl);
      if (url.protocol === "file:") {
        return Deno.readTextFile(url);
      }
      return await resolver.resolve(url);
    },
  };
}

class DenoResolve {
  private moduleCache = new Map<string, Module>();
  private moduleRedirects = new Map<string, string>();
  async resolve(url: URL): Promise<string> {
    const module = await this.module(url);
    if (!module) {
      throw new Error(`invariant: ${url} not found`);
    }
    return await Deno.readTextFile(module.emit ?? module.local);
  }
  async module(nameStr: URL): Promise<Module | undefined> {
    const foundModule = this.moduleCache.get(nameStr.toString());
    if (foundModule) {
      return foundModule;
    }
    const moduleInfo = await this.info(nameStr);
    for (const module of moduleInfo.modules) {
      this.moduleCache.set(module.specifier, module);
    }
    for (
      const [key, value] of [
        Object.entries(moduleInfo.packages),
        Object.entries(moduleInfo.redirects),
      ].flat()
    ) {
      if (!this.moduleRedirects.has(key)) {
        this.moduleRedirects.set(key, value);
      }
    }

    // console.log("11", nameStr, this);

    const redirected = this.moduleRedirects.get(nameStr.toString());
    if (redirected) {
      return this.module(new URL(redirected));
    }

    return this.moduleCache.get(nameStr.toString());
  }
  private async info(nameStr: URL, cwd?: string) {
    const p = new Deno.Command(Deno.execPath(), {
      args: ["info", nameStr.toString(), "--json"],
      cwd: cwd,
    });
    const output = await p.output();
    if (!output.success) {
      throw new Error(`invariant: could not get info on ${nameStr}`);
    }
    return JSON.parse(new TextDecoder().decode(output.stdout)) as ModuleInfo;
  }

  async resolveJsr(source: string): Promise<string | undefined> {
    await this.module(new URL(source));
    const res = this.moduleRedirects.get(source);
    if (!res) {
      return undefined;
    }
    return res?.startsWith("jsr:") ? this.resolveJsr(res) : res;
  }
}
