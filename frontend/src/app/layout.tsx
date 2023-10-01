import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Toast from '@/components/Toast'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mini App',
  description: 'Test app for Next.js + Tailwind CSS + TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Toast />
      </body>
    </html>
  )
}
