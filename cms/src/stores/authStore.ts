import { create } from 'zustand'
import { type User } from '@/types/user.types'
import type { AuthState } from '@/types/auth.types'

export const useAuthStore = create<AuthState>((set) => {
  const stored = localStorage.getItem('user')
  const user = stored ? (JSON.parse(stored) as User) : null
  const isAuthenticated = !!stored

  return {
    user,
    isAuthenticated,
    login: (user) => {
      localStorage.setItem('user', JSON.stringify(user))
      set({ user, isAuthenticated: true })
    },
    logout: () => {
      localStorage.removeItem('user')
      set({ user: null, isAuthenticated: false })
    },
  }
})
