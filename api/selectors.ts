import get from 'lodash/get'

export const selectEntityId = (data: Json): string => {
  const id: string | undefined = get(data, 'sys.id')

  if (!id) {
    throw new Error(
      `Missing id field on\n: ${JSON.stringify(data, undefined, 2)}`
    )
  }

  return id
}

export const selectImage = (data: Json): Image => ({
  url: get(data, 'url'),
  width: get(data, 'width'),
  height: get(data, 'height'),
})

export const selectAuthor = (data: Json): Author => ({
  id: selectEntityId(data),
  fullName: get(data, 'fullName'),
  photo: get(data, 'picture'),
  biography: get(data, 'biography'),
  twitter: get(data, 'twitter'),
  linkedIn: get(data, 'linkedin'),
})

export const selectCategory = (data: Json): Category => ({
  id: selectEntityId(data),
  title: get(data, 'title'),
  icon: get(data, 'icon'),
  description: get(data, 'description'),
})

export const selectCategories = (data: Json): Category[] =>
  selectListOf(data, selectCategory)

export const selectPlant = (data: Json): Plant => ({
  id: selectEntityId(data),
  plantName: get(data, 'plantName'),
  slug: get(data, 'slug'),
  description: get(data, 'description'),
  image: selectImage(get(data, 'image')),
  categories: selectCategories(get(data, 'categoriesCollection.items')),
  author: selectAuthor(get(data, 'author')),
})

export const selectPlants = (data: Json) =>
  selectListOf<Plant>(data, selectPlant)

function selectListOf<T>(list: Json, entitySelector: (data: Json) => T): T[] {
  if (list == null || !Array.isArray(list)) {
    throw new Error(
      `Couldn't find list in ${JSON.stringify(list, undefined, 2)}`
    )
  }

  return list.map((item) => entitySelector(item))
}
