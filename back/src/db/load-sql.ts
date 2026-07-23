import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export function loadSql(fileName: string): string {
  return readFileSync(join(__dirname, 'queries', fileName), 'utf-8');
}

const NAMED_PARAM_REGEX = /:(\w+)/g;

export function bindToPositionalParams<T>(sql: string, namedParams: T): { text: string, values: unknown[] } {
  const values: unknown[] = [];

  const text = sql.replace(NAMED_PARAM_REGEX, (_, name: keyof T) => {
    values.push(namedParams[name]);
    return `$${values.length}`;
  });

  return { text, values };
}
