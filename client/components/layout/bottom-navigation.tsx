"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Grid3X3, ShoppingBag, Bell, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { MobileCategorySheet } from "./mobile-category-sheet"

const navigationItems = [
  {
    id: "home",
    label: "Trang chủ",
    icon: Home,
    href: "/",
  },
  {
    id: "category",
    label: "Danh mục",
    icon: Grid3X3,
    href: "#",
    isCategory: true,
  },
  {
    id: "cart",
    label: "Giỏ hàng",
    icon: ShoppingBag,
    href: "/cart",
    badge: 0,
  },
  {
    id: "notifications",
    label: "Thông báo",
    icon: Bell,
    href: "/notifications",
  },
  {
    id: "account",
    label: "Tài khoản",
    icon: User,
    href: "/account",
  },
]

export function BottomNavigation() {
  const pathname = usePathname()
  const [showCategorySheet, setShowCategorySheet] = useState(false)

  const isActive = (item: (typeof navigationItems)[0]) => {
    if (item.id === "home") {
      return pathname === "/"
    }
    return pathname.startsWith(item.href) && item.href !== "#"
  }

  const handleItemClick = (item: (typeof navigationItems)[0]) => {
    if (item.isCategory) {
      setShowCategorySheet(true)
    }
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden">
        <div className="grid grid-cols-5 h-16">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item)

            if (item.isCategory) {
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                    active ? "text-red-600" : "text-gray-600"
                  }`}
                >
                  <div className="relative">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              )
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                  active ? "text-red-600" : "text-gray-600"
                }`}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {item.badge !== undefined && item.badge > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-4 w-4 rounded-full flex items-center justify-center p-0">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      <MobileCategorySheet open={showCategorySheet} onOpenChange={setShowCategorySheet} />

      {/* Spacer for bottom navigation */}
      <div className="h-16 md:hidden" />
    </>
  )
}
