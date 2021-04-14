import { AppProps } from 'next/app'
import { UIProvider } from '@ui/Provider'
import '../ui/globals.css'

const NextApp = ({ Component, pageProps }: AppProps) => {
  return (
    <UIProvider>
      <Component {...pageProps} />
    </UIProvider>
  )
}

export default NextApp
