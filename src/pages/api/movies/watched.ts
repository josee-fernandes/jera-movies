import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { profileId } = req.query

    if (!profileId)
      return res.status(404).json({ message: 'Profile id not provided' })

    const profileMovies = await prisma.movie.findMany({
      where: {
        ProfileMovie: {
          some: {
            profile_id: profileId.toString(),
          },
        },
        watched: true,
      },
    })

    const movies: MovieType[] = []

    for (const profileMovie of profileMovies) {
      let genresIds: number[] = []

      const genres = await prisma.genre.findMany({
        where: {
          MovieGenre: {
            some: {
              movie_id: profileMovie.id,
            },
          },
        },
      })

      if (genres.length) {
        const ids = genres.map((genre) => genre.themoviedb_genre_id)

        genresIds = genresIds.concat(ids)
      }

      movies.push({ ...profileMovie, themoviedb_genres_ids: genresIds })
    }

    return res.status(200).json(movies)
  }

  return res.status(405).end()
}

export default handler
