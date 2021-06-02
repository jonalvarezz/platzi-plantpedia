import { GraphQLClient } from 'graphql-request'
import {
  getSdk,
  IGetPlantListQueryVariables,
  ISearchPlantQueryVariables,
  IGetCategoryListQueryVariables,
  IGetAuthorListQueryVariables,
  IGetPlantListByAuthorQueryVariables,
  IGetPlantListByCategoryQueryVariables,
} from './generated/graphql'
import * as selectors from './selectors'

export type QueryStatus = 'idle' | 'loading' | 'success' | 'error'

const client = new GraphQLClient(
  `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}`,
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  }
)

const api = getSdk(client)

export const sdk = api

export function getPlantList(
  args?: IGetPlantListQueryVariables
): Promise<Plant[]> {
  return api
    .getPlantList({ limit: 10, skip: 0, ...args })
    .then((responseData) =>
      selectors.selectPlants(responseData.plantCollection)
    )
}

// This request handler has support for Preview content
export function getPlant(
  slug: string,
  isPreview = false,
  locale?: string
): Promise<Plant> {
  const extraHeaders: HeadersInit = {}
  if (isPreview) {
    // Use the preview access token for auth
    extraHeaders['Authorization'] = `Bearer ${process.env.PREVIEW_ACCESS_TOKEN}`
  }

  return api
    .getPlant({ slug, preview: isPreview, locale }, extraHeaders)
    .then((responseData) => {
      if (
        responseData == null ||
        responseData.plantCollection == null ||
        responseData.plantCollection.items.length < 1
      ) {
        throw new Error(`Plant with slug: "${slug}" not found`)
      }

      return selectors.selectPlant(responseData.plantCollection.items[0])
    })
}

export function searchPlants({
  term,
  locale,
  limit = 8,
}: ISearchPlantQueryVariables): Promise<Plant[]> {
  return api.searchPlant({ term, locale, limit }).then((responseData) => {
    if (responseData == null || responseData.plantCollection == null) {
      return []
    }

    return selectors.selectPlants(responseData.plantCollection)
  })
}

export function getPlantListByAuthor(
  args: IGetPlantListByAuthorQueryVariables
): Promise<Plant[]> {
  return api
    .getPlantListByAuthor(args)
    .then((responseData) =>
      selectors.selectPlants(responseData.plantCollection)
    )
}

export function getCategoryList(
  args?: IGetCategoryListQueryVariables
): Promise<Category[]> {
  return api
    .getCategoryList({ limit: 10, skip: 0, ...args })
    .then((responseData) =>
      selectors.selectCategories(responseData.categoryCollection)
    )
}

export function getAuthorList(
  args?: IGetAuthorListQueryVariables
): Promise<Author[]> {
  return api
    .getAuthorList({ limit: 10, skip: 0, ...args })
    .then((responseData) =>
      selectors.selectAuthors(responseData.authorCollection)
    )
}

export function getPlantListByCategory(
  args: IGetPlantListByCategoryQueryVariables
): Promise<{ entries: Plant[]; category: Category }> {
  return api
    .getPlantListByCategory({ limit: 10, ...args })
    .then((responseData) => {
      if (
        responseData == null ||
        responseData.categoryCollection == null ||
        responseData.categoryCollection.items.length < 1
      ) {
        throw new Error(`Category with slug: "${args.category}" not found`)
      }

      return {
        category: selectors.selectCategories(
          responseData.categoryCollection
        )[0],
        entries: selectors.selectPlants(responseData.plantCollection),
      }
    })
}
