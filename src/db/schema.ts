import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const bouquets = sqliteTable('bouquets', {
  id: text('id').$defaultFn(() => crypto.randomUUID()).primaryKey(),
  slug: text('slug').notNull().unique(), // The 8-character alphanumeric string for the shareable URL
  themeMode: text('theme_mode').notNull().default('color'), // Restrict to 'color' or 'mono'
  baseLayer: text('base_layer').notNull(), // e.g., 'bush-1'
  topLayer: text('top_layer').notNull(), // e.g., 'bush-1-top'
  flowers: text('flowers', { mode: 'json' }).notNull(), // Array of objects
  greenery: text('greenery', { mode: 'json' }).notNull(), // Array of objects
  deco: text('deco', { mode: 'json' }).notNull(), // Array of objects
  hiddenMessage: text('hidden_message'), // The plaintext or lightly markdown-formatted message
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});
