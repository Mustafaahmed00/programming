export interface Company {
  id: string
  name: string
  logo?: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  interviewProcess: InterviewProcess
  problemCount: number
  categories: string[]
  resources: CompanyResource[]
  salary: {
    min: number
    max: number
    currency: string
  }
  locations: string[]
  benefits: string[]
}

export interface InterviewProcess {
  stages: InterviewStage[]
  duration: string
  tips: string[]
}

export interface InterviewStage {
  name: string
  description: string
  duration: string
  type: 'Phone Screen' | 'Technical' | 'System Design' | 'Behavioral' | 'Onsite'
}

export interface CompanyResource {
  type: 'problems' | 'videos' | 'articles' | 'practice'
  title: string
  url: string
  description: string
  difficulty?: string
}

export const companies: Company[] = [
  {
    id: 'google',
    name: 'Google',
    description: 'One of the most prestigious tech companies known for challenging technical interviews and innovative projects.',
    difficulty: 'Hard',
    interviewProcess: {
      stages: [
        {
          name: 'Phone Screen',
          description: '45-minute technical phone interview with coding questions',
          duration: '45 minutes',
          type: 'Phone Screen'
        },
        {
          name: 'Onsite Interviews',
          description: '4-5 technical interviews including coding, system design, and behavioral',
          duration: '1 day',
          type: 'Onsite'
        }
      ],
      duration: '2-4 weeks',
      tips: [
        'Focus on clean, efficient code',
        'Practice system design questions',
        'Know Google\'s coding style guidelines',
        'Prepare for behavioral questions with STAR method'
      ]
    },
    problemCount: 150,
    categories: ['Algorithms', 'System Design', 'Data Structures', 'Machine Learning'],
    resources: [
      {
        type: 'problems',
        title: 'Google Interview Questions',
        url: 'https://leetcode.com/company/google/',
        description: 'Curated list of Google interview questions on LeetCode',
        difficulty: 'Hard'
      },
      {
        type: 'videos',
        title: 'Google Interview Preparation',
        url: 'https://www.youtube.com/watch?v=oBt53YbR9Kk',
        description: 'Complete guide to Google interview preparation'
      }
    ],
    salary: {
      min: 120000,
      max: 300000,
      currency: 'USD'
    },
    locations: ['Mountain View, CA', 'New York, NY', 'Seattle, WA', 'London, UK'],
    benefits: ['Free food', 'Health insurance', 'Stock options', 'Flexible work hours']
  },
  {
    id: 'amazon',
    name: 'Amazon',
    description: 'E-commerce and cloud computing giant with a focus on leadership principles and technical excellence.',
    difficulty: 'Medium',
    interviewProcess: {
      stages: [
        {
          name: 'Online Assessment',
          description: 'Coding assessment with 2-3 problems',
          duration: '90 minutes',
          type: 'Technical'
        },
        {
          name: 'Phone Interview',
          description: 'Technical phone interview with coding and behavioral questions',
          duration: '45 minutes',
          type: 'Phone Screen'
        },
        {
          name: 'Onsite Loop',
          description: '4-5 interviews including coding, system design, and leadership principles',
          duration: '1 day',
          type: 'Onsite'
        }
      ],
      duration: '3-6 weeks',
      tips: [
        'Study Amazon Leadership Principles thoroughly',
        'Practice coding on a whiteboard',
        'Prepare STAR method for behavioral questions',
        'Focus on scalable solutions'
      ]
    },
    problemCount: 200,
    categories: ['Algorithms', 'System Design', 'Leadership Principles', 'Data Structures'],
    resources: [
      {
        type: 'problems',
        title: 'Amazon Interview Questions',
        url: 'https://leetcode.com/company/amazon/',
        description: 'Amazon-specific interview questions on LeetCode',
        difficulty: 'Medium'
      },
      {
        type: 'articles',
        title: 'Amazon Leadership Principles',
        url: 'https://www.amazon.jobs/en/principles',
        description: 'Official guide to Amazon\'s 16 Leadership Principles'
      }
    ],
    salary: {
      min: 100000,
      max: 250000,
      currency: 'USD'
    },
    locations: ['Seattle, WA', 'New York, NY', 'San Francisco, CA', 'Austin, TX'],
    benefits: ['Health insurance', 'Stock options', '401k matching', 'Career development']
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    description: 'Software giant known for comprehensive technical interviews and focus on problem-solving skills.',
    difficulty: 'Medium',
    interviewProcess: {
      stages: [
        {
          name: 'Phone Screen',
          description: 'Technical phone interview with coding questions',
          duration: '45 minutes',
          type: 'Phone Screen'
        },
        {
          name: 'Onsite Interviews',
          description: '4-5 technical interviews including coding and system design',
          duration: '1 day',
          type: 'Onsite'
        }
      ],
      duration: '2-4 weeks',
      tips: [
        'Focus on clean, readable code',
        'Practice explaining your thought process',
        'Know Microsoft technologies',
        'Prepare for behavioral questions'
      ]
    },
    problemCount: 120,
    categories: ['Algorithms', 'System Design', 'Software Engineering', 'Data Structures'],
    resources: [
      {
        type: 'problems',
        title: 'Microsoft Interview Questions',
        url: 'https://leetcode.com/company/microsoft/',
        description: 'Microsoft-specific interview questions on LeetCode',
        difficulty: 'Medium'
      }
    ],
    salary: {
      min: 110000,
      max: 280000,
      currency: 'USD'
    },
    locations: ['Redmond, WA', 'Seattle, WA', 'New York, NY', 'San Francisco, CA'],
    benefits: ['Health insurance', 'Stock options', 'Flexible work hours', 'Professional development']
  },
  {
    id: 'meta',
    name: 'Meta (Facebook)',
    description: 'Social media and technology company known for challenging technical interviews and innovative projects.',
    difficulty: 'Hard',
    interviewProcess: {
      stages: [
        {
          name: 'Phone Screen',
          description: 'Technical phone interview with coding questions',
          duration: '45 minutes',
          type: 'Phone Screen'
        },
        {
          name: 'Onsite Interviews',
          description: '4-5 technical interviews including coding, system design, and behavioral',
          duration: '1 day',
          type: 'Onsite'
        }
      ],
      duration: '2-4 weeks',
      tips: [
        'Focus on scalable solutions',
        'Practice system design questions',
        'Know Meta\'s technology stack',
        'Prepare for behavioral questions'
      ]
    },
    problemCount: 180,
    categories: ['Algorithms', 'System Design', 'Data Structures', 'Machine Learning'],
    resources: [
      {
        type: 'problems',
        title: 'Meta Interview Questions',
        url: 'https://leetcode.com/company/meta/',
        description: 'Meta-specific interview questions on LeetCode',
        difficulty: 'Hard'
      }
    ],
    salary: {
      min: 130000,
      max: 320000,
      currency: 'USD'
    },
    locations: ['Menlo Park, CA', 'New York, NY', 'Seattle, WA', 'London, UK'],
    benefits: ['Free food', 'Health insurance', 'Stock options', 'Flexible work hours']
  },
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'AI research company known for cutting-edge technology and challenging technical interviews.',
    difficulty: 'Hard',
    interviewProcess: {
      stages: [
        {
          name: 'Technical Phone Screen',
          description: 'Deep technical interview with AI/ML focus',
          duration: '60 minutes',
          type: 'Phone Screen'
        },
        {
          name: 'Onsite Interviews',
          description: 'Multiple technical interviews including coding, ML, and research',
          duration: '1-2 days',
          type: 'Onsite'
        }
      ],
      duration: '3-6 weeks',
      tips: [
        'Strong background in AI/ML required',
        'Practice research-oriented questions',
        'Know deep learning fundamentals',
        'Prepare for technical discussions'
      ]
    },
    problemCount: 80,
    categories: ['Machine Learning', 'Deep Learning', 'Algorithms', 'Research'],
    resources: [
      {
        type: 'problems',
        title: 'AI/ML Interview Questions',
        url: 'https://leetcode.com/tag/machine-learning/',
        description: 'Machine learning and AI interview questions',
        difficulty: 'Hard'
      }
    ],
    salary: {
      min: 150000,
      max: 400000,
      currency: 'USD'
    },
    locations: ['San Francisco, CA', 'New York, NY', 'London, UK'],
    benefits: ['Competitive salary', 'Stock options', 'Research opportunities', 'Cutting-edge technology']
  },
  {
    id: 'apple',
    name: 'Apple',
    description: 'Technology company known for innovative products and comprehensive technical interviews.',
    difficulty: 'Medium',
    interviewProcess: {
      stages: [
        {
          name: 'Phone Screen',
          description: 'Technical phone interview with coding questions',
          duration: '45 minutes',
          type: 'Phone Screen'
        },
        {
          name: 'Onsite Interviews',
          description: '4-5 technical interviews including coding and system design',
          duration: '1 day',
          type: 'Onsite'
        }
      ],
      duration: '2-4 weeks',
      tips: [
        'Focus on user experience',
        'Know Apple\'s technology stack',
        'Practice clean code principles',
        'Prepare for behavioral questions'
      ]
    },
    problemCount: 100,
    categories: ['Algorithms', 'System Design', 'iOS Development', 'Data Structures'],
    resources: [
      {
        type: 'problems',
        title: 'Apple Interview Questions',
        url: 'https://leetcode.com/company/apple/',
        description: 'Apple-specific interview questions on LeetCode',
        difficulty: 'Medium'
      }
    ],
    salary: {
      min: 120000,
      max: 300000,
      currency: 'USD'
    },
    locations: ['Cupertino, CA', 'Seattle, WA', 'New York, NY', 'London, UK'],
    benefits: ['Health insurance', 'Stock options', 'Product discounts', 'Professional development']
  }
]

export const getCompanyById = (id: string) => {
  return companies.find(company => company.id === id)
}

export const getCompaniesByDifficulty = (difficulty: string) => {
  return companies.filter(company => company.difficulty === difficulty)
}

export const getTopCompanies = () => {
  return companies.sort((a, b) => b.problemCount - a.problemCount)
} 