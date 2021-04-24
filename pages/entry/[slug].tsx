import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'
import { getPlant, getPlantList } from '@api'

import { Layout } from '@ui/Layout'
import { Typography } from '@ui/Typography'
import { Grid } from '@ui/Grid'

import { RichText } from '@components/RichText'
import { Image } from '@components/Image'

type PlantEntryPageProps = {
  plant: Plant | null
  status: 'error' | 'success'
}

export const getStaticProps: GetStaticProps<PlantEntryPageProps> = async ({
  params,
}) => {
  const slug = params?.slug

  if (typeof slug !== 'string') {
    return {
      props: {
        plant: null,
        status: 'error',
      },
    }
  }

  try {
    const plant = await getPlant(slug)
    return {
      props: {
        plant,
        status: 'success',
      },
    }
  } catch (e) {
    return {
      props: {
        plant: null,
        status: 'error',
      },
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Match home query.
  // @TODO how do we generate all of our pages if we don't know the number? 🤔
  const plantEntriesToGenerate = await getPlantList({ limit: 8 })

  return {
    paths: plantEntriesToGenerate.map(({ slug }) => `/entry/${slug}`),

    // Return 404 for plant entries that were not included.
    fallback: false,
  }
}

export default function PlantEntryPage({
  plant,
  status,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (status === 'error' || plant == null) {
    return (
      <Layout>
        <main className="pt-16 text-center">404, my friendo</main>
      </Layout>
    )
  }

  return (
    <Layout>
      <main className="pt-16">
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} lg={9} component="article">
            <figure>
              <Image
                width={952}
                aspectRatio="4:3"
                layout="intrinsic"
                src={plant.image.url}
                alt={plant.image.title}
              />
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
