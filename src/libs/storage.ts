import { Compressor } from './compressor';

export class LocalStorageFactory {
  public static create<T>(componentName: string, compress = false): StorageProxy<T> {
    return new StorageProxy<T>(componentName, window.localStorage, compress ? new Compressor() : null);
  }
}

export class StorageProxy<T> {
  private lastValue: T;

  constructor(
    private key: string,
    private storage: Storage,
    private compressor: Compressor<T>,
  ) {
  }

  public get(defaultValue?: T): T {
    let value = JSON.parse(this.storage.getItem(this.key));

    if (this.compressor && value) {
      value = this.compressor.unpack(value);
    }

    return value === null ? defaultValue : value;
  }

  public set(value: T) {
    if (this.lastValue === value) {
      return;
    }

    this.lastValue = value;

    if (this.compressor) {
      const compressed = this.compressor.pack(value);
      this.storage.setItem(this.key, JSON.stringify(compressed));
    } else {
      this.storage.setItem(this.key, JSON.stringify(value));
    }

  }

  public remove() {
    this.storage.removeItem(this.key);
  }
}
