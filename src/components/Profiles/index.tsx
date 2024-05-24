import { Profile } from './Profile'

export const Profiles: React.FC = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-10 bg-brand-primary-500">
      <span className="text-5xl">WHO&apos;S BROWSING?</span>
      <div className="flex max-w-[1200px] flex-wrap items-center justify-center gap-5">
        <Profile />
        <Profile />
        <Profile />
        <Profile />
      </div>
    </div>
  )
}

Profiles.displayName = 'Profiles'
