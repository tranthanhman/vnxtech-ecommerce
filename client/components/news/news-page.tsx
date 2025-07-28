"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Eye, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const newsData = [
  {
    id: 1,
    title: "iPhone 15 Pro Max chính thức ra mắt với nhiều tính năng đột phá",
    excerpt:
      "Apple vừa công bố iPhone 15 Pro Max với chip A17 Pro mạnh mẽ và camera 48MP cải tiến, mang đến trải nghiệm hoàn toàn mới cho người dùng...",
    content: "Nội dung chi tiết về iPhone 15 Pro Max...",
    image: "/placeholder.svg?height=300&width=400",
    date: "2024-01-15",
    views: 1234,
    author: "Nguyễn Văn A",
    category: "Tin tức",
    featured: true,
  },
  {
    id: 2,
    title: "Top 5 laptop gaming tốt nhất năm 2024 trong tầm giá 30 triệu",
    excerpt:
      "Khám phá những chiếc laptop gaming có hiệu năng mạnh mẽ và giá cả hợp lý nhất hiện tại trên thị trường...",
    content: "Nội dung chi tiết về laptop gaming...",
    image: "/placeholder.svg?height=300&width=400",
    date: "2024-01-14",
    views: 856,
    author: "Trần Thị B",
    category: "Review",
    featured: false,
  },
  {
    id: 3,
    title: "Samsung Galaxy S24 Ultra: Đánh giá chi tiết sau 1 tháng sử dụng",
    excerpt:
      "Trải nghiệm thực tế với Galaxy S24 Ultra và những điểm nổi bật đáng chú ý trong quá trình sử dụng hàng ngày...",
    content: "Nội dung chi tiết về Galaxy S24 Ultra...",
    image: "/placeholder.svg?height=300&width=400",
    date: "2024-01-13",
    views: 2156,
    author: "Lê Văn C",
    category: "Review",
    featured: true,
  },
  {
    id: 4,
    title: "Hướng dẫn chọn mua PC Gaming phù hợp với ngân sách",
    excerpt: "Những lưu ý quan trọng khi lựa chọn cấu hình PC Gaming cho từng mức giá và nhu cầu sử dụng...",
    content: "Nội dung chi tiết về PC Gaming...",
    image: "/placeholder.svg?height=300&width=400",
    date: "2024-01-12",
    views: 1789,
    author: "Phạm Văn D",
    category: "Hướng dẫn",
    featured: false,
  },
  {
    id: 5,
    title: "MacBook Air M3 vs MacBook Pro M3: So sánh chi tiết",
    excerpt: "Phân tích sự khác biệt giữa MacBook Air M3 và MacBook Pro M3 để giúp bạn lựa chọn phù hợp...",
    content: "Nội dung chi tiết về MacBook...",
    image: "/placeholder.svg?height=300&width=400",
    date: "2024-01-11",
    views: 987,
    author: "Hoàng Thị E",
    category: "So sánh",
    featured: false,
  },
  {
    id: 6,
    title: "Xu hướng công nghệ 2024: AI và IoT dẫn đầu",
    excerpt: "Những xu hướng công nghệ nổi bật sẽ định hình thị trường trong năm 2024...",
    content: "Nội dung chi tiết về xu hướng công nghệ...",
    image: "/placeholder.svg?height=300&width=400",
    date: "2024-01-10",
    views: 1456,
    author: "Vũ Văn F",
    category: "Tin tức",
    featured: false,
  },
]

const categories = ["Tất cả", "Tin tức", "Review", "Hướng dẫn", "So sánh"]

export function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [sortBy, setSortBy] = useState("newest")

  const filteredNews = newsData.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "Tất cả" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedNews = [...filteredNews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "popular":
        return b.views - a.views
      default:
        return 0
    }
  })

  const featuredNews = sortedNews.filter((article) => article.featured)
  const regularNews = sortedNews.filter((article) => !article.featured)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tin tức & Đánh giá</h1>
        <p className="text-gray-600">Cập nhật những thông tin mới nhất về công nghệ và sản phẩm</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="flex gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="oldest">Cũ nhất</SelectItem>
                <SelectItem value="popular">Phổ biến</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      {featuredNews.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài viết nổi bật</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredNews.slice(0, 2).map((article) => (
              <Card key={article.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      width={400}
                      height={250}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-600">Nổi bật</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary">{article.category}</Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <Link href={`/news/${article.id}`}>
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2 hover:text-red-600 transition-colors mb-3">
                        {article.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 line-clamp-3 mb-4">{article.excerpt}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(article.date).toLocaleDateString("vi-VN")}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{article.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Regular Articles */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tất cả bài viết</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularNews.map((article) => (
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
                    <Badge variant="secondary">{article.category}</Badge>
                  </div>
                </div>

                <div className="p-4">
                  <Link href={`/news/${article.id}`}>
                    <h3 className="font-semibold text-gray-800 line-clamp-2 hover:text-red-600 transition-colors mb-2">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">{article.excerpt}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-2">
                      <span>{article.author}</span>
                      <span>•</span>
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

        {/* Load more button */}
        <div className="text-center mt-8">
          <Button variant="outline" className="px-8 bg-transparent">
            Xem thêm bài viết
          </Button>
        </div>
      </div>
    </div>
  )
}
