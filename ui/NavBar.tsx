import { AppBar, IconButton, Toolbar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

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
      className="border-b-2 border-grey-200"
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className="mr-2"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className="flex-grow" component="h1">
          {title}
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  )
}
