import Image from "next/image"
import Link from "next/link"
import {  ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination"
import { Product, ProductListResponse } from "@/types/product"
import { formatPrice } from "@/utils/format-price"

interface Props {
  slug?: string;
}

export default async function ProductList({ slug }: Props) {
  const viewMode: 'grid' | 'list' = 'grid';

  const fetchProducts = async (): Promise<ProductListResponse> => {
    const res = await fetch(`http://localhost:8090/api/products/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    return res.json();
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products", slug],
    queryFn: fetchProducts,
  });

  const dehydratedState = dehydrate(queryClient);
  const productsResponse = queryClient.getQueryData<ProductListResponse>(["products", slug]);
  const products = productsResponse?.data.products ?? []
  // const pagination = productsResponse?.data.pagination ?? []

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex-1">
        <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {products?.map((product: Product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className={`p-4 ${viewMode === "list" ? "flex space-x-4" : ""}`}>
                <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : "mb-4"}`}>
                  <Link href={`/product/${product.id}`}>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={250}
                      height={250}
                      className={`object-cover rounded-lg group-hover:scale-105 transition-transform ${viewMode === "list" ? "w-full h-32" : "w-full h-48"
                        }`}
                    />
                  </Link>
                </div>

                <div className="flex-1 space-y-2">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold line-clamp-2 hover:text-red-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="space-y-1">
                    <div className="text-lg font-bold text-red-600">{formatPrice(product.price)}</div>
                    {product?.discountPrice > product.price && (
                      <div className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</div>
                    )}
                  </div>

                  <div className={`flex space-x-2 pt-2 ${viewMode === "list" ? "flex-col space-y-2 space-x-0" : ""}`}>
                    <Button className="flex-1 bg-red-600 hover:bg-red-700" disabled={product.stock < 0}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.stock > 0 ? "Mua ngay" : "Hết hàng"}
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

        {/* Pagination dummy (chưa dynamic) */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </HydrationBoundary>
  );
}
