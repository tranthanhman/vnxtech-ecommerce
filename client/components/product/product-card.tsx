import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { RatingDisplay } from "@/components/ui/rating-display"
import { PriceDisplay } from "@/components/ui/price-display"

interface Product {
  id: number
  name: string
  slug: string
  brand: string
  category: string
  categoryName: string
  images: string[]
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  inStock: boolean
  isNew?: boolean
  isFeatured?: boolean
  sold?: number
}

interface ProductCardProps {
  product: Product
  showCategory?: boolean
  showSold?: boolean
  variant?: "default" | "compact" | "featured"
  className?: string
}

export function ProductCard({
  product,
  showCategory = false,
  showSold = false,
  variant = "default",
  className = "",
}: ProductCardProps) {
  const isCompact = variant === "compact"
  const isFeatured = variant === "featured"

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardContent className="p-4">
        <div className="relative mb-4">
          <Link href={`/product/${product.slug}`}>
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              width={isCompact ? 200 : 250}
              height={isCompact ? 200 : 250}
              className={`w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300 ${
                isCompact ? "h-32" : "h-48"
              }`}
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && <Badge className="bg-green-600">Mới</Badge>}
            {product.discount > 0 && <Badge className="bg-red-600">-{product.discount}%</Badge>}
          </div>

          {showCategory && (
            <Badge variant="secondary" className="absolute top-2 right-2">
              {product.categoryName}
            </Badge>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <span className="text-white font-semibold">Hết hàng</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Link href={`/product/${product.slug}`}>
            <h3
              className={`font-semibold line-clamp-2 hover:text-red-600 transition-colors ${
                isCompact ? "text-sm" : ""
              }`}
            >
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center justify-between">
            <RatingDisplay rating={product.rating} reviews={product.reviews} size={isCompact ? "sm" : "md"} />
            {showSold && product.sold && <span className="text-sm text-gray-500">Đã bán {product.sold}</span>}
          </div>

          <PriceDisplay price={product.price} originalPrice={product.originalPrice} size={isCompact ? "sm" : "md"} />

          <div className={`flex gap-2 pt-2 ${isCompact ? "flex-col" : ""}`}>
            <Button
              className={`bg-red-600 hover:bg-red-700 ${isCompact ? "text-xs h-8" : "flex-1"}`}
              disabled={!product.inStock}
            >
              <ShoppingCart className={`${isCompact ? "h-3 w-3" : "h-4 w-4"} mr-2`} />
              {product.inStock ? "Mua ngay" : "Hết hàng"}
            </Button>
            {!isCompact && (
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
