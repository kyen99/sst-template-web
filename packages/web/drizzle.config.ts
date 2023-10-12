import type { Config } from 'drizzle-kit'

/*
  Drizzle kit does not yet work with AWS Data API.
*/

export default {
  schema: './db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    // connectionString: 'postgres://localhost:5432/db',
    connectionString: process.env.DATABASE_URL || '',
  },
} satisfies Config
