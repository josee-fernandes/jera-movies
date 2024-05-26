import jwt from 'jsonwebtoken'
import { useSession } from 'next-auth/react'
import { parseCookies } from 'nookies'

interface JWTUser {
  id: string
  name: string
  email: string
  avatar_url: string
}

export const useCustomSession = () => {
  const session = useSession()

  if (session.data) {
    return session
  }

  const cookies = parseCookies()

  const user = jwt.decode(cookies['credentials.session-token']) as JWTUser

  return { data: { user }, status: 'authenticated' }
}
