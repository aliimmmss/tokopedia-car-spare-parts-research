'use client'

import { useState } from 'react'
import { Panel } from '@/lib/types'
import Sidebar from '@/components/sidebar'
import PhotoStudio from './photo-studio/page'
import ProductWriter from './product-writer/page'
import ProductList from './product-list/page'

export default function Dashboard() {
  const [activePanel, setActivePanel] = useState<Panel>('photo-studio')

  const renderPanel = () => {
    switch (activePanel) {
      case 'photo-studio':
        return <PhotoStudio />
      case 'product-writer':
        return <ProductWriter />
      case 'product-list':
        return <ProductList />
      default:
        return <PhotoStudio />
    }
  }

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar activePanel={activePanel} onPanelChange={setActivePanel} />
      <main className="flex-1 ml-64">
        <div className="h-screen overflow-hidden">
          {renderPanel()}
        </div>
      </main>
    </div>
  )
}
