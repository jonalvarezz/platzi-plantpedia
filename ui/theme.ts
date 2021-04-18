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
  typography: {
    fontFamily: 'inherit',
    h1: {
      fontSize: '3.75rem',
    },
    h2: {
      fontSize: '3rem',
    },
    h3: {
      fontSize: '2.25rem',
      lineHeight: '2.5rem',
    },
    h4: {
      fontSize: '1.875rem',
      lineHeight: '2.25rem',
    },
    h5: {
      fontSize: '1.5rem;',
      lineHeight: '2rem',
    },
  },
})
