export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  topics: string[]
  videoUrl?: string
  playlistUrl?: string
  free: boolean
  rating: number
  students: number
  thumbnail?: string
  modules: CourseModule[]
}

export interface CourseModule {
  id: string
  title: string
  description: string
  duration: string
  topics: string[]
  videoUrl?: string
  resources: CourseResource[]
}

export interface CourseResource {
  type: 'video' | 'article' | 'practice' | 'quiz'
  title: string
  url?: string
  duration?: string
  description: string
}

export const courses: Course[] = [
  {
    id: 'dsa-fundamentals',
    title: 'Data Structures & Algorithms Fundamentals',
    description: 'Master the core concepts of data structures and algorithms with hands-on practice and real-world examples.',
    instructor: 'Abdul Bari',
    duration: '40 hours',
    level: 'Beginner',
    topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs', 'Sorting', 'Searching'],
    videoUrl: 'https://www.youtube.com/watch?v=0IAPZzGSbME',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O',
    free: true,
    rating: 4.8,
    students: 1250000,
    modules: [
      {
        id: 'arrays-linkedlists',
        title: 'Arrays and Linked Lists',
        description: 'Learn the fundamentals of linear data structures',
        duration: '6 hours',
        topics: ['Array Operations', 'Singly Linked Lists', 'Doubly Linked Lists', 'Circular Linked Lists'],
        videoUrl: 'https://www.youtube.com/watch?v=RBSGKlAvoiM',
        resources: [
          {
            type: 'video',
            title: 'Introduction to Arrays',
            url: 'https://www.youtube.com/watch?v=RBSGKlAvoiM',
            duration: '45 min',
            description: 'Basic array operations and time complexity analysis'
          },
          {
            type: 'practice',
            title: 'Array Practice Problems',
            url: 'https://leetcode.com/tag/array/',
            description: 'Practice array problems on LeetCode'
          }
        ]
      },
      {
        id: 'stacks-queues',
        title: 'Stacks and Queues',
        description: 'Master LIFO and FIFO data structures',
        duration: '4 hours',
        topics: ['Stack Implementation', 'Queue Implementation', 'Applications', 'Problem Solving'],
        resources: [
          {
            type: 'video',
            title: 'Stack Data Structure',
            url: 'https://www.youtube.com/watch?v=GYptUgnIM_I',
            duration: '30 min',
            description: 'Complete stack implementation and applications'
          }
        ]
      }
    ]
  },
  {
    id: 'advanced-algorithms',
    title: 'Advanced Algorithms',
    description: 'Deep dive into complex algorithms including dynamic programming, graph algorithms, and advanced techniques.',
    instructor: 'William Fiset',
    duration: '35 hours',
    level: 'Advanced',
    topics: ['Dynamic Programming', 'Graph Algorithms', 'Advanced Data Structures', 'Algorithm Design'],
    videoUrl: 'https://www.youtube.com/watch?v=09_LlHjoEiY',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P',
    free: true,
    rating: 4.9,
    students: 850000,
    modules: [
      {
        id: 'dynamic-programming',
        title: 'Dynamic Programming',
        description: 'Master the art of dynamic programming',
        duration: '8 hours',
        topics: ['Memoization', 'Tabulation', 'State Transitions', 'Optimization'],
        videoUrl: 'https://www.youtube.com/watch?v=oBt53YbR9Kk',
        resources: [
          {
            type: 'video',
            title: 'Dynamic Programming Introduction',
            url: 'https://www.youtube.com/watch?v=oBt53YbR9Kk',
            duration: '1 hour',
            description: 'Complete introduction to dynamic programming concepts'
          }
        ]
      }
    ]
  },
  {
    id: 'system-design',
    title: 'System Design for Interviews',
    description: 'Learn how to design scalable systems and ace system design interviews at top tech companies.',
    instructor: 'Gaurav Sen',
    duration: '25 hours',
    level: 'Intermediate',
    topics: ['Scalability', 'Database Design', 'Load Balancing', 'Caching', 'Microservices'],
    videoUrl: 'https://www.youtube.com/watch?v=quLrc3PbuIw',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX',
    free: true,
    rating: 4.7,
    students: 650000,
    modules: [
      {
        id: 'scalability-basics',
        title: 'Scalability Fundamentals',
        description: 'Learn the basics of building scalable systems',
        duration: '5 hours',
        topics: ['Horizontal vs Vertical Scaling', 'Load Balancing', 'Database Scaling'],
        resources: [
          {
            type: 'video',
            title: 'System Design Basics',
            url: 'https://www.youtube.com/watch?v=quLrc3PbuIw',
            duration: '45 min',
            description: 'Introduction to system design concepts'
          }
        ]
      }
    ]
  },
  {
    id: 'competitive-programming',
    title: 'Competitive Programming Masterclass',
    description: 'Master competitive programming techniques and strategies used in coding competitions.',
    instructor: 'Errichto',
    duration: '30 hours',
    level: 'Advanced',
    topics: ['Algorithm Optimization', 'Problem Solving Techniques', 'Competition Strategies'],
    videoUrl: 'https://www.youtube.com/watch?v=JXTVOyQpSGM',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLl0KD3g-oDOHpWRyyGBUJ9jmul0lUOD80',
    free: true,
    rating: 4.9,
    students: 450000,
    modules: [
      {
        id: 'problem-solving',
        title: 'Problem Solving Techniques',
        description: 'Learn systematic approaches to solve complex problems',
        duration: '6 hours',
        topics: ['Greedy Algorithms', 'Binary Search', 'Two Pointers', 'Sliding Window'],
        resources: [
          {
            type: 'video',
            title: 'Problem Solving Strategies',
            url: 'https://www.youtube.com/watch?v=JXTVOyQpSGM',
            duration: '1 hour',
            description: 'Systematic approach to competitive programming problems'
          }
        ]
      }
    ]
  }
]

export const getCoursesByLevel = (level: string) => {
  return courses.filter(course => course.level === level)
}

export const getCourseById = (id: string) => {
  return courses.find(course => course.id === id)
}

export const getFreeCourses = () => {
  return courses.filter(course => course.free)
} 