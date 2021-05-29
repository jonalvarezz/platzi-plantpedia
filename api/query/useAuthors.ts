import { useQuery, QueryFunction, UseQueryOptions } from 'react-query'
import {
  IGetAuthorListQuery,
  IGetAuthorListQueryVariables,
} from '../generated/graphql'
import { sdk } from '../index'
import { selectAuthors } from '../selectors'

type GetAuthorArgs = IGetAuthorListQueryVariables

type QueryKey = ['authors', GetAuthorArgs]

const fetchAuthorList: QueryFunction<IGetAuthorListQuery, QueryKey> = ({
  queryKey,
}) => {
  const [_key, args] = queryKey

  return sdk.getAuthorList(args)
}

type Options = Pick<
  UseQueryOptions,
  'enabled' | 'staleTime' | 'refetchOnWindowFocus' | 'refetchOnMount'
>

export function useAuthors(args: GetAuthorArgs, options?: Options) {
  return useQuery(['authors', args], fetchAuthorList, {
    ...options,
    select: (data) => selectAuthors(data.authorCollection),
  })
}
