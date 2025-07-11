'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Settings, LogOut, LogIn, UserPlus } from 'lucide-react'

export default function UserMenu() {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const router = useRouter()

  if (status === 'loading') {
    return (
      <div className="flex items-center space-x-2 p-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex items-center space-x-2">
        <Link
          href="/auth/signin"
          className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
        >
          <LogIn className="h-4 w-4" />
          Sign In
        </Link>
        <Link
          href="/auth/signup"
          className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
        >
          <UserPlus className="h-4 w-4" />
          Sign Up
        </Link>
      </div>
    )
  }

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      setIsOpen(false)
      
      // Sign out with redirect to home page
      await signOut({ 
        callbackUrl: '/',
        redirect: true 
      })
    } catch (error) {
      console.error('Sign out error:', error)
      // Fallback: redirect to home page manually
      router.push('/')
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 text-gray-700 hover:text-gray-900 transition-colors"
      >
        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-medium">
          {session.user?.name || session.user?.email || 'User'}
        </span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-2">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">
                {session.user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500">
                {session.user?.email}
              </p>
            </div>
            
            <Link 
              href="/profile" 
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
            
            <Link 
              href="/settings" 
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
            
            <hr className="my-1" />
            
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut className="h-4 w-4" />
              <span>{isSigningOut ? 'Signing out...' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 