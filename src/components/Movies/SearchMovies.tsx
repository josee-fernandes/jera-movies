import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import { searchMovies } from '@/api/search-movies'

import { MovieCard } from './MovieCard'

interface SearchedMoviesProps {
  profileId: string
}

const SearchedMoviesFC: React.FC<SearchedMoviesProps> = ({ profileId }) => {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') ?? ''

  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movies', profileId, query],
    queryFn: () => searchMovies({ profileId, query }),
  })

  if (isLoading) return <h1>Loading searched movies ...</h1>

  if (error) return <h1>Searched movies error: {error.message}</h1>

  return (
    <div className="flex w-full flex-wrap justify-center gap-5 md:justify-start">
      {movies?.map((movie) => (
        <MovieCard
          key={movie.id ?? movie.themoviedb_id}
          movie={movie}
          profileId={profileId}
        />
      ))}
    </div>
  )
}

SearchedMoviesFC.displayName = 'SearchMoviesFC'

export const SearchedMovies: React.FC<SearchedMoviesProps> = (props) => {
  return (
    <Suspense>
      <SearchedMoviesFC {...props} />
    </Suspense>
  )
}

SearchedMovies.displayName = 'SearchMovies'
