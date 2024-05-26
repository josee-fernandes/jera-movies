import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useCallback, useState } from 'react'

import { GetMoviesResponse } from '@/api/get-movies'
import { toggleMovieSaved } from '@/api/toggle-movie-saved'
import { cn } from '@/lib/utils'

import { Icon } from '../Icon'

interface MovieCardProps {
  movie: MovieType
  profileId: string
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, profileId }) => {
  const queryClient = useQueryClient()

  // const [saved, setSaved] = useState(movie.saved)
  const [watched, setWatched] = useState(movie.watched)

  const updateMovieOnCache = (
    movieId: string,
    saved: boolean,
    watched: boolean,
  ) => {
    const moviesCache = queryClient.getQueriesData<GetMoviesResponse>({
      queryKey: ['movies', profileId],
    })

    for (const [cacheKey, cacheData] of moviesCache) {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<GetMoviesResponse>(cacheKey, [
        ...cacheData.map((movie) =>
          movie.themoviedb_id === movieId
            ? { ...movie, saved, watched }
            : movie,
        ),
      ])
    }
  }

  const { mutateAsync: toggleMovieSavedFn, isPending: isTogglingMovieSaved } =
    useMutation({
      mutationFn: toggleMovieSaved,
      async onSuccess(movie) {
        updateMovieOnCache(movie!.themoviedb_id, movie!.saved, movie!.watched)
      },
    })

  const handleToggleSaved = useCallback(() => {
    toggleMovieSavedFn({ movie, profileId })
    // setSaved((oldSaved) => !oldSaved)
  }, [movie, profileId, toggleMovieSavedFn])

  const handleToggleWatched = useCallback(() => {
    setWatched((oldWatched) => !oldWatched)
  }, [])

  return (
    <div className="flex w-full max-w-56 flex-col gap-2.5">
      <div className="relative h-80 overflow-hidden rounded-[1.25rem]">
        {movie.cover && (
          <Image
            src={movie.cover}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex justify-between">
        <h4 className="uppercase text-brand-secondary-500">{movie.title}</h4>
        <div className="flex gap-3">
          <button onClick={handleToggleWatched}>
            <Icon
              name="check-check"
              className={cn(
                watched ? 'text-brand-accent-500' : 'text-brand-secondary-500',
              )}
            />
          </button>
          <button onClick={handleToggleSaved}>
            {isTogglingMovieSaved ? (
              <Icon name="loader-circle" className="animate-spin" />
            ) : (
              <Icon
                name="bookmark"
                className={cn(
                  movie.saved
                    ? 'text-brand-accent-500 fill-brand-accent-500'
                    : 'text-brand-secondary-500',
                )}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

MovieCard.displayName = 'MovieCard'
