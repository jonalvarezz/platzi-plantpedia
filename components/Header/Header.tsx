import { PropsWithChildren } from 'react'
import Link, { LinkProps } from 'next/link'
import { NavBar } from '@ui/NavBar'
import { Button } from '@ui/Button'

import { PreviewModeBanner } from './PreviewModeBanner'
import { TopArea } from './TopArea'

export function Header() {
  return (
    <>
      <PreviewModeBanner />
      <div className="mx-auto" style={{ maxWidth: '98%' }}>
        <div className="px-8 py-3">
          <TopArea />
        </div>
        <NavBar title="🌿 Plantpedia">
          <div>
            <NavLink href="/top-stories">Top Stories</NavLink>
            <NavLink href="/search">Search</NavLink>
          </div>
        </NavBar>
      </div>
    </>
  )
}

function NavLink({ children, ...linkProps }: PropsWithChildren<LinkProps>) {
  return (
    <Link {...linkProps} passHref>
      <Button color="inherit" variant="text" component="a">
        {children}
      </Button>
    </Link>
  )
}
