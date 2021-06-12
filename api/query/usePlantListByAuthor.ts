import { useQuery, QueryFunction, UseQueryOptions } from 'react-query'
import {
  IGetPlantListByAuthorQuery,
  IGetPlantListByAuthorQueryVariables,
} from '../generated/graphql'
import { sdk } from '../index'
import { selectPlants } from '../selectors'

type GetPlantListByAuthorArgs = IGetPlantListByAuthorQueryVariables

type QueryKey = ['author-entries', GetPlantListByAuthorArgs]

const fetchPlantsByAuthor: QueryFunction<IGetPlantListByAuthorQuery, QueryKey> =
  ({ queryKey }) => {
    const [_key, args] = queryKey

    return sdk.getPlantListByAuthor(args)
  }

type Options = Pick<
  UseQueryOptions,
  'enabled' | 'staleTime' | 'refetchOnWindowFocus' | 'refetchOnMount'
>

export function usePlantListByAuthor(
  args: GetPlantListByAuthorArgs,
  options?: Options
) {
  return useQuery(['author-entries', args], fetchPlantsByAuthor, {
    ...options,
    select: (data) => selectPlants(data.plantCollection),
  })
}
