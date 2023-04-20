export function generate(n: number): string {
  const ACode = "A".charCodeAt(0);
  return Array(n)
    .fill(undefined)
    .map((_) => 26 * Math.random())
    .map((x) => String.fromCharCode(x + ACode))
    .join("");
}
