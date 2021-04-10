import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { grey, common, lightGreen } from '@material-ui/core/colors'

// Build your own theme with the Color Theme tool
// @see https://material.io/resources/color/
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey['900'],
      dark: common.black,
      light: grey['700'],
    },
    secondary: {
      main: lightGreen['300'],
      dark: '#e1ffb1',
      light: '#7da453',
    },
  },
  shape: {
    borderRadius: 2,
  },
})
