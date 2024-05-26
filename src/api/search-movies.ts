import { api } from '@/lib/axios'

interface SearchMoviesFnParams {
  profileId: string
  query: string
}

export type SearchMoviesResponse = MovieType[]

type SearchMoviesFnType = (
  params: SearchMoviesFnParams,
) => Promise<SearchMoviesResponse>

export const searchMovies: SearchMoviesFnType = async ({
  profileId,
  query,
}) => {
  if (!profileId || !query) return []

  const response = await api.get<SearchMoviesResponse>(
    `/movies/search?profileId=${profileId}&query=${query}`,
  )

  return response.data ?? []
}
