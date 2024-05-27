import { api } from '@/lib/axios'

interface DeleteProfileFnParams {
  profileId: string
}

type DeleteProfileResponse = ProfileType

type DeleteProfileFnType = (
  params: DeleteProfileFnParams,
) => Promise<DeleteProfileResponse>

export const deleteProfile: DeleteProfileFnType = async ({ profileId }) => {
  if (!profileId) throw new Error('Profile id not provided')

  const response = await api.delete<DeleteProfileResponse>(
    `/profiles?profileId=${profileId}`,
  )

  return response.data
}
