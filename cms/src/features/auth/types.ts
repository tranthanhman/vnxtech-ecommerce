import type { User } from '@/features/users'

export type AuthState = {
  user: User
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}
