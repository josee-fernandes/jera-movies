import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, name } = req.body

    const userExists = await prisma.user.findUnique({
      where: { email },
    })

    if (userExists) {
      return res.status(400).json({ message: 'Email already taken.' })
    }

    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
        avatar_url: '/avatar-1.png',
      },
    })

    await prisma.profile.create({
      data: {
        name: user.name,
        avatar_url: user.avatar_url!,
        user_id: user.id,
      },
    })

    return res.status(200).json(user)
  }

  return res.status(405).end()
}

export default handler
