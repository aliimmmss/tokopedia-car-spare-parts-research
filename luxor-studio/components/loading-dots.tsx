'use client'

export default function LoadingDots() {
  return (
    <span className="inline-flex gap-1">
      <span className="w-1.5 h-1.5 bg-text-primary animate-pulse"></span>
      <span className="w-1.5 h-1.5 bg-text-primary animate-pulse" style={{ animationDelay: '0.2s' }}></span>
      <span className="w-1.5 h-1.5 bg-text-primary animate-pulse" style={{ animationDelay: '0.4s' }}></span>
    </span>
  )
}
