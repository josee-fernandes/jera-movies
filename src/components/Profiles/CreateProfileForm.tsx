import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface CreateProfileFormProps {
  onCreate: (params: ProfileType) => void
}

const createProfileFormSchema = z.object({
  name: z.string().max(10),
})

type CreateProfileFormSchemaType = z.infer<typeof createProfileFormSchema>

export const CreateProfileForm: React.FC<CreateProfileFormProps> = ({
  onCreate,
}) => {
  const { register, handleSubmit } = useForm<CreateProfileFormSchemaType>({})

  const handleCreateProfile = (data: CreateProfileFormSchemaType) => {
    const profile: ProfileType = {
      id: '3',
      avatar: '/avatar-3.png',
      name: data.name,
      userId: '1',
    }

    console.log({ profile })

    onCreate(profile)
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(handleCreateProfile)}>
      <div className="flex w-full flex-col items-center gap-2.5">
        <div className="flex w-full flex-col">
          <input
            type="text"
            placeholder="Enter new profile name"
            className="text-center text-[4rem] font-bold text-brand-secondary-500"
            required
            {...register('name')}
          />
          <div className="h-0.5 w-full rounded bg-brand-accent-500" />
        </div>
        <button
          type="submit"
          className="w-max rounded-lg bg-brand-accent-500 px-6 py-2 font-bold text-brand-primary-500 transition-all hover:bg-brand-accent-900"
        >
          CREATE
        </button>
      </div>
    </form>
  )
}

CreateProfileForm.displayName = 'CreateProfileForm'
