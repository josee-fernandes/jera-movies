import { api } from '@/lib/axios'

interface ToggleMovieSavedFnParams {
  movie: MovieType
  profileId: string
}

type ToggleMovieSavedResponse = MovieType | null

type ToggleMovieSavedFnType = (
  params: ToggleMovieSavedFnParams,
) => Promise<ToggleMovieSavedResponse>

export const toggleMovieSaved: ToggleMovieSavedFnType = async ({
  movie,
  profileId,
}) => {
  if (!movie) return null

  const response = await api.post<ToggleMovieSavedResponse>('/movies', {
    title: movie.title,
    cover: movie.cover,
    saved: !movie.saved,
    watched: movie.watched,
    themoviedbId: movie.themoviedb_id,
    profileId,
    genresIds: movie.themoviedb_genres_ids,
  })

  return response.data ?? null
}
