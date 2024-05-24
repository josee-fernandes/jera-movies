import { useCallback, useState } from 'react'

import { Avatar } from '../Avatar'
import { Icon } from '../Icon'
import { CreateProfileButton } from './CreateProfileButton'
import { CreateProfileForm } from './CreateProfileForm'
import { Profile } from './Profile'

const sampleProfiles: ProfileType[] = [
  {
    id: '1',
    name: 'Profile 1',
    avatar: '/avatar-1.png',
    userId: '1',
  },
  {
    id: '2',
    name: 'Profile 2',
    avatar: '/avatar-2.png',
    userId: '1',
  },
]

interface ProfilesProps {
  onProfileSelect: (params: ProfileType) => void
}

export const Profiles: React.FC<ProfilesProps> = ({ onProfileSelect }) => {
  const [profiles, setProfiles] = useState(sampleProfiles)
  const [creatingProfile, setCreatingProfile] = useState(false)

  const onCreate = (newProfile: ProfileType) => {
    setProfiles((oldProfiles) => [...oldProfiles, newProfile])

    handleBack()
  }

  const onSelect = useCallback(
    (profile: ProfileType) => {
      onProfileSelect(profile)
    },
    [onProfileSelect],
  )

  const openCreateProfile = useCallback(() => {
    setCreatingProfile(true)
  }, [])

  const handleBack = useCallback(() => {
    setCreatingProfile(false)
  }, [])

  return (
    <div className="fixed left-0 top-0 flex size-full h-screen flex-col items-center justify-center bg-brand-primary-500">
      {creatingProfile ? (
        <div className="relative mx-auto w-[95%] max-w-[1200px]">
          <button
            className="z-[1] mt-16 block md:absolute md:mt-[5.375rem]"
            onClick={handleBack}
          >
            <Icon
              name="move-left"
              className="size-12 text-brand-secondary-500 transition-all hover:text-brand-accent-500"
            />
          </button>
          <div className="flex h-screen flex-col items-center justify-center gap-[3.875rem] ">
            <div className="flex flex-col items-center justify-center gap-10">
              <Avatar
                src="/avatar-3.png"
                alt="New profile"
                className="size-40 md:size-[25vw] lg:size-64"
              />
              <h3 className="text-center text-lg md:text-[4.7vw] lg:text-5xl">
                THIS NEW PROFILE WILL BE CALLED
              </h3>
            </div>
            <CreateProfileForm onCreate={onCreate} />
          </div>
        </div>
      ) : (
        <div className="relative mx-auto flex w-[95%] max-w-[1200px] flex-col items-center justify-center gap-10">
          <h3 className="text-center text-2xl md:text-[4.7vw] lg:text-5xl">
            WHO&apos;S BROWSING?
          </h3>
          <div className="flex max-w-[1200px] flex-wrap items-center justify-center gap-5">
            {profiles.map((profile) => (
              <Profile key={profile.id} profile={profile} onSelect={onSelect} />
            ))}

            {profiles.length < 4 && (
              <CreateProfileButton onClick={openCreateProfile} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

Profiles.displayName = 'Profiles'
