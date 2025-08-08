"use client";

import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Star } from "lucide-react";

// Dummy data for brands and price ranges
const brands = ["Apple", "Samsung", "Xiaomi", "Oppo", "Vivo"];
const priceRanges = [
    { label: "Dưới 5 triệu", min: 0, max: 5000000 },
    { label: "5 - 10 triệu", min: 5000000, max: 10000000 },
    { label: "10 - 20 triệu", min: 10000000, max: 20000000 },
    { label: "Trên 20 triệu", min: 20000000, max: 50000000 },
];

// Helper to format price
function formatPrice(price: number) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
    }).format(price);
}

export default function ProductFilterSidebar() {
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);

    return (
        <div className="space-y-6">
            {/* Brand filter */}
            <div>
                <h3 className="font-semibold mb-3">Thương hiệu</h3>
                <div className="space-y-2">
                    {brands.map((brand) => (
                        <div key={brand} className="flex items-center space-x-2">
                            <Checkbox
                                id={brand}
                                checked={selectedBrands.includes(brand)}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setSelectedBrands([...selectedBrands, brand]);
                                    } else {
                                        setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                                    }
                                }}
                            />
                            <Label htmlFor={brand}>{brand}</Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price filter */}
            <div>
                <h3 className="font-semibold mb-3">Khoảng giá</h3>
                <div className="space-y-2">
                    {priceRanges.map((range) => (
                        <div key={range.label} className="flex items-center space-x-2">
                            <Checkbox id={range.label} />
                            <Label htmlFor={range.label}>{range.label}</Label>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <Label className="text-sm">
                        Tùy chỉnh: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </Label>
                    <Slider value={priceRange} onValueChange={setPriceRange} max={50000000} step={1000000} className="mt-2" />
                </div>
            </div>

            {/* Rating filter */}
            <div>
                <h3 className="font-semibold mb-3">Đánh giá</h3>
                <div className="space-y-2">
                    {[5, 4, 3].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                            <Checkbox id={`rating-${rating}`} />
                            <Label htmlFor={`rating-${rating}`} className="flex items-center">
                                <div className="flex">
                                    {Array.from({ length: rating }).map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                    {Array.from({ length: 5 - rating }).map((_, i) => (
                                        <Star key={i} className="h-4 w-4 text-gray-300" />
                                    ))}
                                </div>
                                <span className="ml-2">từ {rating} sao</span>
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
