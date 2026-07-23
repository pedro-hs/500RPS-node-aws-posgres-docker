import { Pool } from 'pg';

export const pool = new Pool({
  max: 20, // max of active connections
  idleTimeoutMillis: 30000, // close idle clients after 30 sec
  connectionTimeoutMillis: 2000, // fail when not connect under 2 sec
  statement_timeout: 5000, // cancel queries after 5 sec
});
