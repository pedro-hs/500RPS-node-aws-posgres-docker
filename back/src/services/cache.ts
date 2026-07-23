import NodeCache from 'node-cache';

export class CacheService {
  private readonly cache: NodeCache;

  constructor(stdTTL: number) {
    this.cache = new NodeCache({ stdTTL });
  }

  get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  set<T>(key: string, value: T): void {
    this.cache.set(key, value);
  }

  invalidate(key: string): void {
    this.cache.del(key);
  }
}
