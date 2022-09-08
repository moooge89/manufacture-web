const filler = -1;
const before = -2;

export function encode(value: string): number[] {
  if (!value) {
    throw new Error('Cannot encode empty string');
  }

  const utfEncode = new TextEncoder();

  const byteArray: number[] = [];

  utfEncode.encode(value).forEach(byte => byteArray.push(byte));

  firstRound(byteArray);
  secondRound(byteArray);
  thirdRound(byteArray);

  return byteArray;
}

export function firstRound(byteArray: number[]): void {
  const len = byteArray.length;

  if (!isEven(len)) {
    byteArray.push(filler);
  }
}

export function secondRound(byteArray: number[]): void {
  const totalLen = byteArray.length;
  const middle = totalLen / 2;

  const newByteArray: number[] = [];

  for (let i = middle; i < totalLen; ++i) {
    newByteArray.push(byteArray[i]);
  }

  for (let i = 0; i < middle; ++i) {
    newByteArray.push(byteArray[i]);
  }

  byteArray.length = 0;
  byteArray.push(...newByteArray);
}

export function thirdRound(byteArray: number[]): void {

  const newByteArray: number[] = [];

  for (let i = 0; i < byteArray.length; ++i) {
    const byte = byteArray[i];

    if (isEven(byte)) {
      newByteArray.push(byte / 2 + i);
    } else {
      newByteArray.push(before);
      newByteArray.push((byte + i) * 2);
    }
  }

  byteArray.length = 0;
  byteArray.push(...newByteArray);
}

export function isEven(val: number): boolean {
  return val % 2 === 0;
}
