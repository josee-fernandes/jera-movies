import { api } from '@/lib/axios'

interface CreateProfileFnParams {
  name: string
  avatarUrl: string
  userId: string
}

type CreateProfileResponse = ProfileType

type CreateProfileFnType = (
  params: CreateProfileFnParams,
) => Promise<CreateProfileResponse>

export const createProfile: CreateProfileFnType = async ({
  name,
  avatarUrl,
  userId,
}) => {
  if (!userId) throw new Error('User id not provided')

  const response = await api.post<CreateProfileResponse>('/profiles', {
    name,
    avatarUrl,
    userId,
  })

  return response.data
}
