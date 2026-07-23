import { Pool } from 'pg';

const MAX_CONNECTIONS = 20;
const IDLE_CLIENT_TIMEOUT = 30000;
const CONNECTION_TIMEOUT = 2000;
const QUERY_TIMEOUT = 5000;

export const pool = new Pool({
  max: MAX_CONNECTIONS,
  idleTimeoutMillis: IDLE_CLIENT_TIMEOUT,
  connectionTimeoutMillis: CONNECTION_TIMEOUT,
  statement_timeout: QUERY_TIMEOUT,
});
