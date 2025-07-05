'use client'

import { useState } from 'react'
import { BookOpen, Target, Clock, CheckCircle, Play, Star, Users, TrendingUp } from 'lucide-react'

interface StudyPlan {
  id: number
  title: string
  description: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  topics: string[]
  problems: number
  completed: number
  rating: number
  students: number
  isEnrolled: boolean
  progress: number
}

const studyPlans: StudyPlan[] = [
  {
    id: 1,
    title: "DSA Fundamentals",
    description: "Master the basics of Data Structures and Algorithms with hands-on practice",
    duration: "8 weeks",
    difficulty: "Beginner",
    topics: ["Arrays", "Strings", "Linked Lists", "Stacks", "Queues", "Basic Sorting"],
    problems: 50,
    completed: 0,
    rating: 4.8,
    students: 15420,
    isEnrolled: false,
    progress: 0
  },
  {
    id: 2,
    title: "Advanced Algorithms",
    description: "Deep dive into complex algorithms and optimization techniques",
    duration: "12 weeks",
    difficulty: "Advanced",
    topics: ["Dynamic Programming", "Graph Algorithms", "Advanced Tree Structures", "Greedy Algorithms"],
    problems: 75,
    completed: 0,
    rating: 4.9,
    students: 8920,
    isEnrolled: false,
    progress: 0
  },
  {
    id: 3,
    title: "System Design Mastery",
    description: "Learn to design scalable systems and ace system design interviews",
    duration: "10 weeks",
    difficulty: "Intermediate",
    topics: ["Distributed Systems", "Database Design", "Caching Strategies", "Load Balancing"],
    problems: 30,
    completed: 0,
    rating: 4.7,
    students: 12350,
    isEnrolled: false,
    progress: 0
  },
  {
    id: 4,
    title: "Interview Preparation",
    description: "Comprehensive preparation for technical interviews at top companies",
    duration: "6 weeks",
    difficulty: "Intermediate",
    topics: ["Problem Solving", "Time Complexity", "Space Optimization", "Interview Strategies"],
    problems: 100,
    completed: 0,
    rating: 4.6,
    students: 20150,
    isEnrolled: false,
    progress: 0
  },
  {
    id: 5,
    title: "Competitive Programming",
    description: "Prepare for coding competitions and improve problem-solving speed",
    duration: "16 weeks",
    difficulty: "Advanced",
    topics: ["Advanced Algorithms", "Mathematical Concepts", "Optimization", "Speed Coding"],
    problems: 150,
    completed: 0,
    rating: 4.9,
    students: 5670,
    isEnrolled: false,
    progress: 0
  },
  {
    id: 6,
    title: "Python for Interviews",
    description: "Master Python programming specifically for technical interviews",
    duration: "4 weeks",
    difficulty: "Beginner",
    topics: ["Python Basics", "Data Structures", "Algorithms", "Interview Patterns"],
    problems: 40,
    completed: 0,
    rating: 4.5,
    students: 18920,
    isEnrolled: false,
    progress: 0
  }
]

export default function StudyPlansPage() {
  const [filteredPlans, setFilteredPlans] = useState(studyPlans)
  const [difficultyFilter, setDifficultyFilter] = useState('All')
  const [sortBy, setSortBy] = useState('rating')

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const handleEnroll = (planId: number) => {
    setFilteredPlans(prev => 
      prev.map(plan => 
        plan.id === planId 
          ? { ...plan, isEnrolled: true, progress: 0 }
          : plan
      )
    )
  }

  const handleContinue = (planId: number) => {
    // Navigate to the study plan detail page
    console.log('Continue plan:', planId)
  }

  const getStats = () => {
    const total = studyPlans.length
    const enrolled = studyPlans.filter(p => p.isEnrolled).length
    const completed = studyPlans.filter(p => p.progress === 100).length
    const avgRating = studyPlans.reduce((sum, p) => sum + p.rating, 0) / studyPlans.length

    return { total, enrolled, completed, avgRating }
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="h-8 w-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Study Plans</h1>
          </div>
          <p className="text-gray-600">Structured learning paths to master competitive programming and technical interviews</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Plans</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600">{stats.enrolled}</div>
            <div className="text-sm text-gray-600">Enrolled</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-success-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.avgRating.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Difficulty:</label>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="rating">Rating</option>
                <option value="students">Students</option>
                <option value="duration">Duration</option>
                <option value="difficulty">Difficulty</option>
              </select>
            </div>
          </div>
        </div>

        {/* Study Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="card flex flex-col justify-between h-full hover:shadow-lg transition-shadow">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-semibold text-gray-900">{plan.title}</h2>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    plan.difficulty === 'Beginner' ? 'bg-success-100 text-success-700' :
                    plan.difficulty === 'Intermediate' ? 'bg-warning-100 text-warning-700' :
                    'bg-danger-100 text-danger-700'
                  }`}>
                    {plan.difficulty}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 text-sm">{plan.description}</p>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{plan.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{plan.problems} problems</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{(plan.students / 1000).toFixed(1)}k</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-800">{plan.rating}</span>
                  <span className="text-xs text-gray-500">({(plan.students / 1000).toFixed(1)}k students)</span>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Topics Covered:</h4>
                  <div className="flex flex-wrap gap-1">
                    {plan.topics.slice(0, 3).map((topic, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {topic}
                      </span>
                    ))}
                    {plan.topics.length > 3 && (
                      <span className="text-xs text-gray-500">+{plan.topics.length - 3} more</span>
                    )}
                  </div>
                </div>

                {plan.isEnrolled && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{plan.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${plan.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4">
                {plan.isEnrolled ? (
                  <button
                    onClick={() => handleContinue(plan.id)}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>Continue Learning</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll(plan.id)}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Enroll Now</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Learning Paths</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">30-Day Challenge</h3>
                  <p className="text-gray-600 mb-4">Solve one problem every day for 30 days to build consistency</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>30 problems</span>
                    <span>•</span>
                    <span>All difficulties</span>
                    <span>•</span>
                    <span>Daily streak tracking</span>
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-primary-600" />
              </div>
              <button className="btn-primary">Start Challenge</button>
            </div>

            <div className="card bg-gradient-to-r from-success-50 to-success-100 border-success-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Interview Prep Sprint</h3>
                  <p className="text-gray-600 mb-4">Intensive 2-week preparation for upcoming interviews</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>50 problems</span>
                    <span>•</span>
                    <span>Mock interviews</span>
                    <span>•</span>
                    <span>Performance tracking</span>
                  </div>
                </div>
                <Target className="h-8 w-8 text-success-600" />
              </div>
              <button className="btn-success">Join Sprint</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 