import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export function loadSql(fileName: string): string {
  return readFileSync(join(__dirname, 'queries', fileName), 'utf-8');
}
