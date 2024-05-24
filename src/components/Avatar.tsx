import Image from 'next/image'

interface AvatarProps {
  src: string
  alt: string
  className?: string
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, className }) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="pointer-events-none select-none"
      />
    </div>
  )
}

Avatar.displayName = 'Avatar'
