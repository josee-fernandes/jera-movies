import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { destroyCookie, parseCookies } from 'nookies'
import { useCallback } from 'react'

import { useActiveProfile } from '@/contexts/profile'
import { cn } from '@/lib/utils'

import { Icon } from './Icon'

interface MenuProps {
  isOpen: boolean
  onClose: () => void
}

export const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const router = useRouter()

  const { updateIsSwitchingProfile } = useActiveProfile()

  const handleSignOut = useCallback(() => {
    try {
      const cookies = parseCookies()

      if (cookies['credentials.session-token']) {
        destroyCookie(null, 'credentials.session-token')
        router.push('/')
      } else {
        signOut()
      }

      onClose()
    } catch (error) {
      console.error(error)
    }
  }, [onClose, router])

  const handleProfileSelection = () => {
    updateIsSwitchingProfile(true)

    onClose()
  }

  return (
    <div
      className={cn(
        'fixed top-0 z-10 flex h-screen w-full max-w-96 flex-col gap-10 bg-brand-accent-500 px-10 py-12 font-bold text-brand-primary-500 transition-all',
        isOpen ? 'right-0' : '-right-96',
      )}
      data-testid="menu"
    >
      <div className="flex w-full justify-end">
        <button onClick={onClose}>
          <Icon name="x" className="right-0 size-10" />
        </button>
      </div>
      <ul className="flex flex-col gap-10">
        <li>
          <span
            role="button"
            className="relative left-0 text-4xl transition-all hover:left-4"
            onClick={handleProfileSelection}
          >
            Profiles
          </span>
        </li>
        <li>
          <span
            role="button"
            className="relative left-0 text-4xl transition-all hover:left-4"
            onClick={handleSignOut}
          >
            Sign Out
          </span>
        </li>
      </ul>
    </div>
  )
}
