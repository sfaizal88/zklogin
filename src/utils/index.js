export const CIRCOM_BIGINT_N = 121;
export const CIRCOM_BIGINT_K = 17;
export function bigIntToChunkedBytes(
    // eslint-disable-next-line @typescript-eslint/ban-types
    num,
    bytesPerChunk,
    numChunks
  ) {
    const res = [];
    const bigintNum = typeof num == "bigint" ? num : num.valueOf();
    const msk = (1n << (bytesPerChunk)) - 1n;
    for (let i = 0; i < numChunks; ++i) {
      res.push(((bigintNum >> (i * bytesPerChunk)) & msk).toString());
    }
    return res;
  }

// eslint-disable-next-line @typescript-eslint/ban-types
export function toCircomBigIntBytes(num) {
  return bigIntToChunkedBytes(num, CIRCOM_BIGINT_N, CIRCOM_BIGINT_K);
}

export const padString = (str, paddedBytesSize) => {
    let paddedBytes = Array.from(str, (c) => c.charCodeAt(0));
    paddedBytes.push(...new Array(paddedBytesSize - paddedBytes.length).fill(0));
    return paddedBytes;
}