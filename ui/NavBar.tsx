import { AppBar, Toolbar } from '@material-ui/core'

import { Typography } from './Typography'

type Props = {
  title: string
  children: React.ReactNode
}

export function NavBar({ title, children }: Props) {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      className="border-b-2 border-t-2 border-grey-200"
    >
      <Toolbar>
        <Typography variant="h6" className="flex-grow" component="h1">
          <a href="/">{title}</a>
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  )
}
