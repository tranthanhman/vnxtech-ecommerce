"use client"

import { useState } from "react"
import Link from "next/link"
import { User, Package, Heart, Settings, LogOut, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

const orderHistory = [
  {
    id: "DH001",
    date: "2024-01-15",
    status: "Đã giao",
    total: 34990000,
    items: [{ name: "iPhone 15 Pro Max 256GB", quantity: 1, price: 34990000 }],
  },
  {
    id: "DH002",
    date: "2024-01-10",
    status: "Đang giao",
    total: 6490000,
    items: [{ name: "AirPods Pro 2nd Gen", quantity: 1, price: 6490000 }],
  },
  {
    id: "DH003",
    date: "2024-01-05",
    status: "Đã hủy",
    total: 24990000,
    items: [{ name: "MacBook Air M3", quantity: 1, price: 24990000 }],
  },
]

const wishlistItems = [
  {
    id: 1,
    name: "Samsung Galaxy S24 Ultra",
    price: 32990000,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: 'iPad Pro 11" M4',
    price: 24990000,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function AccountPage() {
  const [user] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0123456789",
    address: "123 Đường ABC, Quận 1, TP.HCM",
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã giao":
        return "bg-green-100 text-green-800"
      case "Đang giao":
        return "bg-blue-100 text-blue-800"
      case "Đang xử lý":
        return "bg-yellow-100 text-yellow-800"
      case "Đã hủy":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <Link href="/account" className="flex items-center space-x-3 p-2 rounded-lg bg-red-50 text-red-600">
                  <User className="h-4 w-4" />
                  <span>Thông tin tài khoản</span>
                </Link>
                <Link href="/account/orders" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <Package className="h-4 w-4" />
                  <span>Đơn hàng của tôi</span>
                </Link>
                <Link href="/account/wishlist" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <Heart className="h-4 w-4" />
                  <span>Sản phẩm yêu thích</span>
                </Link>
                <Link href="/account/settings" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <Settings className="h-4 w-4" />
                  <span>Cài đặt</span>
                </Link>
                <Separator />
                <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 text-red-600 w-full text-left">
                  <LogOut className="h-4 w-4" />
                  <span>Đăng xuất</span>
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
              <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
              <TabsTrigger value="wishlist">Yêu thích</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cá nhân</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Họ và tên</label>
                      <div className="p-3 bg-gray-50 rounded-lg">{user.name}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <div className="p-3 bg-gray-50 rounded-lg">{user.email}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Số điện thoại</label>
                      <div className="p-3 bg-gray-50 rounded-lg">{user.phone}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Địa chỉ</label>
                      <div className="p-3 bg-gray-50 rounded-lg">{user.address}</div>
                    </div>
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700">Chỉnh sửa thông tin</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lịch sử đơn hàng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderHistory.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-4">
                            <span className="font-semibold">#{order.id}</span>
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          </div>
                          <div className="text-sm text-gray-600">{order.date}</div>
                        </div>

                        <div className="space-y-2 mb-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>
                                {item.name} x{item.quantity}
                              </span>
                              <span>{formatPrice(item.price)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t">
                          <div className="font-semibold">Tổng: {formatPrice(order.total)}</div>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Chi tiết
                            </Button>
                            {order.status === "Đã giao" && (
                              <Button variant="outline" size="sm">
                                Mua lại
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sản phẩm yêu thích</CardTitle>
                </CardHeader>
                <CardContent>
                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Chưa có sản phẩm yêu thích</p>
                      <Link href="/">
                        <Button className="bg-red-600 hover:bg-red-700">Khám phá sản phẩm</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="flex space-x-4 p-4 border rounded-lg">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold mb-2">{item.name}</h4>
                            <p className="text-red-600 font-bold mb-3">{formatPrice(item.price)}</p>
                            <div className="flex space-x-2">
                              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                Mua ngay
                              </Button>
                              <Button variant="outline" size="sm">
                                Xóa
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
