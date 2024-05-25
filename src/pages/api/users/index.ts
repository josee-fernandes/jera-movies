import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { email, password, name } = req.body

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userExists) {
    return res.status(400).json({ message: 'Email already taken.' })
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password,
    },
  })

  res.status(200).json(user)
}

export default handler
