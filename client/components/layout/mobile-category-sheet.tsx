"use client"

import { useState } from "react"
import Link from "next/link"
import { X, ChevronRight } from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const categoryData = {
  laptop: {
    id: "laptop",
    name: "LAPTOP",
    icon: "/placeholder.svg?height=40&width=40",
    brands: ["Acer", "ASUS", "Dell", "HP", "Lenovo", "LG Gram", "MSI", "Gigabyte"],
    needs: [
      "Laptop Gaming",
      "Laptop AI",
      "Laptop đồ họa",
      "Laptop Sinh viên",
      "Laptop Văn Phòng",
      "Laptop cảm ứng 2 trong 1",
      "Laptop mỏng nhẹ",
      "Laptop Workstation",
    ],
    sizes: ["Dưới 13 inch", "13 - 15 inch", "Trên 15 inch"],
    prices: ["Dưới 10 triệu", "10 - 15 triệu", "15 - 20 triệu", "20 - 25 triệu", "25 - 30 triệu", "Trên 30 triệu"],
    configs: ["Intel Core i3", "Intel Core i5", "Intel Core i7", "Intel Core i9", "AMD Ryzen 5", "AMD Ryzen 7"],
  },
  apple: {
    id: "apple",
    name: "SẢN PHẨM APPLE",
    icon: "/placeholder.svg?height=40&width=40",
    brands: ["iPhone", "iPad", "MacBook", "iMac", "Apple Watch", "AirPods", "Phụ kiện Apple"],
    needs: ["iPhone mới nhất", "iPad Pro", "MacBook Air", "MacBook Pro", "iMac Studio", "Apple Watch Series"],
    sizes: ["iPhone 15", "iPad 11 inch", "iPad 12.9 inch", "MacBook 13 inch", "MacBook 14 inch", "MacBook 16 inch"],
    prices: ["Dưới 10 triệu", "10 - 20 triệu", "20 - 30 triệu", "30 - 50 triệu", "Trên 50 triệu"],
    configs: ["M1", "M2", "M3", "A17 Pro", "A16 Bionic"],
  },
  pc: {
    id: "pc",
    name: "PC - MÁY TÍNH BÀN",
    icon: "/placeholder.svg?height=40&width=40",
    brands: ["PC ASUS", "PC Acer", "PC Dell", "PC HP", "PC Lenovo", "PC Intel", "PC Custom"],
    needs: ["PC Gaming", "PC AI", "PC Văn phòng", "PC đồ họa", "PC All-In-One", "PC Mini", "Build PC"],
    sizes: ["Mini PC", "Mid Tower", "Full Tower", "All-in-One"],
    prices: ["Dưới 10 triệu", "10 - 15 triệu", "15 - 20 triệu", "20 - 30 triệu", "Trên 30 triệu"],
    configs: ["Intel i3", "Intel i5", "Intel i7", "Intel i9", "AMD Ryzen 5", "AMD Ryzen 7"],
  },
  phone: {
    id: "phone",
    name: "ĐIỆN THOẠI",
    icon: "/placeholder.svg?height=40&width=40",
    brands: ["iPhone", "Samsung", "Xiaomi", "Oppo", "Vivo", "Realme", "OnePlus", "Google Pixel"],
    needs: ["Điện thoại Gaming", "Điện thoại Camera", "Điện thoại Pin khủng", "Điện thoại Cao cấp"],
    sizes: ["Dưới 6 inch", "6 - 6.5 inch", "Trên 6.5 inch"],
    prices: ["Dưới 5 triệu", "5 - 10 triệu", "10 - 20 triệu", "20 - 30 triệu", "Trên 30 triệu"],
    configs: ["4GB RAM", "6GB RAM", "8GB RAM", "12GB RAM", "16GB RAM"],
  },
  tablet: {
    id: "tablet",
    name: "TABLET",
    icon: "/placeholder.svg?height=40&width=40",
    brands: ["iPad", "Samsung Galaxy Tab", "Xiaomi Pad", "Lenovo Tab", "Huawei MatePad"],
    needs: ["Tablet học tập", "Tablet làm việc", "Tablet giải trí", "Tablet vẽ"],
    sizes: ["8 - 10 inch", "10 - 12 inch", "Trên 12 inch"],
    prices: ["Dưới 5 triệu", "5 - 10 triệu", "10 - 20 triệu", "Trên 20 triệu"],
    configs: ["WiFi", "WiFi + Cellular", "4GB RAM", "8GB RAM"],
  },
  accessories: {
    id: "accessories",
    name: "PHU KIỆN",
    icon: "/placeholder.svg?height=40&width=40",
    brands: ["Apple", "Samsung", "Anker", "Belkin", "Logitech", "Razer"],
    needs: ["Sạc dự phòng", "Tai nghe", "Loa Bluetooth", "Ốp lưng", "Cáp sạc", "Đế sạc không dây"],
    sizes: ["Nhỏ gọn", "Trung bình", "Lớn"],
    prices: ["Dưới 500k", "500k - 1 triệu", "1 - 2 triệu", "Trên 2 triệu"],
    configs: ["USB-C", "Lightning", "Wireless", "Bluetooth 5.0"],
  },
}

