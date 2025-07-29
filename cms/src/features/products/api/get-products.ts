import { axiosInstance } from '@/lib/axios'
import { type Product } from '@/types/product.types'

export type ResponseProduct = {
  products: Product[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export const getProducts = async (page: number = 1, limit: number = 10): Promise<ResponseProduct> => {
  const response = await axiosInstance.get<ResponseProduct>('/products', {
    params: { page, limit },
  })

  return response.data
}