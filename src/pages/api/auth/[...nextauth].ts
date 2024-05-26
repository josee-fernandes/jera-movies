import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import FacebookProvider, { FacebookProfile } from 'next-auth/providers/facebook'

import { PrismaAdapter } from '@/lib/auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '',
      userinfo: {
        params: {
          fields: 'id,name,email,picture.type(large)',
        },
      },
      profile: (profile: FacebookProfile) => ({
        id: profile.id,
        email: profile.email,
        name: profile.name,
        avatar_url: profile.picture.data.url ?? '',
      }),
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      return { ...session, user }
    },
    redirect: async (params) => {
      if (params.url.includes('/sign-in')) return `${params.baseUrl}/browse`

      return params.url
    },
  },
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  if (
    req.url?.includes('error=access_denied') &&
    req.url?.includes('error_reason=user_denied')
  ) {
    return res.redirect('/sign-up?error=permissions-denied')
  }

  return await NextAuth(req, res, authOptions)
}
