
import { Product } from "@/types/product"
import PageBreadcrumb from "@/components/shared/PageBreadcrumb"
import ProductInfo from "@/components/product/product-info";
import { notFound } from "next/navigation";

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await fetch(`http://localhost:8090/api/products/${slug}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    if (!data?.success || !data?.data) {
      return null;
    }
    return data.data;
  } catch (error) {
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <PageBreadcrumb />

      {/* Product Info */}
      <ProductInfo product={product} />
    </div>
  )
}
