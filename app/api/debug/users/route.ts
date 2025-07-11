import { NextResponse } from 'next/server'
import { findUserByEmail } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  try {
    const USERS_FILE = path.join(process.cwd(), 'data', 'users.json')
    
    if (!fs.existsSync(USERS_FILE)) {
      return NextResponse.json({ users: [], message: 'No users file found' })
    }

    const data = fs.readFileSync(USERS_FILE, 'utf8')
    const users = JSON.parse(data)
    
    // Remove passwords from response for security
    const safeUsers = users.map((user: any) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image
    }))

    return NextResponse.json({ 
      users: safeUsers,
      count: safeUsers.length,
      message: 'Users loaded successfully'
    })
  } catch (error) {
    console.error('Error reading users:', error)
    return NextResponse.json({ error: 'Failed to read users' }, { status: 500 })
  }
} 