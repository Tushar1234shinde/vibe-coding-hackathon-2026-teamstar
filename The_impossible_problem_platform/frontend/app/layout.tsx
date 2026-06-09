import './globals.css'
import type { Metadata } from 'next'
import { IBM_Plex_Sans, Space_Grotesk } from 'next/font/google'

const bodyFont = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
})

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '700'],
})

export const metadata: Metadata = {
  title: 'The Impossible Problem Platform',
  description: 'Solving Humanity\'s Hardest Problems Through Collective Intelligence.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>{children}</body>
    </html>
  )
}
