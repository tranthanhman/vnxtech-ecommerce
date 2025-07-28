import { ProductListingPage } from "@/components/product/product-listing-page"

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <ProductListingPage category={params.slug} />
}
