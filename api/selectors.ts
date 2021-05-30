import type {
  Maybe,
  ISys,
  IAsset,
  IAuthor,
  ICategory,
  IPlant,
} from './generated/graphql'

// Generic utilities
// ----------------------------------------------------------------
export function nonEmpty<T, O = unknown>(selector: (entity: T) => O) {
  return (entity: Maybe<T> | undefined | null) => {
    if (entity == null) {
      throw new Error(`unexpected empty object found`)
    }

    return selector(entity)
  }
}

type PartialCollection<T> = {
  items: Array<Maybe<T>>
}
export function selectListOf<T, O>(entitySelector: (entity: T) => O) {
  return nonEmpty<PartialCollection<T>, Array<O>>((partialCollection) =>
    partialCollection.items.map(nonEmpty(entitySelector))
  )
}

type PartialEntityWithId = { sys: Pick<ISys, 'id'> }
export const selectEntityId = ({ sys: { id } }: PartialEntityWithId): string =>
  id

// Entities selectors
// ----------------------------------------------------------------
type PartialImageFields = Pick<IAsset, 'title' | 'url' | 'width' | 'height'>
export const selectImage = nonEmpty<PartialImageFields, Image>(
  (partialImage) => ({
    title: partialImage.title!,
    url: partialImage.url!,
    width: partialImage.width!,
    height: partialImage.height!,
  })
)

type PartialAuthor = PartialEntityWithId & {
  photo?: Maybe<PartialImageFields>
} & Pick<IAuthor, 'fullName' | 'handle' | 'biography' | 'twitter' | 'linkedIn'>

export const selectAuthor = nonEmpty<PartialAuthor, Author>(
  (partialAuthor) => ({
    id: selectEntityId(partialAuthor),
    fullName: partialAuthor.fullName!,
    handle: partialAuthor.handle!,
    photo: selectImage(partialAuthor.photo),
    biography: partialAuthor.biography!,
    twitter: partialAuthor.twitter!,
    linkedIn: partialAuthor.linkedIn!,
  })
)
export const selectAuthors = selectListOf(selectAuthor)

type PartialCategory = PartialEntityWithId & {
  icon?: Maybe<PartialImageFields>
} & Pick<ICategory, 'title' | 'slug' | 'categoryDescription'>
export const selectCategory = nonEmpty<PartialCategory, Category>(
  (partialCategory) => ({
    id: selectEntityId(partialCategory),
    title: partialCategory.title!,
    slug: partialCategory.slug!,
    icon: selectImage(partialCategory.icon),
    description: partialCategory.categoryDescription!,
  })
)

export const selectCategories = selectListOf(selectCategory)

type PartialPlant = Pick<IPlant, 'slug' | 'plantName'> &
  PartialEntityWithId & { description?: Maybe<{ json: Json }> } & {
    image?: Maybe<PartialImageFields>
  } & { category?: Maybe<PartialCategory> } & {
    author?: Maybe<PartialAuthor>
  }

export const selectPlant = nonEmpty<PartialPlant, Plant>((partialPlant) => ({
  id: selectEntityId(partialPlant),
  slug: partialPlant.slug!,
  plantName: partialPlant.plantName!,
  description: partialPlant.description!.json,
  image: selectImage(partialPlant.image),
  author: selectAuthor(partialPlant.author),
  category: selectCategory(partialPlant.category),
}))

export const selectPlants = selectListOf(selectPlant)
