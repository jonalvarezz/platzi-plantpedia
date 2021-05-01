import { useRouter } from 'next/router'

import { Grid } from '@ui/Grid'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'

export function TopArea() {
  const { locales, locale } = useRouter()

  // Locales aren't configured
  if (locales == undefined || locale == undefined) {
    return null
  }

  return (
    <Grid container justify="space-between">
      <Grid item></Grid>
      <Grid item>
        <Typography variant="body2" component="span" className="pr-3">
          Language:
        </Typography>
        {locales.map((loc) => (
          <Button
            variant={loc === locale ? 'outlined' : 'text'}
            className="ml-1"
          >
            {loc}
          </Button>
        ))}
      </Grid>
    </Grid>
  )
}