const categories = [
  { id: "laptop", name: "Laptop", icon: "💻" },
  { id: "apple", name: "Sản phẩm Apple", icon: "🍎" },
  { id: "pc", name: "PC - Máy tính bàn", icon: "🖥️" },
  { id: "phone", name: "Điện thoại", icon: "📱" },
  { id: "tablet", name: "Tablet", icon: "📱" },
  { id: "accessories", name: "Phụ kiện", icon: "🎧" },
]

interface MobileCategorySheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileCategorySheet({ open, onOpenChange }: MobileCategorySheetProps) {
  const [selectedCategory, setSelectedCategory] = useState("laptop")

  const currentCategory = categoryData[selectedCategory as keyof typeof categoryData]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-white">
            <h2 className="text-lg font-semibold">Danh mục sản phẩm</h2>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Left Sidebar */}
            <div className="w-32 bg-gray-50 border-r overflow-y-auto">
              <div className="py-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full p-3 flex flex-col items-center space-y-2 text-xs transition-colors ${
                      selectedCategory === category.id
                        ? "bg-white text-red-600 border-r-2 border-red-600"
                        : "text-gray-600 hover:bg-white"
                    }`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span className="text-center leading-tight">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-white">
              <div className="p-4">
                {/* Category Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">{currentCategory.name}</h3>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>

                {/* Brands Section */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Thương hiệu</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {currentCategory.brands.map((brand) => (
                      <Link
                        key={brand}
                        href={`/category/${selectedCategory}?brand=${brand.toLowerCase()}`}
                        onClick={() => onOpenChange(false)}
                        className="p-3 text-center text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {brand}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Needs Section */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Nhu cầu</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {currentCategory.needs.map((need) => (
                      <Link
                        key={need}
                        href={`/category/${selectedCategory}?need=${need.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={() => onOpenChange(false)}
                        className="p-3 text-center text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {need}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Sizes Section */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Kích thước</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {currentCategory.sizes.map((size) => (
                      <Link
                        key={size}
                        href={`/category/${selectedCategory}?size=${size.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={() => onOpenChange(false)}
                        className="p-3 text-center text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {size}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Prices Section */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Mức giá</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {currentCategory.prices.map((price) => (
                      <Link
                        key={price}
                        href={`/category/${selectedCategory}?price=${price.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={() => onOpenChange(false)}
                        className="p-3 text-center text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {price}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Configs Section */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Cấu hình</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {currentCategory.configs.map((config) => (
                      <Link
                        key={config}
                        href={`/category/${selectedCategory}?config=${config.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={() => onOpenChange(false)}
                        className="p-3 text-center text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {config}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
