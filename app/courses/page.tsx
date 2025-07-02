'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Star, Play, Clock, Users, Filter, Search } from 'lucide-react'
import { courses } from '@/data/courses'

export default function CoursesPage() {
  const [filteredCourses, setFilteredCourses] = useState(courses)
  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState('All')
  const [sortBy, setSortBy] = useState('rating')

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

  useEffect(() => {
    let filtered = courses

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Apply level filter
    if (levelFilter !== 'All') {
      filtered = filtered.filter(course => course.level === levelFilter)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'students':
          return b.students - a.students
        case 'title':
          return a.title.localeCompare(b.title)
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration)
        default:
          return b.rating - a.rating
      }
    })

    setFilteredCourses(filtered)
  }, [searchTerm, levelFilter, sortBy])

  const getStats = () => {
    const total = courses.length
    const beginner = courses.filter(c => c.level === 'Beginner').length
    const intermediate = courses.filter(c => c.level === 'Intermediate').length
    const advanced = courses.filter(c => c.level === 'Advanced').length
    const totalStudents = courses.reduce((sum, c) => sum + c.students, 0)
    const avgRating = courses.reduce((sum, c) => sum + c.rating, 0) / courses.length

    return { total, beginner, intermediate, advanced, totalStudents, avgRating }
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="h-8 w-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">DSA & Interview Courses</h1>
          </div>
          <p className="text-gray-600">Free, high-quality courses to master DSA and ace interviews</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Courses</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-success-600">{stats.beginner}</div>
            <div className="text-sm text-gray-600">Beginner</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-warning-600">{stats.intermediate}</div>
            <div className="text-sm text-gray-600">Intermediate</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-danger-600">{stats.advanced}</div>
            <div className="text-sm text-gray-600">Advanced</div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600">{(stats.totalStudents / 1000).toFixed(1)}k</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.avgRating.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Average Rating</div>
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
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Level Filter */}
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {levels.map(level => (
                <option key={level} value={level}>Level: {level}</option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="rating">Sort: Rating</option>
              <option value="students">Sort: Students</option>
              <option value="title">Sort: Title</option>
              <option value="duration">Sort: Duration</option>
            </select>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mb-6">
          <a
            href="https://www.youtube.com/results?search_query=data+structures+algorithms+course"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center space-x-2"
          >
            <Play className="h-4 w-4" />
            <span>More DSA Courses</span>
          </a>
          <a
            href="https://www.youtube.com/results?search_query=system+design+interview"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center space-x-2"
          >
            <BookOpen className="h-4 w-4" />
            <span>System Design</span>
          </a>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="card flex flex-col justify-between h-full hover:shadow-lg transition-shadow">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-3 text-sm">{course.description}</p>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`text-xs px-2 py-1 rounded ${
                    course.level === 'Beginner' ? 'bg-success-100 text-success-700' :
                    course.level === 'Intermediate' ? 'bg-warning-100 text-warning-700' :
                    'bg-danger-100 text-danger-700'
                  }`}>
                    {course.level}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {course.duration}
                  </span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{course.free ? 'Free' : 'Paid'}</span>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-800">{course.rating}</span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {(course.students / 1000).toFixed(1)}k students
                  </span>
                </div>

                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Instructor: {course.instructor}</p>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {course.topics.slice(0, 4).map((topic, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{topic}</span>
                  ))}
                  {course.topics.length > 4 && (
                    <span className="text-xs text-gray-500">+{course.topics.length - 4} more</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <a
                  href={course.videoUrl || course.playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center space-x-2"
                >
                  <Play className="h-4 w-4" />
                  <span>Watch</span>
                </a>
                <a
                  href={course.playlistUrl || course.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs"
                >
                  Playlist
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  )
} 