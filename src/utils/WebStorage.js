class WebStorage {
  constructor(key, storageArea = window.localStorage) {
    this.key = key;
    this.storageArea = storageArea;
  }

  load(defaultValue) {
    const serialized = this.storageArea.getItem(this.key);
    return serialized === null ? defaultValue : this.deserialize(serialized);
  }

  save(data) {
    if (data === undefined) {
      this.storageArea.removeItem(this.key);
    } else {
      this.storageArea.setItem(this.key, this.serialize(data));
    }
  }

  clear() {
    this.storageArea.removeItem(this.key);
  }

  serialze(value) {
    return JSON.stringify(value);
  }

  deserialize(value) {
    return JSON.parse(value);
  }

  listen(callback) {
    const handler = (e) => {
      if (e.key === this.key && e.storageArea === this.storageArea) {
        callback(e);
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }
}

export default new WebStorage('dah');
