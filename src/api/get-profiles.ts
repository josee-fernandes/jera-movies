import { api } from '@/lib/axios'

interface GetProfilesFnParams {
  userId: string
}

interface GetProfilesResponse {
  id: string
  name: string
  avatar_url: string
  created_at: string
  updated_at: string
  user_id: string
}

type GetProfilesFnType = (
  params: GetProfilesFnParams,
) => Promise<GetProfilesResponse[]>

export const getProfiles: GetProfilesFnType = async ({ userId }) => {
  const response = await api.get(`/profiles?userId=${userId}`)

  return response.data ?? []
}
