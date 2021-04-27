import Head from 'next/head'
import { NavBar } from '@ui/NavBar'
import { Button } from '@ui/Button'

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
      <NavBar title="🌿 Plantpedia">
        <div>
          <Button color="inherit" variant="text">
            Login
          </Button>
        </div>
      </NavBar>
      <div className="container mx-auto max-w-screen-xl">{children}</div>
      <footer></footer>
    </div>
  )
}
