import { NextPage } from 'next'
import Image from 'next/image'
import logo from 'public/logo.svg'
import { useCallback, useState } from 'react'

import { Avatar } from '@/components/Avatar'
import { Profiles } from '@/components/Profiles'

const Browse: NextPage = () => {
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
      {profileSelection && <Profiles onProfileSelect={onProfileSelect} />}
      <div className="mx-auto w-max">
        <pre>{JSON.stringify(currentProfile, null, 2)}</pre>
      </div>
    </div>
  )
}

Browse.displayName = 'Browse'

export default Browse
