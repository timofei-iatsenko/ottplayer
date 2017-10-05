export class LocalStorageFactory {
  public static create<T>(componentName: string): StorageProxy<T> {
    return new StorageProxy<T>(componentName, window.localStorage);
  }
}

export class StorageProxy<T> {
  constructor(private key: string, private storage: Storage) {
  }

  public get(defaultValue: T): T {
    const value = JSON.parse(this.storage.getItem(this.key));
    return value === null ? defaultValue : value;
  }

  public set(value: T) {
    this.storage.setItem(this.key, JSON.stringify(value));
  }

  public remove() {
    this.storage.removeItem(this.key);
  }
}
