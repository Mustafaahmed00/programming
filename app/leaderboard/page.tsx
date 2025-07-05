'use client'

import { useState } from 'react'
import { Trophy, Medal, Crown, TrendingUp, Target, Star, Users, Award } from 'lucide-react'

interface LeaderboardUser {
  id: number
  name: string
  rank: number
  points: number
  problemsSolved: number
  streak: number
  accuracy: number
  joinDate: string
  avatar: string
  badges: string[]
  level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond'
}

const leaderboardUsers: LeaderboardUser[] = [
  {
    id: 1,
    name: "Alex Chen",
    rank: 1,
    points: 2847,
    problemsSolved: 156,
    streak: 45,
    accuracy: 94.2,
    joinDate: "2023-01-15",
    avatar: "AC",
    badges: ["Speed Demon", "Accuracy Master", "Streak King"],
    level: "Diamond"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    rank: 2,
    points: 2712,
    problemsSolved: 142,
    streak: 38,
    accuracy: 91.8,
    joinDate: "2023-02-20",
    avatar: "SJ",
    badges: ["Problem Solver", "Consistent Coder"],
    level: "Platinum"
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    rank: 3,
    points: 2589,
    problemsSolved: 138,
    streak: 32,
    accuracy: 89.5,
    joinDate: "2023-01-08",
    avatar: "MR",
    badges: ["Algorithm Master", "Quick Thinker"],
    level: "Platinum"
  },
  {
    id: 4,
    name: "Emily Davis",
    rank: 4,
    points: 2456,
    problemsSolved: 125,
    streak: 28,
    accuracy: 92.1,
    joinDate: "2023-03-10",
    avatar: "ED",
    badges: ["Efficiency Expert", "Clean Coder"],
    level: "Gold"
  },
  {
    id: 5,
    name: "David Kim",
    rank: 5,
    points: 2341,
    problemsSolved: 118,
    streak: 25,
    accuracy: 88.7,
    joinDate: "2023-02-05",
    avatar: "DK",
    badges: ["Problem Solver", "Dedicated Learner"],
    level: "Gold"
  },
  {
    id: 6,
    name: "Lisa Wang",
    rank: 6,
    points: 2218,
    problemsSolved: 112,
    streak: 22,
    accuracy: 90.3,
    joinDate: "2023-01-25",
    avatar: "LW",
    badges: ["Consistent Coder", "Quick Learner"],
    level: "Silver"
  },
  {
    id: 7,
    name: "James Wilson",
    rank: 7,
    points: 2105,
    problemsSolved: 108,
    streak: 19,
    accuracy: 87.4,
    joinDate: "2023-03-15",
    avatar: "JW",
    badges: ["Problem Solver"],
    level: "Silver"
  },
  {
    id: 8,
    name: "Maria Garcia",
    rank: 8,
    points: 1992,
    problemsSolved: 102,
    streak: 16,
    accuracy: 89.1,
    joinDate: "2023-02-12",
    avatar: "MG",
    badges: ["Dedicated Learner"],
    level: "Bronze"
  },
  {
    id: 9,
    name: "Tom Anderson",
    rank: 9,
    points: 1879,
    problemsSolved: 98,
    streak: 14,
    accuracy: 86.8,
    joinDate: "2023-01-30",
    avatar: "TA",
    badges: ["Quick Learner"],
    level: "Bronze"
  },
  {
    id: 10,
    name: "Anna Thompson",
    rank: 10,
    points: 1766,
    problemsSolved: 94,
    streak: 12,
    accuracy: 88.2,
    joinDate: "2023-03-05",
    avatar: "AT",
    badges: ["Consistent Coder"],
    level: "Bronze"
  }
]

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('points')

  const timeFilters = [
    { value: 'all', label: 'All Time' },
    { value: 'month', label: 'This Month' },
    { value: 'week', label: 'This Week' },
    { value: 'today', label: 'Today' }
  ]

  const categoryFilters = [
    { value: 'points', label: 'Points' },
    { value: 'problems', label: 'Problems Solved' },
    { value: 'streak', label: 'Streak' },
    { value: 'accuracy', label: 'Accuracy' }
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Diamond':
        return 'text-cyan-600 bg-cyan-100'
      case 'Platinum':
        return 'text-gray-600 bg-gray-100'
      case 'Gold':
        return 'text-yellow-600 bg-yellow-100'
      case 'Silver':
        return 'text-gray-500 bg-gray-100'
      case 'Bronze':
        return 'text-amber-700 bg-amber-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStats = () => {
    const totalUsers = leaderboardUsers.length
    const avgPoints = leaderboardUsers.reduce((sum, user) => sum + user.points, 0) / totalUsers
    const totalProblems = leaderboardUsers.reduce((sum, user) => sum + user.problemsSolved, 0)
    const avgAccuracy = leaderboardUsers.reduce((sum, user) => sum + user.accuracy, 0) / totalUsers

    return { totalUsers, avgPoints, totalProblems, avgAccuracy }
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Trophy className="h-8 w-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
          </div>
          <p className="text-gray-600">Compete with other coders and track your progress</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.totalUsers}</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600">{Math.floor(stats.avgPoints)}</div>
            <div className="text-sm text-gray-600">Avg Points</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-success-600">{stats.totalProblems}</div>
            <div className="text-sm text-gray-600">Problems Solved</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.avgAccuracy.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Avg Accuracy</div>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Time Period:</label>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {timeFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>{filter.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categoryFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>{filter.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {leaderboardUsers.slice(0, 3).map((user, index) => (
            <div key={user.id} className={`card text-center ${index === 0 ? 'bg-gradient-to-b from-yellow-50 to-yellow-100 border-yellow-200' : ''}`}>
              <div className="flex justify-center mb-4">
                {getRankIcon(user.rank)}
              </div>
              <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary-600">{user.avatar}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{user.name}</h3>
              <div className="text-3xl font-bold text-primary-600 mb-2">{user.points}</div>
              <div className="text-sm text-gray-600 mb-4">points</div>
              <div className="flex justify-center space-x-2 mb-4">
                {user.badges.slice(0, 2).map((badge, idx) => (
                  <span key={idx} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                    {badge}
                  </span>
                ))}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(user.level)}`}>
                {user.level}
              </span>
            </div>
          ))}
        </div>

        {/* Leaderboard Table */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Full Leaderboard</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Rank</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Points</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Problems</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Streak</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Accuracy</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Level</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Badges</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(user.rank)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-primary-600">{user.avatar}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">Joined {new Date(user.joinDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900">{user.points.toLocaleString()}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <Target className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{user.problemsSolved}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{user.streak} days</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{user.accuracy}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(user.level)}`}>
                        {user.level}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-1">
                        {user.badges.slice(0, 3).map((badge, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {badge}
                          </span>
                        ))}
                        {user.badges.length > 3 && (
                          <span className="text-xs text-gray-500">+{user.badges.length - 3}</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Speed Demon</h3>
              <p className="text-gray-600 text-sm">Solve 10 problems in under 30 minutes each</p>
            </div>
            <div className="card text-center">
              <Target className="h-12 w-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Streak King</h3>
              <p className="text-gray-600 text-sm">Maintain a 30-day solving streak</p>
            </div>
            <div className="card text-center">
              <Star className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Accuracy Master</h3>
              <p className="text-gray-600 text-sm">Achieve 95%+ accuracy on 50 problems</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 