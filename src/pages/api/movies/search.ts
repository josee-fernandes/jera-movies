import { NextApiRequest, NextApiResponse } from 'next'

import { theMovieDbApi } from '@/lib/axios'
import { prisma } from '@/lib/prisma'
// import { prisma } from '@/lib/prisma'

const THEMOVIEDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { profileId, query } = req.query

    if (!profileId)
      return res.status(404).json({ message: 'Profile id not provided' })

    if (!query)
      return res.status(404).json({ message: 'Search query not provided' })

    const profileMovies = await prisma.movie.findMany({
      where: {
        ProfileMovie: {
          some: {
            profile_id: profileId.toString(),
          },
        },
      },
    })

    const response = await theMovieDbApi.get(`/search/movie?query=${query}`)

    const movies: MovieType[] = response.data?.results?.map(
      (movie: MovieDb) => {
        const profileMovie = profileMovies.find(
          (profileMovie) => profileMovie.themoviedb_id === movie.id,
        )

        if (profileMovie)
          return { ...profileMovie, themoviedb_genres_ids: movie.genre_ids }

        return {
          id: movie.id,
          title: movie.title,
          cover: `${THEMOVIEDB_IMAGE_BASE_URL}${movie.poster_path}`,
          saved: false,
          watched: false,
          themoviedb_id: movie.id,
          themoviedb_genres_ids: movie.genre_ids,
        }
      },
    )

    res.status(200).json(movies)
  }

  return res.status(405).end()
}

export default handler
