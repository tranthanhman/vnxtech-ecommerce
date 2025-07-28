import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import router from "@/routes";
import { useThemeStore } from "./stores/themeStore";
import { useEffect } from "react";
import { ThemeProvider } from "next-themes";

function App() {
  const setTheme = useThemeStore((s) => s.setTheme);

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("theme") as "dark" | "light") || "light";
    setTheme(savedTheme);
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  );
}

export default App;
