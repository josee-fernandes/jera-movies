import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Suspense, useCallback, useMemo } from 'react'

import { GetMoviesResponse } from '@/api/get-movies'
import { toggleMovieSaved } from '@/api/toggle-movie-saved'
import { toggleMovieWatched } from '@/api/toggle-movie-watched'
import { useActiveProfile } from '@/contexts/profile'
import { cn } from '@/lib/utils'

import { Icon } from '../Icon'

interface MovieCardProps {
  movie: MovieType
}

const MovieCardFC: React.FC<MovieCardProps> = ({ movie }) => {
  const searchParams = useSearchParams()
  const filter = searchParams.get('filter')

  const { activeProfile } = useActiveProfile()
  const profileId = useMemo(() => activeProfile?.id ?? '', [activeProfile])

  const queryClient = useQueryClient()

  const updateMovieOnCache = (
    themoviedbId: number,
    saved: boolean,
    watched: boolean,
    type: 'saved' | 'watched',
  ) => {
    const moviesCache = queryClient.getQueriesData<GetMoviesResponse>({
      queryKey: ['movies', profileId, filter],
    })

    for (const [cacheKey, cacheData] of moviesCache) {
      if (!cacheData) {
        return
      }

      const updatedCache = [
        ...cacheData.map((movie) =>
          movie.themoviedb_id === themoviedbId
            ? { ...movie, saved, watched }
            : movie,
        ),
      ]

      const updatedCacheFiltered = [...updatedCache]

      if (filter !== 'suggestions') {
        updatedCacheFiltered.filter((movie) =>
          type === 'saved' ? movie.saved : movie.watched,
        )
      }

      queryClient.setQueryData<GetMoviesResponse>(cacheKey, [
        ...cacheData.map((movie) =>
          movie.themoviedb_id === themoviedbId
            ? { ...movie, saved, watched }
            : movie,
        ),
      ])

      // Refresh list after removed
      queryClient.refetchQueries()
    }
  }

  const { mutateAsync: toggleMovieSavedFn, isPending: isTogglingMovieSaved } =
    useMutation({
      mutationFn: toggleMovieSaved,
      async onSuccess(movie) {
        updateMovieOnCache(
          movie!.themoviedb_id,
          movie!.saved,
          movie!.watched,
          'saved',
        )
      },
    })

  const {
    mutateAsync: toggleMovieWatchedFn,
    isPending: isTogglingMovieWatched,
  } = useMutation({
    mutationFn: toggleMovieWatched,
    async onSuccess(movie) {
      updateMovieOnCache(
        movie!.themoviedb_id,
        movie!.saved,
        movie!.watched,
        'watched',
      )
    },
  })

  const handleToggleSaved = useCallback(() => {
    toggleMovieSavedFn({ movie, profileId })
  }, [movie, profileId, toggleMovieSavedFn])

  const handleToggleWatched = useCallback(() => {
    toggleMovieWatchedFn({ movie, profileId })
  }, [movie, profileId, toggleMovieWatchedFn])

  return (
    <div className="flex w-full max-w-56 flex-col gap-2.5">
      <div className="relative h-80 overflow-hidden rounded-[1.25rem]">
        {movie.cover && (
          <Image
            src={movie.cover}
            alt={movie.title}
            fill
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex justify-between">
        <h4 className="uppercase text-brand-secondary-500">{movie.title}</h4>
        <div className="flex gap-3">
          <button onClick={handleToggleWatched}>
            {isTogglingMovieWatched ? (
              <Icon name="loader-circle" className="animate-spin" />
            ) : (
              <Icon
                name="check-check"
                className={cn(
                  movie.watched
                    ? 'text-brand-accent-500'
                    : 'text-brand-secondary-500',
                )}
              />
            )}
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

MovieCardFC.displayName = 'MovieCardFC'

export const MovieCard: React.FC<MovieCardProps> = (props) => {
  return (
    <Suspense>
      <MovieCardFC {...props} />
    </Suspense>
  )
}

MovieCard.displayName = 'MovieCard'
