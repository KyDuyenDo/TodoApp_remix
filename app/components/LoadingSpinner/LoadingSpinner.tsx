import React from "react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: string
  text?: string
  className?: string
}

export default function LoadingSpinner({ size = "md", color = "#3b82f6", text, className = "" }: LoadingSpinnerProps) {
  const sizeMap = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`${sizeMap[size]} border-4 border-t-transparent rounded-full animate-spin`}
        style={{ borderColor: `${color} transparent transparent transparent` }}
        role="status"
        aria-label="loading"
      />
      {text && <p className="mt-2 text-sm text-gray-500">{text}</p>}
    </div>
  )
}

