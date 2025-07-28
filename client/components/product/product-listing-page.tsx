"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Filter, Grid, List, Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    image: "/placeholder.svg?height=250&width=250",
    price: 34990000,
    originalPrice: 36990000,
    rating: 4.9,
    reviews: 234,
    category: "Apple",
    isNew: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    image: "/placeholder.svg?height=250&width=250",
    price: 32990000,
    originalPrice: 34990000,
    rating: 4.8,
    reviews: 189,
    category: "Samsung",
    isNew: true,
    inStock: true,
  },
  // Add more products...
]

const brands = ["Apple", "Samsung", "Xiaomi", "Oppo", "Vivo", "Realme"]
const priceRanges = [
  { label: "Dưới 5 triệu", min: 0, max: 5000000 },
  { label: "5 - 10 triệu", min: 5000000, max: 10000000 },
  { label: "10 - 20 triệu", min: 10000000, max: 20000000 },
  { label: "20 - 30 triệu", min: 20000000, max: 30000000 },
  { label: "Trên 30 triệu", min: 30000000, max: 100000000 },
]

interface ProductListingPageProps {
  category: string
}

export function ProductListingPage({ category }: ProductListingPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popular")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 50000000])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const getCategoryName = (slug: string) => {
    const categoryMap: { [key: string]: string } = {
      phone: "Điện thoại",
      laptop: "Laptop",
      tablet: "Tablet",
      accessories: "Phụ kiện",
    }
    return categoryMap[slug] || "Sản phẩm"
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Brand filter */}
      <div>
        <h3 className="font-semibold mb-3">Thương hiệu</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBrands([...selectedBrands, brand])
                  } else {
                    setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                  }
                }}
              />
              <Label htmlFor={brand}>{brand}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price filter */}
      <div>
        <h3 className="font-semibold mb-3">Khoảng giá</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range.label} className="flex items-center space-x-2">
              <Checkbox id={range.label} />
              <Label htmlFor={range.label}>{range.label}</Label>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Label className="text-sm">
            Tùy chỉnh: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
          </Label>
          <Slider value={priceRange} onValueChange={setPriceRange} max={50000000} step={1000000} className="mt-2" />
        </div>
      </div>

      {/* Rating filter */}
      <div>
        <h3 className="font-semibold mb-3">Đánh giá</h3>
        <div className="space-y-2">
          {[5, 4, 3].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating}`} />
              <Label htmlFor={`rating-${rating}`} className="flex items-center">
                <div className="flex">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  {Array.from({ length: 5 - rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gray-300" />
                  ))}
                </div>
                <span className="ml-2">từ {rating} sao</span>
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-red-600">
          Trang chủ
        </Link>
        <span>/</span>
        <span className="text-gray-900">{getCategoryName(category)}</span>
      </nav>

      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{getCategoryName(category)}</h1>
        <div className="flex items-center space-x-4">
          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Phổ biến nhất</SelectItem>
              <SelectItem value="newest">Mới nhất</SelectItem>
              <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
              <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
              <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
            </SelectContent>
          </Select>

          {/* View mode */}
          <div className="flex border rounded-lg">
            <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile filter */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Lọc
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Bộ lọc</SheetTitle>
                <SheetDescription>Lọc sản phẩm theo tiêu chí của bạn</SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-4">
            <FilterSidebar />
          </div>
        </div>

        {/* Products grid */}
        <div className="flex-1">
          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            }`}
          >
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className={`p-4 ${viewMode === "list" ? "flex space-x-4" : ""}`}>
                  <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : "mb-4"}`}>
                    <Link href={`/product/${product.id}`}>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={250}
                        height={250}
                        className={`object-cover rounded-lg group-hover:scale-105 transition-transform ${
                          viewMode === "list" ? "w-full h-32" : "w-full h-48"
                        }`}
                      />
                    </Link>
                    {product.isNew && <Badge className="absolute top-2 left-2 bg-green-600">Mới</Badge>}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                        <span className="text-white font-semibold">Hết hàng</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold line-clamp-2 hover:text-red-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews} đánh giá)</span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-lg font-bold text-red-600">{formatPrice(product.price)}</div>
                      {product.originalPrice > product.price && (
                        <div className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</div>
                      )}
                    </div>

                    <div className={`flex space-x-2 pt-2 ${viewMode === "list" ? "flex-col space-y-2 space-x-0" : ""}`}>
                      <Button className="flex-1 bg-red-600 hover:bg-red-700" disabled={!product.inStock}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.inStock ? "Mua ngay" : "Hết hàng"}
                      </Button>
                      <Button variant="outline" size="icon">
                        ♡
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <Button variant="outline" disabled>
                Trước
              </Button>
              <Button className="bg-red-600">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Sau</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
