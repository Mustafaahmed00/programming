'use client'

import { CheckCircle, Clock, XCircle } from 'lucide-react'

interface ProblemCardProps {
  id: number
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  company?: string
  status: 'Solved' | 'Attempted' | 'Unsolved'
  time?: string
  acceptanceRate?: number
  tags?: string[]
  onClick?: () => void
}

export default function ProblemCard({
  id,
  title,
  difficulty,
  company,
  status,
  time,
  acceptanceRate,
  tags = [],
  onClick
}: ProblemCardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'Solved':
        return <CheckCircle className="h-4 w-4 text-success-600" />
      case 'Attempted':
        return <Clock className="h-4 w-4 text-warning-600" />
      case 'Unsolved':
        return <XCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Easy':
        return 'difficulty-easy'
      case 'Medium':
        return 'difficulty-medium'
      case 'Hard':
        return 'difficulty-hard'
    }
  }

  return (
    <div 
      className="card hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-mono text-gray-500">#{id}</span>
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        {getStatusIcon()}
      </div>

      <div className="flex items-center space-x-2 mb-3">
        <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor()}`}>
          {difficulty}
        </span>
        {company && (
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
            {company}
          </span>
        )}
        {acceptanceRate && (
          <span className="text-xs text-gray-500">
            {acceptanceRate}% acceptance
          </span>
        )}
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-xs text-gray-500">+{tags.length - 3} more</span>
          )}
        </div>
      )}

      {time && (
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{time}</span>
          <span className={`px-2 py-1 rounded-full ${
            status === 'Solved' ? 'bg-success-100 text-success-700' :
            status === 'Attempted' ? 'bg-warning-100 text-warning-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {status}
          </span>
        </div>
      )}
    </div>
  )
} 