import { create } from "zustand";

type Theme = "light" | "dark";

type ThemeState = {
  theme: Theme;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (value: boolean) => void;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  sidebarCollapsed: boolean;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem("theme") as Theme) || "light",
  sidebarOpen: true,
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarOpen: (value) => set({ sidebarOpen: value }),
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === "dark" ? "light" : "dark";
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(newTheme);
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    });
  },

  setTheme: (theme: Theme) => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
    set({ theme });
  },

  sidebarCollapsed: false,
}));
