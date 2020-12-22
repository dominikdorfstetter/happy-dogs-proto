import { environment } from '../../../environments/environment';

interface ICacheItem<T> {
  valid: Date;
}

const TTL = environment.cacheTTL || 30;

export class CacheItem<T> implements ICacheItem<T> {
  valid: Date;

  constructor(readonly pData: T, valid: Date = new Date(), ttl = TTL) {
    this.valid = valid;
    this.valid.setDate(this.valid.getDate() + ttl);
  }

  /**
   * Checks if cache item is still valid
   * @returns null if cache item is too old, data if valid
   */
  getData(): T | null {
    if (new Date() >= this.valid) {
      return null;
    }
    return this.pData;
  }
}

export class MockCacheItem<T> implements ICacheItem<T> {
  valid: Date;

  get data(): T {
    return {} as T;
  }
}
