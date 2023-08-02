export function sleep(ms: number): Promise<void> {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

export type Any = Parameters<typeof console.log>[0];
