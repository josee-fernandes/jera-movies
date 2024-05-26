import { api } from '@/lib/axios'

interface GetWatchedMoviesFnParams {
  profileId: string
}

export type GetWatchedMoviesResponse = MovieType[]

type GetWatchedMoviesFnType = (
  params: GetWatchedMoviesFnParams,
) => Promise<GetWatchedMoviesResponse>

export const getWatchedMovies: GetWatchedMoviesFnType = async ({
  profileId,
}) => {
  if (!profileId) return []

  const response = await api.get<GetWatchedMoviesResponse>(
    `/movies/watched?profileId=${profileId}`,
  )

  return response.data ?? []
}
