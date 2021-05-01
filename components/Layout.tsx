import Head from 'next/head'
import { Header } from '@components/Header/Header'

type LayoutProps = { title?: string }

const siteTitle = "🌿 Platzi's Plantpedia"

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div>
      <Head>
        <title>{!title ? siteTitle : `${title} | ${siteTitle}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <noscript id="mui-insertion-point" />
      </Head>
      <Header />
      <div className="container mx-auto max-w-screen-xl">{children}</div>
      <footer></footer>
    </div>
  )
}
