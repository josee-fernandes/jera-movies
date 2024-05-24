import Image from 'next/image'
import { useCallback, useState } from 'react'

import { cn } from '@/lib/utils'

import { Icon } from '../Icon'

interface MovieCardProps {
  movie: MovieType
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [saved, setSaved] = useState(movie.saved)
  const [watched, setWatched] = useState(movie.watched)

  const handleToggleSaved = useCallback(() => {
    setSaved((oldSaved) => !oldSaved)
  }, [])

  const handleToggleWatched = useCallback(() => {
    setWatched((oldWatched) => !oldWatched)
  }, [])

  return (
    <div className="flex w-full max-w-56 flex-col gap-2.5">
      <div className="relative h-80 overflow-hidden rounded-[1.25rem]">
        {movie.cover && (
          <Image src={movie.cover} alt="Movie" fill className="object-cover" />
        )}
      </div>
      <div className="flex justify-between">
        <h4 className="uppercase text-brand-secondary-500">{movie.name}</h4>
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
            <Icon
              name="bookmark"
              className={cn(
                saved
                  ? 'text-brand-accent-500 fill-brand-accent-500'
                  : 'text-brand-secondary-500',
              )}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

MovieCard.displayName = 'MovieCard'
