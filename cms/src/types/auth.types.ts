import type { User } from '@/types/user.types'

export type AuthState = {
  user: User | null
  isAuthenticated: boolean  
  login: (user: User) => void
  logout: () => void
}


export type LoginResponse = {
  accessToken: string
  refreshToken: string
  user: User
}