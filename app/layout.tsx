import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { User, Bell, Settings, LogOut, Sun, Moon, Play, Video, BarChart3 } from 'lucide-react'
import Providers from '@/components/Providers'
import UserMenu from '@/components/UserMenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Competitive Programming Hub',
  description: 'Master competitive programming and technical interviews with comprehensive resources, practice problems, and learning paths.',
  keywords: ['competitive programming', 'leetcode', 'dsa', 'technical interviews', 'coding practice'],
}

const navLinks = [
  { href: '/', label: 'Dashboard', icon: null },
  { href: '/practice/enhanced', label: 'Practice', icon: Play },
  { href: '/problems', label: 'Problems', icon: null },
  { href: '/study-plans', label: 'Study Plans', icon: null },
  { href: '/courses', label: 'Courses', icon: Video },
  { href: '/contests', label: 'Contests', icon: null },
  { href: '/companies', label: 'Companies', icon: null },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/leaderboard', label: 'Leaderboard', icon: null },
  { href: '/community', label: 'Community', icon: null },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/auth/signup" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/auth/signin" as="fetch" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <Providers>
          {/* Navigation */}
          <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                {/* Logo and main nav */}
                <div className="flex items-center">
                  <Link href="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">CP</span>
                    </div>
                    <span className="font-bold text-xl text-gray-900">Competitive Programming Hub</span>
                  </Link>
                  
                  {/* Desktop Navigation */}
                  <div className="hidden lg:flex ml-10 space-x-8">
                    {navLinks.slice(1, 8).map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
                        prefetch={true}
                      >
                        {link.icon && <link.icon className="h-4 w-4" />}
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Right side - notifications and user menu */}
                <div className="flex items-center space-x-4">
                  {/* Notifications */}
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Bell className="h-5 w-5" />
                  </button>

                  {/* Theme toggle */}
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Sun className="h-5 w-5" />
                  </button>

                  {/* User menu */}
                  <UserMenu />
                </div>
              </div>
            </div>
          </nav>
          
          {/* Mobile Navigation */}
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-2">
            <div className="flex items-center gap-2 overflow-x-auto">
              {navLinks.slice(1, 8).map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-primary-600 px-3 py-1 rounded-md transition-colors font-medium text-sm whitespace-nowrap flex items-center gap-1"
                  prefetch={true}
                >
                  {link.icon && <link.icon className="h-3 w-3" />}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
} 