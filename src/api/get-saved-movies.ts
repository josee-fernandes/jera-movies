import { api } from '@/lib/axios'

interface GetSavedMoviesFnParams {
  profileId: string
}

export type GetSavedMoviesResponse = MovieType[]

type GetSavedMoviesFnType = (
  params: GetSavedMoviesFnParams,
) => Promise<GetSavedMoviesResponse>

export const getSavedMovies: GetSavedMoviesFnType = async ({ profileId }) => {
  if (!profileId) return []

  const response = await api.get<GetSavedMoviesResponse>(
    `/movies/saved?profileId=${profileId}`,
  )

  return response.data ?? []
}
