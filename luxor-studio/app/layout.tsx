import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Luxor Studio',
  description: 'Product Management Dashboard for Commercial Vehicle Spare Parts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
