'use client'

import { useState, useEffect } from 'react'
import { Users, Star, Briefcase, Search, Filter, MapPin, DollarSign, BookOpen, Play, Target, Award, Clock, TrendingUp, X } from 'lucide-react'
import { companies } from '@/data/companies'

// Curated interview problems for each company
const companyProblems = {
  'Google': [
    { title: 'Two Sum', difficulty: 'Easy', category: 'Arrays', description: 'Find two numbers that add up to target' },
    { title: 'Valid Parentheses', difficulty: 'Easy', category: 'Stack', description: 'Check if parentheses are valid' },
    { title: 'Merge Two Sorted Lists', difficulty: 'Easy', category: 'Linked List', description: 'Merge two sorted linked lists' },
    { title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', category: 'Sliding Window', description: 'Find longest substring with unique characters' },
    { title: 'Container With Most Water', difficulty: 'Medium', category: 'Two Pointers', description: 'Find container with maximum water' },
    { title: '3Sum', difficulty: 'Medium', category: 'Arrays', description: 'Find all unique triplets that sum to zero' },
    { title: 'Valid Sudoku', difficulty: 'Medium', category: 'Hash Table', description: 'Check if Sudoku board is valid' },
    { title: 'Spiral Matrix', difficulty: 'Medium', category: 'Matrix', description: 'Return elements in spiral order' },
    { title: 'Word Search', difficulty: 'Medium', category: 'Backtracking', description: 'Find word in 2D board' },
    { title: 'LRU Cache', difficulty: 'Hard', category: 'Design', description: 'Implement LRU cache' }
  ],
  'Microsoft': [
    { title: 'Valid Parentheses', difficulty: 'Easy', category: 'Stack', description: 'Check if parentheses are valid' },
    { title: 'Merge Two Sorted Lists', difficulty: 'Easy', category: 'Linked List', description: 'Merge two sorted linked lists' },
    { title: 'Maximum Subarray', difficulty: 'Medium', category: 'Dynamic Programming', description: 'Find subarray with maximum sum' },
    { title: 'Add Two Numbers', difficulty: 'Medium', category: 'Linked List', description: 'Add two numbers represented by linked lists' },
    { title: 'Longest Palindromic Substring', difficulty: 'Medium', category: 'String', description: 'Find longest palindromic substring' },
    { title: 'Valid Sudoku', difficulty: 'Medium', category: 'Hash Table', description: 'Check if Sudoku board is valid' },
    { title: 'Spiral Matrix', difficulty: 'Medium', category: 'Matrix', description: 'Return elements in spiral order' },
    { title: 'Word Search', difficulty: 'Medium', category: 'Backtracking', description: 'Find word in 2D board' },
    { title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', category: 'Tree', description: 'Serialize/deserialize binary tree' },
    { title: 'Sliding Window Maximum', difficulty: 'Hard', category: 'Queue', description: 'Find maximum in sliding window' }
  ],
  'Amazon': [
    { title: 'Two Sum', difficulty: 'Easy', category: 'Arrays', description: 'Find two numbers that add up to target' },
    { title: 'Valid Parentheses', difficulty: 'Easy', category: 'Stack', description: 'Check if parentheses are valid' },
    { title: 'Maximum Subarray', difficulty: 'Medium', category: 'Dynamic Programming', description: 'Find subarray with maximum sum' },
    { title: 'Add Two Numbers', difficulty: 'Medium', category: 'Linked List', description: 'Add two numbers represented by linked lists' },
    { title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', category: 'Sliding Window', description: 'Find longest substring with unique characters' },
    { title: 'Container With Most Water', difficulty: 'Medium', category: 'Two Pointers', description: 'Find container with maximum water' },
    { title: '3Sum', difficulty: 'Medium', category: 'Arrays', description: 'Find all unique triplets that sum to zero' },
    { title: 'Valid Sudoku', difficulty: 'Medium', category: 'Hash Table', description: 'Check if Sudoku board is valid' },
    { title: 'Spiral Matrix', difficulty: 'Medium', category: 'Matrix', description: 'Return elements in spiral order' },
    { title: 'Word Search', difficulty: 'Medium', category: 'Backtracking', description: 'Find word in 2D board' }
  ],
  'Apple': [
    { title: 'Two Sum', difficulty: 'Easy', category: 'Arrays', description: 'Find two numbers that add up to target' },
    { title: 'Valid Parentheses', difficulty: 'Easy', category: 'Stack', description: 'Check if parentheses are valid' },
    { title: 'Merge Two Sorted Lists', difficulty: 'Easy', category: 'Linked List', description: 'Merge two sorted linked lists' },
    { title: 'Maximum Subarray', difficulty: 'Medium', category: 'Dynamic Programming', description: 'Find subarray with maximum sum' },
    { title: 'Add Two Numbers', difficulty: 'Medium', category: 'Linked List', description: 'Add two numbers represented by linked lists' },
    { title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', category: 'Sliding Window', description: 'Find longest substring with unique characters' },
    { title: 'Container With Most Water', difficulty: 'Medium', category: 'Two Pointers', description: 'Find container with maximum water' },
    { title: '3Sum', difficulty: 'Medium', category: 'Arrays', description: 'Find all unique triplets that sum to zero' },
    { title: 'Valid Sudoku', difficulty: 'Medium', category: 'Hash Table', description: 'Check if Sudoku board is valid' },
    { title: 'Spiral Matrix', difficulty: 'Medium', category: 'Matrix', description: 'Return elements in spiral order' }
  ],
  'Meta': [
    { title: 'Two Sum', difficulty: 'Easy', category: 'Arrays', description: 'Find two numbers that add up to target' },
    { title: 'Valid Parentheses', difficulty: 'Easy', category: 'Stack', description: 'Check if parentheses are valid' },
    { title: 'Merge Two Sorted Lists', difficulty: 'Easy', category: 'Linked List', description: 'Merge two sorted linked lists' },
    { title: 'Maximum Subarray', difficulty: 'Medium', category: 'Dynamic Programming', description: 'Find subarray with maximum sum' },
    { title: 'Add Two Numbers', difficulty: 'Medium', category: 'Linked List', description: 'Add two numbers represented by linked lists' },
    { title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', category: 'Sliding Window', description: 'Find longest substring with unique characters' },
    { title: 'Container With Most Water', difficulty: 'Medium', category: 'Two Pointers', description: 'Find container with maximum water' },
    { title: '3Sum', difficulty: 'Medium', category: 'Arrays', description: 'Find all unique triplets that sum to zero' },
    { title: 'Valid Sudoku', difficulty: 'Medium', category: 'Hash Table', description: 'Check if Sudoku board is valid' },
    { title: 'Spiral Matrix', difficulty: 'Medium', category: 'Matrix', description: 'Return elements in spiral order' }
  ]
}

// Free resources and study materials
const freeResources = {
  'Google': [
    { title: 'Google Interview Preparation Guide', type: 'Guide', url: '#', description: 'Comprehensive guide for Google interviews' },
    { title: 'Google Coding Interview Questions', type: 'Questions', url: '#', description: 'Common coding questions asked at Google' },
    { title: 'Google System Design Questions', type: 'System Design', url: '#', description: 'System design problems and solutions' },
    { title: 'Google Behavioral Questions', type: 'Behavioral', url: '#', description: 'Common behavioral questions and tips' }
  ],
  'Microsoft': [
    { title: 'Microsoft Interview Preparation', type: 'Guide', url: '#', description: 'Complete guide for Microsoft interviews' },
    { title: 'Microsoft Coding Questions', type: 'Questions', url: '#', description: 'Frequently asked coding questions' },
    { title: 'Microsoft System Design', type: 'System Design', url: '#', description: 'System design interview preparation' },
    { title: 'Microsoft Behavioral Guide', type: 'Behavioral', url: '#', description: 'Behavioral interview preparation' }
  ],
  'Amazon': [
    { title: 'Amazon Leadership Principles', type: 'Guide', url: '#', description: 'Understanding Amazon\'s leadership principles' },
    { title: 'Amazon Coding Questions', type: 'Questions', url: '#', description: 'Common Amazon coding interview questions' },
    { title: 'Amazon System Design', type: 'System Design', url: '#', description: 'System design for Amazon interviews' },
    { title: 'Amazon Behavioral Questions', type: 'Behavioral', url: '#', description: 'Amazon behavioral interview guide' }
  ],
  'Apple': [
    { title: 'Apple Interview Guide', type: 'Guide', url: '#', description: 'Complete Apple interview preparation' },
    { title: 'Apple Coding Questions', type: 'Questions', url: '#', description: 'Apple coding interview questions' },
    { title: 'Apple System Design', type: 'System Design', url: '#', description: 'System design for Apple interviews' },
    { title: 'Apple Behavioral Guide', type: 'Behavioral', url: '#', description: 'Apple behavioral interview tips' }
  ],
  'Meta': [
    { title: 'Meta Interview Preparation', type: 'Guide', url: '#', description: 'Meta interview preparation guide' },
    { title: 'Meta Coding Questions', type: 'Questions', url: '#', description: 'Meta coding interview questions' },
    { title: 'Meta System Design', type: 'System Design', url: '#', description: 'System design for Meta interviews' },
    { title: 'Meta Behavioral Questions', type: 'Behavioral', url: '#', description: 'Meta behavioral interview guide' }
  ]
}

export default function CompaniesPage() {
  const [filteredCompanies, setFilteredCompanies] = useState(companies)
  const [searchTerm, setSearchTerm] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('All')
  const [sortBy, setSortBy] = useState('problemCount')
  const [selectedCompany, setSelectedCompany] = useState<any>(null)
  const [showProblems, setShowProblems] = useState(false)
  const [showResources, setShowResources] = useState(false)

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

  const handleCompanyClick = (company: any) => {
    setSelectedCompany(company)
    setShowProblems(false)
    setShowResources(false)
  }

  const handlePracticeProblems = (companyName: string) => {
    // Navigate to practice page with company-specific problems
    window.location.href = `/practice/enhanced?company=${encodeURIComponent(companyName)}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-8 w-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Top Tech Companies</h1>
          </div>
          <p className="text-gray-600">Explore interview processes, curated problems, and free resources for top companies</p>
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

        {/* Free Resources Banner */}
        <div className="card mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <div className="flex items-center space-x-3">
            <Award className="h-6 w-6 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Free Interview Resources</h3>
              <p className="text-sm text-gray-600">Access curated problems and study materials without any subscription fees</p>
            </div>
          </div>
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

              <div className="flex flex-col space-y-2 mt-4">
                <button
                  onClick={() => handlePracticeProblems(company.name)}
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <Play className="h-4 w-4" />
                  <span>Practice Problems</span>
                </button>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedCompany(company)
                      setShowProblems(true)
                      setShowResources(false)
                    }}
                    className="btn-secondary flex-1 text-xs"
                  >
                    View Problems
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCompany(company)
                      setShowResources(true)
                      setShowProblems(false)
                    }}
                    className="btn-secondary flex-1 text-xs"
                  >
                    Resources
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Company Modal */}
        {selectedCompany && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCompany.name}</h2>
                  <button
                    onClick={() => setSelectedCompany(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={() => {
                      setShowProblems(true)
                      setShowResources(false)
                    }}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      showProblems ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Interview Problems
                  </button>
                  <button
                    onClick={() => {
                      setShowResources(true)
                      setShowProblems(false)
                    }}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      showResources ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Study Resources
                  </button>
                </div>

                {/* Problems Tab */}
                {showProblems && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Common Interview Problems</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {companyProblems[selectedCompany?.name as keyof typeof companyProblems]?.map((problem: any, index: number) => (
                        <div key={index} className="card p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{problem.title}</h4>
                            <span className={`text-xs px-2 py-1 rounded ${
                              problem.difficulty === 'Easy' ? 'bg-success-100 text-success-700' :
                              problem.difficulty === 'Medium' ? 'bg-warning-100 text-warning-700' :
                              'bg-danger-100 text-danger-700'
                            }`}>
                              {problem.difficulty}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{problem.description}</p>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{problem.category}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <button
                        onClick={() => handlePracticeProblems(selectedCompany?.name || '')}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <Play className="h-4 w-4" />
                        <span>Practice These Problems</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Resources Tab */}
                {showResources && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Free Study Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {freeResources[selectedCompany?.name as keyof typeof freeResources]?.map((resource: any, index: number) => (
                        <div key={index} className="card p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{resource.type}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                          <button className="btn-secondary text-xs">View Resource</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 