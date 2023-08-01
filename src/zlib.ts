export async function initPolyfill() {
  if (typeof CompressionStream === typeof undefined) {
    await import(
      "https://unpkg.com/compression-streams-polyfill@0.1.4/umd/index.js"
    );
  }
}

export async function zlib(data: Uint8Array): Promise<Uint8Array> {
  const compressionStream = new CompressionStream("deflate");

  // 创建一个Readable Stream
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(data);
      controller.close();
    },
  })
    .pipeThrough<Uint8Array>(compressionStream);

  const chunks = await readData(stream);

  return mergeUint8Arrays(chunks);
}

function mergeUint8Arrays(arrays: Uint8Array[]): Uint8Array {
  const totalSize = arrays
    .map((it) => it.length)
    .reduce((a, b) => a + b, 0);

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
