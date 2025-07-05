'use client'

import { CheckCircle, Zap, Clock, Award, TrendingUp, Target, Calendar, BarChart3, Activity, BookOpen, Users, Star } from 'lucide-react'
import { problems } from '@/data/problems'

export default function Home() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Coder!</h1>
          <p className="text-gray-600">You have solved <span className="font-semibold text-primary-600">{solved}</span> out of <span className="font-semibold text-primary-600">{total}</span> problems. Keep up the streak!</p>
        </div>

        {/* Stats Grid */}
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
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{activity.problem}</span>
                      <span className={`text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
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
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium">
              View All Activity →
            </button>
          </div>

          {/* Learning Path */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Path</h2>
            <div className="space-y-4">
              {learningPath.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {item.status === 'completed' && <CheckCircle className="h-4 w-4 text-success-600" />}
                      {item.status === 'in-progress' && <Clock className="h-4 w-4 text-warning-600" />}
                      {item.status === 'not-started' && <Target className="h-4 w-4 text-gray-400" />}
                      <span className={`font-medium ${getStatusColor(item.status)}`}>{item.topic}</span>
                    </div>
                    <span className="text-sm text-gray-500">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        item.status === 'completed' ? 'bg-success-600' :
                        item.status === 'in-progress' ? 'bg-warning-600' : 'bg-gray-300'
                      }`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium">
              Continue Learning →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card text-center hover:shadow-lg transition-shadow cursor-pointer">
            <Target className="h-8 w-8 text-primary-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Practice Mode</h3>
            <p className="text-sm text-gray-600">Solve problems with timer</p>
          </div>
          <div className="card text-center hover:shadow-lg transition-shadow cursor-pointer">
            <BookOpen className="h-8 w-8 text-success-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Study Plans</h3>
            <p className="text-sm text-gray-600">Structured learning paths</p>
          </div>
          <div className="card text-center hover:shadow-lg transition-shadow cursor-pointer">
            <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Community</h3>
            <p className="text-sm text-gray-600">Connect with coders</p>
          </div>
          <div className="card text-center hover:shadow-lg transition-shadow cursor-pointer">
            <Star className="h-8 w-8 text-warning-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Leaderboard</h3>
            <p className="text-sm text-gray-600">Compete and rank up</p>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="h-6 w-6 text-success-600" />
                <h3 className="text-lg font-semibold text-gray-900">Improving</h3>
              </div>
              <p className="text-gray-600 text-sm mb-3">Your problem-solving speed has improved by 15% this week</p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-success-600 font-medium">+15%</span>
                <span className="text-xs text-gray-500">vs last week</span>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="h-6 w-6 text-primary-600" />
                <h3 className="text-lg font-semibold text-gray-900">Streak Goal</h3>
              </div>
              <p className="text-gray-600 text-sm mb-3">You're 3 days away from your 10-day streak goal</p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-primary-600 font-medium">7/10 days</span>
                <span className="text-xs text-gray-500">current streak</span>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Weekly Target</h3>
              </div>
              <p className="text-gray-600 text-sm mb-3">You're on track to meet your weekly goal</p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-purple-600 font-medium">80%</span>
                <span className="text-xs text-gray-500">goal completion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 