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
