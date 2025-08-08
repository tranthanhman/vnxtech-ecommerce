"use client";

import React from "react";
import Image from "next/image"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/utils/format-price"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/types/product";
import ProductQuantityControl from "./product-quantity-control";

export default function ProductInfo({ product }: { product: Product }) {
    const selectedImage = 0

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Product Images */}
                <div className="space-y-4">
                    <div className="aspect-square relative overflow-hidden rounded-lg border">
                        <Image
                            src={product?.gallery?.[0]?.url || "/placeholder.svg"}
                            alt={product?.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {product?.gallery?.map((image, index) => (
                            <button
                                key={index}
                                // onClick={() => setSelectedImage(index)}
                                className={`aspect-square relative overflow-hidden rounded-lg border-2 ${selectedImage === index ? "border-red-500" : "border-gray-200"
                                    }`}
                            >
                                <Image
                                    src={image?.url || "/placeholder.svg"}
                                    alt={`${product?.name} ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <Badge variant="secondary" className="mb-2">
                            {product?.brand?.name}
                        </Badge>
                        <h1 className="text-2xl font-bold mb-2">{product?.name}</h1>
                        {/* <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviews} đánh giá)
                </span>
              </div>
            </div> */}
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <div className="flex items-center space-x-4">
                            <span className="text-3xl font-bold text-red-600">{formatPrice(product?.price)}</span>
                        </div>
                    </div>

                    {/* Variants */}
                    <div>
                        <h3 className="font-semibold mb-3">Dung lượng:</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {product?.variants?.map((variant) => (
                                <button
                                    key={variant?.name}
                                    // onClick={() => setSelectedVariant(variant)}
                                    className={`p-3 border rounded-lg text-center ${product?.name === variant?.name
                                        ? "border-red-500 bg-red-50"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    <div className="font-medium">{variant?.name}</div>
                                    <div className="text-sm text-red-600">{formatPrice(variant?.price)}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Colors */}
                    {/* <div>
            <h3 className="font-semibold mb-3">Màu sắc: {selectedColor}</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  // onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-lg text-sm ${selectedColor === color
                    ? "border-red-500 bg-red-50 text-red-600"
                    : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div> */}

                    {/* Quantity */}
                    <ProductQuantityControl product={product} />

                    {/* Features */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                        <div className="flex items-center space-x-2">
                            <Truck className="h-5 w-5 text-green-600" />
                            <span className="text-sm">Miễn phí vận chuyển</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Shield className="h-5 w-5 text-blue-600" />
                            <span className="text-sm">Bảo hành 12 tháng</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RotateCcw className="h-5 w-5 text-purple-600" />
                            <span className="text-sm">Đổi trả 7 ngày</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Tabs */}
            <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description">Mô tả</TabsTrigger>
                    <TabsTrigger value="specifications">Thông số kỹ thuật</TabsTrigger>
                    <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Mô tả sản phẩm</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 leading-relaxed">{product?.description}</p>
                            <div className="mt-4 space-y-2">
                                <h4 className="font-semibold">Tính năng nổi bật:</h4>
                                <ul className="list-disc list-inside space-y-1 text-gray-700">
                                    <li>Chip A17 Pro với hiệu năng vượt trội</li>
                                    <li>Camera 48MP với khả năng zoom quang học 5x</li>
                                    <li>Màn hình Super Retina XDR 6.7 inch</li>
                                    <li>Khung titan cao cấp, bền bỉ</li>
                                    <li>Hỗ trợ sạc nhanh và sạc không dây</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="specifications" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Thông số kỹ thuật</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* {Object?.entries(product?.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b">
                    <span className="font-medium">{key}:</span>
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))} */}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Đánh giá từ khách hàng</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {/* Review summary */}
                                {/* <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-600">{product.rating}</div>
                    <div className="flex justify-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">{product.reviews} đánh giá</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <span className="text-sm w-8">{rating} ⭐</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : 5}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {rating === 5 ? "70%" : rating === 4 ? "20%" : "5%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div> */}

                                <Separator />

                                {/* Individual reviews */}
                                <div className="space-y-4">
                                    {[
                                        {
                                            name: "Nguyễn Văn A",
                                            rating: 5,
                                            date: "2024-01-15",
                                            comment: "Sản phẩm rất tốt, camera chụp ảnh đẹp, pin trâu. Giao hàng nhanh, đóng gói cẩn thận.",
                                        },
                                        {
                                            name: "Trần Thị B",
                                            rating: 4,
                                            date: "2024-01-10",
                                            comment: "Máy đẹp, chạy mượt. Chỉ có điều giá hơi cao một chút.",
                                        },
                                    ].map((review, index) => (
                                        <div key={index} className="border-b pb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-medium">{review.name}</span>
                                                    <div className="flex">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-500">{review.date}</span>
                                            </div>
                                            <p className="text-gray-700">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    )
}
