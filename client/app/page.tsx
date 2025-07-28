import { HeroBanner } from "@/components/home/hero-banner"
import { CategoryNavigation } from "@/components/home/category-navigation"
import { FlashSale } from "@/components/home/flash-sale"
import { FeaturedProducts } from "@/components/home/featured-products"
import { PromotionalBanners } from "@/components/home/promotional-banners"
import { NewsSection } from "@/components/home/news-section"

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 space-y-12 py-8">
          <CategoryNavigation />
          <FlashSale />
          <FeaturedProducts />
          <PromotionalBanners />
          <NewsSection />
        </div>
      </div>
    </div>
  )
}
