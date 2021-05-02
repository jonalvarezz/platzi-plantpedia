import { NextPage } from 'next'
import { Layout } from '@components/Layout'
import NotFound from './404'
import ServerError from './500'

type ErrorPageProps = {
  statusCode?: number
  message?: string
}

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode, message }) => {
  if (statusCode === 404) {
    return <NotFound />
  }

  if (typeof statusCode === 'number' && statusCode > 500) {
    return <ServerError statusCode={statusCode} />
  }

  let errorMessage = message
  if (!message) {
    errorMessage = statusCode
      ? `An error ${statusCode} occurred on server`
      : 'An error occurred on client'
  }

  return (
    <Layout>
      <main className="pt-16 text-center">{errorMessage}</main>
    </Layout>
  )
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage
