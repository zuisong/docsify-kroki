import { DocsifyHooks } from "../src/types/docsify.d.ts";

export { delay } from "@std/async";
export type Any = Parameters<typeof console.log>[0];

export function generateRandomString(n: number): string {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const result = Array.from({ length: n }, () =>
    characters.charCodeAt(Math.floor(Math.random() * characters.length)),
  );
  return String.fromCharCode(...result);
}

export const defaultHook: DocsifyHooks = {} as DocsifyHooks;
