import Image from 'next/image'
import { useCallback } from 'react'

interface ProfileProps {
  profile: ProfileType
  onSelect: (params: ProfileType) => void
}

export const Profile: React.FC<ProfileProps> = ({ profile, onSelect }) => {
  const handleSelect = useCallback(() => {
    onSelect(profile)
  }, [onSelect, profile])

  return (
    <div
      role="button"
      className="group relative flex size-44 items-center justify-center overflow-hidden rounded-full"
      onClick={handleSelect}
    >
      <div className="absolute z-[1] size-full rounded-full border-8 border-transparent transition-all group-hover:border-brand-secondary-500" />
      <Image
        src={profile.avatar}
        alt={profile.name}
        fill
        className="pointer-events-none select-none"
      />
    </div>
  )
}
