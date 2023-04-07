export function generate(n: number) {
  return Array(n * 100).fill(0)
    .map((it) => Math.random().toString)
    .join();
}
