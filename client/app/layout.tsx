import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BottomNavigation } from "@/components/layout/bottom-navigation"
import TanstackProvider from "../components/providers/TanstackProvider"
import AuthModal from "@/components/AuthModal"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FPTShop - Điện thoại, Laptop, Tablet, Phụ kiện chính hãng",
  description: "Mua điện thoại, laptop, tablet, phụ kiện chính hãng, giá tốt nhất tại FPTShop",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Header />
        <TanstackProvider>
          <main>{children}</main>
          <AuthModal />
        </TanstackProvider>
        <Footer />
        <BottomNavigation />
      </body>
    </html>
  )
}
