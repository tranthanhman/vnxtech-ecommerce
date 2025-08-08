import { api } from '@/lib/axios'
import { type User } from '@/types/user.types'
import type { APIResponse } from '@/types/api.types'

export type ResponseUser = {
  users: User[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export const getUsers = async (page: number = 1, limit: number = 10) => {
  const response = await api.get<APIResponse<ResponseUser>>('/users', {
    params: { page, limit },
  })

  return response.data
}
