import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Grid } from '@material-ui/core'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'
import { Layout } from '@ui/Layout'
import { getAllPlants } from '@api'
import { Excerpt } from '@components/Excerpt'

export default function Home() {
  const [plants, setPlants] = useState<Plant[]>([])
  console.log(plants)

  useEffect(() => {
    getAllPlants().then(setPlants)
  }, [])

  return (
    <Layout>
      <main className="pt-16">
        <Grid container component="ul" spacing={4}>
          {plants.slice(0, 2).map((plant) => (
            <Grid key={plant.id} item xs={12} sm={6}>
              <PlantEntryVertical {...plant} />
            </Grid>
          ))}
        </Grid>
      </main>
    </Layout>
  )
}

export function PlantEntryVertical({
  image,
  plantName,
  description,
  slug,
}: Plant) {
  return (
    <div>
      <img src={`${image.url}?w=465&h=568&fit=crop`} />
      <div className="p-4">
        <Typography variant="h2" className="break-words">
          {plantName}
        </Typography>
        <Excerpt
          richText={description}
          color="textSecondary"
          className="py-6"
        />
        <Link href={`/entry/${slug}`} passHref>
          <Button>Read more</Button>
        </Link>
      </div>
    </div>
  )
}
