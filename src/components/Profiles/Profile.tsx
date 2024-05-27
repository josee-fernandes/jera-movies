import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useCallback } from 'react'

import { deleteProfile } from '@/api/delete-profile'
import { GetProfilesResponse } from '@/api/get-profiles'
import { useActiveProfile } from '@/contexts/profile'

import { Icon } from '../Icon'

interface ProfileProps {
  profile: ProfileType
  onSelect: (params: ProfileType) => void
}

export const Profile: React.FC<ProfileProps> = ({ profile, onSelect }) => {
  const { isManagingProfiles, updateIsManagingProfiles } = useActiveProfile()

  const queryClient = useQueryClient()

  const handleSelect = useCallback(() => {
    updateIsManagingProfiles(false)
    onSelect(profile)
  }, [onSelect, profile, updateIsManagingProfiles])

  const updateProfilesOnCache = (profile: ProfileType) => {
    const profilesCache = queryClient.getQueriesData<GetProfilesResponse>({
      queryKey: ['profiles', profile.user_id],
    })

    for (const [cacheKey, cacheData] of profilesCache) {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<GetProfilesResponse>(
        cacheKey,
        cacheData.filter((cacheProfile) => cacheProfile.id !== profile.id),
      )
    }
  }

  const handleDeleteProfile = async (profileId: string) => {
    try {
      await deleteProfile({ profileId })

      updateProfilesOnCache(profile)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div role="button" className="relative">
      {isManagingProfiles && (
        <div
          className="absolute right-3 top-3 z-20 rounded-full bg-brand-secondary-500 text-brand-primary-500 transition-all hover:scale-125 hover:bg-system-error"
          onClick={() => handleDeleteProfile(profile.id)}
        >
          <Icon name="x" strokeWidth={3} className="size-6" />
        </div>
      )}
      <div
        className="group relative flex size-28 items-center justify-center overflow-hidden rounded-full md:size-[17vw] lg:size-44"
        onClick={handleSelect}
      >
        <div className="absolute z-[1] size-full rounded-full border-8 border-transparent transition-all group-hover:border-brand-secondary-500" />
        <Image
          src={profile.avatar_url}
          alt={profile.name}
          fill
          className="pointer-events-none select-none"
        />
      </div>
    </div>
  )
}
