import { useState, useEffect } from 'react'
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
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/premium')
      .then((response) => response.json())
      .then(({ data }) => setImageUrl(data))
  }, [])

  if (loading) {
    return null
  }

  if (session == null) {
    return <Layout>Acceso denegado</Layout>
  }

  return (
    <Layout>
      <div>
        {imageUrl == null ? null : <img src={imageUrl} alt="Random fox" />}
      </div>
    </Layout>
  )
}

export default PremiumPage
