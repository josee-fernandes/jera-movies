import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const signUpFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  passwordConfirmation: z.string(),
  name: z.string().max(10),
})

type signUpFormSchemaType = z.infer<typeof signUpFormSchema>

export const SignUpForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<signUpFormSchemaType>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      name: '',
    },
  })

  const handleSignUp = (data: signUpFormSchemaType) => {
    try {
      console.log(data)

      reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form
      className="flex w-full flex-col gap-9 text-lg lg:text-xl"
      onSubmit={handleSubmit(handleSignUp)}
    >
      <div className="flex flex-col gap-3">
        <div className="flex h-20 flex-col gap-2 lg:h-[6.25rem]">
          <label htmlFor="email" className="ml-2 text-brand-accent-500">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="h-full rounded-[0.625rem] border border-brand-accent-500 px-2 py-3 text-brand-secondary-500"
            required
            {...register('email')}
          />
        </div>
        <div className="flex h-20 flex-col gap-2 lg:h-[6.25rem]">
          <label htmlFor="password" className="ml-2 text-brand-accent-500">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Your brand new password"
            className="h-full rounded-[0.625rem] border border-brand-accent-500 px-2 py-3 text-brand-secondary-500"
            required
            {...register('password')}
          />
        </div>
        <div className="flex h-20 flex-col gap-2 lg:h-[6.25rem]">
          <label
            htmlFor="password-confirmation"
            className="ml-2 text-brand-accent-500"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="password-confirmation"
            placeholder="Confirm by entering the same password"
            className="h-full rounded-[0.625rem] border border-brand-accent-500 px-2 py-3 text-brand-secondary-500"
            required
            {...register('passwordConfirmation')}
          />
        </div>
        <div className="flex h-20 flex-col gap-2 lg:h-[6.25rem]">
          <label htmlFor="name" className="ml-2 text-brand-accent-500">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Just a display name"
            className="h-full rounded-[0.625rem] border border-brand-accent-500 px-2 py-3 text-brand-secondary-500"
            required
            {...register('name')}
          />
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-3">
        <button
          type="button"
          className="h-[3.375rem] w-full rounded-lg bg-social-facebook px-6 py-2 font-bold  text-brand-primary-500 md:h-[4.5rem]"
        >
          FACEBOOK
        </button>
        <button
          type="submit"
          className="h-[3.375rem] w-full rounded-lg bg-brand-secondary-500 px-6 py-2 font-bold  text-brand-primary-500 md:h-[4.5rem]"
        >
          FINISH
        </button>
        <Link
          href="/sign-in"
          className="text-center text-base uppercase text-brand-accent-500"
        >
          CLICK HERE TO SIGN IN
        </Link>
      </div>
    </form>
  )
}
