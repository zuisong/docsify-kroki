import { resolveUri, rollup } from "./deps.ts";

function shouldResolveUri(str: string) {
  return str.startsWith("..") || str.startsWith("./") || str.startsWith("/");
}
interface ModuleInfo {
  modules: Module[];
  roots: string[];
}

interface Module {
  root: string[];
  emit: string | null;
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
      const resolvedPath = import.meta.resolve(source);
      return resolvedPath;
    },

    async load(id: string) {
      const url = new URL(id, baseUrl);
      if (url.protocol === "file:") {
        return;
      }
      return await resolver.resolve(url.toString());
    },
  };
}

class DenoResolve {
  private moduleCache = new Map<string, Module>();
  async resolve(url: string): Promise<string> {
    const module = await this.module(url);
    if (!module) {
      throw new Error(`invariant: ${url} not found`);
    }
    return await Deno.readTextFile(module.emit || module.local);
  }
  private async module(nameStr: string): Promise<Module | undefined> {
    const foundModule = this.moduleCache.get(nameStr);
    if (foundModule) {
      return foundModule;
    }
    const moduleInfo = await this.info(nameStr);
    for (const module of moduleInfo.modules) {
      this.moduleCache.set(module.specifier, module);
    }
    return this.moduleCache.get(nameStr);
  }
  private async info(nameStr: string, cwd?: string) {
    const p = new Deno.Command(Deno.execPath(), {
      args: ["info", nameStr, "--json"],
      cwd: cwd,
    });
    const output = await p.output();
    if (!output.success) {
      throw new Error(`invariant: could not get info on ${nameStr}`);
    }
    return JSON.parse(new TextDecoder().decode(output.stdout)) as ModuleInfo;
  }
}
