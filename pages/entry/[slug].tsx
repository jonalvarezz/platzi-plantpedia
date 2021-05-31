import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'

import { getPlant, getPlantList } from '@api'

import { Layout } from '@components/Layout'
import { Typography } from '@ui/Typography'
import { Grid } from '@ui/Grid'

import { RichText } from '@components/RichText'
import { AuthorCard } from '@components/AuthorCard'

type PlantEntryPageProps = {
  plant: Plant
}

export const getStaticProps: GetStaticProps<PlantEntryPageProps> = async ({
  params,
}) => {
  const slug = params?.slug

  if (typeof slug !== 'string') {
    return {
      notFound: true,
    }
  }

  try {
    const plant = await getPlant(slug)

    return {
      props: {
        plant,
      },
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
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Match home query.
  // @TODO how do we generate all of our pages if we don't know the number? 🤔
  const plantEntriesToGenerate = await getPlantList({ limit: 10 })

  const paths: PathType[] = plantEntriesToGenerate.map(({ slug }) => ({
    params: {
      slug,
    },
  }))

  return {
    paths,

    // Return 404 for plant entries that were not included.
    fallback: false,
  }
}

export default function PlantEntryPage({
  plant,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={9} component="article">
          <figure>
            <img width={952} src={plant.image.url} alt={plant.image.title} />
          </figure>
          <div className="px-12 pt-8">
            <Typography variant="h2">{plant.plantName}</Typography>
          </div>
          <div className="p-10">
            <RichText richText={plant.description} />
          </div>
        </Grid>
        <Grid item xs={12} md={4} lg={3} component="aside">
          <section>
            <Typography variant="h5" component="h3" className="mb-4">
              Recent posts
            </Typography>
          </section>
          <section className="mt-10">
            <Typography variant="h5" component="h3" className="mb-4">
              Categories
            </Typography>
          </section>
        </Grid>
      </Grid>
      <section className="my-4 border-t-2 border-b-2 border-gray-200 pt-12 pb-7">
        <AuthorCard {...plant.author} />
      </section>
    </Layout>
  )
}
