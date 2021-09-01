import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from '@components/Layout'
import { Typography } from '@ui/Typography'
import { VerticalTabs, TabItem } from '@ui/Tabs'
import { Alert } from '@ui/Alert'
import { PlantCollection } from '@components/PlantCollection'
import { AuthorCard } from '@components/AuthorCard'

import { getAuthorList } from '@api'
import { usePlantListByAuthor } from '@api/query/usePlantListByAuthor'

import ErrorPage from '../_error'

type TopStoriesPageProps = {
  authors: Author[]
}

export const getServerSideProps: GetServerSideProps<TopStoriesPageProps> =
  async ({ locale, params }) => {
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
          ...(await serverSideTranslations(locale!)),
        },
      }
    } catch (e) {
      return {
        notFound: true,
      }
    }
  }

export default function TopStories({
  authors,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation(['page-top-stories'])
  // Heads-up: `router.query` comes populated from the server as we are using `getServerSideProps`
  // which means, `router.query.author` will be ready since the very first render.
  const router = useRouter()
  const currentAuthor = router.query.author

  if (typeof currentAuthor !== 'string' || authors.length === 0) {
    return <ErrorPage message={t('noInfoAvailable')} />
  }

  const tabs: TabItem[] = authors.map((author) => ({
    content: <AuthorTopStories {...author} />,
    label: author.fullName,
    value: author.handle,
  }))

  return (
    <Layout>
      <main className="pt-10">
        <Typography variant="h2" className="text-center pb-16">
          {t('top10Stories')}
        </Typography>
        <VerticalTabs
          tabs={tabs}
          currentTab={currentAuthor}
          onTabChange={(_, newValue) => {
            router.push(`/top-stories/${newValue}`, undefined, {
              shallow: true,
            })
          }}
        />
      </main>
    </Layout>
  )
}

type AuthorTopStoriesProps = Author

function AuthorTopStories(author: AuthorTopStoriesProps) {
  const { t } = useTranslation(['page-top-stories'])
  const {
    data: plants,
    isError,
    isSuccess,
  } = usePlantListByAuthor(
    {
      authorId: author.id,
      limit: 12,
    },
    {
      staleTime: 1000 * 60 * 5, // 5min
    }
  )

  return (
    <div>
      <section className="pb-16">
        <AuthorCard {...author} />
      </section>
      {isError ? (
        <Alert severity="error">{t('somethingWentWrong')}</Alert>
      ) : null}
      {isSuccess && plants != null && plants.length === 0 ? (
        <Alert severity="info">
          {t('authorHasNoStories', { name: author.fullName })}
        </Alert>
      ) : null}
      {isSuccess && plants != null ? <PlantCollection plants={plants} /> : null}
    </div>
  )
}
