type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[]

type Image = {
  title: string
  url: string
  width: number
  height: number
}

type Category = {
  id: string
  title: string
  icon: Image
  description: string
}

type Author = {
  id: string
  fullName: string
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
  categories: Category[]
  author: Author
}

type PaginatedList<T> = {
  limit: number
  skip: number
  items: T[]
}
