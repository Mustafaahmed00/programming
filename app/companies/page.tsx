'use client'

import { useState, useEffect } from 'react'
import { Users, Star, Briefcase, Search, Filter, MapPin, DollarSign } from 'lucide-react'
import { companies } from '@/data/companies'

export default function CompaniesPage() {
  const [filteredCompanies, setFilteredCompanies] = useState(companies)
  const [searchTerm, setSearchTerm] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('All')
  const [sortBy, setSortBy] = useState('problemCount')

  const difficulties = ['All', 'Easy', 'Medium', 'Hard']

  useEffect(() => {
    let filtered = companies

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Apply difficulty filter
    if (difficultyFilter !== 'All') {
      filtered = filtered.filter(company => company.difficulty === difficultyFilter)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'problemCount':
          return b.problemCount - a.problemCount
        case 'name':
          return a.name.localeCompare(b.name)
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        case 'salary':
          return b.salary.max - a.salary.max
        default:
          return b.problemCount - a.problemCount
      }
    })

    setFilteredCompanies(filtered)
  }, [searchTerm, difficultyFilter, sortBy])

  const getStats = () => {
    const total = companies.length
    const easy = companies.filter(c => c.difficulty === 'Easy').length
    const medium = companies.filter(c => c.difficulty === 'Medium').length
    const hard = companies.filter(c => c.difficulty === 'Hard').length
    const totalProblems = companies.reduce((sum, c) => sum + c.problemCount, 0)
    const avgSalary = companies.reduce((sum, c) => sum + c.salary.max, 0) / companies.length

    return { total, easy, medium, hard, totalProblems, avgSalary }
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-8 w-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Top Tech Companies</h1>
          </div>
          <p className="text-gray-600">Explore interview processes, problems, and resources for top companies</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Companies</div>
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

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600">{stats.totalProblems}</div>
            <div className="text-sm text-gray-600">Total Problems</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-600">${(stats.avgSalary / 1000).toFixed(0)}k</div>
            <div className="text-sm text-gray-600">Average Salary</div>
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
                  placeholder="Search companies..."
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

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="problemCount">Sort: Problems</option>
              <option value="name">Sort: Name</option>
              <option value="difficulty">Sort: Difficulty</option>
              <option value="salary">Sort: Salary</option>
            </select>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mb-6">
          <a
            href="https://leetcode.com/company/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center space-x-2"
          >
            <Star className="h-4 w-4" />
            <span>LeetCode Companies</span>
          </a>
          <a
            href="https://www.levels.fyi/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center space-x-2"
          >
            <DollarSign className="h-4 w-4" />
            <span>Salary Data</span>
          </a>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="card flex flex-col justify-between h-full hover:shadow-lg transition-shadow">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{company.name}</h2>
                <p className="text-gray-600 mb-3 text-sm">{company.description}</p>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`text-xs px-2 py-1 rounded ${
                    company.difficulty === 'Easy' ? 'bg-success-100 text-success-700' :
                    company.difficulty === 'Medium' ? 'bg-warning-100 text-warning-700' :
                    'bg-danger-100 text-danger-700'
                  }`}>
                    {company.difficulty}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{company.problemCount} problems</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {company.locations[0]}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {company.categories.slice(0, 3).map((cat, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{cat}</span>
                  ))}
                  {company.categories.length > 3 && (
                    <span className="text-xs text-gray-500">+{company.categories.length - 3} more</span>
                  )}
                </div>

                <div className="mb-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-700">
                      {company.salary.min.toLocaleString()} - {company.salary.max.toLocaleString()} {company.salary.currency}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Interview: {company.interviewProcess.duration}
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Benefits:</p>
                  <div className="flex flex-wrap gap-1">
                    {company.benefits.slice(0, 2).map((benefit, idx) => (
                      <span key={idx} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">{benefit}</span>
                    ))}
                    {company.benefits.length > 2 && (
                      <span className="text-xs text-gray-500">+{company.benefits.length - 2} more</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <a
                  href={company.resources[0]?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center space-x-2"
                >
                  <Star className="h-4 w-4" />
                  <span>Resources</span>
                </a>
                <a
                  href={`https://leetcode.com/company/${company.name.toLowerCase()}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs"
                >
                  Problems
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  )
} 