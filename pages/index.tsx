import { useEffect, useState } from 'react'

import { Layout } from '@components/Layout'
import { getPlantList } from '@api'
import { PlantCollection } from '@components/PlantCollection'

export default function Home() {
  const [plants, setPlants] = useState<Plant[]>([])

  useEffect(() => {
    getPlantList({ limit: 10 }).then((receivedData) => setPlants(receivedData))
  })

  return (
    <Layout>
      <PlantCollection plants={plants} variant="square" />
    </Layout>
  )
}
