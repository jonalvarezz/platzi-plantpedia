import { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { useServerStyles } from '@ui/ssr'
import { UIProvider } from '@ui/Provider'
import { QueryProvider } from '@api/QueryProvider'
import { SessionProvider } from '@auth/client'

import '../ui/globals.css'

const NextApp = ({ Component, pageProps }: AppProps) => {
  useServerStyles()

  return (
    <SessionProvider session={pageProps.session}>
      <QueryProvider>
        <UIProvider>
          <Component {...pageProps} />
        </UIProvider>
      </QueryProvider>
    </SessionProvider>
  )
}

export default appWithTranslation(NextApp)
