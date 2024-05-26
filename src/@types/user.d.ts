interface UserType {
  id: string
  email: string
  password: string | null
  name: string
  avatar_url: string | null
  created_at: Date
  updated_at: Date
}

interface ProfileType {
  id: string
  name: string
  avatar_url: string
  created_at: string
  updated_at: string
  user_id: string
}
