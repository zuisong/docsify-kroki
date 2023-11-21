import { DocsifyHooks } from "../src/types/docsify.ts";

export function sleep(ms: number): Promise<void> {
  const res = Promise.withResolvers<void>();
  setTimeout(res.resolve, ms);
  return res.promise;
}

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
