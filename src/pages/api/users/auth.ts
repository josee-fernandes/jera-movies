import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'

import { prisma } from '@/lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET ?? ''

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    if (!email || !password)
      res.status(404).json({ message: 'Credentials not provided.' })

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (user?.password) {
      const passwordMatches = await bcrypt.compare(password, user?.password)

      if (passwordMatches) {
        const expires = new Date(new Date().getTime() + 60 * 60 * 24 * 1000) // 1 day
        const sessionToken = jwt.sign(
          {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar_url: user.avatar_url,
          },
          JWT_SECRET,
        )

        console.log({ expires, sessionToken })

        await prisma.session.upsert({
          where: { user_id: user.id },
          update: {
            expires,
            session_token: sessionToken,
          },
          create: {
            user_id: user.id,
            expires,
            session_token: sessionToken,
          },
        })

        console.log('⭐ CREATED')

        setCookie({ res }, 'credentials.session-token', sessionToken, {
          maxAge: expires,
          path: '/',
        })
        // res.setHeader(
        //   'Set-Cookie',
        //   serialize('credentials.session-token', sessionToken, { path: '/' }),
        // )

        return res.redirect(301, '/browse')
      }
    }

    return res
      .status(401)
      .json({ message: 'No user found with provided credentials.' })
  }

  return res.status(405).end()
}

export default handler
