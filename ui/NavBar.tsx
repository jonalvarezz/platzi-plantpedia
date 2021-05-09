import { useState, useEffect } from 'react'
import Head from 'next/head'
import { AppBar, Toolbar } from '@material-ui/core'

import { Typography } from './Typography'

type Props = {
  title: string
  children: React.ReactNode
}

export function NavBar({ title, children }: Props) {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      className="border-b-2 border-t-2 border-grey-200"
    >
      <Toolbar>
        <PlantpediaNoLoVeniasVenirLogo title={title} />
        {children}
      </Toolbar>
    </AppBar>
  )
}

const faviconsBeios = [
  '🌿',
  '🍃',
  '🍀',
  '🌷',
  '🌸',
  '🌚',
  '🌲',
  '🌵',
  '🌾',
  '🌱',
  '🌝',
  '🌴',
]
const faviconOptionsLength = faviconsBeios.length

function PlantpediaNoLoVeniasVenirLogo({ title }: { title: string }) {
  const [faviconIndex, setFaviconIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const toggleCraziness = () => setIsHovering(!isHovering)

  useEffect(() => {
    if (!isHovering) return

    const intervalId = setInterval(() => {
      setFaviconIndex((previousValue) => {
        const nextValue = previousValue + 1
        if (nextValue >= faviconOptionsLength) return 0
        return nextValue
      })
    }, 150)

    return () => {
      clearTimeout(intervalId)
    }
  }, [isHovering])

  const favicon = faviconsBeios[faviconIndex]

  return (
    <>
      <Head>
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${favicon}</text></svg>`}
        ></link>
      </Head>
      <Typography variant="h4" className="flex-grow" component="h1">
        <a
          href="/"
          onMouseEnter={toggleCraziness}
          onMouseLeave={toggleCraziness}
        >
          {title}
        </a>
      </Typography>
    </>
  )
}
