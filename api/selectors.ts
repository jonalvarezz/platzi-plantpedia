import type {
  Maybe,
  ISys,
  IAsset,
  IAuthor,
  ICategory,
} from './generated/graphql'

export function nonEmpty<T, O = unknown>(selector: (entity: T) => O) {
  return (entity: Maybe<T> | undefined | null) => {
    if (entity == null) {
      throw new Error(`unexpected empty object found`)
    }

    return selector(entity)
  }
}

type PartialEntityWithId = { sys: Pick<ISys, 'id'> }
export const selectEntityId = ({ sys: { id } }: PartialEntityWithId): string =>
  id

type PartialImageFields = Pick<IAsset, 'url' | 'width' | 'height'>
export const selectImage = nonEmpty<PartialImageFields, Image>(
  (partialImage) => ({
    url: partialImage.url!,
    width: partialImage.width!,
    height: partialImage.height!,
  })
)

export const selectAuthor = nonEmpty<
  PartialEntityWithId & { photo?: Maybe<PartialImageFields> } & Pick<
      IAuthor,
      'fullName' | 'biography' | 'twitter' | 'linkedIn'
    >,
  Author
>((partialAuthor) => ({
  id: selectEntityId(partialAuthor),
  fullName: partialAuthor.fullName!,
  photo: selectImage(partialAuthor.photo),
  biography: partialAuthor.biography!,
  twitter: partialAuthor.twitter!,
  linkedIn: partialAuthor.linkedIn!,
}))

type PartialCategory = PartialEntityWithId & {
  icon?: Maybe<PartialImageFields>
} & Pick<ICategory, 'title' | 'categoryDescription'>
export const selectCategory = nonEmpty<PartialCategory, Category>(
  (partialCategory) => ({
    id: selectEntityId(partialCategory),
    title: partialCategory.title!,
    icon: selectImage(partialCategory.icon),
    description: partialCategory.categoryDescription!,
  })
)

type PartialCollection<T> = {
  items: Array<Maybe<T>>
}
export function selectListOf<T, O>(entitySelector: (entity: T) => O) {
  return nonEmpty<PartialCollection<T>, Array<O>>((partialCollection) =>
    partialCollection.items.map(nonEmpty(entitySelector))
  )
}

export const selectCategories = selectListOf<PartialCategory, Category>(
  selectCategory
)
