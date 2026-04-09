'use client'

import { Product } from '@/lib/types'

interface StatusBadgeProps {
  status: Product['status']
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'Ready':
        return 'bg-accent-secondary'
      case 'Published':
        return 'bg-accent-secondary'
      case 'Draft':
        return 'bg-accent-warning'
      default:
        return 'bg-text-tertiary'
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      <span className={`w-2 h-2 ${getStatusColor()}`}></span>
      <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
        {status}
      </span>
    </span>
  )
}
