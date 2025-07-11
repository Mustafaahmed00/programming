'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Zap, Clock, Award, TrendingUp, Target, Calendar, BarChart3, Activity, BookOpen, Users, Star, Trophy, Play, Video, Users2 } from 'lucide-react'
import { problems } from '@/data/problems'
import dynamic from 'next/dynamic'

// Dynamically import components with no SSR to avoid hydration issues
const AnalyticsDashboard = dynamic(() => import('@/components/AnalyticsDashboard'), { ssr: false })
const ContestSystem = dynamic(() => import('@/components/ContestSystem'), { ssr: false })
const VideoExplanations = dynamic(() => import('@/components/VideoExplanations'), { ssr: false })

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Simulate user stats based on problems data
  const total = problems.length
  const easy = problems.filter(p => p.difficulty === 'Easy').length
  const medium = problems.filter(p => p.difficulty === 'Medium').length
  const hard = problems.filter(p => p.difficulty === 'Hard').length
  const solved = Math.floor(total * 0.6)
  const attempted = Math.floor(total * 0.2)
  const streak = 7
  const totalTime = '12h 45m'
  const ranking = '#1,234'
  const accuracy = 87.5
  const weeklyGoal = 15
  const weeklyProgressCount = 12

  const stats = [
    { label: 'Problems Solved', value: solved, icon: CheckCircle, color: 'text-success-600', change: '+3 this week' },
    { label: 'Current Streak', value: `${streak} days`, icon: Zap, color: 'text-warning-600', change: '+2 days' },
    { label: 'Total Time', value: totalTime, icon: Clock, color: 'text-primary-600', change: '+2h 30m' },
    { label: 'Global Ranking', value: ranking, icon: Award, color: 'text-purple-600', change: '+45 positions' },
  ]

  const recentActivity = [
    { type: 'solved', problem: 'Two Sum', difficulty: 'Easy', time: '2 hours ago', timeTaken: '15m' },
    { type: 'solved', problem: 'Valid Parentheses', difficulty: 'Easy', time: '1 day ago', timeTaken: '12m' },
    { type: 'attempted', problem: 'Container With Most Water', difficulty: 'Medium', time: '2 days ago', timeTaken: '25m' },
    { type: 'solved', problem: 'Merge Two Sorted Lists', difficulty: 'Easy', time: '3 days ago', timeTaken: '18m' },
    { type: 'unsolved', problem: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', time: '4 days ago', timeTaken: '30m' },
  ]

  const learningPath = [
    { topic: 'Arrays & Linked Lists', status: 'completed', progress: 100 },
    { topic: 'Stacks & Queues', status: 'completed', progress: 100 },
    { topic: 'Trees & Graphs', status: 'in-progress', progress: 75 },
    { topic: 'Dynamic Programming', status: 'in-progress', progress: 45 },
    { topic: 'System Design', status: 'not-started', progress: 0 },
  ]

  const weeklyProgressData = [
    { day: 'Mon', solved: 3, goal: 3 },
    { day: 'Tue', solved: 2, goal: 3 },
    { day: 'Wed', solved: 4, goal: 3 },
    { day: 'Thu', solved: 1, goal: 3 },
    { day: 'Fri', solved: 2, goal: 3 },
    { day: 'Sat', solved: 0, goal: 3 },
    { day: 'Sun', solved: 0, goal: 3 },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'solved':
        return <CheckCircle className="h-4 w-4 text-success-600" />
      case 'attempted':
        return <Clock className="h-4 w-4 text-warning-600" />
      case 'unsolved':
        return <Target className="h-4 w-4 text-gray-400" />
      default:
        return <Activity className="h-4 w-4 text-gray-400" />
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-success-600'
      case 'in-progress':
        return 'text-warning-600'
      case 'not-started':
        return 'text-gray-400'
      default:
        return 'text-gray-600'
    }
  }

  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Coder!</h1>
          <p className="text-gray-600">You have solved <span className="font-semibold text-primary-600">{solved}</span> out of <span className="font-semibold text-primary-600">{total}</span> problems. Keep up the streak!</p>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-success-600 font-medium">{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500 rounded-lg">
                <Play className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Live Contests</h3>
                <p className="text-sm text-gray-600">Join real-time coding competitions</p>
              </div>
            </div>
            <div className="mt-4">
              <button className="btn-primary w-full">View Contests</button>
            </div>
          </div>

          <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-500 rounded-lg">
                <Video className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Video Explanations</h3>
                <p className="text-sm text-gray-600">Learn from expert instructors</p>
              </div>
            </div>
            <div className="mt-4">
              <button className="btn-primary w-full">Watch Videos</button>
            </div>
          </div>

          <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-500 rounded-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
                <p className="text-sm text-gray-600">Track your progress & insights</p>
              </div>
            </div>
            <div className="mt-4">
              <button className="btn-primary w-full">View Analytics</button>
            </div>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Weekly Progress</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Goal: {weeklyGoal} problems</span>
              <span className="text-sm font-medium text-primary-600">{weeklyProgressCount}/{weeklyGoal}</span>
            </div>
          </div>
          <div className="flex items-end justify-between space-x-2">
            {weeklyProgressData.map((day, index) => (
              <div key={index} className="flex-1 text-center">
                <div className="relative">
                  <div className="h-24 bg-gray-200 rounded-t-lg relative">
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-primary-600 rounded-t-lg transition-all duration-300"
                      style={{ height: `${(day.solved / day.goal) * 100}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-xs font-medium text-gray-600">{day.day}</div>
                  <div className="text-xs text-gray-500">{day.solved}/{day.goal}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Problem Breakdown */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Problem Breakdown</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                  <span>Easy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-success-600 font-bold">{easy}</span>
                  <span className="text-sm text-gray-500">({Math.round((easy/total)*100)}%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
                  <span>Medium</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-warning-600 font-bold">{medium}</span>
                  <span className="text-sm text-gray-500">({Math.round((medium/total)*100)}%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-danger-500 rounded-full"></div>
                  <span>Hard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-danger-600 font-bold">{hard}</span>
                  <span className="text-sm text-gray-500">({Math.round((hard/total)*100)}%)</span>
                </div>
              </div>
            </div>
            
            {/* Accuracy Chart */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Accuracy</span>
                <span className="text-sm font-bold text-primary-600">{accuracy}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${accuracy}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.problem}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span className={getDifficultyColor(activity.difficulty)}>{activity.difficulty}</span>
                      <span>•</span>
                      <span>{activity.timeTaken}</span>
                      <span>•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Path Progress */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Path</h2>
            <div className="space-y-4">
              {learningPath.map((path, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{path.topic}</span>
                    <span className={`text-xs font-medium ${getStatusColor(path.status)}`}>
                      {path.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        path.status === 'completed' ? 'bg-success-500' :
                        path.status === 'in-progress' ? 'bg-warning-500' :
                        'bg-gray-300'
                      }`}
                      style={{ width: `${path.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Analytics Section */}
        <div className="mt-8">
          <AnalyticsDashboard />
        </div>

        {/* Live Contests Section */}
        <div className="mt-8">
          <ContestSystem />
        </div>

        {/* Video Explanations Section */}
        <div className="mt-8">
          <VideoExplanations />
        </div>
      </div>
    </div>
  )
} 