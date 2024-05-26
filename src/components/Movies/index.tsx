import { useQuery } from '@tanstack/react-query'

import { getMovies } from '@/api/get-movies'

import { MovieCard } from './MovieCard'

interface MoviesProps {
  profileId: string
}

export const Movies: React.FC<MoviesProps> = ({ profileId }) => {
  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movies', profileId],
    queryFn: () => getMovies({ profileId }),
  })

  if (isLoading) return <h1>Loading movies ...</h1>

  if (error) return <h1>Error fetching movies: {error.message}</h1>

  return (
    <div className="flex w-full flex-wrap justify-center gap-5 md:justify-start">
      {movies?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  )
}

Movies.displayName = 'Movies'
