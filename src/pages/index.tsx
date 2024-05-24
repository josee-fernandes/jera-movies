import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import logo from 'public/logo.svg'
import { useCallback } from 'react'

const Home: NextPage = () => {
  const router = useRouter()

  const handleSignIn = useCallback(() => {
    router.push('/sign-in')
  }, [router])

  const handleSignUp = useCallback(() => {
    router.push('/sign-up')
  }, [router])

  return (
    <div>
      <section className="bg-brand-primary h-screen">
        <nav className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 pt-[5.375rem] md:flex-row">
          <Image src={logo} alt="Jera Movies logo" className="h-10" />
          <div className="flex gap-4">
            <button
              className="bg-brand-primary rounded-lg border border-brand-primary-900 px-6 py-2 text-brand-secondary-500 transition-all hover:border-brand-primary-900 md:border-transparent"
              onClick={handleSignIn}
            >
              SIGN UP
            </button>
            <button
              className="rounded-lg bg-brand-accent-500 px-6 py-2 text-brand-primary-500"
              onClick={handleSignUp}
            >
              SIGN IN
            </button>
          </div>
        </nav>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="font-anton text-9xl text-brand-accent-500 md:text-[24vw] lg:text-[18rem]">
            JERA
          </h1>
        </div>
      </section>
      <section className="h-screen bg-brand-secondary-500">
        {/* Movies */}
      </section>
      <section className="h-screen bg-brand-secondary-500">
        {/* With */}
      </section>
      <section className="h-screen bg-brand-accent-500">
        {/* Profiles */}
      </section>
      <section className="h-screen bg-brand-secondary-500">
        {/* Footer */}
      </section>
    </div>
  )
}

Home.displayName = 'Home'

export default Home
