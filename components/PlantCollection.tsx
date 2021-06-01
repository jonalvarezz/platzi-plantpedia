import Link from 'next/link'
import { Grid, GridProps } from '@ui/Grid'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'

import { Excerpt } from '@components/Excerpt'

type PlantCollectionProps = {
  plants: Plant[]
  variant?: 'square' | 'vertical'
  className?: string
}

export function PlantCollection({
  plants,
  variant,
  className,
}: PlantCollectionProps) {
  return (
    <Grid container component="ul" spacing={4} className={className}>
      {plants.map((plant) => (
        <PlantEntry key={plant.id} plant={plant} variant={variant} />
      ))}
    </Grid>
  )
}

type PlantEntryType = {
  plant: Plant
  variant?: 'square' | 'vertical'
}

export function PlantEntry({ plant, variant = 'square' }: PlantEntryType) {
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
    <Grid key={plant.id} role="listitem" item {...gridItemProps}>
      <Component {...plant} />
    </Grid>
  )
}

export function PlantEntrySquare({ image, plantName, slug }: Plant) {
  return (
    <Link href={`/entry/${slug}`}>
      <a title={`Go to ${plantName}`}>
        <div className="opacity-95 hover:opacity-100">
          <img src={image.url} width={460} />
          <div className="p-4">
            <Typography variant="h4" className="break-words">
              {plantName}
            </Typography>
          </div>
        </div>
      </a>
    </Link>
  )
}

export function PlantEntryInline({
  image,
  plantName,
  slug,
  className,
}: Plant & { className?: string }) {
  return (
    <Link href={`/entry/${slug}`}>
      <a title={`Go to ${plantName}`}>
        <div
          className={`opacity-95 hover:opacity-100 flex items-end ${className}`}
        >
          <img src={image.url} width={84} className="flex-none" />
          <div className="pl-2 flex-auto">
            <Typography variant="h6" className="break-words">
              {plantName}
            </Typography>
          </div>
        </div>
      </a>
    </Link>
  )
}

export function PlantEntryVertical({
  image,
  plantName,
  description,
  slug,
}: Plant) {
  return (
    <div className="opacity-95 hover:opacity-100">
      <Link href={`/entry/${slug}`}>
        <a title={`Go to ${plantName}`}>
          <img src={image.url} width={624} />
          <Typography variant="h2" className="break-words pt-4 px-4">
            {plantName}
          </Typography>
        </a>
      </Link>
      <div className="px-4 pb-4">
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
