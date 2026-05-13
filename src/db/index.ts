import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

const globalForDb = globalThis as any;

const client = createClient({
  url: 'file:local.db',
});

// Initialize the table if it doesn't exist
client.execute(`
  CREATE TABLE IF NOT EXISTS bouquets (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    theme_mode TEXT NOT NULL DEFAULT 'color',
    base_layer TEXT NOT NULL,
    top_layer TEXT NOT NULL,
    flowers TEXT NOT NULL,
    hidden_message TEXT,
    created_at INTEGER NOT NULL
  );
`).catch(console.error);

let dbInstance: any;

if (process.env.NODE_ENV === 'production') {
  dbInstance = drizzle(client, { schema });
} else {
  if (!globalForDb.db) {
    globalForDb.db = drizzle(client, { schema });
  }
  dbInstance = globalForDb.db;
}

export const db = dbInstance as ReturnType<typeof drizzle<typeof schema>>;
