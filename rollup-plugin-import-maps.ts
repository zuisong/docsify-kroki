import { importMapsResolve, rollup } from "$/deps.ts";
import { isAbsolute } from "deno_std/path/is_absolute.ts";
import { toFileUrl } from "deno_std/path/to_file_url.ts";
import { resolve } from "deno_std/path/resolve.ts";
import { URL as nodeURL } from "node:url";

interface ImportMapResolveOptions {
  /**
   * Base URL used when resolving any relative-URL-like address in the import map. The "address" is
   * the right-hand side of a mapping given in an import map. If a string is given, then it will
   * first be parsed to see if it is a valid URL. If it is, then it is used as is. Otherwise, the
   * given base URL is assumed to be either an absolute file system path or a path relative to the
   * current working directory. The file system path in either case is converted to a file URL. If
   * no base URL is given, then it defaults to the file URL of the current working directory.
   */
  baseUrl?: string | URL;

  importMap: importMapsResolve.ImportMap;
}

/**
 * Converts the given value to a {@link URL}.
 *
 * @param pathOrUrl Either a URL, an absolute file system path, or a file system path relative to
 * the current working directory.
 *
 * @returns A file {@link URL} if {@link pathOrUrl} is a file system path or the given
 * {@link pathOrUrl} converted as is to a {@link URL}.
 */
function convertToUrl(pathOrUrl: string): URL {
  // Need to first do file system path-based checks instead of simply seeing if the given value can
  // be parsed as a URL first. If the given value is an absolute Windows path, then new URL(baseUrl)
  // succeeds with a URL that has a protocol equal to the Windows drive letter, which is not what we
  // want.
  if (isAbsolute(pathOrUrl)) {
    return toFileUrl(pathOrUrl);
  }

  // Next see if the given value is a valid URL. If so, use it as is.
  try {
    return new URL(pathOrUrl);
  } catch {
    // Assume it's some sort of relative file system path. pathToFileURL will automatically resolve
    // it absolutely for us.
    return new URL(import.meta.resolve(pathOrUrl));
  }
}

function normalizeBaseUrl(baseUrl: string | URL) {
  if (baseUrl instanceof URL) {
    return baseUrl;
  }

  return convertToUrl(baseUrl);
}

export const importMapResolvePlugin = (
  options: ImportMapResolveOptions,
): rollup.Plugin => {
  const baseUrl = normalizeBaseUrl(options?.baseUrl ?? "./") as nodeURL;
  const importMap = importMapsResolve.parse(options?.importMap || {}, baseUrl);

  return {
    name: "import-map-resolve",

    resolveId(source: string, importer: string | undefined) {
      // It seems the "script URL" the resolve function expects is supposed to be the URL of the
      // script/module that is importing the source module currently being considered for remapping.
      //
      // If an importer is given by Rollup, then that module's file URL gets used as the script URL
      // passed to resolve. If no importer is specified by Rollup, then assume the current source
      // module is a top-level entry point into the module graph, so set the script URL to the base
      // URL of the import map.
      const scriptUrl = importer ? convertToUrl(importer) : baseUrl;
      const { resolvedImport, matched } = importMapsResolve.resolve(
        source,
        importMap,
        scriptUrl as nodeURL,
      );

      // console.log('source', source, 'importer', importer, 'resolvedImport', resolvedImport?.href, 'matched', matched);

      if (!matched) {
        return null;
      }

      if (resolvedImport?.protocol === "file:") {
        return {
          id: resolve(resolvedImport!.pathname),
          external: false,
        };
      } else {
        return { id: resolvedImport!.href, external: false };
      }
    },
  };
};
