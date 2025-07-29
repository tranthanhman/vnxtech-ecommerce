export interface Category {
  id: number
  name: string
  slug: string
  parentId: number | null
  createdAt: string
}

export interface Brand {
  id: number
  name: string
  slug: string
  logo: string
  createdAt: string
}

export interface Product {
  id: number
  name: string
  slug: string
  price: number
  discountPrice: number | null
  stock: number
  imageUrl: string
  description: string
  specifications: string | null
  isFeatured: boolean
  categoryId: number
  brandId: number
  createdAt: string
  category: Category
  brand: Brand
}