export function generate(n: number): string {
  return Array(n)
    .fill(undefined)
    .map((_) => 26 * Math.random() + 65)
    .map((x) => String.fromCharCode(x))
    .join("");
}
