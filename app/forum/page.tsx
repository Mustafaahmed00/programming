'use client'

import { useState } from 'react'
import { MessageSquare, Users, TrendingUp, ThumbsUp, MessageCircle, Clock, User, Tag, Search } from 'lucide-react'

interface ForumThread {
  id: number
  title: string
  content: string
  author: string
  authorAvatar: string
  category: string
  tags: string[]
  replies: number
  views: number
  likes: number
  createdAt: string
  isPinned: boolean
  isSolved: boolean
}

const forumThreads: ForumThread[] = [
  {
    id: 1,
    title: "Help with Dynamic Programming - Longest Common Subsequence",
    content: "I'm struggling with the LCS problem. Can someone explain the optimal substructure and overlapping subproblems?",
    author: "Alex Chen",
    authorAvatar: "AC",
    category: "Algorithms",
    tags: ["Dynamic Programming", "LCS", "Help"],
    replies: 12,
    views: 156,
    likes: 8,
    createdAt: "2024-01-15T10:30:00Z",
    isPinned: true,
    isSolved: true
  },
  {
    id: 2,
    title: "Best approach for System Design interviews?",
    content: "What's your strategy for tackling system design questions? Any recommended resources or frameworks?",
    author: "Sarah Johnson",
    authorAvatar: "SJ",
    category: "Interview Prep",
    tags: ["System Design", "Interview", "Strategy"],
    replies: 23,
    views: 289,
    likes: 15,
    createdAt: "2024-01-14T15:45:00Z",
    isPinned: false,
    isSolved: false
  },
  {
    id: 3,
    title: "Time Complexity Analysis - Binary Search vs Linear Search",
    content: "Can someone break down the time complexity differences between binary search and linear search?",
    author: "Mike Rodriguez",
    authorAvatar: "MR",
    category: "Algorithms",
    tags: ["Time Complexity", "Binary Search", "Analysis"],
    replies: 8,
    views: 94,
    likes: 6,
    createdAt: "2024-01-14T09:20:00Z",
    isPinned: false,
    isSolved: true
  },
  {
    id: 4,
    title: "LeetCode Contest Discussion - Weekly Contest 345",
    content: "How did everyone do in this week's contest? Share your solutions and strategies!",
    author: "Emily Davis",
    authorAvatar: "ED",
    category: "Contests",
    tags: ["LeetCode", "Contest", "Discussion"],
    replies: 31,
    views: 412,
    likes: 22,
    createdAt: "2024-01-13T20:15:00Z",
    isPinned: true,
    isSolved: false
  },
  {
    id: 5,
    title: "Graph Algorithms - Dijkstra's vs Bellman-Ford",
    content: "When should I use Dijkstra's algorithm vs Bellman-Ford? What are the trade-offs?",
    author: "David Kim",
    authorAvatar: "DK",
    category: "Algorithms",
    tags: ["Graph Algorithms", "Dijkstra", "Bellman-Ford"],
    replies: 16,
    views: 178,
    likes: 11,
    createdAt: "2024-01-13T14:30:00Z",
    isPinned: false,
    isSolved: false
  },
  {
    id: 6,
    title: "Python vs Java for Competitive Programming",
    content: "Which language do you prefer for CP? Pros and cons of each?",
    author: "Lisa Wang",
    authorAvatar: "LW",
    category: "Programming",
    tags: ["Python", "Java", "Competitive Programming"],
    replies: 19,
    views: 203,
    likes: 13,
    createdAt: "2024-01-12T16:45:00Z",
    isPinned: false,
    isSolved: false
  },
  {
    id: 7,
    title: "Data Structure Implementation - Custom Priority Queue",
    content: "I implemented a custom priority queue. Can someone review my code and suggest improvements?",
    author: "James Wilson",
    authorAvatar: "JW",
    category: "Data Structures",
    tags: ["Priority Queue", "Code Review", "Implementation"],
    replies: 7,
    views: 87,
    likes: 4,
    createdAt: "2024-01-12T11:20:00Z",
    isPinned: false,
    isSolved: false
  },
  {
    id: 8,
    title: "Interview Experience - Google Onsite",
    content: "Just finished my Google onsite interview. Here's my experience and tips for others!",
    author: "Maria Garcia",
    authorAvatar: "MG",
    category: "Interview Prep",
    tags: ["Google", "Interview", "Experience"],
    replies: 28,
    views: 356,
    likes: 18,
    createdAt: "2024-01-11T19:30:00Z",
    isPinned: false,
    isSolved: false
  }
]

