import React, { useState, PropsWithChildren } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Grid } from '@ui/Grid'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'

import { signIn, signOut, useSession } from '@auth/client'

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
  const [isHovering, setIsHovering] = useState(false)
  const { t } = useTranslation(['common'])

  if (loading) {
    return null
  }

  if (session == null) {
    return <Button onClick={() => signIn()}>{t('signIn')}</Button>
  }

  return (
    <Avatar
      image={session.user!.image!}
      name={session.user!.name!}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering ? (
        <Button onClick={() => signOut()}>{t('signOut')}</Button>
      ) : (
        <span className="inline-block p-2">{session.user?.name}</span>
      )}
    </Avatar>
  )
}

function Avatar({
  image,
  name,
  children,
  ...containerProps
}: PropsWithChildren<{ image: string; name: string }> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >) {
  return (
    <div {...containerProps} className="flex items-center">
      <img
        alt={name}
        src={image}
        width={32}
        style={{ height: '32px' }}
        className="mr-1 rounded-full"
      />
      {children}
    </div>
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
