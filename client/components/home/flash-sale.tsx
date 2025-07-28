"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/product-card"
import { CountdownTimer } from "@/components/ui/countdown-timer"
import productsData from "@/data/products.json"

const flashSaleProducts = productsData.products.filter((product) => product.isFlashSale)

export function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  return (
    <div className="py-8">
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold">⚡ FLASH SALE</h2>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Kết thúc trong:</span>
              <CountdownTimer className="flex space-x-1" />
            </div>
          </div>
          <Link href="/flash-sale">
            <Button variant="secondary">Xem tất cả</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {flashSaleProducts.map((product) => (
          <ProductCard key={product.id} product={product} showSold={true} variant="default" />
        ))}
      </div>
    </div>
  )
}
