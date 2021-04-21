import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getPlant, QueryStatus } from '@api'

import { Layout } from '@ui/Layout'
import { Typography } from '@ui/Typography'
import { Grid } from '@ui/Grid'

import { RichText } from '@components/RichText'

export default function PlantEntryPage() {
  const router = useRouter()
  const slug = router.query.slug

  const [status, setStatus] = useState<QueryStatus>('idle')
  const [plant, setPlant] = useState<Plant | null>(null)
  useEffect(() => {
    if (typeof slug === 'string') {
      setStatus('loading')
      getPlant(slug)
        .then(setPlant)
        .then(() => {
          setStatus('success')
        })
        .catch(() => {
          setStatus('error')
        })
    }
  }, [slug])

  if (status === 'error') {
    return (
      <Layout>
        <main className="pt-16 text-center">404, my friendo</main>
      </Layout>
    )
  }

  if (status === 'loading' || plant == null) {
    return (
      <Layout>
        <main className="pt-16">Loading...</main>
      </Layout>
    )
  }

  return (
    <Layout>
      <main className="pt-16">
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} lg={9} component="article">
            <figure>
              <img src={plant.image.url} alt={plant.image.title} />
            </figure>
            <div className="px-12 pt-8">
              <Typography variant="h2">{plant.plantName}</Typography>
            </div>
            <div className="p-10">
              <RichText richText={plant.description} />
            </div>
          </Grid>
          <Grid item xs={12} md={4} lg={3} component="section">
            <Typography variant="h5" component="h3">
              Recent Posts
            </Typography>
          </Grid>
        </Grid>
      </main>
    </Layout>
  )
}
