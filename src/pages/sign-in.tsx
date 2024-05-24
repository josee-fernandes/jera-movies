import { NextPage } from 'next'

import { Icon } from '@/components/Icon'
import { SignInForm } from '@/components/SignInForm'

const SignUp: NextPage = () => {
  return (
    <div className="min-h-screen bg-brand-primary-500 py-16 md:py-[5.375rem]">
      <div className="relative mx-auto w-[95%] max-w-[1200px]">
        <button className="block md:absolute">
          <Icon
            name="move-left"
            className="h-12 w-12 text-brand-secondary-500 transition-all hover:text-brand-accent-500"
          />
        </button>
        <div className="relative flex flex-col items-center justify-between gap-20 md:flex-row">
          <span className="font-anton text-9xl text-brand-accent-500 md:text-[24vw] lg:text-[18rem]">
            JERA
          </span>
          <div className="flex w-full max-w-[478px] flex-col items-center gap-12">
            <h1 className="text-center font-playfair-display text-6xl font-bold italic !leading-[0.8] md:text-[9vw] lg:text-8xl">
              sign in
            </h1>
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
