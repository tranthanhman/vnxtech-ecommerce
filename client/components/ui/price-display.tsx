interface PriceDisplayProps {
  price: number
  originalPrice?: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export function PriceDisplay({ price, originalPrice, size = "md", className = "" }: PriceDisplayProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  }

  const originalSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className={`space-y-1 ${className}`}>
      <div className={`font-bold text-red-600 ${sizeClasses[size]}`}>{formatPrice(price)}</div>
      {originalPrice && originalPrice > price && (
        <div className={`text-gray-500 line-through ${originalSizeClasses[size]}`}>{formatPrice(originalPrice)}</div>
      )}
    </div>
  )
}
