import { GraphQLClient } from 'graphql-request'
import { getSdk } from './generated/graphql'
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

export function getAllPlants(): Promise<Plant[]> {
  return api.getAllPlants().then((responseData) =>
    responseData.plantCollection!.items.map((responseItem, index) => {
      if (responseItem == null) {
        throw new Error(`Corrupted object at pos. ${index}`)
      }

      return {
        id: selectors.selectEntityId(responseItem),
        slug: responseItem.slug!,
        plantName: responseItem.plantName!,
        description: responseItem.description!,
        image: selectors.selectImage(responseItem.image),
        author: selectors.selectAuthor(responseItem.author),
        categories: selectors.selectCategories(
          responseItem.categoriesCollection
        ),
      }
    })
  )
}
