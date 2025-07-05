import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { User, Bell, Settings, LogOut, Sun, Moon } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Competitive Programming Hub',
  description: 'Master competitive programming and technical interviews with comprehensive resources, practice problems, and learning paths.',
  keywords: ['competitive programming', 'leetcode', 'dsa', 'technical interviews', 'coding practice'],
}

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/problems', label: 'Problems' },
  { href: '/practice', label: 'Practice' },
  { href: '/study-plans', label: 'Study Plans' },
  { href: '/courses', label: 'Courses' },
  { href: '/companies', label: 'Companies' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/forum', label: 'Forum' },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-primary-700 text-xl">CP Hub</Link>
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md transition-colors font-medium text-sm"
                  prefetch={true}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Sun className="h-5 w-5" />
            </button>
            
            {/* Notifications */}
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
            </button>
            
            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-800 transition-colors">
                <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-600" />
                </div>
                <span className="hidden sm:block text-sm font-medium">John Doe</span>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                  <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                  <hr className="my-1" />
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Mobile Navigation */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-2">
          <div className="flex items-center gap-2 overflow-x-auto">
            {navLinks.slice(1).map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary-600 px-3 py-1 rounded-md transition-colors font-medium text-sm whitespace-nowrap"
                prefetch={true}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
} 