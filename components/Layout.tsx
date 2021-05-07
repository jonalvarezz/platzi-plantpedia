import Head from 'next/head'
import { Header } from '@components/Header/Header'
import { Footer } from '@components/Footer'

type LayoutProps = { title?: string }

const siteTitle = "🌿 Platzi's Plantpedia"

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{!title ? siteTitle : `${title} | ${siteTitle}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <noscript id="mui-insertion-point" />
        {/* Google fonts get automatically automized by Next.js: https://nextjs.org/blog/next-10-2#automatic-webfont-optimization */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <div className="container mx-auto max-w-screen-xl w-95">{children}</div>
      <Footer />
    </>
  )
}
