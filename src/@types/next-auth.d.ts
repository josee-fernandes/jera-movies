import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    password?: string
    avatar_url: string
  }

  interface Session extends DefaultSession {
    user: User
  }
}