import { AsyncAfterEachHook, DocsifyHooks } from "../src/types/docsify.ts";

export function sleep(ms: number): Promise<void> {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

export type Any = Parameters<typeof console.log>[0];

export function generateRandomString(n: number): string {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const randomCharacters = Array(n)
    .fill(0)
    .map(() => characters[Math.floor(Math.random() * characters.length)]);
  return randomCharacters.join("");
}

export const defaultHook: DocsifyHooks = {
  init: function (initHook: () => void): void {
    throw new Error("Function not implemented.");
  },
  mounted: function (mountedHook: () => void): void {
    throw new Error("Function not implemented.");
  },
  beforeEach: function (beforeEachHook: (markdown: string) => string): void {
    throw new Error("Function not implemented.");
  },
  afterEach: function (
    afterEachHook: ((html: string) => string) & AsyncAfterEachHook,
  ): void {
    throw new Error("Function not implemented.");
  },
  doneEach: function (doneEachHook: () => void): void {
    throw new Error("Function not implemented.");
  },
  ready: function (readyHook: () => void): void {
    throw new Error("Function not implemented.");
  },
};
