import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Layout } from '@components/Layout'
import { getPlantList } from '@api'
import { PlantCollection } from '@components/PlantCollection'

type HomeProps = {
  plants: Plant[]
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const plants = await getPlantList({ limit: 9, locale })

  return {
    props: { plants },
    revalidate: 5 * 60, // once every five minutes
  }
}

export default function Home({
  plants,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <main className="pt-16">
        <PlantCollection
          plants={plants.slice(0, 2)}
          variant="vertical"
          className="mb-24"
        />
        <PlantCollection
          plants={plants.length > 8 ? plants.slice(2, 8) : plants}
          variant="square"
        />
      </main>
    </Layout>
  )
}
