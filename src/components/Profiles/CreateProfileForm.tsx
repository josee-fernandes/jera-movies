import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createProfile } from '@/api/create-profile'
import { GetProfilesResponse } from '@/api/get-profiles'
import { useCustomSession } from '@/hooks/session'

import { Icon } from '../Icon'

interface CreateProfileFormProps {
  onCreate: () => void
}

const createProfileFormSchema = z.object({
  name: z.string().max(10),
})

type CreateProfileFormSchemaType = z.infer<typeof createProfileFormSchema>

export const CreateProfileForm: React.FC<CreateProfileFormProps> = ({
  onCreate,
}) => {
  const session = useCustomSession()
  const userId = session.data?.user?.id ?? ''

  const { register, handleSubmit } = useForm<CreateProfileFormSchemaType>({
    defaultValues: {
      name: '',
    },
  })

  const queryClient = useQueryClient()

  const updateProfilesOnCache = (profile: ProfileType) => {
    const profilesCache = queryClient.getQueriesData<GetProfilesResponse>({
      queryKey: ['profiles', userId],
    })

    for (const [cacheKey, cacheData] of profilesCache) {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<GetProfilesResponse>(cacheKey, [
        ...cacheData,
        profile,
      ])
    }
  }

  const { mutateAsync: createProfileFn, isPending: isCreatingProfile } =
    useMutation({
      mutationFn: createProfile,
      async onSuccess(profile) {
        updateProfilesOnCache(profile)
      },
    })

  const handleCreateProfile = async (data: CreateProfileFormSchemaType) => {
    try {
      await createProfileFn({
        name: data.name,
        avatarUrl: '/avatar-1.png',
        userId,
      })

      onCreate()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form
      className="w-full max-w-md md:max-w-[50vw] lg:max-w-xl"
      onSubmit={handleSubmit(handleCreateProfile)}
    >
      <div className="flex w-full flex-col items-center gap-2.5">
        <div className="group flex w-full flex-col">
          <input
            type="text"
            placeholder="Type here"
            className="text-center text-2xl font-bold text-brand-secondary-500 focus:outline-none md:text-[6.2vw] lg:text-[4rem]"
            maxLength={10}
            required
            {...register('name')}
          />
          <div className="h-0.5 w-full rounded bg-brand-accent-500" />
        </div>
        <button
          type="submit"
          className="w-max rounded-lg bg-brand-accent-500 px-6 py-2 font-bold text-brand-primary-500 transition-all hover:bg-brand-accent-900"
          disabled={isCreatingProfile}
        >
          {isCreatingProfile ? (
            <Icon name="loader-circle" className="animate-spin" />
          ) : (
            'CREATE'
          )}
        </button>
      </div>
    </form>
  )
}

CreateProfileForm.displayName = 'CreateProfileForm'
