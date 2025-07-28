"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const initialCartItems = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    image: "/placeholder.svg?height=100&width=100",
    price: 34990000,
    originalPrice: 36990000,
    quantity: 1,
    color: "Titan Tự nhiên",
    variant: "256GB",
  },
  {
    id: 2,
    name: "AirPods Pro 2nd Gen",
    image: "/placeholder.svg?height=100&width=100",
    price: 6490000,
    originalPrice: 6990000,
    quantity: 2,
    color: "Trắng",
    variant: "Thường",
  },
]

export function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 1000000 ? 0 : 50000
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Giỏ hàng trống</h2>
          <p className="text-gray-500 mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-700">Tiếp tục mua sắm</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Giỏ hàng ({cartItems.length} sản phẩm)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <div className="text-sm text-gray-600 space-x-2">
                          <span>Màu: {item.color}</span>
                          <span>•</span>
                          <span>{item.variant}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-lg font-bold text-red-600">{formatPrice(item.price)}</div>
                        {item.originalPrice > item.price && (
                          <div className="text-sm text-gray-500 line-through">{formatPrice(item.originalPrice)}</div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Tóm tắt đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span>{shipping === 0 ? <Badge variant="secondary">Miễn phí</Badge> : formatPrice(shipping)}</span>
                </div>
                {shipping === 0 && <div className="text-sm text-green-600">🎉 Bạn được miễn phí vận chuyển!</div>}
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Tổng cộng:</span>
                <span className="text-red-600">{formatPrice(total)}</span>
              </div>

              <div className="space-y-2">
                <Link href="/checkout">
                  <Button className="w-full bg-red-600 hover:bg-red-700 h-12">Tiến hành thanh toán</Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full bg-transparent">
                    Tiếp tục mua sắm
                  </Button>
                </Link>
              </div>

              {/* Promotions */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Ưu đãi đặc biệt</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Miễn phí vận chuyển cho đơn hàng từ 1 triệu</li>
                  <li>• Bảo hành chính hãng 12 tháng</li>
                  <li>• Đổi trả trong 7 ngày</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
