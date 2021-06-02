import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAuthorList, QueryStatus } from '@api'
import { Grid } from '@ui/Grid'
import { Typography } from '@ui/Typography'
import { Image } from '@components/Image'

type AuthorProps = {
  className?: string
}

export function Authors({ className }: AuthorProps) {
  const { data, status } = useAuthors()

  if (data == null || status !== 'success') {
    const dummyItems = Array.from({ length: 4 }, (_, i) => `item-${i}`)
    return (
      <Grid container spacing={4} className={className} justify="center">
        {dummyItems.map((item) => (
          <Grid
            xs={2}
            item
            key={item}
            className="bg-gray-200 animate pulse"
          ></Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Grid container spacing={4} className={className} justify="center">
      {data.map(({ id, photo, fullName, handle }) => (
        <Grid item key={id}>
          <Link href={`/top-stories/${handle}`}>
            <a title={`See latest stories from ${fullName}`}>
              <Image
                src={photo.url}
                width={150}
                aspectRatio="1:1"
                fit="fill"
                layout="intrinsic"
              />
              <Typography variant="h5" component="p">
                {fullName}
              </Typography>
            </a>
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}

function useAuthors() {
  const [status, setStatus] = useState<QueryStatus>('idle')
  const [data, setData] = useState<Author[] | null>(null)

  useEffect(
    () => {
      setStatus('loading')
      getAuthorList({ limit: 10 })
        .then((returnedData) => {
          setData(returnedData)
          setStatus('success')
        })
        .catch(() => setStatus('error'))
    },
    [
      // Run effect once
    ]
  )

  return {
    status,
    data,
  }
}
