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

    res.status(200).json(profiles)
  }

  return res.status(405).end()
}

export default handler
