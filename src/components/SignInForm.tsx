import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type signInFormSchemaType = z.infer<typeof signInFormSchema>

export const SignInForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<signInFormSchemaType>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSignIn = (data: signInFormSchemaType) => {
    try {
      console.log(data)

      reset()
    } catch (error) {
      console.error(error)
    }
  }

  const handleFacebookAuth = async () => {
    try {
      await signIn('facebook')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form
      className="flex w-full flex-col gap-9 text-lg lg:text-xl"
      onSubmit={handleSubmit(handleSignIn)}
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
            placeholder="Enter your password"
            className="h-full rounded-[0.625rem] border border-brand-accent-500 px-2 py-3 text-brand-secondary-500"
            required
            {...register('password')}
          />
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-3">
        <button
          type="submit"
          className="h-[3.375rem] w-full rounded-lg bg-brand-secondary-500 px-6 py-2 font-bold  text-brand-primary-500 md:h-[4.5rem]"
        >
          ENTER
        </button>
        <button
          type="button"
          className="h-[3.375rem] w-full rounded-lg bg-social-facebook px-6 py-2 font-bold  text-brand-primary-500 md:h-[4.5rem]"
          onClick={handleFacebookAuth}
        >
          FACEBOOK
        </button>
        <Link
          href="/sign-up"
          className="text-center text-base uppercase text-brand-accent-500"
        >
          CLICK HERE TO SIGN UP
        </Link>
      </div>
    </form>
  )
}
