import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiFetch } from './client';

describe('apiFetch', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('returns json when response is ok', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ total: 1 }),
    } as Response);

    await expect(apiFetch('/traffic/events')).resolves.toEqual({ total: 1 });
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/traffic\/events$/),
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });

  it('throws api message when response is not ok', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ message: 'Country already exists' }),
    } as Response);

    await expect(apiFetch('/catalog/countries')).rejects.toThrow('Country already exists');
  });

  it('throws status fallback when error body is not json', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => {
        throw new Error('invalid json');
      },
    } as unknown as Response);

    await expect(apiFetch('/traffic/events')).rejects.toThrow('API error 500');
  });
});
