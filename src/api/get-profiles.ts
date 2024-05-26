import { api } from '@/lib/axios'

interface GetProfilesFnParams {
  userId: string
}

export type GetProfilesResponse = ProfileType[]

type GetProfilesFnType = (
  params: GetProfilesFnParams,
) => Promise<GetProfilesResponse>

export const getProfiles: GetProfilesFnType = async ({ userId }) => {
  if (!userId) return []

  const response = await api.get(`/profiles?userId=${userId}`)

  return response.data ?? []
}
