import { ThemeProvider, StylesProvider } from '@material-ui/core/styles'
import { theme } from './theme'

export const UIProvider: React.FC = ({ children }) => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StylesProvider>
  )
}
