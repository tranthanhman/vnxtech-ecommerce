"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Menu,
  Bell,
  MapPin,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MobileCategorySheet } from "./mobile-category-sheet";
import MegaMenu from "./mega-menu";
import { useCartStore } from "@/stores/cartStore";
import UserProfile from "./UserProfile";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showMobileCategorySheet, setShowMobileCategorySheet] = useState(false);

  const megaMenuData = {
    leftCategories: [
      { id: "laptop", name: "Laptop", icon: "💻" },
      { id: "apple", name: "Sản phẩm Apple", icon: "🍎" },
      { id: "phone", name: "Điện thoại", icon: "📱" },
      { id: "tablet", name: "Tablet", icon: "📱" },
      { id: "pc", name: "PC - Máy tính bàn", icon: "🖥️" },
      { id: "monitor", name: "Màn hình máy tính", icon: "🖥️" },
      { id: "components", name: "Linh kiện máy tính", icon: "⚙️" },
      { id: "accessories", name: "Phụ kiện máy tính", icon: "🖱️" },
      { id: "gaming", name: "Gaming Gear", icon: "🎮" },
      { id: "audio", name: "Thiết bị âm thanh", icon: "🎧" },
    ],
    mainContent: {
      "PC theo thương hiệu": [
        "PC Phong Vũ",
        "PC ASUS",
        "PC Acer",
        "PC Dell",
        "PC HP",
        "PC Lenovo",
        "PC Intel",
      ],
      "PC theo nhu cầu": [
        "PC AI",
        "PC Gaming",
        "PC văn phòng",
        "PC đồ họa",
        "PC All-In-One",
        "PC Mini",
        "Build PC",
      ],
      "PC theo cấu hình VGA": [
        "PC RTX 5000 series",
        "PC RTX 4090",
        "PC RTX 4080",
        "PC RTX 4070",
        "PC RTX 4060",
        "PC RTX 3060",
      ],
      "PC cấu hình CPU Intel": [
        "PC Intel Core Ultra 200S",
        "PC i9",
        "PC i7",
        "PC i5",
        "PC i3",
      ],
      "PC theo giá tiền": [
        "PC 10 triệu",
        "PC 15 triệu",
        "PC 20 triệu",
        "PC 30 triệu",
      ],
      "PC cấu hình CPU AMD": ["PC Ryzen 5", "PC Ryzen 7"],
    },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const {items : cartItems} = useCartStore()

  return (
    <>
      {/* Top notification bar */}
      <div className="bg-red-600 text-white py-1 text-xs">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span className="hidden sm:inline">Hà Nội</span>
            </span>
            <span className="flex items-center space-x-1">
              <Truck className="h-3 w-3" />
              <span className="hidden sm:inline">
                Miễn phí vận chuyển từ 500k
              </span>
              <span className="sm:hidden">Free ship 500k+</span>
            </span>
          </div>
          <div>
            <span>Hotline: 1900 6868</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 bg-white border-b shadow-sm z-50">
        <div className="relative container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 flex-shrink-0"
            >
              <div className="bg-red-600 text-white px-3 py-2 rounded font-bold text-xl">
                FPT
              </div>
              <span className="font-bold text-xl text-gray-800 hidden sm:inline">
                Shop
              </span>
            </Link>

            {/* Categories button - Desktop only */}
            <div className="relative hidden md:block">
              <Button
                variant="outline"
                className="flex items-center space-x-2 bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 px-4 py-2 h-10"
                onMouseEnter={() => setShowMegaMenu(true)}
              >
                <Menu className="h-4 w-4" />
                <span className="font-medium">Danh mục sản phẩm</span>
              </Button>
            </div>

            {/* Search bar */}
            <div className="flex-1 max-w-2xl">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Nhập từ khóa cần tìm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2 h-10 border-gray-300 rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 h-8"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Right actions - Desktop only */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center p-2"
              >
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="text-xs text-gray-600">Thông báo</span>
              </Button>

              {/* Cart */}
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex flex-col items-center p-2 relative"
                >
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                  <span className="text-xs text-gray-600">Giỏ hàng</span>
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </Badge>
                </Button>
              </Link>

              {/* User account */}
              <UserProfile /> 
            </div>
          </div>
          {/* Mega Menu - Desktop only */}
          {showMegaMenu && (
            <MegaMenu megaMenuData={megaMenuData} setShowMegaMenu={setShowMegaMenu} />
          )}
        </div>
      </header>

      {/* Mobile Category Sheet */}
      <MobileCategorySheet
        open={showMobileCategorySheet}
        onOpenChange={setShowMobileCategorySheet}
      />
    </>
  );
}
