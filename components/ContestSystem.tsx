'use client'

import { useState, useEffect } from 'react'
import { 
  Clock, 
  Trophy, 
  Users, 
  Award, 
  Play, 
  Pause, 
  StopCircle, 
  TrendingUp,
  Target,
  Star,
  Calendar,
  MapPin,
  Zap,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface Contest {
  id: string
  title: string
  description: string
  startTime: Date
  endTime: Date
  duration: number // in minutes
  problems: ContestProblem[]
  participants: ContestParticipant[]
  status: 'upcoming' | 'active' | 'finished'
  maxParticipants: number
  currentParticipants: number
  prizes: Prize[]
  rules: string[]
}

interface ContestProblem {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  points: number
  solvedBy: number
  totalAttempts: number
}

interface ContestParticipant {
  id: string
  username: string
  rank: number
  score: number
  problemsSolved: number
  totalTime: number
  submissions: Submission[]
  lastSubmission: Date
}

interface Submission {
  id: string
  problemId: string
  status: 'accepted' | 'wrong_answer' | 'time_limit' | 'runtime_error'
  submissionTime: Date
  executionTime: number
  points: number
}

interface Prize {
  rank: number
  description: string
  value: string
}

interface ContestSystemProps {
  userId?: string
  activeContests?: Contest[]
}

export default function ContestSystem({ 
  userId, 
  activeContests 
}: ContestSystemProps) {
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [isParticipating, setIsParticipating] = useState(false)
  const [userRank, setUserRank] = useState<number>(0)
  const [userScore, setUserScore] = useState<number>(0)

  // Mock data for demonstration
  const mockContests: Contest[] = [
    {
      id: '1',
      title: 'Weekly Coding Challenge #245',
      description: 'A collection of algorithmic problems covering arrays, strings, and dynamic programming.',
      startTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
      endTime: new Date(Date.now() + 150 * 60 * 1000), // 2.5 hours from now
      duration: 120,
      status: 'upcoming',
      maxParticipants: 1000,
      currentParticipants: 456,
      problems: [
        { id: 'p1', title: 'Array Rotation', difficulty: 'Easy', points: 100, solvedBy: 0, totalAttempts: 0 },
        { id: 'p2', title: 'String Permutations', difficulty: 'Medium', points: 200, solvedBy: 0, totalAttempts: 0 },
        { id: 'p3', title: 'Dynamic Programming Path', difficulty: 'Hard', points: 300, solvedBy: 0, totalAttempts: 0 }
      ],
      participants: [],
      prizes: [
        { rank: 1, description: '1st Place', value: '$500' },
        { rank: 2, description: '2nd Place', value: '$300' },
        { rank: 3, description: '3rd Place', value: '$200' }
      ],
      rules: [
        'No external resources allowed',
        'One submission per problem',
        'Time limit: 2 hours',
        'Points based on difficulty and submission time'
      ]
    },
    {
      id: '2',
      title: 'Algorithm Mastery Contest',
      description: 'Advanced algorithms and data structures challenge for experienced programmers.',
      startTime: new Date(Date.now() - 60 * 60 * 1000), // Started 1 hour ago
      endTime: new Date(Date.now() + 60 * 60 * 1000), // Ends in 1 hour
      duration: 120,
      status: 'active',
      maxParticipants: 500,
      currentParticipants: 234,
      problems: [
        { id: 'p4', title: 'Graph Traversal', difficulty: 'Medium', points: 150, solvedBy: 45, totalAttempts: 89 },
        { id: 'p5', title: 'Binary Search Tree', difficulty: 'Medium', points: 200, solvedBy: 23, totalAttempts: 67 },
        { id: 'p6', title: 'Dynamic Programming', difficulty: 'Hard', points: 300, solvedBy: 12, totalAttempts: 34 }
      ],
      participants: [
        { id: 'u1', username: 'alex_coder', rank: 1, score: 650, problemsSolved: 3, totalTime: 85, submissions: [], lastSubmission: new Date() },
        { id: 'u2', username: 'code_master', rank: 2, score: 500, problemsSolved: 2, totalTime: 95, submissions: [], lastSubmission: new Date() },
        { id: 'u3', username: 'algorithm_pro', rank: 3, score: 350, problemsSolved: 2, totalTime: 110, submissions: [], lastSubmission: new Date() }
      ],
      prizes: [
        { rank: 1, description: 'Champion', value: 'Premium Membership' },
        { rank: 2, description: 'Runner-up', value: 'Extended Features' },
        { rank: 3, description: '3rd Place', value: 'Special Badge' }
      ],
      rules: [
        'Advanced algorithms focus',
        'Real-time leaderboard',
        'Performance-based scoring',
        'Time penalty for wrong submissions'
      ]
    }
  ]

  const contests = activeContests || mockContests

  useEffect(() => {
    if (selectedContest && selectedContest.status === 'active') {
      const interval = setInterval(() => {
        const now = new Date().getTime()
        const end = selectedContest.endTime.getTime()
        const remaining = Math.max(0, end - now)
        setTimeRemaining(remaining)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [selectedContest])

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60))
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((ms % (1000 * 60)) / 1000)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const getContestStatus = (contest: Contest) => {
    const now = new Date()
    if (now < contest.startTime) return 'upcoming'
    if (now >= contest.startTime && now <= contest.endTime) return 'active'
    return 'finished'
  }

  const joinContest = (contestId: string) => {
    setIsParticipating(true)
    setSelectedContest(contests.find(c => c.id === contestId) || null)
    // In a real app, this would make an API call
  }

  const submitSolution = (problemId: string, code: string) => {
    // Mock submission
    const submission: Submission = {
      id: `sub_${Date.now()}`,
      problemId,
      status: Math.random() > 0.3 ? 'accepted' : 'wrong_answer',
      submissionTime: new Date(),
      executionTime: Math.random() * 1000,
      points: Math.random() > 0.3 ? 100 : 0
    }
    
    // Update user score and rank
    if (submission.status === 'accepted') {
      setUserScore(prev => prev + submission.points)
      setUserRank(prev => Math.max(1, prev - 1))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Live Contests</h2>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>{contests.reduce((sum, c) => sum + c.currentParticipants, 0)} participants</span>
          </div>
        </div>
      </div>

      {/* Contest Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {contests.map((contest) => {
          const status = getContestStatus(contest)
          const isActive = status === 'active'
          const isUpcoming = status === 'upcoming'
          
          return (
            <div key={contest.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{contest.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{contest.description}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  status === 'active' ? 'bg-green-100 text-green-800' :
                  status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {status === 'active' ? 'Live' : status === 'upcoming' ? 'Upcoming' : 'Finished'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-600">Duration</p>
                    <p className="text-sm font-medium">{contest.duration} minutes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-600">Participants</p>
                    <p className="text-sm font-medium">{contest.currentParticipants}/{contest.maxParticipants}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-600">Problems</p>
                    <p className="text-sm font-medium">{contest.problems.length}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-600">Total Points</p>
                    <p className="text-sm font-medium">{contest.problems.reduce((sum, p) => sum + p.points, 0)}</p>
                  </div>
                </div>
              </div>

              {isActive && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-red-800">Time Remaining</span>
                    <span className="text-lg font-bold text-red-600 font-mono">
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {contest.startTime.toLocaleDateString()} at {contest.startTime.toLocaleTimeString()}
                  </span>
                </div>
                {isUpcoming && (
                  <button
                    onClick={() => joinContest(contest.id)}
                    className="btn-primary text-sm"
                  >
                    Join Contest
                  </button>
                )}
                {isActive && (
                  <button
                    onClick={() => setSelectedContest(contest)}
                    className="btn-primary text-sm"
                  >
                    View Contest
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Contest Details */}
      {selectedContest && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">{selectedContest.title}</h3>
            <button
              onClick={() => setSelectedContest(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Problems */}
            <div className="lg:col-span-2">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Problems</h4>
              <div className="space-y-3">
                {selectedContest.problems.map((problem) => (
                  <div key={problem.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        problem.difficulty === 'Easy' ? 'bg-green-500' :
                        problem.difficulty === 'Medium' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">{problem.title}</p>
                        <p className="text-sm text-gray-600">{problem.difficulty} • {problem.points} points</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{problem.solvedBy}</p>
                        <p className="text-xs text-gray-600">Solved</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{problem.totalAttempts}</p>
                        <p className="text-xs text-gray-600">Attempts</p>
                      </div>
                      <button
                        onClick={() => submitSolution(problem.id, '// Your solution here')}
                        className="btn-primary text-sm"
                      >
                        Solve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Leaderboard</h4>
              <div className="space-y-3">
                {selectedContest.participants.slice(0, 10).map((participant, index) => (
                  <div key={participant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-500 text-white' :
                        'bg-gray-200 text-gray-700'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{participant.username}</p>
                        <p className="text-xs text-gray-600">{participant.problemsSolved} problems</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{participant.score}</p>
                      <p className="text-xs text-gray-600">{participant.totalTime}m</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Prizes */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Prizes</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedContest.prizes.map((prize) => (
                <div key={prize.rank} className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-600">{prize.rank}</div>
                  <p className="text-sm font-medium text-gray-900">{prize.description}</p>
                  <p className="text-xs text-gray-600">{prize.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 