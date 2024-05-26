import { api } from '@/lib/axios'

interface SignInFnParams {
  email: string
  password: string
}

type SignInFnType = (params: SignInFnParams) => Promise<UserType>

export const signIn: SignInFnType = async ({ email, password }) => {
  const response = await api.post('/users/auth', { email, password })

  return response.data
}
