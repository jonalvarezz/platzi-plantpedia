import { flatMap } from 'lodash'
import ErrorPage from '../_error'
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'
import { getPlant, getPlantList } from '@api'

import { Layout } from '@components/Layout'
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
  preview,
  locale,
}) => {
  const slug = params?.slug

  if (typeof slug !== 'string') {
    return {
      notFound: true,
    }
  }

  try {
    const plant = await getPlant(slug, preview, locale)
    return {
      props: {
        plant,
        status: 'success',
      },
      revalidate: 5 * 60, // once every five minutes
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

type PathType = {
  params: {
    slug: string
  }
  locale: string
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  if (locales == null) {
    throw new Error(
      'Locales are not defined. Did you forget to configure them in next.config.js?'
    )
  }

  // Match home query.
  // @TODO how do we generate all of our pages if we don't know the number? 🤔
  const plantEntriesToGenerate = await getPlantList({ limit: 8 })

  const paths: PathType[] = flatMap(
    plantEntriesToGenerate.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    (path) => locales.map((loc) => ({ ...path, locale: loc }))
  )

  return {
    paths,

    // Block until the server gets its data. Like in Server side rendering
    fallback: 'blocking',
  }
}

export default function PlantEntryPage({
  plant,
  status,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (status === 'error' || plant == null) {
    return <ErrorPage statusCode={200} />
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
