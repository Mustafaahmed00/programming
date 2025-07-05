'use client'

import { useState } from 'react'
import { User, Trophy, Award, Target, Calendar, Settings, Edit, Star, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react'

interface Achievement {
  id: number
  name: string
  description: string
  icon: string
  earned: boolean
  earnedDate?: string
  progress?: number
  total?: number
}

const achievements: Achievement[] = [
  {
    id: 1,
    name: "First Steps",
    description: "Solve your first problem",
    icon: "🎯",
    earned: true,
    earnedDate: "2024-01-10"
  },
  {
    id: 2,
    name: "Streak Master",
    description: "Maintain a 7-day solving streak",
    icon: "🔥",
    earned: true,
    earnedDate: "2024-01-15"
  },
  {
    id: 3,
    name: "Speed Demon",
    description: "Solve 10 problems in under 30 minutes each",
    icon: "⚡",
    earned: false,
    progress: 7,
    total: 10
  },
  {
    id: 4,
    name: "Accuracy Master",
    description: "Achieve 95%+ accuracy on 50 problems",
    icon: "🎯",
    earned: false,
    progress: 35,
    total: 50
  },
  {
    id: 5,
    name: "Algorithm Expert",
    description: "Solve 100 problems across all categories",
    icon: "🧠",
    earned: false,
    progress: 67,
    total: 100
  },
  {
    id: 6,
    name: "Contest Champion",
    description: "Participate in 5 coding contests",
    icon: "🏆",
    earned: false,
    progress: 2,
    total: 5
  }
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)

  const userStats = {
    problemsSolved: 67,
    currentStreak: 12,
    totalTime: '45h 30m',
    accuracy: 87.5,
    ranking: '#1,234',
    joinDate: '2024-01-01',
    level: 'Gold',
    points: 2847
  }

  const monthlyProgress = [
    { month: 'Jan', solved: 15 },
    { month: 'Feb', solved: 22 },
    { month: 'Mar', solved: 18 },
    { month: 'Apr', solved: 25 },
    { month: 'May', solved: 30 },
    { month: 'Jun', solved: 28 }
  ]

  const recentActivity = [
    { date: '2024-01-15', problem: 'Two Sum', difficulty: 'Easy', status: 'solved', time: '15m' },
    { date: '2024-01-14', problem: 'Valid Parentheses', difficulty: 'Easy', status: 'solved', time: '12m' },
    { date: '2024-01-13', problem: 'Container With Most Water', difficulty: 'Medium', status: 'attempted', time: '25m' },
    { date: '2024-01-12', problem: 'Merge Two Sorted Lists', difficulty: 'Easy', status: 'solved', time: '18m' },
    { date: '2024-01-11', problem: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', status: 'unsolved', time: '30m' }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'solved':
        return <CheckCircle className="h-4 w-4 text-success-600" />
      case 'attempted':
        return <Clock className="h-4 w-4 text-warning-600" />
      case 'unsolved':
        return <XCircle className="h-4 w-4 text-gray-400" />
      default:
        return <Target className="h-4 w-4 text-gray-400" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-success-600'
      case 'Medium':
        return 'text-warning-600'
      case 'Hard':
        return 'text-danger-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <User className="h-8 w-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          </div>
        </div>

        {/* Profile Header */}
        <div className="card mb-8">
          <div className="flex items-center space-x-6">
            <div className="h-20 w-20 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-600">JD</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                  {userStats.level}
                </span>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
              <p className="text-gray-600 mb-2">Competitive Programming Enthusiast</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Joined {new Date(userStats.joinDate).toLocaleDateString()}</span>
                <span>•</span>
                <span>{userStats.points} points</span>
                <span>•</span>
                <span>Rank #{userStats.ranking}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-gray-900">{userStats.problemsSolved}</div>
            <div className="text-sm text-gray-600">Problems Solved</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600">{userStats.currentStreak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-success-600">{userStats.accuracy}%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-600">{userStats.totalTime}</div>
            <div className="text-sm text-gray-600">Total Time</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 border">
          {['overview', 'achievements', 'activity', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Monthly Progress */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Progress</h3>
              <div className="flex items-end justify-between space-x-2">
                {monthlyProgress.map((month, index) => (
                  <div key={index} className="flex-1 text-center">
                    <div className="relative">
                      <div className="h-32 bg-gray-200 rounded-t-lg relative">
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-primary-600 rounded-t-lg transition-all duration-300"
                          style={{ height: `${(month.solved / 30) * 100}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-xs font-medium text-gray-600">{month.month}</div>
                      <div className="text-xs text-gray-500">{month.solved}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{activity.problem}</span>
                        <span className={`text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                          {activity.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{new Date(activity.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`card ${achievement.earned ? 'border-success-200 bg-success-50' : ''}`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <CheckCircle className="h-5 w-5 text-success-600" />
                    )}
                  </div>
                  
                  {achievement.earned ? (
                    <div className="text-xs text-success-600">
                      Earned {achievement.earnedDate && new Date(achievement.earnedDate).toLocaleDateString()}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{achievement.progress}/{achievement.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(achievement.progress! / achievement.total!) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity History</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{activity.problem}</span>
                      <span className={`text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                        {activity.difficulty}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(activity.date).toLocaleDateString()} • {activity.time}
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activity.status === 'solved' ? 'bg-success-100 text-success-700' :
                    activity.status === 'attempted' ? 'bg-warning-100 text-warning-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    defaultValue="Competitive Programming Enthusiast"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <button className="btn-primary">Save Changes</button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive updates about contests and achievements</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded text-primary-600" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Practice Reminders</h4>
                    <p className="text-sm text-gray-600">Daily reminders to practice problems</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded text-primary-600" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Dark Mode</h4>
                    <p className="text-sm text-gray-600">Use dark theme for better visibility</p>
                  </div>
                  <input type="checkbox" className="rounded text-primary-600" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 