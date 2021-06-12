import { useState, ChangeEventHandler, useEffect } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { GetStaticProps } from 'next'

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

import { searchPlants, QueryStatus } from '@api'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await serverSideTranslations(locale!),
})

export default function Search() {
  const { t } = useTranslation(['page-search'])
  const [term, setTerm] = useState('')
  const [status, setStatus] = useState<QueryStatus>('idle')
  const [results, setResults] = useState<Plant[]>([])

  const updateTerm: ChangeEventHandler<HTMLInputElement> = (event) =>
    setTerm(event.currentTarget.value)

  const emptyResults = status === 'success' && results.length === 0

  useEffect(() => {
    if (term.trim().length < 3) {
      setStatus('idle')
      setResults([])
      return
    }

    setStatus('loading')

    // Pagination not supported... yet
    searchPlants({
      term,
      limit: 10,
    }).then((data) => {
      setResults(data)
      setStatus('success')
    })
  }, [term])

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
    </Layout>
  )
}
