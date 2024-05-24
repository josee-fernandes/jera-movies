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

    onCreate(profile)
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
        >
          CREATE
        </button>
      </div>
    </form>
  )
}

CreateProfileForm.displayName = 'CreateProfileForm'
