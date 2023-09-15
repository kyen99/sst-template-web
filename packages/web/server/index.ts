import { migrate } from 'drizzle-orm/aws-data-api/pg/migrator'
import { RDSDataClient } from '@aws-sdk/client-rds-data'
import { drizzle } from 'drizzle-orm/aws-data-api/pg'
import { privateProcedure, router } from './trpc'
import { users } from '@/db/schema'
// import { eq } from 'drizzle-orm'
// import { z } from 'zod'

const rdsClient = new RDSDataClient({
  region: process.env.AWS_REGION || '',
})

export const db = drizzle(rdsClient, {
  database: process.env['DB_NAME']!,
  secretArn: process.env['DB_SECRET_ARN']!,
  resourceArn: process.env['DB_CLUSTER_ARN']!,
})

await migrate(db, {
  migrationsFolder: 'drizzle',
})

export const appRouter = router({
  getUsers: privateProcedure.query(async () => {
    return await db.select().from(users)
  }),
  // addUser: publicProcedure.input(z.string()).mutation(async (opts) => {
  //   await db.insert(users).values({ email: opts.input, done: 0 })
  //   return true
  // }),
  // setDone: publicProcedure
  //   .input(
  //     z.object({
  //       id: z.number(),
  //       done: z.number(),
  //     })
  //   )
  //   .mutation(async (opts) => {
  //     await db
  //       .update(todos)
  //       .set({ done: opts.input.done })
  //       .where(eq(todos.id, opts.input.id))
  //       .run()
  //     return true
  //   }),
})

export type AppRouter = typeof appRouter
