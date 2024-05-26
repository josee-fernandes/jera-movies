import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { profileId } = req.query

    if (!profileId)
      return res.status(404).json({ message: 'Profile id not provided' })

    const movies = await prisma.movie.findMany({
      where: {
        ProfileMovie: {
          some: {
            profile_id: profileId.toString(),
          },
        },
        saved: true,
      },
    })

    res.status(200).json(movies)
  }

  return res.status(405).end()
}

export default handler
