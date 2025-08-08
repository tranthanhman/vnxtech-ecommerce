// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { Calendar, Eye, Share2, Facebook, Twitter, ArrowLeft, Heart, MessageCircle } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// // Mock data - trong thực tế sẽ fetch từ API
// const newsData = {
//   1: {
//     id: 1,
//     title: "iPhone 15 Pro Max chính thức ra mắt với nhiều tính năng đột phá",
//     excerpt: "Apple vừa công bố iPhone 15 Pro Max với chip A17 Pro mạnh mẽ và camera 48MP cải tiến...",
//     content: `
//       <p>Apple vừa chính thức ra mắt iPhone 15 Pro Max, phiên bản cao cấp nhất trong dòng iPhone 15 series với nhiều cải tiến đáng chú ý về hiệu năng, camera và thiết kế.</p>
      
//       <h2>Chip A17 Pro - Bước nhảy vọt về hiệu năng</h2>
//       <p>iPhone 15 Pro Max được trang bị chip A17 Pro được sản xuất trên tiến trình 3nm tiên tiến nhất hiện tại. Chip mới mang lại hiệu năng CPU nhanh hơn 10% và GPU mạnh hơn 20% so với thế hệ trước.</p>
      
//       <h2>Camera 48MP với nhiều cải tiến</h2>
//       <p>Hệ thống camera sau được nâng cấp với cảm biến chính 48MP, hỗ trợ zoom quang học 5x và nhiều tính năng chụp ảnh AI thông minh.</p>
      
//       <h2>Thiết kế titan cao cấp</h2>
//       <p>iPhone 15 Pro Max sử dụng khung titan Grade 5 cao cấp, vừa nhẹ hơn vừa bền hơn so với thép không gỉ trên các thế hệ trước.</p>
      
//       <h2>Giá bán và thời gian ra mắt</h2>
//       <p>iPhone 15 Pro Max có giá khởi điểm từ 34.990.000 VNĐ cho phiên bản 256GB và sẽ chính thức lên kệ từ ngày 22/9/2024.</p>
//     `,
//     image: "/placeholder.svg?height=400&width=800",
//     date: "2024-01-15",
//     views: 1234,
//     author: "Nguyễn Văn A",
//     category: "Tin tức",
//     tags: ["iPhone", "Apple", "Smartphone", "A17 Pro"],
//   },
// }

// const relatedNews = [
//   {
//     id: 2,
//     title: "Top 5 laptop gaming tốt nhất năm 2024",
//     image: "/placeholder.svg?height=100&width=150",
//     date: "2024-01-14",
//     category: "Review",
//   },
//   {
//     id: 3,
//     title: "Samsung Galaxy S24 Ultra: Đánh giá chi tiết",
//     image: "/placeholder.svg?height=100&width=150",
//     date: "2024-01-13",
//     category: "Review",
//   },
//   {
//     id: 4,
//     title: "Hướng dẫn chọn mua PC Gaming",
//     image: "/placeholder.svg?height=100&width=150",
//     date: "2024-01-12",
//     category: "Hướng dẫn",
//   },
// ]

// interface NewsDetailPageProps {
//   newsId: string
// }

// export function NewsDetailPage({ newsId }: NewsDetailPageProps) {
//   const [liked, setLiked] = useState(false)
//   const [likeCount, setLikeCount] = useState(45)

//   const article = newsData[newsId as keyof typeof newsData]

//   if (!article) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">Bài viết không tồn tại</h1>
//           <Link href="/news">
//             <Button>Quay lại trang tin tức</Button>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   const handleLike = () => {
//     setLiked(!liked)
//     setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
//   }

//   const handleShare = (platform: string) => {
//     const url = window.location.href
//     const text = article.title

//     switch (platform) {
//       case "facebook":
//         window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
//         break
//       case "twitter":
//         window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank")
//         break
//       default:
//         navigator.clipboard.writeText(url)
//         alert("Đã sao chép link bài viết!")
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Breadcrumb */}
//       <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
//         <Link href="/" className="hover:text-red-600">
//           Trang chủ
//         </Link>
//         <span>/</span>
//         <Link href="/news" className="hover:text-red-600">
//           Tin tức
//         </Link>
//         <span>/</span>
//         <span className="text-gray-900">{article.category}</span>
//       </nav>

