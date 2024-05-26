import type { NextApiRequest, NextApiResponse } from 'next'

import { theMovieDbApi } from '@/lib/axios'
import { prisma } from '@/lib/prisma'

const THEMOVIEDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { profileId } = req.query

    if (!profileId)
      return res.status(404).json({ message: 'Profile id not provided' })

    const profileMovies = await prisma.movie.findMany({
      where: {
        ProfileMovie: {
          every: {
            profile_id: profileId.toString(),
          },
        },
      },
    })

    if (profileMovies.length) {
      const movieCategories: {
        id: string
        category_id: string
      }[] = []

      for (const movie of profileMovies) {
        const categories = await prisma.category.findMany({
          where: {
            MovieCategory: {
              every: {
                movie_id: movie.id,
              },
            },
          },
        })

        if (categories.length) {
          movieCategories.concat(categories)
        }
      }

      if (movieCategories.length) {
        const response = await theMovieDbApi.get(
          `/discover/movie?with_genres=${movieCategories.join('|')}`,
        )

        const movies: MovieType[] = response.data?.results?.map(
          (movie: MovieDb) => ({
            id: movie.id,
            title: movie.title,
            cover: `${THEMOVIEDB_IMAGE_BASE_URL}${movie.poster_path}`,
            saved: false,
            watched: false,
            themoviedb_id: movie.id,
          }),
        )

        return res.status(200).json(movies)
      }
    }

    // If there is no data for custom suggestions, it shows trending movies on the day

    const response = await theMovieDbApi.get(`/trending/movie/day`)

    const movies: MovieType[] = response.data?.results?.map(
      (movie: MovieDb) => ({
        id: movie.id,
        title: movie.title,
        cover: `${THEMOVIEDB_IMAGE_BASE_URL}${movie.poster_path}`,
        saved: false,
        watched: false,
        themoviedb_id: movie.id,
      }),
    )

    res.status(200).json(movies)
  }

  return res.status(405).end()
}

export default handler
