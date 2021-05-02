import { NextPage } from 'next'
import { Layout } from '@components/Layout'
import NotFound from './404'
import ServerError from './500'

type ErrorPageProps = {
  statusCode?: number
}

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => {
  if (statusCode === 404) {
    return <NotFound />
  }

  if (typeof statusCode === 'number' && statusCode > 500) {
    return <ServerError statusCode={statusCode} />
  }

  return (
    <Layout>
      <main className="pt-16 text-center">
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </main>
    </Layout>
  )
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage
