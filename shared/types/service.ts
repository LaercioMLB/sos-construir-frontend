export interface Category {
  name: string
  slug: string
}
export interface Service {
  id: number | string
  name: string
  slug: string
  category: string
  size?: 'medium' | 'large' | string
  icon: string
  image: string
  description: string
  keywords: string[]
  popularity: number
}
