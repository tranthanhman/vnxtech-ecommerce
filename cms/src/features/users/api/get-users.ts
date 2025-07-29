import { axiosInstance } from '@/lib/axios'
import { type User } from '@/types/user.types'

export type ResponseUser = {
  users: User[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export const getUsers = async (page: number = 1, limit: number = 10): Promise<ResponseUser> => {
  const response = await axiosInstance.get<ResponseUser>('/users', {
    params: { page, limit },
  })

  return response.data
}
