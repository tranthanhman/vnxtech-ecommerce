import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  showAuthModal: boolean;
  setUser: (data: User) => void;
  logout: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const initialAuthState: User | null = null;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: initialAuthState,
      showAuthModal: false,
      isAuthenticated: false,
      setUser: (data: User) =>
        set({
          user: data,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
      openAuthModal: () => set({ showAuthModal: true }),
      closeAuthModal: () => set({ showAuthModal: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);
