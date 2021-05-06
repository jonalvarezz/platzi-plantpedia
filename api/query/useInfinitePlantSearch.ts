import {
  useInfiniteQuery,
  QueryFunction,
  UseInfiniteQueryOptions,
} from 'react-query'
import {
  ISearchPlantQueryVariables,
  ISearchPlantQuery,
} from '../generated/graphql'
import { sdk } from '../index'
import { selectPlants } from '../selectors'

type InfinitePlantListArgs = Pick<ISearchPlantQueryVariables, 'term' | 'limit'>

type QueryKey = ['searchPlants', InfinitePlantListArgs]

const fetchPlants: QueryFunction<ISearchPlantQuery, QueryKey> = ({
  queryKey,
  pageParam = 0,
}) => {
  const [_key, { term, limit }] = queryKey

  return sdk.searchPlant({ term, limit, skip: pageParam })
}

type Options = Pick<
  UseInfiniteQueryOptions,
  'enabled' | 'staleTime' | 'refetchOnWindowFocus' | 'refetchOnMount'
>

export function useInfinitePlantSearch(
  args: InfinitePlantListArgs,
  options?: Options
) {
  return useInfiniteQuery(['searchPlants', args], fetchPlants, {
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
