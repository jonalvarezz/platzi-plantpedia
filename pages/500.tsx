import { Layout } from '@components/Layout'

export default function NotFoundPage({
  statusCode = 500,
}: {
  statusCode?: number
}) {
  return (
    <Layout>
      <div className="text-center">{statusCode}, my friendo</div>
    </Layout>
  )
}
