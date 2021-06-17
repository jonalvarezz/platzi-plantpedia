import { GetServerSideProps } from 'next'
// i18n

import { Layout } from '@components/Layout'
import { useSession, getSession } from 'next-auth/client'

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getSession(context)

  if (session == null) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

function PremiumPage() {
  const [session, loading] = useSession()
  console.log(loading, session)

  if (loading) {
    return null
  }

  if (session == null) {
    return <Layout>Acceso denegado</Layout>
  }

  return <Layout>Contenido secretísimo</Layout>
}

export default PremiumPage
