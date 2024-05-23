import { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div>
      <p className="font-anton text-brand-accent text-8xl">Anton</p>
      <p className="font-swansea text-brand-accent text-6xl">Swansea</p>
      <p className="font-playfair-display text-brand-accent text-6xl">
        Playfair Display
      </p>
    </div>
  )
}

Home.displayName = 'Home'

export default Home
