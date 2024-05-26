import { api } from '@/lib/axios'

interface GetMoviesFnParams {
  profileId: string
}

export type GetMoviesResponse = MovieType[]

type GetMoviesFnType = (params: GetMoviesFnParams) => Promise<GetMoviesResponse>

export const getMovies: GetMoviesFnType = async ({ profileId }) => {
  if (!profileId) return []

  const response = await api.get<GetMoviesResponse>(
    `/movies/suggestions?profileId=${profileId}`,
  )

  return response.data ?? []
}
