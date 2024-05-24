import { MovieCard } from './MovieCard'

const movies: MovieType[] = [
  {
    id: '1',
    name: 'MOVIE 1',
    cover: '/movie.png',
    saved: false,
    watched: false,
    themoviedb_id: '1',
  },
  {
    id: '2',
    name: 'MOVIE 2',
    cover: '/movie.png',
    saved: true,
    watched: false,
    themoviedb_id: '1',
  },
  {
    id: '3',
    name: 'MOVIE 3',
    cover: '/movie.png',
    saved: true,
    watched: true,
    themoviedb_id: '1',
  },
]

export const Movies: React.FC = () => {
  return (
    <div className="flex w-full flex-wrap justify-center gap-5 md:justify-start">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

Movies.displayName = 'Movies'
