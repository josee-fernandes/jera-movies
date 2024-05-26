import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, cover, saved, watched, themoviedbId } = req.body

    const movie = await prisma.movie.create({
      data: {
        title,
        cover,
        saved,
        watched,
        themoviedb_id: themoviedbId,
      },
    })

    return res.status(200).json(movie)
  }

  return res.status(405).end()
}

export default handler
