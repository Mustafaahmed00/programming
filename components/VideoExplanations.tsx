'use client'

import { useState, useEffect } from 'react'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  BookOpen,
  Code,
  Lightbulb,
  Clock,
  Users,
  ThumbsUp,
  ThumbsDown,
  Share,
  Download,
  Bookmark,
  MessageCircle,
  Star
} from 'lucide-react'

interface VideoExplanation {
  id: string
  title: string
  description: string
  duration: number // in seconds
  thumbnail: string
  videoUrl: string
  instructor: {
    name: string
    avatar: string
    rating: number
    totalStudents: number
  }
  problemId: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  topics: string[]
  approaches: SolutionApproach[]
  transcript: TranscriptSegment[]
  comments: Comment[]
  likes: number
  dislikes: number
  views: number
  uploadDate: Date
}

interface SolutionApproach {
  id: string
  title: string
  description: string
  timeComplexity: string
  spaceComplexity: string
  code: string
  language: string
  explanation: string
}

interface TranscriptSegment {
  id: string
  timestamp: number
  text: string
  speaker: 'instructor' | 'student'
}

interface Comment {
  id: string
  user: {
    name: string
    avatar: string
  }
  text: string
  timestamp: Date
  likes: number
  replies: Comment[]
}

interface VideoExplanationsProps {
  problemId?: string
  explanations?: VideoExplanation[]
}

