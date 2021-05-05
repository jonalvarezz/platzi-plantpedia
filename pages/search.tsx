import React, { useState, ChangeEventHandler, useEffect } from 'react'
import { get } from 'lodash'

import {
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from '@ui/FormField'
import { SearchIcon } from '@ui/icon/Search'
import { Typography } from '@ui/Typography'

import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/PlantCollection'

import { useInfinitePlantSearch } from '@api/useInfinitePlantSearch'

export default function Search() {
  const [term, setTerm] = useState('')
  const searchTerm = useDebounce(term, 500)
  const { data, status } = useInfinitePlantSearch(
    { term: searchTerm },
    {
      enabled: searchTerm.trim().length > 1,
      staleTime: Infinity,
    }
  )

  const updateTerm: ChangeEventHandler<HTMLInputElement> = (event) =>
    setTerm(event.currentTarget.value)

  const emptyResults =
    status === 'success' && get(data, 'pages[0].length', 0) === 0

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
          {emptyResults ? (
            <Typography variant="body1">
              {`Sorry, we couldn't find anything by \"${term}\"`}
            </Typography>
          ) : null}
        </div>
        <div>
          {status === 'success' && data != null
            ? data.pages.map((plants, index) => (
                <React.Fragment key={`page-${index}`}>
                  <PlantCollection plants={plants} variant="square" />
                </React.Fragment>
              ))
            : null}
        </div>
      </main>
    </Layout>
  )
}

function useDebounce<T>(value: T, wait = 0) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Update the inner state after <wait> ms
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value)
    }, wait)

    // Clear timeout in case a new value is received
    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [value])

  return debouncedValue
}
