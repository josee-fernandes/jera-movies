import { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { createContext, useContext } from 'use-context-selector'

interface ProfileContextProps {
  activeProfile: ProfileType | null
  updateActiveProfile: (newActiveProfile: ProfileType) => void
  isSwitchingProfile: boolean
  updateIsSwitchingProfile: (newIsSwitchingProfiles: boolean) => void
  isManagingProfiles: boolean
  updateIsManagingProfiles: (newIsManagingProfiles: boolean) => void
}

const ProfileContext = createContext({} as ProfileContextProps)

interface ProfileContextProvider extends PropsWithChildren {}

export const ProfileContextProvider: React.FC<ProfileContextProvider> = ({
  children,
}) => {
  const [activeProfile, setActiveProfile] = useState<ProfileType | null>(null)
  const [isSwitchingProfile, setIsSwitchingProfile] = useState(true)
  const [isManagingProfiles, setIsManagingProfiles] = useState(false)

  const updateActiveProfile = useCallback(
    (newActiveProfile: ProfileType) => {
      if (newActiveProfile.id !== activeProfile?.id)
        setActiveProfile(newActiveProfile)
    },
    [activeProfile?.id],
  )

  const updateIsSwitchingProfile = useCallback(
    (newIsSwitchingProfile: boolean) => {
      if (isSwitchingProfile !== newIsSwitchingProfile)
        setIsSwitchingProfile(newIsSwitchingProfile)
    },
    [isSwitchingProfile],
  )

  const updateIsManagingProfiles = useCallback(
    (newIsManagingProfiles: boolean) => {
      if (isManagingProfiles !== newIsManagingProfiles)
        setIsManagingProfiles(newIsManagingProfiles)
    },
    [isManagingProfiles],
  )

  const contextValues = useMemo(
    () => ({
      activeProfile,
      updateActiveProfile,
      isSwitchingProfile,
      updateIsSwitchingProfile,
      isManagingProfiles,
      updateIsManagingProfiles,
    }),
    [
      activeProfile,
      isManagingProfiles,
      isSwitchingProfile,
      updateActiveProfile,
      updateIsManagingProfiles,
      updateIsSwitchingProfile,
    ],
  )

  return (
    <ProfileContext.Provider value={contextValues}>
      {children}
    </ProfileContext.Provider>
  )
}

ProfileContextProvider.displayName = 'ProfileContextProvider'

export const useActiveProfile = () => useContext(ProfileContext)
