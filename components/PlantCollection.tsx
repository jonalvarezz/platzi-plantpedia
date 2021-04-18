import Link from 'next/link'
import { Grid } from '@material-ui/core'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'
import { Excerpt } from '@components/Excerpt'

type PlantCollectionProps = {
  plants: Plant[]
}

export function PlantCollection({ plants }: PlantCollectionProps) {
  return (
    <Grid container component="ul" spacing={4}>
      {plants.map((plant) => (
        <Grid key={plant.id} item xs={12} sm={6}>
          <PlantEntryVertical {...plant} />
        </Grid>
      ))}
    </Grid>
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
