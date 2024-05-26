import { api } from '@/lib/axios'

interface ToggleMovieWatchedFnParams {
  movie: MovieType
  profileId: string
}

type ToggleMovieWatchedResponse = MovieType | null

type ToggleMovieWatchedFnType = (
  params: ToggleMovieWatchedFnParams,
) => Promise<ToggleMovieWatchedResponse>

export const toggleMovieWatched: ToggleMovieWatchedFnType = async ({
  movie,
  profileId,
}) => {
  if (!movie) return null

  const response = await api.post<ToggleMovieWatchedResponse>('/movies', {
    title: movie.title,
    cover: movie.cover,
    saved: movie.saved,
    watched: !movie.watched,
    themoviedbId: movie.themoviedb_id,
    profileId,
    genresIds: movie.themoviedb_genres_ids,
  })

  return response.data ?? null
}
