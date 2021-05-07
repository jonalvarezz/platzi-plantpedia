import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { grey, common, lightGreen } from '@material-ui/core/colors'

const muiTheme = createMuiTheme()

// It matches tailwind.config.js
const fontSerif = `'Cormorant Garamond', ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;`

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
    fontFamily: 'inherit', // defaults to tailwindCSS sans font family
    h1: {
      fontFamily: fontSerif,
      fontSize: '3.75rem',
    },
    h2: {
      fontFamily: fontSerif,
      fontSize: '3rem',
    },
    h3: {
      fontFamily: fontSerif,
      fontSize: '2.25rem',
      lineHeight: '2.5rem',
    },
    h4: {
      fontFamily: fontSerif,
      fontSize: '1.875rem',
      lineHeight: '2.25rem',
    },
    h5: {
      fontFamily: fontSerif,
      fontSize: '1.5rem;',
      lineHeight: '2rem',
    },
    h6: {
      fontFamily: fontSerif,
    },
  },
  overrides: {
    MuiToolbar: {
      regular: {
        minHeight: muiTheme.spacing(10),
        [muiTheme.breakpoints.up('sm')]: {
          minHeight: muiTheme.spacing(12),
        },
      },
    },
  },
})
