import { describe, it, expect } from 'vitest';
import {
  loadSql,
  bindToPositionalParams,
  isForeignKeyViolation,
  isUniqueViolation,
  FOREIGN_KEY_VIOLATION,
  UNIQUE_VIOLATION,
} from '../../src/db/sql-utils';

describe('sql-utils', () => {
  it('loadSql: reads the sql file contents', () => {
    expect(loadSql('catalog/list_countries.sql')).toBe('SELECT id, name FROM countries ORDER BY name;\n');
  });

  it('bindToPositionalParams: replaces named params with positional placeholders in order', () => {
    const { text, values } = bindToPositionalParams('INSERT INTO countries (id, name) VALUES (:id, :name)', {
      id: 'BR',
      name: 'Brazil',
    });

    expect(text).toBe('INSERT INTO countries (id, name) VALUES ($1, $2)');
    expect(values).toEqual(['BR', 'Brazil']);
  });

  it('isForeignKeyViolation: returns true when error code matches FOREIGN_KEY_VIOLATION', () => {
    expect(isForeignKeyViolation({ code: FOREIGN_KEY_VIOLATION })).toBe(true);
  });

  it('isUniqueViolation: returns true when error code matches UNIQUE_VIOLATION', () => {
    expect(isUniqueViolation({ code: UNIQUE_VIOLATION })).toBe(true);
  });
});
