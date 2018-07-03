export class LocalStorageFactory {
  public static create<T>(componentName: string): StorageProxy<T> {
    return new StorageProxy<T>(componentName, window.localStorage);
  }
}

export class StorageProxy<T> {
  private lastValue: T;

  constructor(
    private key: string,
    private storage: Storage,
  ) {}

  public get(defaultValue?: T): T {
    const value = JSON.parse(this.storage.getItem(this.key));
    this.lastValue = value;
    return value === null ? defaultValue : value;
  }

  public set(value: T) {
    if (this.lastValue === value) {
      return;
    }

    this.lastValue = value;

    if (value === undefined) {
      this.remove();
    } else {
      this.storage.setItem(this.key, JSON.stringify(value));
    }
  }

  public remove() {
    this.storage.removeItem(this.key);
  }
}
