import { GraphQLClient } from 'graphql-request'
import { getSdk, IGetPlantListQueryVariables } from './generated/graphql'
import * as selectors from './selectors'

const client = new GraphQLClient(
  `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}`,
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  }
)

const api = getSdk(client)

export function getPlantList(
  args?: IGetPlantListQueryVariables
): Promise<Plant[]> {
  return api
    .getPlantList({ limit: 10, skip: 0, ...args })
    .then((responseData) =>
      selectors.selectPlants(responseData.plantCollection)
    )
}

export function getPlant(slug: string): Promise<Plant> {
  return api.getPlant({ slug }).then((responseData) => {
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
