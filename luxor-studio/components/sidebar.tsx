'use client'

import { Panel } from '@/lib/types'

interface SidebarProps {
  activePanel: Panel
  onPanelChange: (panel: Panel) => void
}

const menuItems: { id: Panel; label: string; icon: string }[] = [
  { id: 'photo-studio', label: 'Photo Studio', icon: '🖼' },
  { id: 'product-writer', label: 'Product Writer', icon: '✏️' },
  { id: 'product-list', label: 'Product List', icon: '📋' },
]

export default function Sidebar({ activePanel, onPanelChange }: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-bg-secondary border-r border-border flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-8 border-b border-border">
        <div className="flex flex-col items-start">
          <span className="font-display text-2xl font-bold tracking-luxor text-text-primary">
            LUXOR
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-accent">·</span>
            <span className="font-display text-sm font-light tracking-studio text-text-secondary">
              STUDIO
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onPanelChange(item.id)}
                className={`w-full flex items-center gap-4 px-8 py-4 text-left transition-all duration-200 border-l-2 ${
                  activePanel === item.id
                    ? 'bg-bg-tertiary border-accent text-text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-display text-sm font-medium tracking-wide">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-border">
        <div className="text-text-tertiary text-xs font-mono">
          v1.0.0
        </div>
      </div>
    </aside>
  )
}
