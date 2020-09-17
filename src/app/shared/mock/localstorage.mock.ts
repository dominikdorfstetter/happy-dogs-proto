export class LocalStorageMock {
  store: any;
  length: number;
  key: any;

  constructor() {
    this.length = 0;
    this.store = {};
  }

  clear(): void {
    this.store = {};
    this.length = 0;
  }

  getItem(key): string {
    return this.store[key] || null;
  }

  setItem(key, value): void {
    this.store[key] = value.toString();
    this.length++;
  }

  removeItem(key): void {
    if (this.getItem(key)) {
      delete this.store[key];
      this.length--;
    }
  }
}
