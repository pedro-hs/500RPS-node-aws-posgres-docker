import NodeCache from 'node-cache';

export class CacheService {
  private readonly cache: NodeCache | null;

  constructor(stdTTL: number, enabled: boolean) {
    this.cache = enabled ? new NodeCache({ stdTTL }) : null;
  }

  get<T>(key: string): T | undefined {
    return this.cache?.get<T>(key);
  }

  set<T>(key: string, value: T): void {
    this.cache?.set(key, value);
  }

  invalidate(key: string): void {
    this.cache?.del(key);
  }
}
