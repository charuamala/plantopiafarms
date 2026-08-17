import { env } from 'cloudflare:workers';

export function getDb(): D1Database {
  const db = (env as { DB?: D1Database }).DB;
  if (!db) {
    throw new Error(
      'D1 binding "DB" is not available. Run the backend with `npm run dev:worker` (wrangler dev), not `npm run dev`.'
    );
  }
  return db;
}
