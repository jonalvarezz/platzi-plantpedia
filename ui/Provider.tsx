import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './theme'

export const UIProvider: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
