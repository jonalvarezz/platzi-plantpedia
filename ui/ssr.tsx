import { useEffect } from 'react'
export { ServerStyleSheets } from '@material-ui/core/styles'

// @see: https://material-ui.com/styles/advanced/#next-js
export function useServerStyles() {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles) {
      jssStyles.remove()
    }
  }, [])
}
