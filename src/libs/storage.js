export class LocalStorageFactory {
  /**
   * @param {string} componentName
   * @returns {StorageProxy}
   */
  static create(componentName) {
    return new StorageProxy(componentName, window.localStorage);
  }
}

/**
 * @private
 */
export class StorageProxy {
  /**
   * @param componentName
   * @param {Storage} storage
   */
  constructor(componentName, storage) {
    /** @private */
    this.key = componentName;
    /** @private */
    this.storage = storage;
  }

  get(defaultValue) {
    const value = JSON.parse(this.storage.getItem(this.key));
    return value === null ? defaultValue : value;
  }

  set(value) {
    this.storage.setItem(this.key, JSON.stringify(value));
  }

  remove(key) {
    this.storage.removeItem(this.key)
  }
}
