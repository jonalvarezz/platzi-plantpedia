import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'

import { Layout } from '@components/Layout'
import { Typography } from '@ui/Typography'
import { VerticalTabs, TabItem } from '@ui/Tabs'
import { Alert } from '@ui/Alert'
import { PlantCollection } from '@components/PlantCollection'
import { AuthorCard } from '@components/AuthorCard'

import { getAuthorList, usePlantListByAuthor } from '@api'

type TopStoriesPageProps = {
  authors: Author[]
  status: 'error' | 'sucess'
}

export const getServerSideProps: GetServerSideProps<TopStoriesPageProps> = async ({
  params,
}) => {
  const authorHandle = String(params?.author)

  try {
    const authors = await getAuthorList({ limit: 10 })
    const doesAuthorExist = authors.some(
      (author) => author.handle === authorHandle
    )

    // Validates that the author exists and redirects to the first one in the list otherwise.
    if (authors.length > 0 && !doesAuthorExist) {
      const firstAuthor = authors[0].handle

      return {
        redirect: {
          destination: `/top-stories/${firstAuthor}`,
          permanent: false,
        },
      }
    }

    return {
      props: {
        authors,
        status: 'sucess',
      },
    }
  } catch (e) {
    return {
      props: {
        authors: [],
        status: 'error',
      },
    }
  }
}

export default function TopStories({
  authors,
  status,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  // Heads-up: `router.query` comes populated from the server as we are using `getServerSideProps`
  // which means, `router.query.author` will be ready since the very first render.
  const currentAuthor = router.query.author

  if (authors.length === 0 || status === 'error') {
    return (
      <Layout>
        <main className="pt-10 px-6">
          <div className="pb-16">
            <Typography variant="h2">Huh, algo no está bien 🙇‍♀️</Typography>
          </div>
          <article>
            <Alert severity="error">
              {status === 'error'
                ? 'Hubo un error consultando la información. Inspeccionar el request en la pestaña Network de DevTools podría dar más información'
                : 'No se encontró la información. ¿Olvidaste configurar el contenido en Contentful?'}
            </Alert>
          </article>
        </main>
      </Layout>
    )
  }

  const tabs: TabItem[] = authors.map((author) => ({
    content: <AuthorTopStories {...author} />,
    label: author.fullName,
    value: author.handle,
  }))

  return (
    <Layout>
      <main className="pt-10">
        <div className="text-center pb-16">
          <Typography variant="h2">Top 10 Stories</Typography>
        </div>
        {typeof currentAuthor !== 'string' ? null : (
          <VerticalTabs
            tabs={tabs}
            currentTab={currentAuthor}
            onTabChange={(_, author) => {
              router.push(`/top-stories/${author}`, undefined, {
                shallow: true,
              })
            }}
          />
        )}
      </main>
    </Layout>
  )
}

type AuthorTopStoriesProps = Author

function AuthorTopStories(author: AuthorTopStoriesProps) {
  const { data: plants, isError, isSuccess } = usePlantListByAuthor({
    authorId: author.id,
    limit: 12,
  })

  return (
    <div>
      <section className="pb-16">
        <AuthorCard {...author} />
      </section>
      {isError ? (
        <Alert severity="error">Huh. Something went wrong.</Alert>
      ) : null}
      {isSuccess && plants.length === 0 ? (
        <Alert severity="info">
          {author.fullName} doesn't have any story yet.
        </Alert>
      ) : null}
      <PlantCollection plants={plants} />
    </div>
  )
}
