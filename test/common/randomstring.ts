export function generateRandomString(n: number): string {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const randomCharacters = Array(n)
    .fill(0)
    .map(() => characters[Math.floor(Math.random() * characters.length)]);
  return randomCharacters.join("");
}
