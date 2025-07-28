import Link from "next/link"
import { Phone, Laptop, Tablet, Headphones, Watch, Camera, Gamepad2, Tv } from "lucide-react"

const categories = [
  { name: "Điện thoại", icon: Phone, href: "/category/phone", color: "bg-blue-500" },
  { name: "Laptop", icon: Laptop, href: "/category/laptop", color: "bg-green-500" },
  { name: "Tablet", icon: Tablet, href: "/category/tablet", color: "bg-purple-500" },
  { name: "Phụ kiện", icon: Headphones, href: "/category/accessories", color: "bg-orange-500" },
  { name: "Đồng hồ", icon: Watch, href: "/category/watch", color: "bg-red-500" },
  { name: "Camera", icon: Camera, href: "/category/camera", color: "bg-indigo-500" },
  { name: "Gaming", icon: Gamepad2, href: "/category/gaming", color: "bg-pink-500" },
  { name: "TV", icon: Tv, href: "/category/tv", color: "bg-teal-500" },
]

export function CategoryNavigation() {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Danh mục sản phẩm</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="flex flex-col items-center p-4 rounded-lg hover:shadow-lg transition-shadow group"
          >
            <div className={`${category.color} p-4 rounded-full mb-3 group-hover:scale-110 transition-transform`}>
              <category.icon className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-center">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
