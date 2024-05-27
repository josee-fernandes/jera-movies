import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import { getProfiles } from '@/api/get-profiles'
import { useActiveProfile } from '@/contexts/profile'
import { useCustomSession } from '@/hooks/session'

import { Avatar } from '../Avatar'
import { Icon } from '../Icon'
import { CreateProfileButton } from './CreateProfileButton'
import { CreateProfileForm } from './CreateProfileForm'
import { Profile } from './Profile'

// interface ProfilesProps {}

export const Profiles: React.FC = () => {
  const session = useCustomSession()
  const userId = session?.data?.user?.id ?? ''

  const {
    data: profiles,
    isLoading: isLoadingProfiles,
    error: profilesError,
  } = useQuery({
    queryKey: ['profiles', userId],
    queryFn: () => getProfiles({ userId }),
  })

  const { updateActiveProfile, updateIsSwitchingProfile } = useActiveProfile()

  const [creatingProfile, setCreatingProfile] = useState(false)

  const onCreate = () => {
    handleBack()
  }

  const onSelect = useCallback(
    (profile: ProfileType) => {
      updateActiveProfile(profile)
      updateIsSwitchingProfile(false)
    },
    [updateActiveProfile, updateIsSwitchingProfile],
  )

  const openCreateProfile = useCallback(() => {
    setCreatingProfile(true)
  }, [])

  const handleBack = useCallback(() => {
    setCreatingProfile(false)
  }, [])

  if (isLoadingProfiles) return <h1>Loading profiles ...</h1>

  if (profilesError) return <h1>Profiles error: ${profilesError.message}</h1>

  return (
    <div className="fixed left-0 top-0 z-10 flex size-full h-screen flex-col items-center justify-center bg-brand-primary-500">
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
            {profiles?.map((profile) => (
              <Profile key={profile.id} profile={profile} onSelect={onSelect} />
            ))}

            {profiles && profiles?.length < 4 && (
              <CreateProfileButton onClick={openCreateProfile} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

Profiles.displayName = 'Profiles'
