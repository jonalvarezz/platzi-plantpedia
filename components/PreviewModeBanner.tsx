import { useEffect, useState } from 'react'

import { Button } from '@ui/Button'
import { Alert } from '@ui/Alert'

type PreviewStatusResponse = {
  preview: boolean
  context: Json
} | null

export function PreviewModeBanner() {
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    try {
      fetch('/api/preview/status')
        .then((response) => response.json())
        .then((data: PreviewStatusResponse) => {
          setIsEnabled(data?.preview || false)
        })
    } catch (e) {
      // ignore
    }
  }, [])

  if (!isEnabled) {
    return null
  }

  return (
    <div className="fixed right-0 bottom-16 w-md transform translate-x-2/3 hover:translate-x-0 z-10 transition-transform duration-300">
      <Alert
        variant="filled"
        severity="warning"
        action={
          <Button variant="text" color="inherit" href="/api/preview/exit">
            Disable preview mode
          </Button>
        }
      >
        <div className="max-w-md">Preview mode is enabled</div>
      </Alert>
    </div>
  )
}
