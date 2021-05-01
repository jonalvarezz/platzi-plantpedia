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
            <Button color="inherit" variant="text">
              Login
            </Button>
          </div>
        </NavBar>
      </div>
    </>
  )
}
