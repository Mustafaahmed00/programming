'use client'

import { CheckCircle, Zap, Clock, Award } from 'lucide-react'
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

  const stats = [
    { label: 'Problems Solved', value: solved, icon: CheckCircle, color: 'text-success-600' },
    { label: 'Current Streak', value: `${streak} days`, icon: Zap, color: 'text-warning-600' },
    { label: 'Total Time', value: totalTime, icon: Clock, color: 'text-primary-600' },
    { label: 'Ranking', value: ranking, icon: Award, color: 'text-purple-600' },
  ]

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
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Problem Breakdown</h2>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between"><span>Easy</span><span className="text-success-600 font-bold">{easy}</span></div>
              <div className="flex justify-between"><span>Medium</span><span className="text-warning-600 font-bold">{medium}</span></div>
              <div className="flex justify-between"><span>Hard</span><span className="text-danger-600 font-bold">{hard}</span></div>
            </div>
          </div>
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>🟢 Solved <b>Two Sum</b> (Easy)</li>
              <li>🟡 Attempted <b>Container With Most Water</b> (Medium)</li>
              <li>🟢 Solved <b>Valid Parentheses</b> (Easy)</li>
              <li>🔴 Unsolved <b>Longest Substring Without Repeating Characters</b> (Medium)</li>
            </ul>
          </div>
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Path</h2>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>✅ Arrays & Linked Lists</li>
              <li>✅ Stacks & Queues</li>
              <li>🟡 Dynamic Programming</li>
              <li>🔲 System Design</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 