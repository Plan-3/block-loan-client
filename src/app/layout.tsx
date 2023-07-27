import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Citizen',
  description: 'Decentralized lending platform for the people'
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
