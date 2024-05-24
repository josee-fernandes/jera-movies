import { Icon } from '../Icon'

interface CreateProfileButtonProps {
  onClick: () => void
}

export const CreateProfileButton: React.FC<CreateProfileButtonProps> = ({
  onClick,
}) => {
  return (
    <div
      role="button"
      className="group relative flex size-28 items-center justify-center overflow-hidden rounded-full md:size-[17vw] lg:size-44"
      onClick={onClick}
    >
      <div className="absolute size-full rounded-full border-8 border-brand-accent-500 transition-all group-hover:border-brand-secondary-500" />
      <Icon
        name="plus"
        size="80%"
        className="text-brand-accent-500 transition-all group-hover:text-brand-secondary-500"
      />
    </div>
  )
}

CreateProfileButton.displayName = 'CreateProfileButton'
