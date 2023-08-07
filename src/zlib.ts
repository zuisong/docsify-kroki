import { zlibSync } from "esm.sh/fflate@0.8.0?exports=zlibSync";

function textEncode(str: string) {
  return new TextEncoder().encode(str);
}

function strFromU8(dat: Uint8Array): string {
  const s = 2 ** 14;
  const chunks = [];
  for (let i = 0; i < dat.length; i += s) {
    chunks.push(String.fromCharCode(...dat.subarray(i, i + s)));
  }
  return chunks.join("");
}

// deno-lint-ignore require-await
async function zlib_fflate(data: Uint8Array): Promise<Uint8Array> {
  return zlibSync(data, { level: 6 });
}

export async function zlib(str: string): Promise<string> {
  const data = textEncode(str);
  const res = typeof CompressionStream !== typeof undefined
    ? zlib_CompressStream(data)
    : zlib_fflate(data);

  return strFromU8(await res);
}

async function zlib_CompressStream(data: Uint8Array): Promise<Uint8Array> {
  const compressionStream = new CompressionStream("deflate");

  // 创建一个Readable Stream
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(data);
      controller.close();
    },
  }).pipeThrough<Uint8Array>(compressionStream);

  const chunks = await readData(stream);

  return mergeUint8Arrays(chunks);
}

function mergeUint8Arrays(arrays: Uint8Array[]): Uint8Array {
  const totalSize = arrays.map((it) => it.length).reduce((a, b) => a + b, 0);

  const merged = new Uint8Array(totalSize);
  let offset = 0;
  for (const array of arrays) {
    merged.set(array, offset);
    offset += array.length;
  }

  return merged;
}

async function readData(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (value) {
      chunks.push(value);
    }
    if (done) {
      return chunks;
    }
  }
}
