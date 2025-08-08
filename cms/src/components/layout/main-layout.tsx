import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './app-sidebar'
import { Outlet } from 'react-router-dom'
import AppNavbar from './app-navbar'

export default function DefaultLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppNavbar />
        <main className="p-4 bg-gray-50 dark:bg-[#151f2c]">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
