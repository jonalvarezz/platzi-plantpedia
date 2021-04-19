import { GraphQLClient } from 'graphql-request'
import { getSdk, IGetAllPlantsQueryVariables } from './generated/graphql'
import * as selectors from './selectors'

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

export function getAllPlants(
  args?: IGetAllPlantsQueryVariables
): Promise<Plant[]> {
  return api
    .getAllPlants({ limit: 10, skip: 0, ...args })
    .then((responseData) =>
      selectors.selectPlants(responseData.plantCollection)
    )
}
