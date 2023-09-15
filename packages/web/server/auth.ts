import GoogleProvider from 'next-auth/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { GetServerSidePropsContext } from 'next/types'
import type { AuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import { Config } from 'sst/node/config'
import { db } from './index'

const auth: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: Config.GOOGLE_CLIENT_ID,
      clientSecret: Config.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    newUser: '/user/new',
  },
}

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) => {
  return getServerSession(ctx.req, ctx.res, auth)
}

export default auth