//       {/* Back button */}
//       <div className="mb-6">
//         <Link href="/news">
//           <Button variant="ghost" className="flex items-center space-x-2">
//             <ArrowLeft className="h-4 w-4" />
//             <span>Quay lại</span>
//           </Button>
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Main content */}
//         <div className="lg:col-span-2">
//           <article className="bg-white rounded-lg shadow-sm overflow-hidden">
//             {/* Header */}
//             <div className="p-6 pb-4">
//               <div className="flex items-center space-x-2 mb-4">
//                 <Badge variant="secondary">{article.category}</Badge>
//                 {article.tags.map((tag) => (
//                   <Badge key={tag} variant="outline" className="text-xs">
//                     {tag}
//                   </Badge>
//                 ))}
//               </div>

//               <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{article.title}</h1>

//               <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center space-x-2">
//                     <Avatar className="h-8 w-8">
//                       <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
//                     </Avatar>
//                     <span>{article.author}</span>
//                   </div>
//                   <div className="flex items-center space-x-1">
//                     <Calendar className="h-4 w-4" />
//                     <span>{new Date(article.date).toLocaleDateString("vi-VN")}</span>
//                   </div>
//                   <div className="flex items-center space-x-1">
//                     <Eye className="h-4 w-4" />
//                     <span>{article.views.toLocaleString()} lượt xem</span>
//                   </div>
//                 </div>

//                 {/* Social share */}
//                 <div className="flex items-center space-x-2">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => handleShare("facebook")}
//                     className="text-blue-600 hover:bg-blue-50"
//                   >
//                     <Facebook className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => handleShare("twitter")}
//                     className="text-blue-400 hover:bg-blue-50"
//                   >
//                     <Twitter className="h-4 w-4" />
//                   </Button>
//                   <Button variant="ghost" size="sm" onClick={() => handleShare("copy")}>
//                     <Share2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             {/* Featured image */}
//             <div className="px-6 mb-6">
//               <Image
//                 src={article.image || "/placeholder.svg"}
//                 alt={article.title}
//                 width={800}
//                 height={400}
//                 className="w-full h-96 object-cover rounded-lg"
//               />
//             </div>

//             {/* Content */}
//             <div className="px-6 pb-6">
//               <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
//             </div>

//             <Separator />

//             {/* Actions */}
//             <div className="p-6">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <Button
//                     variant={liked ? "default" : "outline"}
//                     size="sm"
//                     onClick={handleLike}
//                     className={liked ? "bg-red-600 hover:bg-red-700" : ""}
//                   >
//                     <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-current" : ""}`} />
//                     {likeCount} Thích
//                   </Button>
//                   <Button variant="outline" size="sm">
//                     <MessageCircle className="h-4 w-4 mr-2" />
//                     12 Bình luận
//                   </Button>
//                 </div>
//                 <Button variant="outline" size="sm" onClick={() => handleShare("copy")}>
//                   <Share2 className="h-4 w-4 mr-2" />
//                   Chia sẻ
//                 </Button>
//               </div>
//             </div>
//           </article>
//         </div>

//         {/* Sidebar */}
//         <div className="lg:col-span-1">
//           <div className="space-y-6">
//             {/* Related articles */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Bài viết liên quan</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {relatedNews.map((news) => (
//                   <Link key={news.id} href={`/news/${news.id}`}>
//                     <div className="flex space-x-3 group cursor-pointer">
//                       <Image
//                         src={news.image || "/placeholder.svg"}
//                         alt={news.title}
//                         width={80}
//                         height={60}
//                         className="object-cover rounded flex-shrink-0"
//                       />
//                       <div className="flex-1">
//                         <h4 className="font-medium text-sm line-clamp-2 group-hover:text-red-600 transition-colors">
//                           {news.title}
//                         </h4>
//                         <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
//                           <Badge variant="outline" className="text-xs">
//                             {news.category}
//                           </Badge>
//                           <span>{new Date(news.date).toLocaleDateString("vi-VN")}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </CardContent>
//             </Card>

//             {/* Newsletter signup */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Đăng ký nhận tin</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm text-gray-600 mb-4">Nhận thông tin mới nhất về công nghệ và sản phẩm</p>
//                 <div className="space-y-2">
//                   <input
//                     type="email"
//                     placeholder="Email của bạn"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                   />
//                   <Button className="w-full bg-red-600 hover:bg-red-700">Đăng ký</Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import React from "react";

export default function NewsDetailPage() {
  return <div>NewsDetailPage</div>;
}
