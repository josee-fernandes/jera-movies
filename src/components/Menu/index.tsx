import { signOut } from 'next-auth/react'
import { useCallback } from 'react'

import { cn } from '@/lib/utils'

import { Icon } from '../Icon'

interface MenuProps {
  isOpen: boolean
  onClose: () => void
  onProfileSelection: () => void
}

export const Menu: React.FC<MenuProps> = ({
  isOpen,
  onClose,
  onProfileSelection,
}) => {
  const handleSignOut = useCallback(() => {
    try {
      signOut()

      onClose()
    } catch (error) {
      console.error(error)
    }
  }, [onClose])

  const handleProfileSelection = () => {
    onProfileSelection()

    onClose()
  }

  return (
    <div
      className={cn(
        'fixed top-0 z-10 flex h-screen w-full max-w-96 flex-col gap-10 bg-brand-accent-500 px-10 py-12 font-bold text-brand-primary-500 transition-all',
        isOpen ? 'right-0' : '-right-96',
      )}
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
