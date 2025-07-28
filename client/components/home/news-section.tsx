import Image from "next/image"
import Link from "next/link"
import { Calendar, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const news = [
  {
    id: 1,
    title: "iPhone 15 Pro Max chính thức ra mắt với nhiều tính năng đột phá",
    excerpt: "Apple vừa công bố iPhone 15 Pro Max với chip A17 Pro mạnh mẽ và camera 48MP cải tiến...",
    image: "/placeholder.svg?height=200&width=300",
    date: "2024-01-15",
    views: 1234,
    category: "Tin tức",
  },
  {
    id: 2,
    title: "Top 5 laptop gaming tốt nhất năm 2024 trong tầm giá 30 triệu",
    excerpt: "Khám phá những chiếc laptop gaming có hiệu năng mạnh mẽ và giá cả hợp lý...",
    image: "/placeholder.svg?height=200&width=300",
    date: "2024-01-14",
    views: 856,
    category: "Review",
  },
  {
    id: 3,
    title: "Samsung Galaxy S24 Ultra: Đánh giá chi tiết sau 1 tháng sử dụng",
    excerpt: "Trải nghiệm thực tế với Galaxy S24 Ultra và những điểm nổi bật đáng chú ý...",
    image: "/placeholder.svg?height=200&width=300",
    date: "2024-01-13",
    views: 2156,
    category: "Review",
  },
  {
    id: 4,
    title: "Hướng dẫn chọn mua PC Gaming phù hợp với ngân sách",
    excerpt: "Những lưu ý quan trọng khi lựa chọn cấu hình PC Gaming cho từng mức giá...",
    image: "/placeholder.svg?height=200&width=300",
    date: "2024-01-12",
    views: 1789,
    category: "Hướng dẫn",
  },
]

export function NewsSection() {
  return (
    <div className="py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Tin tức & Đánh giá</h2>
          <Link href="/news" className="text-blue-600 hover:text-blue-700 font-medium">
            Xem tất cả →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((article) => (
            <Card key={article.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <Link href={`/news/${article.id}`}>
                    <h3 className="font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors mb-2">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">{article.excerpt}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(article.date).toLocaleDateString("vi-VN")}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{article.views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
