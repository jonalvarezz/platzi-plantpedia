import { useState, useEffect } from 'react'
import { Layout } from '@ui/Layout'
import { getAllPlants } from '@api'
import { PlantCollection } from '@components/PlantCollection'

export default function Home() {
  const [plants, setPlants] = useState<Plant[]>([])
  console.log(plants)

  useEffect(() => {
    getAllPlants().then(setPlants)
  }, [])

  return (
    <Layout>
      <main className="pt-16">
        <PlantCollection
          plants={plants.slice(0, 2)}
          variant="vertical"
          className="mb-24"
        />
        <PlantCollection plants={plants.slice(0, 6)} variant="square" />
      </main>
    </Layout>
  )
}
