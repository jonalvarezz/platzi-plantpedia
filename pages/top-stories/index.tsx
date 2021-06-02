import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getAuthorList } from '@api'
import Error from '../_error'

/**
 * Redirects to /top-stories/<first-author-in-the-list>
 */

export const getServerSideProps: GetServerSideProps<{
  error: number
}> = async () => {
  try {
    const authors = await getAuthorList({ limit: 10 })

    if (authors.length > 0) {
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
        error: 412,
      },
    }
  } catch (e) {
    return {
      props: {
        error: 400,
      },
    }
  }
}

export default function TopStoriesIndex({
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <Error statusCode={error} />
}