export default function VideoExplanations({ 
  problemId, 
  explanations 
}: VideoExplanationsProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoExplanation | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [selectedApproach, setSelectedApproach] = useState<string | null>(null)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')

  // Mock data for demonstration
  const mockExplanations: VideoExplanation[] = [
    {
      id: '1',
      title: 'Two Sum - Optimal Solution with Hash Map',
      description: 'Learn the most efficient approach to solve the Two Sum problem using a hash map. This video covers the O(n) time complexity solution with detailed explanations.',
      duration: 1247, // 20:47
      thumbnail: '/api/placeholder/400/225',
      videoUrl: 'https://example.com/video1.mp4',
      instructor: {
        name: 'Alex Chen',
        avatar: '/api/placeholder/40/40',
        rating: 4.8,
        totalStudents: 15420
      },
      problemId: 'two-sum',
      difficulty: 'Easy',
      topics: ['Arrays', 'Hash Tables', 'Two Pointers'],
      approaches: [
        {
          id: 'approach1',
          title: 'Brute Force',
          description: 'Check all pairs of numbers',
          timeComplexity: 'O(n²)',
          spaceComplexity: 'O(1)',
          language: 'JavaScript',
          code: `function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}`,
          explanation: 'This approach uses nested loops to check every possible pair of numbers in the array. While simple to understand, it\'s not efficient for large arrays.'
        },
        {
          id: 'approach2',
          title: 'Hash Map',
          description: 'Use hash map for O(n) solution',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(n)',
          language: 'JavaScript',
          code: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}`,
          explanation: 'This optimal solution uses a hash map to store numbers we\'ve already seen. For each number, we check if its complement (target - current) exists in the map.'
        }
      ],
      transcript: [
        { id: '1', timestamp: 0, text: 'Hello everyone! Today we\'ll solve the Two Sum problem.', speaker: 'instructor' },
        { id: '2', timestamp: 15, text: 'This is a classic interview question that tests your understanding of hash tables.', speaker: 'instructor' },
        { id: '3', timestamp: 30, text: 'Let\'s start with the brute force approach...', speaker: 'instructor' },
        { id: '4', timestamp: 120, text: 'Now let\'s optimize this using a hash map.', speaker: 'instructor' },
        { id: '5', timestamp: 300, text: 'The key insight is that we can use a hash map to store numbers we\'ve already seen.', speaker: 'instructor' }
      ],
      comments: [
        {
          id: '1',
          user: { name: 'Sarah K.', avatar: '/api/placeholder/32/32' },
          text: 'Great explanation! The hash map approach is much clearer now.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          likes: 12,
          replies: []
        },
        {
          id: '2',
          user: { name: 'Mike R.', avatar: '/api/placeholder/32/32' },
          text: 'Could you explain why we use a Map instead of a regular object?',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          likes: 8,
          replies: [
            {
              id: '2.1',
              user: { name: 'Alex Chen', avatar: '/api/placeholder/32/32' },
              text: 'Great question! Map is preferred because it can use any value as a key, while objects can only use strings and symbols.',
              timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
              likes: 15,
              replies: []
            }
          ]
        }
      ],
      likes: 1247,
      dislikes: 23,
      views: 15420,
      uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'Two Sum - Multiple Approaches Compared',
      description: 'Compare different approaches to solve Two Sum: brute force, sorting, and hash map. Understand the trade-offs between time and space complexity.',
      duration: 1845, // 30:45
      thumbnail: '/api/placeholder/400/225',
      videoUrl: 'https://example.com/video2.mp4',
      instructor: {
        name: 'Emma Wilson',
        avatar: '/api/placeholder/40/40',
        rating: 4.9,
        totalStudents: 8920
      },
      problemId: 'two-sum',
      difficulty: 'Easy',
      topics: ['Arrays', 'Sorting', 'Hash Tables', 'Two Pointers'],
      approaches: [
        {
          id: 'approach1',
          title: 'Brute Force',
          description: 'Check all pairs',
          timeComplexity: 'O(n²)',
          spaceComplexity: 'O(1)',
          language: 'Python',
          code: `def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
          explanation: 'The simplest approach that checks every possible pair.'
        },
        {
          id: 'approach2',
          title: 'Sorting + Two Pointers',
          description: 'Sort array and use two pointers',
          timeComplexity: 'O(n log n)',
          spaceComplexity: 'O(n)',
          language: 'Python',
          code: `def two_sum(nums, target):
    # Create list of (value, index) pairs
    nums_with_index = [(nums[i], i) for i in range(len(nums))]
    nums_with_index.sort()
    
    left, right = 0, len(nums_with_index) - 1
    
    while left < right:
        current_sum = nums_with_index[left][0] + nums_with_index[right][0]
        
        if current_sum == target:
            return [nums_with_index[left][1], nums_with_index[right][1]]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    
    return []`,
          explanation: 'Sort the array and use two pointers to find the pair. This approach is useful when you need to return the values instead of indices.'
        }
      ],
      transcript: [],
      comments: [],
      likes: 892,
      dislikes: 15,
      views: 8920,
      uploadDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    }
  ]

  const videos = explanations || mockExplanations

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleVideoSelect = (video: VideoExplanation) => {
    setSelectedVideo(video)
    setCurrentTime(0)
    setIsPlaying(false)
    setDuration(video.duration)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = (parseFloat(e.target.value) / 100) * duration
    setCurrentTime(time)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const handleTranscriptClick = (timestamp: number) => {
    setCurrentTime(timestamp)
  }

  const handleLike = () => {
    if (selectedVideo) {
      // In a real app, this would make an API call
      console.log('Liked video:', selectedVideo.id)
    }
  }

  const handleDislike = () => {
    if (selectedVideo) {
      // In a real app, this would make an API call
      console.log('Disliked video:', selectedVideo.id)
    }
  }

  const handleCommentSubmit = () => {
    if (newComment.trim() && selectedVideo) {
      // In a real app, this would make an API call
      console.log('New comment:', newComment)
      setNewComment('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Video Explanations</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <span>Transcript</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2">
          {selectedVideo ? (
            <div className="card p-4">
              {/* Video Player */}
              <div className="relative bg-black rounded-lg overflow-hidden mb-4">
                <div className="aspect-video bg-gray-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">▶️</div>
                    <p className="text-lg">{selectedVideo.title}</p>
                    <p className="text-sm text-gray-400">Click to play</p>
                  </div>
                </div>
                
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handlePlayPause}
                      className="text-white hover:text-gray-300"
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </button>
                    
                    <div className="flex-1">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={(currentTime / duration) * 100}
                        onChange={handleSeek}
                        className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    
                    <span className="text-white text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-white hover:text-gray-300"
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="text-white hover:text-gray-300"
                    >
                      {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedVideo.title}</h3>
                <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <img src={selectedVideo.instructor.avatar} alt={selectedVideo.instructor.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{selectedVideo.instructor.name}</p>
                        <p className="text-xs text-gray-600">{selectedVideo.instructor.totalStudents} students</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{selectedVideo.instructor.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleLike}
                      className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{selectedVideo.likes}</span>
                    </button>
                    <button
                      onClick={handleDislike}
                      className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span>{selectedVideo.dislikes}</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800">
                      <Share className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Solution Approaches */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Solution Approaches</h4>
                <div className="space-y-3">
                  {selectedVideo.approaches.map((approach) => (
                    <div key={approach.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">{approach.title}</h5>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>Time: {approach.timeComplexity}</span>
                          <span>Space: {approach.spaceComplexity}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{approach.description}</p>
                      
                      <div className="bg-gray-900 text-gray-100 p-3 rounded-lg mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">{approach.language}</span>
                          <button className="text-xs text-gray-400 hover:text-white">Copy</button>
                        </div>
                        <pre className="text-sm overflow-x-auto">
                          <code>{approach.code}</code>
                        </pre>
                      </div>
                      
                      <p className="text-sm text-gray-700">{approach.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-900">Comments ({selectedVideo.comments.length})</h4>
                  <button
                    onClick={() => setShowComments(!showComments)}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    {showComments ? 'Hide' : 'Show'} Comments
                  </button>
                </div>
                
                {showComments && (
                  <div className="space-y-4">
                    <div className="flex space-x-3">
                      <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full" />
                      <div className="flex-1">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment..."
                          className="w-full p-3 border rounded-lg resize-none"
                          rows={3}
                        />
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={handleCommentSubmit}
                            className="btn-primary text-sm"
                          >
                            Post Comment
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {selectedVideo.comments.map((comment) => (
                        <div key={comment.id} className="flex space-x-3">
                          <img src={comment.user.avatar} alt={comment.user.name} className="w-8 h-8 rounded-full" />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm font-medium text-gray-900">{comment.user.name}</span>
                              <span className="text-xs text-gray-500">
                                {comment.timestamp.toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{comment.text}</p>
                            <div className="flex items-center space-x-4">
                              <button className="text-xs text-gray-600 hover:text-gray-800">
                                Like ({comment.likes})
                              </button>
                              <button className="text-xs text-gray-600 hover:text-gray-800">
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="card p-8 text-center">
              <div className="text-6xl mb-4">📹</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Video</h3>
              <p className="text-gray-600">Choose a video explanation from the list to start learning</p>
            </div>
          )}
        </div>

        {/* Video List */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Available Explanations</h4>
          <div className="space-y-3">
            {videos.map((video) => (
              <div
                key={video.id}
                onClick={() => handleVideoSelect(video)}
                className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                  selectedVideo?.id === video.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <Play className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium text-gray-900 truncate">{video.title}</h5>
                    <p className="text-xs text-gray-600 mt-1">{video.instructor.name}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs text-gray-500">{formatTime(video.duration)}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{video.views} views</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transcript */}
      {showTranscript && selectedVideo && (
        <div className="card p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Transcript</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {selectedVideo.transcript.map((segment) => (
              <div
                key={segment.id}
                onClick={() => handleTranscriptClick(segment.timestamp)}
                className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <span className="text-xs text-gray-500 font-mono min-w-0">
                  {formatTime(segment.timestamp)}
                </span>
                <span className="text-sm text-gray-700">{segment.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 