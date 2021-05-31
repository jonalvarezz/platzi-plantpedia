import { AppProps } from 'next/app'
import { useServerStyles } from '@ui/ssr'
import { UIProvider } from '@ui/Provider'

import '../ui/globals.css'

const NextApp = ({ Component, pageProps }: AppProps) => {
  useServerStyles()

  return (
    <UIProvider>
      <Component {...pageProps} />
    </UIProvider>
  )
}

export default NextApp
