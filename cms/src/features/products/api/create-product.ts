import { api } from '@/lib/axios'
import { type Product } from '@/types/product.types'
import type { APIResponse } from '@/types/api.types'

export const createProduct = async (product: Product) => {
  const response = await api.post<APIResponse<Product>>('/products', product)

  return response.data
}