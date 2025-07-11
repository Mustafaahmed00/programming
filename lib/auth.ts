import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'

// User type definition
interface User {
  id: string
  email: string
  password: string
  name: string
  image: string | null
}

// File-based user store that persists between server restarts
const USERS_FILE = path.join(process.cwd(), 'data', 'users.json')

// Ensure data directory exists
const dataDir = path.dirname(USERS_FILE)
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Initialize users file if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  const initialUsers: User[] = [
    {
      id: '1',
      email: 'demo@example.com',
      password: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1m', // 'password'
      name: 'Demo User',
      image: null
    }
  ]
  fs.writeFileSync(USERS_FILE, JSON.stringify(initialUsers, null, 2))
}

// Function to read users from file
const readUsers = (): User[] => {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading users file:', error)
    return []
  }
}

// Function to write users to file
const writeUsers = (users: User[]) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
  } catch (error) {
    console.error('Error writing users file:', error)
  }
}

// Function to add new users
export const addUser = (email: string, password: string, name: string) => {
  const users = readUsers()
  
  // Check if user already exists
  const existingUser = users.find((user: User) => user.email === email)
  if (existingUser) {
    throw new Error('User with this email already exists')
  }

  const hashedPassword = bcrypt.hashSync(password, 10)
  const newUser: User = {
    id: (users.length + 1).toString(),
    email,
    password: hashedPassword,
    name,
    image: null
  }
  
  users.push(newUser)
  writeUsers(users)
  return newUser
}

// Function to find user by email
export const findUserByEmail = (email: string): User | undefined => {
  const users = readUsers()
  return users.find((user: User) => user.email === email)
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials')
          return null
        }

        const user = findUserByEmail(credentials.email)

        if (!user) {
          console.log('User not found:', credentials.email)
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          console.log('Invalid password for user:', credentials.email)
          return null
        }

        console.log('User authenticated successfully:', user.email)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  debug: process.env.NODE_ENV === 'development'
} 