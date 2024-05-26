import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, cover, saved, watched, themoviedbId, profileId, genresIds } =
      req.body

    const movieExists = await prisma.movie.findFirst({
      where: { themoviedb_id: themoviedbId },
    })

    let movie: {
      id: string
      title: string
      cover: string
      saved: boolean
      watched: boolean
      themoviedb_id: number
      created_at: Date
      updated_at: Date
    } | null = movieExists

    if (movieExists) {
      movie = await prisma.movie.update({
        where: { themoviedb_id: themoviedbId },
        data: {
          saved,
          watched,
        },
      })
    } else {
      movie = await prisma.movie.create({
        data: {
          title,
          cover,
          saved,
          watched,
          themoviedb_id: themoviedbId,
        },
      })
    }

    const profileMovieExists = await prisma.profileMovie.findFirst({
      where: { movie_id: movie.id, profile_id: profileId },
    })

    if (!profileMovieExists) {
      await prisma.profileMovie.create({
        data: { movie_id: movie.id, profile_id: profileId },
      })
    }

    for (const genreId of genresIds) {
      let genre = await prisma.genre.findFirst({
        where: { themoviedb_genre_id: genreId },
      })

      if (!genre) {
        genre = await prisma.genre.create({
          data: {
            themoviedb_genre_id: genreId,
          },
        })
      }

      const movieGenreExists = await prisma.movieGenre.findFirst({
        where: { movie_id: movie.id, genre_id: genre.id },
      })

      if (!movieGenreExists) {
        await prisma.movieGenre.create({
          data: { movie_id: movie.id, genre_id: genre.id },
        })
      }
    }

    return res.status(200).json(movie)
  }

  return res.status(405).end()
}

export default handler
