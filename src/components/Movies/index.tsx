import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { Suspense, useMemo } from 'react'

import { getMovies } from '@/api/get-movies'
import { getSavedMovies } from '@/api/get-saved-movies'
import { getWatchedMovies } from '@/api/get-watched-movies'
import { useActiveProfile } from '@/contexts/profile'

import { MovieCard } from './MovieCard'

// interface MoviesProps {}

const MoviesFC: React.FC = () => {
  const searchParams = useSearchParams()
  const filter = searchParams.get('filter')

  const { activeProfile } = useActiveProfile()
  const profileId = useMemo(() => activeProfile?.id ?? '', [activeProfile])

  const moviesQueryFn = useMemo(() => {
    switch (filter) {
      case 'suggestions':
        return getMovies
      case 'saved':
        return getSavedMovies
      case 'watched':
        return getWatchedMovies
      default:
        return getMovies
    }
  }, [filter])

  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movies', profileId, filter],
    queryFn: () => moviesQueryFn({ profileId }),
  })

  if (isLoading) return <h1>Loading movies ...</h1>

  if (error) return <h1>Error fetching movies: {error.message}</h1>

  return (
    <div
      data-testid="movies"
      className="flex w-full flex-wrap justify-center gap-5 md:justify-start"
    >
      {movies?.map((movie) => (
        <MovieCard key={movie.id ?? movie.themoviedb_id} movie={movie} />
      ))}
    </div>
  )
}

MoviesFC.displayName = 'MoviesFC'

export const Movies: React.FC = (props) => {
  return (
    <Suspense>
      <MoviesFC {...props} />
    </Suspense>
  )
}

Movies.displayName = 'Movies'
