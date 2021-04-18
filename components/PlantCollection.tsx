import Link from 'next/link'
import { Grid, GridProps } from '@material-ui/core'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'
import { Excerpt } from '@components/Excerpt'

type PlantCollectionProps = {
  plants: Plant[]
  variant?: 'square' | 'vertical'
}

export function PlantCollection({
  plants,
  variant = 'square',
}: PlantCollectionProps) {
  let gridItemProps: GridProps = { xs: 6, md: 4 }
  let Component: (props: Plant) => JSX.Element = PlantEntrySquare

  if (variant === 'vertical') {
    Component = PlantEntryVertical
    gridItemProps = {
      xs: 12,
      sm: 6,
    }
  }

  return (
    <Grid container component="ul" spacing={4}>
      {plants.map((plant) => (
        <Grid key={plant.id} item {...gridItemProps}>
          <Component {...plant} />
        </Grid>
      ))}
    </Grid>
  )
}

export default function PlantEntrySquare({ image, plantName, slug }: Plant) {
  return (
    <div>
      <img src={`${image.url}`} />
      <div className="p-4">
        <Typography variant="h2" className="break-words">
          {plantName}
        </Typography>
        <Link href={`/entry/${slug}`} passHref>
          <Button>Read more</Button>
        </Link>
      </div>
    </div>
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
