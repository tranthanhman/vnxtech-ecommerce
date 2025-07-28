"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  endTime?: Date
  initialHours?: number
  initialMinutes?: number
  initialSeconds?: number
  onComplete?: () => void
  className?: string
}

export function CountdownTimer({
  endTime,
  initialHours = 12,
  initialMinutes = 34,
  initialSeconds = 56,
  onComplete,
  className = "",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      if (endTime) {
        const now = new Date().getTime()
        const distance = endTime.getTime() - now

        if (distance > 0) {
          setTimeLeft({
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
          })
        } else {
          setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
          onComplete?.()
        }
      } else {
        setTimeLeft((prev) => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 }
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
          } else if (prev.hours > 0) {
            return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
          } else {
            onComplete?.()
            return prev
          }
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime, onComplete])

  return (
    <div className={`flex space-x-1 ${className}`}>
      <div className="bg-white text-red-600 px-2 py-1 rounded font-bold">
        {timeLeft.hours.toString().padStart(2, "0")}
      </div>
      <span>:</span>
      <div className="bg-white text-red-600 px-2 py-1 rounded font-bold">
        {timeLeft.minutes.toString().padStart(2, "0")}
      </div>
      <span>:</span>
      <div className="bg-white text-red-600 px-2 py-1 rounded font-bold">
        {timeLeft.seconds.toString().padStart(2, "0")}
      </div>
    </div>
  )
}
