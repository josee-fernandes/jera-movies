import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { NextSeo } from 'next-seo'
import { useCallback } from 'react'

import { Icon } from '@/components/Icon'
import { SignUpForm } from '@/components/SignUpForm'

const SignUp: NextPage = () => {
  const router = useRouter()

  const handleBack = useCallback(() => {
    router.push('/')
  }, [router])

  return (
    <>
      <NextSeo title="Sign Up | Jera Movies" />
      <div className="min-h-screen bg-brand-primary-500 py-16 md:py-[5.375rem]">
        <div className="relative mx-auto w-[95%] max-w-[1200px]">
          <button className="z-[1] block md:absolute" onClick={handleBack}>
            <Icon
              name="move-left"
              className="size-12 text-brand-secondary-500 transition-all hover:text-brand-accent-500"
            />
          </button>
          <div className="md:-translate-y-50 flex w-full flex-col items-center justify-between gap-20 md:absolute md:top-1/2 md:mt-[-5.375rem] md:h-screen md:flex-row">
            <span className="font-anton text-9xl text-brand-accent-500 md:text-[24vw] lg:text-[18rem]">
              JERA
            </span>
            <div className="flex w-full max-w-[478px] flex-col items-center gap-12">
              <h1 className="text-center font-playfair-display text-6xl font-bold italic !leading-[0.8] md:text-[9vw] lg:text-8xl">
                sign up
              </h1>
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
