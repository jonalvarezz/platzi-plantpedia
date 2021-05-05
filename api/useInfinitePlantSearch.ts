import {
  useInfiniteQuery,
  QueryFunction,
  UseInfiniteQueryOptions,
} from 'react-query'
import {
  ISearchPlantQueryVariables,
  ISearchPlantQuery,
} from './generated/graphql'
import { sdk } from './index'
import { selectPlants } from './selectors'

type InfinitePlantListArgs = Pick<ISearchPlantQueryVariables, 'term' | 'skip'>

type QueryKey = ['searchPlants', InfinitePlantListArgs]

const fetchPlants: QueryFunction<ISearchPlantQuery, QueryKey> = ({
  queryKey,
}) => {
  const [_key, { term, skip }] = queryKey

  return sdk.searchPlant({ term, limit: 10, skip })
}

type Options = Pick<
  UseInfiniteQueryOptions,
  'enabled' | 'staleTime' | 'refetchOnWindowFocus' | 'refetchOnMount'
>

export function useInfinitePlantSearch(
  { term, skip = 0 }: InfinitePlantListArgs,
  options?: Options
) {
  return useInfiniteQuery(['searchPlants', { term, skip }], fetchPlants, {
    ...options,
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => selectPlants(page.plantCollection)),
    }),
    getNextPageParam: (lastPage) => {
      const lastPageData = lastPage.plantCollection
      if (lastPageData == null) {
        return undefined
      }

      const nextPage = lastPageData.skip + lastPageData.limit

      return nextPage >= lastPageData.total ? undefined : nextPage
    },
  })
}
