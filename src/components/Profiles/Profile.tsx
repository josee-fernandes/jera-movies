import Image from 'next/image'
import avatar from 'public/avatar-1.png'

export const Profile: React.FC = () => {
  return (
    <div
      role="button"
      className="group relative flex size-44 items-center justify-center overflow-hidden rounded-full"
    >
      <div className="absolute size-full rounded-full border-4 border-transparent transition-all group-hover:border-brand-secondary-500" />
      <Image
        src={avatar}
        alt="Profile"
        className="pointer-events-none select-none"
      />
    </div>
  )
}
