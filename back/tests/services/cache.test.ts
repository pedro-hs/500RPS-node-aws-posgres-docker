import { describe, it, expect } from 'vitest';
import { CacheService } from '../../src/services/cache';

describe('CacheService', () => {
  it('returns the cached value when enabled', () => {
    const cache = new CacheService(60, true);
    cache.set('key', 'value');

    expect(cache.get('key')).toBe('value');
  });

  it('returns undefined when disabled', () => {
    const cache = new CacheService(60, false);
    cache.set('key', 'value');

    expect(cache.get('key')).toBeUndefined();
  });

  it('removes the value on invalidate', () => {
    const cache = new CacheService(60, true);
    cache.set('key', 'value');
    cache.invalidate('key');

    expect(cache.get('key')).toBeUndefined();
  });
});
