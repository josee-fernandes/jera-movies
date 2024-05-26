import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import logo from 'public/logo.svg'
import { useCallback, useState } from 'react'

import { Avatar } from '@/components/Avatar'
import { Movies } from '@/components/Movies'
import { SearchedMovies } from '@/components/Movies/SearchMovies'
import { Profiles } from '@/components/Profiles'
import { SearchForm } from '@/components/SearchForm'
import { cn } from '@/lib/utils'

const Browse: NextPage = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const filter = searchParams.get('filter') ?? 'suggestions'
  const query = searchParams.get('query') ?? ''

  const [currentProfile, setCurrentProfile] = useState<ProfileType | null>(null)
  const [profileSelection, setProfileSelection] = useState(true)

  const onProfileSelect = useCallback((profile: ProfileType) => {
    setCurrentProfile(profile)
    setProfileSelection(false)
  }, [])

  const handleChangeProfile = useCallback(() => {
    setProfileSelection(true)
  }, [])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  if (!currentProfile || profileSelection)
    return <Profiles onProfileSelect={onProfileSelect} />

  return (
    <div className="min-h-screen bg-brand-primary-500 pt-16 md:pt-[5.375rem]">
      {/* {profileSelection && <Profiles onProfileSelect={onProfileSelect} />} */}

      <nav className="mx-auto flex w-[95%] max-w-[1200px] flex-col items-center justify-between gap-4 md:flex-row">
        <Image
          src={logo}
          alt="Jera Movies logo"
          className="h-10 w-max"
          priority
        />
        <div role="button" onClick={handleChangeProfile}>
          {currentProfile?.avatar_url && (
            <Avatar
              src={currentProfile.avatar_url}
              alt={currentProfile.name}
              className="size-10 overflow-hidden rounded-full"
            />
          )}
        </div>
      </nav>

      <div className="mx-auto mt-9 flex w-[95%] max-w-[400px] flex-col items-center justify-center gap-10">
        <h2 className="text-center font-anton text-3xl md:text-[4.6vw] lg:text-5xl">
          DISCOVER MILLIONS OF MOVIES EXPLORING
        </h2>
        <SearchForm profileId={currentProfile.id} />
      </div>

      {query && (
        <div>
          <div className="mx-auto mt-20 flex w-[95%] max-w-[1200px] flex-col items-center gap-4 md:flex-row">
            <span>FOUND MOVIES:</span>
          </div>
          <div className="mx-auto mt-16 flex w-[95%] max-w-[1200px] flex-col gap-4 md:flex-row">
            <SearchedMovies profileId={currentProfile.id} />
          </div>
        </div>
      )}

      <div className="mx-auto mt-20 flex w-[95%] max-w-[1200px] flex-col items-center gap-4 md:flex-row">
        <span>FILTER BY:</span>
        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
          <Link
            href={`${pathname}?${createQueryString('filter', 'suggestions')}`}
            scroll={false}
            className={cn(
              filter === 'suggestions'
                ? 'text-brand-accent-500 font-bold'
                : 'text-brand-secondary-500',
            )}
          >
            SUGGESTIONS
          </Link>
          <Link
            href={`${pathname}?${createQueryString('filter', 'saved')}`}
            scroll={false}
            className={cn(
              filter === 'saved'
                ? 'text-brand-accent-500 font-bold'
                : 'text-brand-secondary-500',
            )}
          >
            SAVED FOR LATER
          </Link>
          <Link
            href={`${pathname}?${createQueryString('filter', 'watched')}`}
            scroll={false}
            className={cn(
              filter === 'watched'
                ? 'text-brand-accent-500 font-bold'
                : 'text-brand-secondary-500',
            )}
          >
            WATCHED
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-16 flex w-[95%] max-w-[1200px] flex-col gap-4 md:flex-row">
        <Movies profileId={currentProfile.id} />
      </div>
    </div>
  )
}

Browse.displayName = 'Browse'

export default Browse
