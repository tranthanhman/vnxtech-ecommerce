import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Product } from "@/types/product"
import { formatPrice } from "@/utils/format-price"

interface ProductCardProps {
  product: Product
}

export function ProductCard({
  product,
}: ProductCardProps) {
  console.log('product', product?.thumbnail?.url);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <div className="relative mb-4">
          <Link href={`/${product?.slug}`}>
            <Image
              src={product?.thumbnail?.url || "/placeholder.svg"}
              alt={product?.name}
              width={250}
              height={250}
              className="w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300 h-48"
            />
          </Link>

          <Badge variant="secondary" className="absolute top-2 right-2">
            {product?.category?.name}
          </Badge>
        </div>

        <div className="space-y-2">
          <Link href={`/${product?.slug}`}>
            <h3
              className="font-semibold line-clamp-2 hover:text-red-600 transition-colors"
            >
              {product?.name}
            </h3>
          </Link>

          <div className="space-y-1">
            <div className="font-bold text-red-600">{formatPrice(product?.price)}</div>
            {product.discountPrice && product?.discountPrice > product?.price && (
              <div className="text-gray-500 line-through">{formatPrice(product?.discountPrice)}</div>
            )}
          </div>


          <div className="flex gap-2 pt-2">
            <Button
              className="bg-red-600 hover:bg-red-700 flex-1"
              disabled={!product?.stock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product?.stock ? "Mua ngay" : "Hết hàng"}
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
