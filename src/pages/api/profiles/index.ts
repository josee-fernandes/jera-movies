import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = req.query

    if (!userId)
      return res.status(404).json({ message: 'User id not provided' })

    const profiles = await prisma.profile.findMany({
      where: {
        user_id: userId as string,
      },
    })

    return res.status(200).json(profiles)
  }

  if (req.method === 'POST') {
    const { name, avatarUrl, userId } = req.body

    if (!name) return res.status(404).json({ message: 'Name not provided.' })

    if (!userId)
      return res.status(404).json({ message: 'User id not provided.' })

    const profile = await prisma.profile.create({
      data: {
        name,
        avatar_url: avatarUrl ?? '',
        user_id: userId,
      },
    })

    return res.status(200).json(profile)
  }

  return res.status(405).end()
}

export default handler
