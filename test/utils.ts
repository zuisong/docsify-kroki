import type { DocsifyHooks } from "../src/types/docsify.ts";
export { delay } from "jsr:@std/async";
export type Any = Parameters<typeof console.log>[0];

export function generateRandomString(n: number): string {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = characters.length;
  const result = Array.from(
    { length: n },
    () => characters.charCodeAt(Math.floor(Math.random() * length)),
  );
  return String.fromCharCode(...result);
}

export const defaultHook: DocsifyHooks = {} as DocsifyHooks;
