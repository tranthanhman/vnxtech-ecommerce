import ProductFilterSidebar from "@/components/product/product-filter-sidebar"
import ProductList from "@/components/product/product-list"
import PageBreadcrumb from "@/components/shared/PageBreadcrumb"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Filter } from "lucide-react"

// Accept params directly as a prop (Next.js convention)
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <PageBreadcrumb />

      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        {/* <h1 className="text-2xl font-bold">{getCategoryName(category)}</h1> */}
        <div className="flex items-center space-x-4">
          {/* Sort */}
          <Select >
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
          {/* <div className="flex border rounded-lg">
            <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div> */}

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
                <ProductFilterSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-4">
            <ProductFilterSidebar />
          </div>
        </div>

        {/* Products grid */}
        <ProductList slug={String(slug)} />
      </div>
    </div>
  )
}
