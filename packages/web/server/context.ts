import { AnyRouter, inferAsyncReturnType } from '@trpc/server'
import { getServerSession } from 'next-auth'
import auth from './auth'
import { TRPCLink } from '@trpc/client'

export async function createContext() {
  const session = await getServerSession(auth)
  return {
    session,
    // TODO: this is a hack to prevent TS complaints in /app/_trpc/serverClient
    links: [] as TRPCLink<AnyRouter>[],
  }
}
export type Context = inferAsyncReturnType<typeof createContext>
