import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "../product/product-card"
import { APIResponse } from "@/types/api"
import { ProductListResponse } from "@/types/product"

async function getFeaturedProducts(): Promise<APIResponse<ProductListResponse>> {
  const res = await fetch("http://localhost:8090/api/products?limit=12", {
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error("Network response was not ok")
  }
  const data: APIResponse<ProductListResponse> = await res.json()
  return data
}

export async function FeaturedProducts() {
  const data = await getFeaturedProducts()
  const { products } = data.data

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Sản phẩm nổi bật</h2>
        <Link href="/products">
          <Button variant="outline">Xem tất cả</Button>
        </Link>
      </div>

      {products?.length === 0 ? (
        <div>Không có sản phẩm nổi bật.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
