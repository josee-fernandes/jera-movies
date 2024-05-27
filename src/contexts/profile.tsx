import { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { createContext, useContext } from 'use-context-selector'

interface ProfileContextProps {
  activeProfile: ProfileType | null
  updateActiveProfile: (newActiveProfile: ProfileType) => void
  isSwitchingProfile: boolean
  updateIsSwitchingProfile: (newIsSwitchingProfiles: boolean) => void
}

const ProfileContext = createContext({} as ProfileContextProps)

interface ProfileContextProvider extends PropsWithChildren {}

export const ProfileContextProvider: React.FC<ProfileContextProvider> = ({
  children,
}) => {
  const [activeProfile, setActiveProfile] = useState<ProfileType | null>(null)
  const [isSwitchingProfile, setIsSwitchingProfile] = useState(true)

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

  const contextValues = useMemo(
    () => ({
      activeProfile,
      updateActiveProfile,
      isSwitchingProfile,
      updateIsSwitchingProfile,
    }),
    [
      activeProfile,
      isSwitchingProfile,
      updateActiveProfile,
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
