import { flatMap } from 'lodash'
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import { getCategoryList, getPlantListByCategory } from '@api'

import { Alert } from '@ui/Alert'
import { Typography } from '@ui/Typography'
import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/PlantCollection'

type CategoryPageProps = {
  entries: Plant[]
  category: Category
}

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({
  params,
  locale,
}) => {
  const slug = params?.categorySlug

  if (typeof slug !== 'string') {
    return {
      notFound: true,
    }
  }

  try {
    const { entries, category } = await getPlantListByCategory({
      category: slug,
      limit: 12,
      locale: locale,
    })
    const i18nConf = await serverSideTranslations(locale!)

    return {
      props: {
        entries,
        category,
        status: 'success',
        ...i18nConf,
      },
      revalidate: 15 * 60, // once every fifteen minutes
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

type PathType = {
  params: {
    categorySlug: string
  }
  locale: string
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  if (locales == null) {
    throw new Error(
      'Locales are not defined. Did you forget to configure them?'
    )
  }

  const categoriesToGenerate = await getCategoryList({ limit: 10 })

  const paths: PathType[] = flatMap(
    categoriesToGenerate.map(({ slug: categorySlug }) => ({
      params: {
        categorySlug,
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

export default function CategoryPage({
  entries,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation(['page-category'])

  return (
    <Layout>
      <Typography variant="h2" className="text-center mb-12">
        {t('category', { name: category.title })}
      </Typography>
      <PlantCollection plants={entries} />
      {entries.length > 0 ? null : (
        <Alert severity="info">
          {t('categoryHasNoEntries', { name: category.title })}
        </Alert>
      )}
    </Layout>
  )
}
