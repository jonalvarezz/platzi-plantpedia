import { AppProps } from 'next/app'

const NextApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default NextApp
