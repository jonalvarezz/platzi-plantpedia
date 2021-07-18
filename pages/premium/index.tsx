import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'

import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'
import { Layout } from '@components/Layout'
import { AccessDenied } from '@components/AccessDenied'

import { useSession, getSession } from '@auth/client'

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
  const [refetchCounter, refetch] = useState(0)

  useEffect(() => {
    fetch('/api/premium')
      .then((response) => response.json())
      .then(({ data }) => setImageUrl(data))
  }, [refetchCounter])

  if (loading) {
    return null
  }

  if (session == null) {
    return <AccessDenied />
  }

  return (
    <Layout title="Premium content">
      <div className="text-center">
        <Typography variant="h2">Welcome, {session.user?.name}</Typography>
        <Typography variant="body2" className="mt-1">
          Here is your premium content for today
        </Typography>
        <div className="max-w-lg mx-auto text-center my-8">
          {imageUrl == null ? null : (
            <img
              key={imageUrl}
              src={imageUrl}
              alt="Random fox"
              className="rounded"
            />
          )}
        </div>
        <Button variant="outlined" onClick={() => refetch((c) => ++c)}>
          More
        </Button>
      </div>
    </Layout>
  )
}

export default PremiumPage
