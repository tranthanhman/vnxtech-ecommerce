import { create } from 'zustand'
import { type User } from '@/features/users'
import type { AuthState } from './types'

const initialUser: User = {
  name: '',
  email: '',
  avatar: 'https://github.com/shadcn.png',
  id: '',
  username: '',
  phoneNumber: '',
  status: null,
  role: null,
  createdAt: '',
  updatedAt: '',
}

export const useAuthStore = create<AuthState>((set) => {
  const stored = localStorage.getItem('user')
  const user: User = stored ? (JSON.parse(stored) as User) : initialUser
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
      set({ user: initialUser, isAuthenticated: false })
    },
  }
})
