import { api } from '@/lib/axios'

interface SignUpFnParams {
  email: string
  password: string
  name: string
}

type SignUpFnType = (params: SignUpFnParams) => Promise<UserType>

export const signUp: SignUpFnType = async ({ email, password, name }) => {
  const response = await api.post('/users', { email, password, name })

  return response.data
}
