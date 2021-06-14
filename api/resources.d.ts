type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[]

// This matches our content model from our CMS (Contentful)

type Image = {
  title: string
  url: string
  width: number
  height: number
}

type Category = {
  id: string
  slug: string
  title: string
  icon: Image
  description: string
}

type Author = {
  id: string
  fullName: string
  handle: string
  photo: Image
  biography: Json
  twitter: string
  linkedIn: string
}

type RichText = Json

type Plant = {
  id: string
  plantName: string
  slug: string
  description: RichText
  image: Image
  category: Category
  author: Author
}

type PaginatedList<T> = {
  limit: number
  skip: number
  items: T[]
}

type User = {
  name: string
  email: string
  image: string
}
