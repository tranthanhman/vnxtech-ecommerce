import Image from "next/image"
import Link from "next/link"
import bannersData from "@/data/banners.json"

const promotions = bannersData.promotionalBanners

export function PromotionalBanners() {
  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promotions.map((promo) => (
          <Link key={promo.id} href={promo.href}>
            <div
              className={`relative h-48 rounded-lg overflow-hidden bg-gradient-to-r ${promo.color} group cursor-pointer`}
            >
              <Image
                src={promo.image || "/placeholder.svg"}
                alt={promo.title}
                fill
                className="object-cover opacity-30 group-hover:opacity-40 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
                  <p className="text-lg">{promo.subtitle}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
