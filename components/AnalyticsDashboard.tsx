'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Award, 
  BarChart3, 
  Calendar, 
  Zap, 
  CheckCircle, 
  XCircle,
  Activity,
  BookOpen,
  Trophy,
  Users,
  Star
} from 'lucide-react'

interface PerformanceData {
  totalProblems: number
  solvedProblems: number
  accuracy: number
  averageTime: number
  streakDays: number
  totalPoints: number
  rank: number
  level: string
  weakAreas: string[]
  strongAreas: string[]
  recentActivity: ActivityItem[]
  weeklyProgress: WeeklyData[]
  monthlyProgress: MonthlyData[]
}

interface ActivityItem {
  id: string
  type: 'solve' | 'attempt' | 'contest' | 'achievement'
  title: string
  timestamp: Date
  details: string
  points?: number
}

interface WeeklyData {
  week: string
  problemsSolved: number
  accuracy: number
  timeSpent: number
  points: number
}

interface MonthlyData {
  month: string
  problemsSolved: number
  accuracy: number
  contests: number
  achievements: number
}

interface AnalyticsDashboardProps {
  userId?: string
  performanceData?: PerformanceData
}

export default function AnalyticsDashboard({ 
  userId, 
  performanceData 
}: AnalyticsDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'year'>('week')
  const [selectedMetric, setSelectedMetric] = useState<'problems' | 'accuracy' | 'time' | 'points'>('problems')

  // Mock data for demonstration
  const mockData: PerformanceData = {
    totalProblems: 150,
    solvedProblems: 127,
    accuracy: 84.7,
    averageTime: 23.5,
    streakDays: 12,
    totalPoints: 2840,
    rank: 156,
    level: 'Gold',
    weakAreas: ['Dynamic Programming', 'Graph Algorithms', 'System Design'],
    strongAreas: ['Arrays', 'Strings', 'Hash Tables', 'Two Pointers'],
    recentActivity: [
      {
        id: '1',
        type: 'solve',
        title: 'Solved "Two Sum"',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        details: 'Medium difficulty, 15 minutes',
        points: 25
      },
      {
        id: '2',
        type: 'contest',
        title: 'Weekly Contest #245',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        details: 'Ranked #89 out of 1,234 participants',
        points: 150
      },
      {
        id: '3',
        type: 'achievement',
        title: 'Speed Demon Badge',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        details: 'Solved 5 problems in under 10 minutes each'
      }
    ],
    weeklyProgress: [
      { week: 'Week 1', problemsSolved: 12, accuracy: 85, timeSpent: 180, points: 240 },
      { week: 'Week 2', problemsSolved: 15, accuracy: 87, timeSpent: 210, points: 300 },
      { week: 'Week 3', problemsSolved: 18, accuracy: 82, timeSpent: 195, points: 270 },
      { week: 'Week 4', problemsSolved: 14, accuracy: 89, timeSpent: 165, points: 280 }
    ],
    monthlyProgress: [
      { month: 'Jan', problemsSolved: 45, accuracy: 83, contests: 4, achievements: 3 },
      { month: 'Feb', problemsSolved: 52, accuracy: 86, contests: 5, achievements: 4 },
      { month: 'Mar', problemsSolved: 48, accuracy: 84, contests: 4, achievements: 2 },
      { month: 'Apr', problemsSolved: 55, accuracy: 88, contests: 6, achievements: 5 }
    ]
  }

  const data = performanceData || mockData

  const getMetricData = () => {
    switch (selectedMetric) {
      case 'problems':
        return data.weeklyProgress.map(w => ({ label: w.week, value: w.problemsSolved }))
      case 'accuracy':
        return data.weeklyProgress.map(w => ({ label: w.week, value: w.accuracy }))
      case 'time':
        return data.weeklyProgress.map(w => ({ label: w.week, value: w.timeSpent }))
      case 'points':
        return data.weeklyProgress.map(w => ({ label: w.week, value: w.points }))
      default:
        return data.weeklyProgress.map(w => ({ label: w.week, value: w.problemsSolved }))
    }
  }

  const getMetricLabel = () => {
    switch (selectedMetric) {
      case 'problems': return 'Problems Solved'
      case 'accuracy': return 'Accuracy (%)'
      case 'time': return 'Time Spent (min)'
      case 'points': return 'Points Earned'
      default: return 'Problems Solved'
    }
  }

  const getMetricColor = () => {
    switch (selectedMetric) {
      case 'problems': return 'bg-blue-500'
      case 'accuracy': return 'bg-green-500'
      case 'time': return 'bg-purple-500'
      case 'points': return 'bg-yellow-500'
      default: return 'bg-blue-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex items-center space-x-4">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as any)}
            className="px-3 py-1 text-sm border rounded-lg"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Problems Solved</p>
              <p className="text-2xl font-bold text-gray-900">{data.solvedProblems}</p>
              <p className="text-xs text-gray-500">of {data.totalProblems} total</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Accuracy Rate</p>
              <p className="text-2xl font-bold text-gray-900">{data.accuracy}%</p>
              <p className="text-xs text-gray-500">Last 30 days</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Time</p>
              <p className="text-2xl font-bold text-gray-900">{data.averageTime}m</p>
              <p className="text-xs text-gray-500">per problem</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Streak</p>
              <p className="text-2xl font-bold text-gray-900">{data.streakDays} days</p>
              <p className="text-xs text-gray-500">Keep it up!</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Zap className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Progress Overview</h3>
          <div className="flex space-x-2">
            {['problems', 'accuracy', 'time', 'points'].map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric as any)}
                className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                  selectedMetric === metric
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {metric.charAt(0).toUpperCase() + metric.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 flex items-end justify-between space-x-2">
          {getMetricData().map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-200 rounded-t-lg relative">
                <div
                  className={`${getMetricColor()} rounded-t-lg transition-all duration-300`}
                  style={{ 
                    height: `${(item.value / Math.max(...getMetricData().map(d => d.value))) * 100}%`,
                    minHeight: '4px'
                  }}
                />
              </div>
              <span className="text-xs text-gray-600 mt-2">{item.label}</span>
              <span className="text-xs font-medium text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strong Areas */}
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Trophy className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Strong Areas</h3>
          </div>
          <div className="space-y-3">
            {data.strongAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{area}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${85 + Math.random() * 10}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">85%+</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Areas */}
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="h-5 w-5 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">Areas for Improvement</h3>
          </div>
          <div className="space-y-3">
            {data.weakAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{area}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${30 + Math.random() * 20}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">40%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Activity className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="space-y-4">
          {data.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-lg ${
                activity.type === 'solve' ? 'bg-green-100' :
                activity.type === 'contest' ? 'bg-blue-100' :
                activity.type === 'achievement' ? 'bg-yellow-100' :
                'bg-gray-100'
              }`}>
                {activity.type === 'solve' && <CheckCircle className="h-4 w-4 text-green-600" />}
                {activity.type === 'contest' && <Trophy className="h-4 w-4 text-blue-600" />}
                {activity.type === 'achievement' && <Award className="h-4 w-4 text-yellow-600" />}
                {activity.type === 'attempt' && <XCircle className="h-4 w-4 text-red-600" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-xs text-gray-600">{activity.details}</p>
                <p className="text-xs text-gray-500">
                  {activity.timestamp.toLocaleDateString()} at {activity.timestamp.toLocaleTimeString()}
                </p>
              </div>
              {activity.points && (
                <div className="text-sm font-medium text-green-600">
                  +{activity.points} pts
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Performance Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{data.totalPoints}</p>
            <p className="text-sm text-gray-600">Total Points</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">#{data.rank}</p>
            <p className="text-sm text-gray-600">Global Rank</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{data.level}</p>
            <p className="text-sm text-gray-600">Current Level</p>
          </div>
        </div>
      </div>
    </div>
  )
} 