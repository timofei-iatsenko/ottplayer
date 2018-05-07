import * as LZString from 'lz-string';

export class Compressor<T> {
  public pack(data: T): string {
    return LZString.compress(JSON.stringify(data));
  }

  public unpack(stringData: string): T {
    const uncompressed = LZString.decompress(stringData);
    return JSON.parse(uncompressed);
  }
}
