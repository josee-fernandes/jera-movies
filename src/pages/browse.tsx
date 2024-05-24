import { NextPage } from 'next'
import { useCallback, useState } from 'react'

import { Profiles } from '@/components/Profiles'

const Browse: NextPage = () => {
  const [currentProfile, setCurrentProfile] = useState<ProfileType | null>(null)
  const [profileSelection, setProfileSelection] = useState(true)

  const onProfileSelect = useCallback((profile: ProfileType) => {
    setCurrentProfile(profile)
    setProfileSelection(false)
  }, [])

  return (
    <div className="relative mx-auto min-h-screen w-[95%] max-w-[1200px] bg-brand-primary-500 py-16 md:py-[5.375rem]">
      {profileSelection && <Profiles onProfileSelect={onProfileSelect} />}
      <pre>{JSON.stringify(currentProfile, null, 2)}</pre>
    </div>
  )
}

Browse.displayName = 'Browse'

export default Browse
