import { create } from 'zustand'
import type { User, UserState } from './types'

export const useUserStore = create<UserState>((set) => ({
  open: null, // 'create' | 'edit' | null
  currentRow: null,
  setOpen: (str: string | null) => {
    set({ open: str })
  },
  setCurrentRow: (user: User | null) => {
    set({ currentRow: user })
  },
}))
