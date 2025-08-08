import { api } from '@/lib/axios'
import { type Product } from '@/types/product.types'
import type { APIResponse } from '@/types/api.types'

export type ResponseProduct = {
  products: Product[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export const getProducts = async (page: number = 1, limit: number = 10) => {
  const response = await api.get<APIResponse<ResponseProduct>>('/products', {
    params: { page, limit },
  })

  return response.data
}
