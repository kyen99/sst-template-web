import type { Config } from 'drizzle-kit'

/* TODO:
  - Get database_url out of AWS secretArn
  - (top level await not working with drizzle-kit)
  - (default RDS config does not allow public access)
*/

// import {
//   SecretsManagerClient,
//   GetSecretValueCommand,
// } from '@aws-sdk/client-secrets-manager'

// const smClient = new SecretsManagerClient()
// const secret = await smClient.send(
//   new GetSecretValueCommand({
//     SecretId: process.env.DB_SECRET_ARN,
//   })
// )

// console.log({ secret })

export default {
  schema: './db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    // connectionString: 'postgres://localhost:5432/db',
    connectionString: process.env.DATABASE_URL || '',
  },
} satisfies Config
