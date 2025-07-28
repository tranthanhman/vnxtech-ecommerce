import { Star } from "lucide-react"

interface RatingDisplayProps {
  rating: number
  reviews?: number
  size?: "sm" | "md" | "lg"
  showReviews?: boolean
  className?: string
}

export function RatingDisplay({
  rating,
  reviews,
  size = "md",
  showReviews = true,
  className = "",
}: RatingDisplayProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex items-center">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`${sizeClasses[size]} ${
                i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className={`ml-1 text-gray-600 ${textSizeClasses[size]}`}>{rating}</span>
      </div>
      {showReviews && reviews && <span className={`text-gray-500 ${textSizeClasses[size]}`}>({reviews} đánh giá)</span>}
    </div>
  )
}
