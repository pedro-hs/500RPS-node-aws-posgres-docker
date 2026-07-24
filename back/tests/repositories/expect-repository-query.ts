import { expect } from 'vitest';
import type { Mock } from 'vitest';

export async function expectRepositoryListsRows<TRow>(
  call: () => Promise<TRow[]>,
  pool: { query: Mock },
  rows: TRow[],
): Promise<void> {
  pool.query.mockResolvedValue({ rows });

  const result = await call();

  expect(pool.query).toHaveBeenCalled();
  expect(result).toEqual(rows);
}

export async function expectRepositoryReturnsRow<TRow>(
  call: () => Promise<TRow>,
  pool: { query: Mock },
  row: TRow,
): Promise<void> {
  pool.query.mockResolvedValue({ rows: [row] });

  const result = await call();

  expect(pool.query).toHaveBeenCalled();
  expect(result).toEqual(row);
}
