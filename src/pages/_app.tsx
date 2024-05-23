import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { Anton, Playfair_Display as PlayfairDisplay } from 'next/font/google'
import localFont from 'next/font/local'

import { useIsomorphicLayoutEffect } from '@/hooks'

const anton = Anton({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-anton',
})
const swansea = localFont({
  src: '../assets/fonts/swansea.ttf',
  variable: '--font-swansea',
})
const playfairDisplay = PlayfairDisplay({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
})

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useIsomorphicLayoutEffect(() => {
    document.body.className = `h-full w-full overflow-x-hidden bg-brand-primary font-swansea ${anton.variable} ${swansea.variable} ${playfairDisplay.variable}`
  }, [])

  return <Component {...pageProps} />
}

App.displayName = 'App'

export default App
