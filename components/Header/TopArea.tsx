import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Grid } from '@ui/Grid'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'

import { signIn, signOut, useSession } from 'next-auth/client'

export function TopArea() {
  return (
    <Grid container justify="space-between">
      <Grid item>
        <LoginLogout />
      </Grid>
      <Grid item>
        <LocaleOptions />
      </Grid>
    </Grid>
  )
}

function LoginLogout() {
  const [session, loading] = useSession()
  const { t } = useTranslation(['common'])

  if (loading) {
    return null
  }

  if (session == null) {
    return <Button onClick={() => signIn()}>{t('signIn')}</Button>
  }

  return (
    <>
      <span>{session.user?.name}</span>
      <Button onClick={() => signOut()}>{t('signOut')}</Button>
    </>
  )
}

function LocaleOptions() {
  const { locales, locale } = useRouter()
  const { t } = useTranslation(['common'])

  // Locales aren't configured
  if (locales == undefined || locale == undefined) {
    return null
  }

  return (
    <>
      <Typography variant="body2" component="span" className="pr-3">
        {t('language')}:
      </Typography>
      {locales.map((loc) => (
        <form
          action="/api/language"
          method="POST"
          key={loc}
          className="inline-block"
        >
          <input name="preferredLocale" value={loc} type="hidden"></input>
          <Button
            variant={loc === locale ? 'outlined' : 'text'}
            className="ml-1"
            type="submit"
          >
            {loc}
          </Button>
        </form>
      ))}
    </>
  )
}
