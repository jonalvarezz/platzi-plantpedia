import { useState, ChangeEventHandler, useEffect } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { GetStaticProps } from 'next'
import get from 'lodash/get'
import flatMap from 'lodash/flatMap'
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

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await serverSideTranslations(locale!),
})

export default function Search() {
  const { t } = useTranslation(['page-search'])
  const [term, setTerm] = useState('')

  // Debounce the search value.
  // Remember: With lodash you must use either useCallback or useRef
  const searchTerm = useDebounce(term, 500)

  // Use react-query to improve our http cache strategy and to make pagination easier
  const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfinitePlantSearch(
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
      <main className="pt-16 text-center">
        <div className="max-w-5xl mx-auto mb-6">
          <FormControl fullWidth className="" variant="outlined">
            <InputLabel htmlFor="search-term-field">{t('term')}</InputLabel>
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
            <Typography variant="body1">{t('notFound', { term })}</Typography>
          ) : null}
        </div>
        <div>
          {!emptyResults ? (
            <PlantCollection plants={results} variant="square" />
          ) : null}
        </div>
      </main>
      {!hasNextPage ? null : (
        <div className="text-center p4">
          <Button
            variant="outlined"
            disabled={isFetchingNextPage}
            className={clsx({ 'animate-pulse': isFetchingNextPage })}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? t('loading') : t('loadMore')}
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
