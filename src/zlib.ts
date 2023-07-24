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

  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

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
