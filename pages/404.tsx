import { Layout } from '@components/Layout'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'

export default function NotFoundPage() {
  return (
    <Layout>
      <div className="text-center">
        <Typography variant="h2" className="mb-6">
          🍂 We're sorry
        </Typography>
        <Typography variant="body1" className="mb-6">
          We couldn't find what you were looking for.
        </Typography>
        <Button
          color="primary"
          variant="contained"
          href="/"
          title="Go back home"
        >
          Back home
        </Button>
      </div>
    </Layout>
  )
}
