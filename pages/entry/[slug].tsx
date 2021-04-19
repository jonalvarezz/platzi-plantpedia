import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '@ui/Layout'
import { getPlant } from '@api'

export default function PlantEntryPage() {
  const router = useRouter()
  const slug = router.query.slug

  const [plant, setPlant] = useState<Plant | null>(null)
  useEffect(() => {
    if (typeof slug === 'string') {
      getPlant(slug).then(setPlant)
    }
  }, [slug])

  console.log(plant)

  if (!slug) {
    // 404
    return (
      <Layout>
        <main className="pt-16">404, my friendo</main>
      </Layout>
    )
  }

  return (
    <Layout>
      <main className="pt-16"></main>
    </Layout>
  )
}
