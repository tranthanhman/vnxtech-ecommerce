import { ThemeToggle } from './theme-toggle'
import { SidebarTrigger } from '../ui/sidebar'
import { NavUser } from './nav-user'
import { useAuthStore } from '@/stores/authStore'

export default function AppNavbar() {
  const { user } = useAuthStore()

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b bg-background">
      {/* Left */}
      <SidebarTrigger />
      {/* Right */}
      <div className="flex gap-4 items-center">
        {/* Toggle Dark Mode */}
        <ThemeToggle />

        {/* Nav User */}
        {user && <NavUser user={user} />}
      </div>
    </nav>
  )
}
