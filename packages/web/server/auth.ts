import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { GetServerSidePropsContext } from 'next/types'
import EmailProvider from 'next-auth/providers/email'
import type { AuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import { Config } from 'sst/node/config'
import { db } from './index'

const auth: AuthOptions = {
  providers: [
    EmailProvider({
      from: 'kai.yen@mach49.com',
      server: {
        host: Config.SMTP_HOST,
        secure: true,
        port: Config.SMTP_PORT,
        auth: {
          user: Config.SMTP_USER,
          pass: Config.SMTP_PASS,
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {},
}

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) => {
  return getServerSession(ctx.req, ctx.res, auth)
}

export default auth
