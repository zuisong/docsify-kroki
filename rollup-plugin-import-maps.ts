import { resolveUri, rollup } from "./deps.ts";

function isRelative(str: string) {
  return str.startsWith("..") || str.startsWith("./");
}

export const importMapResolvePlugin = (): rollup.Plugin => {
  return {
    name: "import-map-resolve",

    resolveId(source: string, importer: string | undefined) {
      if (isRelative(source)) {
        return resolveUri(source, importer);
      } else {
        const resolvedPath = import.meta.resolve(source);
        return resolvedPath;
      }
    },
  };
};
