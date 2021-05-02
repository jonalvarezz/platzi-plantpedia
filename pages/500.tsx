import { Layout } from '@components/Layout'

export default function NotFoundPage({
  statusCode = 500,
}: {
  statusCode?: number
}) {
  return (
    <Layout>
      <main className="pt-16 text-center">{statusCode}, my friendo</main>
    </Layout>
  )
}
