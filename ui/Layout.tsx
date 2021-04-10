import Link from 'next/link'
import Head from 'next/head'

type LayoutProps = { title?: string }

const siteTitle = "🌿 Platzi's Plantpedia"

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div>
      <Head>
        <title>{!title ? siteTitle : `${title} | ${siteTitle}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
        </nav>
      </header>

      {children}

      <footer></footer>
    </div>
  )
}
