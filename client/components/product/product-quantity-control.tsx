"use client";
import React, { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { Heart, Share2, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function ProductQuantityControl({ product }: { product: Product }) {
    const router = useRouter()
    const { isAuthenticated, openAuthModal } = useAuthStore()
    const [quantity, setQuantity] = useState<number>(1);
    const { addItem } = useCartStore();

    const handleUpdateQuantity = useCallback((delta: number) => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity + delta;
            return newQuantity > 0 ? newQuantity : prevQuantity;
        });
    }, []);

    const handleAddToCart = useCallback(() => {
        if (!isAuthenticated) {
            openAuthModal()
            // const currentPath = window.location.pathname
            // router.push(`/login?redirectTo=${encodeURIComponent(currentPath)}`)
            // return

            return
        }

        console.log('Add to Cart nè');

    }, [isAuthenticated, openAuthModal]);

    return (
        <>
            <div>
                <h3 className="font-semibold mb-3">Số lượng:</h3>
                <div className="flex items-center space-x-4">
                    <div className="flex border rounded-lg">
                        <button
                            onClick={() => handleUpdateQuantity(-1)}
                            className="px-3 py-2 hover:bg-gray-100"
                            type="button"
                        >
                            -
                        </button>
                        <span
                            id="product-quantity-span"
                            className="w-12 text-center border-x flex items-center justify-center"
                        >
                            {quantity}
                        </span>
                        <button
                            onClick={() => handleUpdateQuantity(1)}
                            className="px-3 py-2 hover:bg-gray-100"
                            type="button"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
                <div className="flex space-x-4">
                    <Button onClick={handleAddToCart} className="flex-1 bg-red-600 hover:bg-red-700 h-12">
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Thêm vào giỏ hàng
                    </Button>
                    <Button variant="outline" size="icon" className="h-12 w-12 bg-transparent">
                        <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-12 w-12 bg-transparent">
                        <Share2 className="h-5 w-5" />
                    </Button>
                </div>
                <Button className="w-full h-12 bg-orange-600 hover:bg-orange-700">Mua ngay</Button>
            </div>
        </>
    )
}
