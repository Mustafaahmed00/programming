'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Code, Star, ExternalLink, BookOpen } from 'lucide-react'
import { problems, getProblemsByDifficulty, getProblemsByCompany } from '@/data/problems'
import ProblemCard from '@/components/ProblemCard'

export default function ProblemsPage() {
  const [filteredProblems, setFilteredProblems] = useState(problems)
  const [searchTerm, setSearchTerm] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('All')
  const [companyFilter, setCompanyFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [sortBy, setSortBy] = useState('id')

  const difficulties = ['All', 'Easy', 'Medium', 'Hard']
  const companies = ['All', 'Google', 'Amazon', 'Microsoft', 'Meta', 'OpenAI', 'Apple']
  const categories = ['All', 'Array', 'String', 'Stack', 'Linked List', 'Tree', 'Graph', 'Dynamic Programming']

  useEffect(() => {
    let filtered = problems

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(problem =>
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Apply difficulty filter
    if (difficultyFilter !== 'All') {
      filtered = filtered.filter(problem => problem.difficulty === difficultyFilter)
    }

    // Apply company filter
    if (companyFilter !== 'All') {
      filtered = filtered.filter(problem => problem.companies.includes(companyFilter))
    }

    // Apply category filter
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(problem => problem.category === categoryFilter)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'id':
          return a.id - b.id
        case 'title':
          return a.title.localeCompare(b.title)
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        case 'acceptance':
          return b.acceptanceRate - a.acceptanceRate
        default:
          return a.id - b.id
      }
    })

    setFilteredProblems(filtered)
  }, [searchTerm, difficultyFilter, companyFilter, categoryFilter, sortBy])

  const getStats = () => {
    const total = problems.length
    const easy = problems.filter(p => p.difficulty === 'Easy').length
    const medium = problems.filter(p => p.difficulty === 'Medium').length
    const hard = problems.filter(p => p.difficulty === 'Hard').length
    // Use consistent values instead of Math.random()
    const solved = Math.floor(total * 0.6) // 60% of problems solved
    const attempted = Math.floor(total * 0.2) // 20% of problems attempted

    return { total, easy, medium, hard, solved, attempted }
  }

  const getLeetCodeUrl = (problemTitle: string) => {
    // Convert problem title to LeetCode URL format
    const slug = problemTitle.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
    return `https://leetcode.com/problems/${slug}/`
  }

  const getNeetCodeUrl = (problemTitle: string) => {
    // Convert problem title to NeetCode URL format
    const slug = problemTitle.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
    return `https://neetcode.io/problems/${slug}`
  }

  const getProblemStatus = (problemId: number) => {
    // Use problem ID to determine consistent status
    const statuses = ['Solved', 'Attempted', 'Unsolved']
    return statuses[problemId % 3]
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Code className="h-8 w-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Coding Problems</h1>
          </div>
          <p className="text-gray-600">Master algorithms and data structures with curated problems</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Problems</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-success-600">{stats.easy}</div>
            <div className="text-sm text-gray-600">Easy</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-warning-600">{stats.medium}</div>
            <div className="text-sm text-gray-600">Medium</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-danger-600">{stats.hard}</div>
            <div className="text-sm text-gray-600">Hard</div>
          </div>
        </div>

        {/* User Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600">{stats.solved}</div>
            <div className="text-sm text-gray-600">Problems Solved</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.attempted}</div>
            <div className="text-sm text-gray-600">Problems Attempted</div>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Difficulty Filter */}
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>Difficulty: {difficulty}</option>
              ))}
            </select>

            {/* Company Filter */}
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {companies.map(company => (
                <option key={company} value={company}>Company: {company}</option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>Category: {category}</option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="id">Sort: ID</option>
              <option value="title">Sort: Title</option>
              <option value="difficulty">Sort: Difficulty</option>
              <option value="acceptance">Sort: Acceptance Rate</option>
            </select>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mb-6">
          <a
            href="https://leetcode.com/problemset/all/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center space-x-2"
          >
            <ExternalLink className="h-4 w-4" />
            <span>LeetCode Problems</span>
          </a>
          <a
            href="https://neetcode.io/practice"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center space-x-2"
          >
            <BookOpen className="h-4 w-4" />
            <span>NeetCode Practice</span>
          </a>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProblems.map((problem) => {
            const status = getProblemStatus(problem.id)
            return (
              <div key={problem.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-mono text-gray-500">#{problem.id}</span>
                    <h3 className="font-semibold text-gray-900">{problem.title}</h3>
                  </div>
                  <div className="flex space-x-1">
                    <a
                      href={getLeetCodeUrl(problem.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-gray-400 hover:text-orange-500 transition-colors"
                      title="View on LeetCode"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                      href={getNeetCodeUrl(problem.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                      title="View on NeetCode"
                    >
                      <BookOpen className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    problem.difficulty === 'Easy' ? 'difficulty-easy' :
                    problem.difficulty === 'Medium' ? 'difficulty-medium' : 'difficulty-hard'
                  }`}>
                    {problem.difficulty}
                  </span>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                    {problem.companies[0]}
                  </span>
                  <span className="text-xs text-gray-500">
                    {problem.acceptanceRate}% acceptance
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {problem.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                  {problem.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{problem.tags.length - 3} more</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    status === 'Solved' ? 'bg-success-100 text-success-700' :
                    status === 'Attempted' ? 'bg-warning-100 text-warning-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {status}
                  </span>
                  <div className="flex space-x-2">
                    <a
                      href={getLeetCodeUrl(problem.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs"
                    >
                      Solve
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No problems found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  )
} 