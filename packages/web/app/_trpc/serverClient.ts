import { httpBatchLink } from '@trpc/client'
import { Config } from 'sst/node/config'
import { appRouter } from '@/server'
import { Session } from 'next-auth'

const endpoint = Config.SITE_URL || 'http://localhost:3000'
const url = `${endpoint}/api/trpc`

export const serverClient = (session: Session | null) =>
  appRouter.createCaller({
    session,
    links: [
      httpBatchLink({
        url,
      }),
    ],
  })
