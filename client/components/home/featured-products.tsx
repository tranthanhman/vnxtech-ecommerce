import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const featuredProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    image: "/placeholder.svg?height=250&width=250",
    price: 34990000,
    originalPrice: 36990000,
    rating: 4.9,
    reviews: 234,
    isNew: true,
    category: "Điện thoại",
  },
  {
    id: 2,
    name: 'MacBook Pro 14" M3 Pro',
    image: "/placeholder.svg?height=250&width=250",
    price: 52990000,
    originalPrice: 54990000,
    rating: 4.8,
    reviews: 156,
    isNew: false,
    category: "Laptop",
  },
  {
    id: 3,
    name: 'iPad Air 11" M2',
    image: "/placeholder.svg?height=250&width=250",
    price: 16990000,
    originalPrice: 18990000,
    rating: 4.7,
    reviews: 89,
    isNew: true,
    category: "Tablet",
  },
  {
    id: 4,
    name: "AirPods Pro 2nd Gen",
    image: "/placeholder.svg?height=250&width=250",
    price: 6490000,
    originalPrice: 6990000,
    rating: 4.8,
    reviews: 445,
    isNew: false,
    category: "Phụ kiện",
  },
  {
    id: 5,
    name: "Samsung Galaxy Tab S9",
    image: "/placeholder.svg?height=250&width=250",
    price: 19990000,
    originalPrice: 21990000,
    rating: 4.6,
    reviews: 67,
    isNew: false,
    category: "Tablet",
  },
  {
    id: 6,
    name: "Dell XPS 13 Plus",
    image: "/placeholder.svg?height=250&width=250",
    price: 32990000,
    originalPrice: 34990000,
    rating: 4.7,
    reviews: 123,
    isNew: true,
    category: "Laptop",
  },
  {
    id: 7,
    name: "Sony WH-1000XM5",
    image: "/placeholder.svg?height=250&width=250",
    price: 8990000,
    originalPrice: 9990000,
    rating: 4.9,
    reviews: 289,
    isNew: false,
    category: "Phụ kiện",
  },
  {
    id: 8,
    name: "Google Pixel 8 Pro",
    image: "/placeholder.svg?height=250&width=250",
    price: 24990000,
    originalPrice: 26990000,
    rating: 4.5,
    reviews: 78,
    isNew: true,
    category: "Điện thoại",
  },
]

export function FeaturedProducts() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Sản phẩm nổi bật</h2>
        <Link href="/products">
          <Button variant="outline">Xem tất cả</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <Link href={`/product/${product.id}`}>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={250}
                    height={250}
                    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                {product.isNew && <Badge className="absolute top-2 left-2 bg-green-600">Mới</Badge>}
                <Badge variant="secondary" className="absolute top-2 right-2">
                  {product.category}
                </Badge>
              </div>

              <div className="space-y-2">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-semibold line-clamp-2 hover:text-red-600 transition-colors">{product.name}</h3>
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
    </div>
  )
}
