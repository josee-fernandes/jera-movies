import { NextPage } from 'next'
import Image from 'next/image'
import logo from 'public/logo.svg'

const Home: NextPage = () => {
  return (
    <div>
      <section className="bg-brand-primary h-screen">
        <nav className="mx-auto mt-[5.375rem] flex max-w-[1200px] flex-col items-center justify-between gap-4 md:flex-row">
          <Image src={logo} alt="Jera Movies logo" className="h-10" />
          <div className="flex gap-4">
            <button className="bg-brand-primary text-brand-secondary-500 border-brand-primary-900 hover:border-brand-primary-900 rounded-lg border-[1px] px-6 py-2 transition-all md:border-transparent">
              SIGN UP
            </button>
            <button className="bg-brand-accent-500 text-brand-primary-500 rounded-lg px-6 py-2">
              SIGN IN
            </button>
          </div>
        </nav>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-brand-accent-500 font-anton text-9xl md:text-[24vw] lg:text-[18rem]">
            JERA
          </h1>
        </div>
      </section>
      <section className="bg-brand-secondary-500 h-screen">
        {/* Movies */}
      </section>
      <section className="bg-brand-secondary-500 h-screen">
        {/* With */}
      </section>
      <section className="bg-brand-accent-500 h-screen">
        {/* Profiles */}
      </section>
      <section className="bg-brand-secondary-500 h-screen">
        {/* Footer */}
      </section>
    </div>
  )
}

Home.displayName = 'Home'

export default Home
