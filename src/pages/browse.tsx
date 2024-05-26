import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import logo from 'public/logo.svg'
import { useCallback, useState } from 'react'

import { Avatar } from '@/components/Avatar'
import { Movies } from '@/components/Movies'
import { Profiles } from '@/components/Profiles'
import { SearchForm } from '@/components/SearchForm'
import { cn } from '@/lib/utils'

const Browse: NextPage = () => {
  const params = useSearchParams()
  const filter = params.get('filter') ?? 'suggestions'

  const session = useSession()

  console.log({ session })

  const [currentProfile, setCurrentProfile] = useState<ProfileType | null>(null)
  const [profileSelection, setProfileSelection] = useState(true)

  const onProfileSelect = useCallback((profile: ProfileType) => {
    setCurrentProfile(profile)
    setProfileSelection(false)
  }, [])

  const handleChangeProfile = useCallback(() => {
    setProfileSelection(true)
  }, [])

  return (
    <div className="min-h-screen bg-brand-primary-500 pt-16 md:pt-[5.375rem]">
      {profileSelection && <Profiles onProfileSelect={onProfileSelect} />}

      <nav className="mx-auto flex w-[95%] max-w-[1200px] flex-col items-center justify-between gap-4 md:flex-row">
        <Image src={logo} alt="Jera Movies logo" className="h-10 w-max" />
        <div role="button" onClick={handleChangeProfile}>
          {currentProfile?.avatar && (
            <Avatar
              src={currentProfile.avatar}
              alt={currentProfile.name}
              className="size-10"
            />
          )}
        </div>
      </nav>

      <div className="mx-auto mt-9 flex w-[95%] max-w-[400px] flex-col items-center justify-center gap-10">
        <h2 className="text-center font-anton text-3xl md:text-[4.6vw] lg:text-5xl">
          DISCOVER MILLIONS OF MOVIES EXPLORING
        </h2>
        <SearchForm />
      </div>

      <div className="mx-auto mt-20 flex w-[95%] max-w-[1200px] flex-col items-center gap-4 md:flex-row">
        <span>FILTER BY:</span>
        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
          <Link
            href="?filter=suggestions"
            className={cn(
              filter === 'suggestions'
                ? 'text-brand-accent-500 font-bold'
                : 'text-brand-secondary-500',
            )}
          >
            SUGGESTIONS
          </Link>
          <Link
            href="?filter=saved"
            className={cn(
              filter === 'saved'
                ? 'text-brand-accent-500 font-bold'
                : 'text-brand-secondary-500',
            )}
          >
            SAVED FOR LATER
          </Link>
          <Link
            href="?filter=watched"
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
        <Movies />
      </div>
    </div>
  )
}

Browse.displayName = 'Browse'

export default Browse
