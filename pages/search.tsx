import React, { useState, ChangeEventHandler, useEffect } from 'react'
import { flatMap, get } from 'lodash'
import clsx from 'clsx'

import {
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from '@ui/FormField'
import { SearchIcon } from '@ui/icon/Search'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'

import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/PlantCollection'

import { useInfinitePlantSearch } from '@api/query/useInfinitePlantSearch'

export default function Search() {
  const [term, setTerm] = useState('')
  const searchTerm = useDebounce(term, 500)
  const {
    data,
    status,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfinitePlantSearch(
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

  let results: Plant[] = []
  if (data?.pages != null) {
    results = flatMap(data.pages)
  }

  return (
    <Layout>
      <Typography variant="h2" className="text-center">
        Search
      </Typography>
      <div className="max-w-3xl mx-auto mb-8 mt-10">
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
        {status === 'success' && data != null ? (
          <PlantCollection plants={results} variant="square" />
        ) : null}
      </div>
      {!hasNextPage ? null : (
        <div className="text-center p4">
          <Button
            variant="outlined"
            disabled={isFetchingNextPage}
            className={clsx({ 'animate-pulse': isFetchingNextPage })}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? 'Loading' : 'Load more'}
          </Button>
        </div>
      )}
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
