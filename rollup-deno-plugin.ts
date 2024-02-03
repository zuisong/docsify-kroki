import { resolveUri, rollup } from "./deps.ts";

function shouldResolveUri(str: string) {
  return str.startsWith("..") || str.startsWith("./") || str.startsWith("/");
}
interface ModuleInfo {
  modules: Module[];
}

interface Module {
  local: string;
  specifier: string;
}

export default function denoResolve(baseUrl: string): rollup.Plugin {
  const resolver = new DenoResolve();
  return {
    name: "deno-resolve",
    resolveId(source: string, importer: string | undefined) {
      if (shouldResolveUri(source)) {
        return resolveUri(source, importer);
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
  async resolve(url: URL): Promise<string> {
    const module = await this.module(url);
    if (!module) {
      throw new Error(`invariant: ${url} not found`);
    }
    return await Deno.readTextFile(module.local);
  }
  private async module(nameStr: URL): Promise<Module | undefined> {
    const foundModule = this.moduleCache.get(nameStr.toString());
    if (foundModule) {
      return foundModule;
    }
    const moduleInfo = await this.info(nameStr);
    for (const module of moduleInfo.modules) {
      this.moduleCache.set(module.specifier, module);
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
}
