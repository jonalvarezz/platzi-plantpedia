import { useState, ChangeEventHandler, useEffect, useCallback } from 'react'
import { debounce } from 'lodash'

import {
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from '@ui/FormField'
import { SearchIcon } from '@ui/icon/Search'

import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/PlantCollection'

import { searchPlants } from '@api'

export default function Search() {
  const [term, setTerm] = useState('')
  const [results, setResults] = useState<Plant[]>([])
  const debouncedSearchPlants = useCallback(
    debounce((term: string) => {
      searchPlants({ term, limit: 10 }).then((data) => setResults(data))
    }, 500),
    []
  )

  const updateTerm: ChangeEventHandler<HTMLInputElement> = (event) =>
    setTerm(event.currentTarget.value)

  useEffect(() => {
    if (term.trim().length < 3) {
      return
    }

    debouncedSearchPlants(term)
  }, [term])

  return (
    <Layout>
      <main className="pt-16 text-center">
        <div className="max-w-5xl mx-auto mb-6">
          <FormControl fullWidth className="" variant="outlined">
            <InputLabel htmlFor="search-term-field">Search term</InputLabel>
            <OutlinedInput
              id="search-term-field"
              value={term}
              onChange={updateTerm}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              labelWidth={100}
            />
          </FormControl>
        </div>
        <div>
          <PlantCollection plants={results} variant="square" />
        </div>
      </main>
    </Layout>
  )
}