const categories = [
  { name: "All", count: forumThreads.length },
  { name: "Algorithms", count: forumThreads.filter(t => t.category === "Algorithms").length },
  { name: "Data Structures", count: forumThreads.filter(t => t.category === "Data Structures").length },
  { name: "Interview Prep", count: forumThreads.filter(t => t.category === "Interview Prep").length },
  { name: "Programming", count: forumThreads.filter(t => t.category === "Programming").length },
  { name: "Contests", count: forumThreads.filter(t => t.category === "Contests").length }
]

export default function ForumPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('recent')

  const filteredThreads = forumThreads.filter(thread => {
    const matchesCategory = selectedCategory === 'All' || thread.category === selectedCategory
    const matchesSearch = thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         thread.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         thread.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  const getStats = () => {
    const totalThreads = forumThreads.length
    const totalReplies = forumThreads.reduce((sum, t) => sum + t.replies, 0)
    const totalViews = forumThreads.reduce((sum, t) => sum + t.views, 0)
    const solvedThreads = forumThreads.filter(t => t.isSolved).length

    return { totalThreads, totalReplies, totalViews, solvedThreads }
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <MessageSquare className="h-8 w-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
          </div>
          <p className="text-gray-600">Connect with fellow coders, ask questions, and share knowledge</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.totalThreads}</div>
            <div className="text-sm text-gray-600">Total Threads</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600">{stats.totalReplies}</div>
            <div className="text-sm text-gray-600">Total Replies</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-success-600">{stats.totalViews}</div>
            <div className="text-sm text-gray-600">Total Views</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.solvedThreads}</div>
            <div className="text-sm text-gray-600">Solved Threads</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search threads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.name} value={category.name}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="replies">Most Replies</option>
              <option value="views">Most Views</option>
            </select>

            {/* New Thread Button */}
            <button className="btn-primary flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>New Thread</span>
            </button>
          </div>
        </div>

        {/* Threads List */}
        <div className="space-y-4">
          {filteredThreads.map((thread) => (
            <div key={thread.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                {/* Thread Status */}
                <div className="flex flex-col items-center space-y-2">
                  {thread.isPinned && (
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" title="Pinned"></div>
                  )}
                  {thread.isSolved && (
                    <div className="w-2 h-2 bg-success-500 rounded-full" title="Solved"></div>
                  )}
                  {!thread.isPinned && !thread.isSolved && (
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  )}
                </div>

                {/* Thread Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 cursor-pointer">
                        {thread.title}
                      </h3>
                      {thread.isPinned && (
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">Pinned</span>
                      )}
                      {thread.isSolved && (
                        <span className="px-2 py-1 text-xs bg-success-100 text-success-700 rounded">Solved</span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{thread.content}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{thread.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatTimeAgo(thread.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{thread.replies} replies</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{thread.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{thread.likes} likes</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        thread.category === 'Algorithms' ? 'bg-blue-100 text-blue-700' :
                        thread.category === 'Data Structures' ? 'bg-green-100 text-green-700' :
                        thread.category === 'Interview Prep' ? 'bg-purple-100 text-purple-700' :
                        thread.category === 'Programming' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {thread.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-3">
                    {thread.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded flex items-center">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author Avatar */}
                <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-600">{thread.authorAvatar}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredThreads.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No threads found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}

        {/* Community Guidelines */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Be Respectful</h3>
              <p className="text-gray-600 text-sm">Treat others with kindness and respect. No harassment or discrimination.</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay On Topic</h3>
              <p className="text-gray-600 text-sm">Keep discussions focused on programming, algorithms, and technical topics.</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Knowledge</h3>
              <p className="text-gray-600 text-sm">Help others learn by sharing your knowledge and experiences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 