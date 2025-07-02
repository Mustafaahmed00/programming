import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Competitive Programming Hub',
  description: 'Master competitive programming and technical interviews with comprehensive resources, practice problems, and learning paths.',
  keywords: ['competitive programming', 'leetcode', 'dsa', 'technical interviews', 'coding practice'],
}

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/problems', label: 'Problems' },
  { href: '/courses', label: 'Courses' },
  { href: '/companies', label: 'Companies' },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-4 sticky top-0 z-50">
          <span className="font-bold text-primary-700 text-lg mr-4">CP Hub</span>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-primary-600 px-3 py-1 rounded transition-colors font-medium"
              prefetch={true}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
} 