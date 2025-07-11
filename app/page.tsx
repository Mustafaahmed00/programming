'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { CheckCircle, Zap, Clock, Award, TrendingUp, Target, Calendar, BarChart3, Activity, BookOpen, Users, Star, Trophy, Play, Video, Users2 } from 'lucide-react'
import { problems } from '@/data/problems'
import { ProgressTracker, UserProgress } from '@/lib/progress'
import dynamic from 'next/dynamic'

// Dynamically import components with no SSR to avoid hydration issues
const AnalyticsDashboard = dynamic(() => import('@/components/AnalyticsDashboard'), { ssr: false })
const ContestSystem = dynamic(() => import('@/components/ContestSystem'), { ssr: false })
const VideoExplanations = dynamic(() => import('@/components/VideoExplanations'), { ssr: false })

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && session?.user?.email) {
      const progress = ProgressTracker.getProgress(session.user.email)
      setUserProgress(progress)
    }
  }, [isClient, session])

  // Navigation handlers
  const handleViewContests = () => {
    router.push('/contests')
  }

  const handleWatchVideos = () => {
    router.push('/videos')
  }

  const handleViewAnalytics = () => {
    router.push('/analytics')
  }

  const handleSignIn = () => {
    router.push('/auth/signin')
  }

  const handleSignUp = () => {
    router.push('/auth/signup')
  }

  const handleStartPractice = () => {
    router.push('/practice/enhanced')
  }

  const handleViewAllActivity = () => {
    router.push('/practice/enhanced')
  }

  const handleContinueLearning = () => {
    router.push('/courses')
  }

  const handleViewDetailedProgress = () => {
    router.push('/analytics')
  }

  const handleStatsClick = (label: string) => {
    if (label === 'Problems Solved') {
      router.push('/practice/enhanced')
    } else if (label === 'Current Streak') {
      router.push('/analytics')
    } else if (label === 'Total Time') {
      router.push('/analytics')
    } else if (label === 'Global Ranking') {
      router.push('/contests')
    }
  }

  const handleWeeklyProgressClick = () => {
    router.push('/practice/enhanced')
  }

  const handleRecentActivityClick = () => {
    router.push('/practice/enhanced')
  }

  const handleLearningPathClick = () => {
    router.push('/courses')
  }

  // Get real stats from user progress
  const getStats = () => {
    if (!userProgress) {
      return {
        total: problems.length,
        easy: problems.filter(p => p.difficulty === 'Easy').length,
        medium: problems.filter(p => p.difficulty === 'Medium').length,
        hard: problems.filter(p => p.difficulty === 'Hard').length,
        solved: 0,
        attempted: 0,
        streak: 0,
        totalTime: '0h 0m',
        ranking: '#N/A',
        accuracy: 0,
        weeklyGoal: 15,
        weeklyProgressCount: 0
      }
    }

    const total = problems.length
    const solved = userProgress.problemsSolved.length
    const attempted = userProgress.problemsAttempted.length
    const streak = userProgress.currentStreak
    const totalTimeHours = Math.floor(userProgress.totalTime / 3600)
    const totalTimeMinutes = Math.floor((userProgress.totalTime % 3600) / 60)
    const totalTime = `${totalTimeHours}h ${totalTimeMinutes}m`
    const ranking = '#1,234' // Mock ranking for now
    const accuracy = userProgress.accuracy
    const weeklyGoal = userProgress.weeklyGoal
    const weeklyProgressCount = userProgress.weeklyProgress

    return {
      total,
      easy: problems.filter(p => p.difficulty === 'Easy').length,
      medium: problems.filter(p => p.difficulty === 'Medium').length,
      hard: problems.filter(p => p.difficulty === 'Hard').length,
      solved,
      attempted,
      streak,
      totalTime,
      ranking,
      accuracy,
      weeklyGoal,
      weeklyProgressCount
    }
  }

  const stats = getStats()

  const recentActivity = userProgress?.recentActivity.slice(0, 5).map(activity => ({
    type: activity.type,
    problem: activity.problemName || 'Unknown Problem',
    difficulty: activity.difficulty || 'Unknown',
    time: formatTimeAgo(activity.timestamp),
    timeTaken: activity.timeTaken ? `${Math.floor(activity.timeTaken / 60)}m` : 'Unknown'
  })) || []

  const learningPath = (() => {
    if (!userProgress) {
      return [
        { topic: 'Arrays & Linked Lists', status: 'not-started', progress: 0 },
        { topic: 'Stacks & Queues', status: 'not-started', progress: 0 },
        { topic: 'Trees & Graphs', status: 'not-started', progress: 0 },
        { topic: 'Dynamic Programming', status: 'not-started', progress: 0 },
        { topic: 'System Design', status: 'not-started', progress: 0 },
      ]
    }

    // Calculate progress based on solved problems by topic
    const topicProgress = userProgress.learningPathProgress || {}
    const totalProblems = problems.length
    const solvedProblems = userProgress.problemsSolved.length
    
    return [
      { 
        topic: 'Arrays & Linked Lists', 
        status: topicProgress['Arrays & Linked Lists'] ? 'completed' : solvedProblems > 0 ? 'in-progress' : 'not-started', 
        progress: topicProgress['Arrays & Linked Lists'] || (solvedProblems > 0 ? Math.min(25, (solvedProblems / totalProblems) * 100) : 0)
      },
      { 
        topic: 'Stacks & Queues', 
        status: topicProgress['Stacks & Queues'] ? 'completed' : solvedProblems > 2 ? 'in-progress' : 'not-started', 
        progress: topicProgress['Stacks & Queues'] || (solvedProblems > 2 ? Math.min(50, (solvedProblems / totalProblems) * 100) : 0)
      },
      { 
        topic: 'Trees & Graphs', 
        status: topicProgress['Trees & Graphs'] ? 'completed' : solvedProblems > 5 ? 'in-progress' : 'not-started', 
        progress: topicProgress['Trees & Graphs'] || (solvedProblems > 5 ? Math.min(75, (solvedProblems / totalProblems) * 100) : 0)
      },
      { 
        topic: 'Dynamic Programming', 
        status: topicProgress['Dynamic Programming'] ? 'completed' : solvedProblems > 8 ? 'in-progress' : 'not-started', 
        progress: topicProgress['Dynamic Programming'] || (solvedProblems > 8 ? Math.min(45, (solvedProblems / totalProblems) * 100) : 0)
      },
      { 
        topic: 'System Design', 
        status: topicProgress['System Design'] ? 'completed' : solvedProblems > 10 ? 'in-progress' : 'not-started', 
        progress: topicProgress['System Design'] || (solvedProblems > 10 ? Math.min(20, (solvedProblems / totalProblems) * 100) : 0)
      },
    ]
  })()

  const weeklyProgressData = (() => {
    if (!userProgress?.recentActivity) {
      return [
        { day: 'Mon', solved: 0, goal: stats.weeklyGoal },
        { day: 'Tue', solved: 0, goal: stats.weeklyGoal },
        { day: 'Wed', solved: 0, goal: stats.weeklyGoal },
        { day: 'Thu', solved: 0, goal: stats.weeklyGoal },
        { day: 'Fri', solved: 0, goal: stats.weeklyGoal },
        { day: 'Sat', solved: 0, goal: stats.weeklyGoal },
        { day: 'Sun', solved: 0, goal: stats.weeklyGoal },
      ]
    }

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const weekData = days.map(day => ({ day, solved: 0, goal: stats.weeklyGoal }))
    
    // Count solves by day of the week for the last 7 days
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    userProgress.recentActivity
      .filter(activity => activity.type === 'solve' && new Date(activity.timestamp) > oneWeekAgo)
      .forEach(activity => {
        const dayOfWeek = new Date(activity.timestamp).getDay()
        weekData[dayOfWeek].solved++
      })
    
    return weekData
  })()

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const activityTime = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} days ago`
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'solve':
        return <CheckCircle className="h-4 w-4 text-success-600" />
      case 'attempt':
        return <Clock className="h-4 w-4 text-warning-600" />
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

  // Show sign-in prompt if not authenticated
  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Competitive Programming Hub</h1>
          <p className="text-gray-600 mb-6">Sign in to track your progress and access personalized features</p>
          <div className="space-y-3">
            <button
              onClick={handleSignIn}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={handleSignUp}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    )
  }

  const statsData = [
    { 
      label: 'Problems Solved', 
      value: stats.solved, 
      icon: CheckCircle, 
      color: 'text-success-600', 
      change: userProgress?.recentActivity ? 
        `${userProgress.recentActivity.filter(a => a.type === 'solve' && new Date(a.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length} this week` :
        'No solves this week'
    },
    { 
      label: 'Current Streak', 
      value: `${stats.streak} days`, 
      icon: Zap, 
      color: 'text-warning-600', 
      change: stats.streak > 0 ? `+${stats.streak} day${stats.streak > 1 ? 's' : ''} streak` : 'No active streak'
    },
    { 
      label: 'Total Time', 
      value: stats.totalTime, 
      icon: Clock, 
      color: 'text-primary-600', 
      change: userProgress?.totalTime && userProgress.totalTime > 0 ? 
        `${Math.floor(userProgress.totalTime / 3600)}h ${Math.floor((userProgress.totalTime % 3600) / 60)}m total` : 
        'No time tracked'
    },
    { 
      label: 'Accuracy Rate', 
      value: `${stats.accuracy.toFixed(1)}%`, 
      icon: Award, 
      color: 'text-purple-600', 
      change: stats.accuracy > 0 ? `${stats.solved} solved, ${stats.attempted} attempted` : 'No problems attempted'
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {session?.user?.name || 'Coder'}!</h1>
          <p className="text-gray-600">
            {stats.solved > 0 ? (
              <>You have solved <span className="font-semibold text-primary-600">{stats.solved}</span> out of <span className="font-semibold text-primary-600">{stats.total}</span> problems. {stats.streak > 0 ? `Keep up your ${stats.streak}-day streak!` : 'Start solving problems to build your streak!'}</>
            ) : (
              <>You haven't solved any problems yet. <span className="font-semibold text-primary-600">Start practicing</span> to track your progress!</>
            )}
          </p>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <div 
              key={index} 
              className="card hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105"
              onClick={() => handleStatsClick(stat.label)}
            >
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button
            onClick={handleStartPractice}
            className="card hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Play className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Start Practice</h3>
                <p className="text-sm text-gray-600">Solve problems</p>
              </div>
            </div>
          </button>

          <button
            onClick={handleViewContests}
            className="card hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-warning-100 rounded-lg">
                <Trophy className="h-6 w-6 text-warning-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Join Contest</h3>
                <p className="text-sm text-gray-600">Compete live</p>
              </div>
            </div>
          </button>

          <button
            onClick={handleWatchVideos}
            className="card hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success-100 rounded-lg">
                <Video className="h-6 w-6 text-success-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Watch Videos</h3>
                <p className="text-sm text-gray-600">Learn concepts</p>
              </div>
            </div>
          </button>

          <button
            onClick={handleViewAnalytics}
            className="card hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">View Analytics</h3>
                <p className="text-sm text-gray-600">Track progress</p>
              </div>
            </div>
          </button>
        </div>

        {/* Weekly Progress */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Weekly Progress</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Goal: {stats.weeklyGoal} problems</span>
              <span className="text-sm font-medium text-primary-600">{stats.weeklyProgressCount}/{stats.weeklyGoal}</span>
            </div>
          </div>
          <div className="flex items-end justify-between space-x-2">
            {weeklyProgressData.map((day, index) => (
              <div 
                key={index} 
                className="flex-1 text-center cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleWeeklyProgressClick}
              >
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
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button 
              onClick={handleViewDetailedProgress}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              View Detailed Progress →
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={handleRecentActivityClick}
                  >
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">{activity.problem}</span>
                        <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(activity.difficulty)}`}>
                          {activity.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{activity.time}</span>
                        <span>•</span>
                        <span>{activity.timeTaken}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No recent activity</p>
                  <p className="text-sm text-gray-400 mb-3">Start solving problems to see your activity here</p>
                  <button
                    onClick={handleStartPractice}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Start practicing →
                  </button>
                </div>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button 
                onClick={handleViewAllActivity}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                View All Activity →
              </button>
            </div>
          </div>

          {/* Learning Path Progress */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Path</h2>
            <div className="space-y-4">
              {learningPath.map((path, index) => (
                <div 
                  key={index} 
                  className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  onClick={handleLearningPathClick}
                >
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
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button 
                onClick={handleContinueLearning}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Continue Learning →
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Features */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Contests</h3>
            <ContestSystem activeContests={[]} />
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Explanations</h3>
            <VideoExplanations />
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Dashboard</h3>
            <AnalyticsDashboard />
          </div>
        </div>
      </div>
    </div>
  )
} 