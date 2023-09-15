import { TRPCError, initTRPC } from '@trpc/server'
import { createContext } from './context'

const t = initTRPC.context<typeof createContext>().create()
// Base router and procedure helpers
export const router = t.router

const isAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next()
})

export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuthed)
