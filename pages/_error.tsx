import { NextPage, GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import { Layout } from '@components/Layout'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'
import NotFound from './404'
import ServerError from './500'

type ErrorPageProps = {
  statusCode?: number
  message?: string
}

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  res,
}) => {
  const i18nConf = await serverSideTranslations(locale!)
  const statusCode = res ? res.statusCode : 404

  return {
    props: {
      statusCode,
      ...i18nConf,
    },
  }
}

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode, message }) => {
  const { t } = useTranslation(['page-errors'])

  if (statusCode === 404) {
    return <NotFound />
  }

  if (typeof statusCode === 'number' && statusCode > 500) {
    return <ServerError statusCode={statusCode} />
  }

  let errorMessage = message
  if (!message) {
    errorMessage = statusCode ? t('serverError') : t('clientError')
  }

  return (
    <Layout>
      <div className="text-center">
        <Typography variant="h2" className="mb-6">
          🦦 Doh!
        </Typography>
        <Typography variant="body1" className="mb-6">
          {errorMessage}
        </Typography>
        {!statusCode ? null : (
          <Typography variant="body1" className="mb-6">
            <span className="bg-gray-300 inline-block">
              ERRORCODE: {statusCode}
            </span>
          </Typography>
        )}
        <Button
          color="primary"
          variant="contained"
          href="/"
          title={t('goHome')}
        >
          {t('goHome')}
        </Button>
      </div>
    </Layout>
  )
}

export default ErrorPage
