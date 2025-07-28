"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Star, ShoppingCart, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const searchResults = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    image: "/placeholder.svg?height=200&width=200",
    price: 34990000,
    originalPrice: 36990000,
    rating: 4.9,
    reviews: 234,
    brand: "Apple",
    category: "Điện thoại",
  },
  {
    id: 2,
    name: "iPhone 14 Pro 128GB",
    image: "/placeholder.svg?height=200&width=200",
    price: 24990000,
    originalPrice: 26990000,
    rating: 4.8,
    reviews: 189,
    brand: "Apple",
    category: "Điện thoại",
  },
  {
    id: 3,
    name: "iPhone 13 128GB",
    image: "/placeholder.svg?height=200&width=200",
    price: 18990000,
    originalPrice: 20990000,
    rating: 4.7,
    reviews: 456,
    brand: "Apple",
    category: "Điện thoại",
  },
]

interface SearchResultsPageProps {
  query: string
}

export function SearchResultsPage({ query }: SearchResultsPageProps) {
  const [searchQuery, setSearchQuery] = useState(query)
  const [filteredResults, setFilteredResults] = useState(searchResults)

  useEffect(() => {
    if (query) {
      const filtered = searchResults.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredResults(filtered)
    } else {
      setFilteredResults(searchResults)
    }
  }, [query])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text

    const parts = text.split(new RegExp(`(${highlight})`, "gi"))
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500"
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Search results header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            Kết quả tìm kiếm{" "}
            {query && (
              <>
                cho &quot;<span className="text-red-600">{query}</span>&quot;
              </>
            )}
          </h1>
          <p className="text-gray-600">Tìm thấy {filteredResults.length} sản phẩm</p>
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Bộ lọc
        </Button>
      </div>

      {/* No results */}
      {filteredResults.length === 0 && (
        <div className="text-center py-16">
          <Search className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Không tìm thấy sản phẩm nào</h2>
          <p className="text-gray-500 mb-8">Thử tìm kiếm với từ khóa khác hoặc kiểm tra lại chính tả</p>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Gợi ý:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["iPhone", "Samsung", "Laptop", "Tablet"].map((suggestion) => (
                <Link key={suggestion} href={`/search?q=${suggestion}`}>
                  <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                    {suggestion}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search results */}
      {filteredResults.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredResults.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Link href={`/product/${product.id}`}>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform"
                    />
                  </Link>
                  <Badge variant="secondary" className="absolute top-2 right-2">
                    {product.category}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold line-clamp-2 hover:text-red-600 transition-colors">
                      {highlightText(product.name, query)}
                    </h3>
                  </Link>

                  <div className="text-sm text-gray-600">Thương hiệu: {highlightText(product.brand, query)}</div>

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

                  <div className="flex space-x-2 pt-2">
                    <Button className="flex-1 bg-red-600 hover:bg-red-700">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Mua ngay
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
      )}

      {/* Popular searches */}
      {query && (
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-4">Tìm kiếm phổ biến</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "iPhone 15",
              "Samsung Galaxy S24",
              "MacBook Air",
              "iPad Pro",
              "AirPods",
              "Laptop gaming",
              "Điện thoại giá rẻ",
              "Tablet học tập",
            ].map((term) => (
              <Link key={term} href={`/search?q=${encodeURIComponent(term)}`}>
                <Badge variant="outline" className="cursor-pointer hover:bg-white">
                  {term}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
