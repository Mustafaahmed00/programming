'use client'

import { Trophy, Brain, Target, Clock, BookOpen, Zap, Star, Award, TrendingUp, Users } from 'lucide-react'

export default function CompetitiveProgrammers() {
  const programmers = [
    {
      name: "Petr Mitrichev",
      handle: "@Petr",
      achievements: ["Google Code Jam Champion", "ACM ICPC World Finalist", "TopCoder Algorithm Champion"],
      rating: 3000,
      approach: "Mathematical thinking with emphasis on correctness and elegance",
      specialties: ["Dynamic Programming", "Graph Theory", "Number Theory"],
      philosophy: "Focus on understanding the problem deeply before coding. Always prove your solution.",
      tips: [
        "Read the problem statement carefully - twice!",
        "Draw examples and test cases",
        "Think about edge cases first",
        "Write clean, readable code"
      ],
      stats: {
        problemsSolved: 2500,
        contestWins: 150,
        averageTime: "15m",
        accuracy: 95.2
      }
    },
    {
      name: "Gennady Korotkevich",
      handle: "@tourist",
      achievements: ["Codeforces Grandmaster", "IOI Gold Medalist", "Multiple ICPC Champion"],
      rating: 3500,
      approach: "Extreme speed with deep algorithmic knowledge",
      specialties: ["Data Structures", "Advanced Algorithms", "Competitive Math"],
      philosophy: "Practice makes perfect. Solve problems daily and learn from every mistake.",
      tips: [
        "Practice consistently - even 30 minutes daily helps",
        "Learn standard algorithms thoroughly",
        "Participate in contests regularly",
        "Review and understand solutions after contests"
      ],
      stats: {
        problemsSolved: 3000,
        contestWins: 200,
        averageTime: "12m",
        accuracy: 97.8
      }
    },
    {
      name: "Makoto Soejima",
      handle: "@rng_58",
      achievements: ["Google Code Jam Champion", "TopCoder Algorithm Champion", "IOI Gold Medalist"],
      rating: 3200,
      approach: "Systematic problem decomposition and mathematical rigor",
      specialties: ["Combinatorics", "Geometry", "Optimization"],
      philosophy: "Break complex problems into smaller, manageable parts. Use mathematical insights.",
      tips: [
        "Master fundamental algorithms first",
        "Learn to recognize problem patterns",
        "Practice mathematical thinking",
        "Don't rush - think before coding"
      ],
      stats: {
        problemsSolved: 2800,
        contestWins: 180,
        averageTime: "18m",
        accuracy: 96.5
      }
    },
    {
      name: "Egor Kulikov",
      handle: "@Egor",
      achievements: ["Codeforces Grandmaster", "IOI Gold Medalist", "Multiple Contest Winner"],
      rating: 3100,
      approach: "Creative problem-solving with strong implementation skills",
      specialties: ["Ad Hoc Problems", "Implementation", "Game Theory"],
      philosophy: "Every problem has a solution. Think creatively and don't give up easily.",
      tips: [
        "Don't be afraid to try different approaches",
        "Practice implementation speed",
        "Learn from other people's solutions",
        "Stay calm under pressure"
      ],
      stats: {
        problemsSolved: 2600,
        contestWins: 160,
        averageTime: "14m",
        accuracy: 94.8
      }
    },
    {
      name: "Andrey Stankevich",
      handle: "@andrewzta",
      achievements: ["ACM ICPC World Champion", "Multiple IOI Gold", "Codeforces Grandmaster"],
      rating: 3300,
      approach: "Deep theoretical knowledge with practical implementation",
      specialties: ["Advanced Algorithms", "Complexity Analysis", "Problem Design"],
      philosophy: "Understand the theory behind algorithms. Implementation follows naturally.",
      tips: [
        "Study algorithm complexity deeply",
        "Practice writing proofs",
        "Learn multiple approaches to problems",
        "Focus on understanding, not memorizing"
      ],
      stats: {
        problemsSolved: 2900,
        contestWins: 190,
        averageTime: "16m",
        accuracy: 96.2
      }
    }
  ]

  const approaches = [
    {
      title: "The Mathematical Approach",
      description: "Focus on mathematical insights and proofs before implementation",
      practitioners: ["Petr Mitrichev", "Makoto Soejima"],
      keyPrinciples: [
        "Prove correctness before coding",
        "Use mathematical induction",
        "Look for patterns and symmetries",
        "Consider edge cases mathematically"
      ]
    },
    {
      title: "The Speed Approach",
      description: "Emphasize fast implementation and pattern recognition",
      practitioners: ["Gennady Korotkevich", "Egor Kulikov"],
      keyPrinciples: [
        "Practice implementation speed",
        "Memorize common patterns",
        "Use templates and libraries",
        "Trust your intuition"
      ]
    },
    {
      title: "The Systematic Approach",
      description: "Break problems into smaller, manageable components",
      practitioners: ["Andrey Stankevich", "Makoto Soejima"],
      keyPrinciples: [
        "Decompose complex problems",
        "Use divide and conquer",
        "Build solution incrementally",
        "Test each component separately"
      ]
    }
  ]

  const learningPaths = [
    {
      level: "Beginner",
      focus: "Fundamentals",
      topics: ["Basic Data Structures", "Simple Algorithms", "Problem Reading"],
      recommendedTime: "3-6 months",
      targetRating: "1200-1400"
    },
    {
      level: "Intermediate",
      focus: "Advanced Concepts",
      topics: ["Dynamic Programming", "Graph Algorithms", "Number Theory"],
      recommendedTime: "6-12 months",
      targetRating: "1600-2000"
    },
    {
      level: "Advanced",
      focus: "Expert Techniques",
      topics: ["Advanced Algorithms", "Problem Design", "Mathematical Thinking"],
      recommendedTime: "1-2 years",
      targetRating: "2200+"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Top Competitive Programmers</h1>
          <p className="text-gray-600">Learn from the best minds in competitive programming and understand their approaches</p>
        </div>

        {/* Featured Programmers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Champions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programmers.map((programmer, index) => (
              <div key={index} className="card">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{programmer.name}</h3>
                      <span className="text-sm text-gray-500">{programmer.handle}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-warning-500" />
                        <span className="text-sm font-bold text-warning-600">{programmer.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {programmer.achievements.slice(0, 2).map((achievement, idx) => (
                        <span key={idx} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Approach</h4>
                    <p className="text-gray-600 text-sm">{programmer.approach}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Philosophy</h4>
                    <p className="text-gray-600 text-sm italic">"{programmer.philosophy}"</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Tips</h4>
                    <ul className="space-y-1">
                      {programmer.tips.map((tip, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start space-x-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600">{programmer.stats.problemsSolved}</div>
                      <div className="text-xs text-gray-500">Problems Solved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success-600">{programmer.stats.accuracy}%</div>
                      <div className="text-xs text-gray-500">Accuracy</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Problem-Solving Approaches */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Problem-Solving Approaches</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {approaches.map((approach, index) => (
              <div key={index} className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <Brain className="h-6 w-6 text-primary-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{approach.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{approach.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Practitioners</h4>
                  <div className="flex flex-wrap gap-2">
                    {approach.practitioners.map((practitioner, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {practitioner}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Key Principles</h4>
                  <ul className="space-y-1">
                    {approach.keyPrinciples.map((principle, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start space-x-2">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>{principle}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Paths */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <div key={index} className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{path.level}</h3>
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                    {path.targetRating}
                  </span>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Focus: {path.focus}</h4>
                  <ul className="space-y-1">
                    {path.topics.map((topic, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start space-x-2">
                        <span className="text-success-600 mt-1">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Time: {path.recommendedTime}</span>
                  <span className="text-primary-600 font-medium">Target: {path.targetRating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips from Champions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Champion Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="h-6 w-6 text-success-600" />
                <h3 className="text-lg font-semibold text-gray-900">Before Coding</h3>
              </div>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-success-600 mt-1">•</span>
                  <span>Read the problem statement at least twice</span>
                </li>
                <li className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-success-600 mt-1">•</span>
                  <span>Draw examples and test cases</span>
                </li>
                <li className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-success-600 mt-1">•</span>
                  <span>Identify the problem type and required algorithms</span>
                </li>
                <li className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-success-600 mt-1">•</span>
                  <span>Estimate time and space complexity</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-6 w-6 text-warning-600" />
                <h3 className="text-lg font-semibold text-gray-900">During Contest</h3>
              </div>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-warning-600 mt-1">•</span>
                  <span>Start with easier problems to build confidence</span>
                </li>
                <li className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-warning-600 mt-1">•</span>
                  <span>Keep track of time and don't get stuck</span>
                </li>
                <li className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-warning-600 mt-1">•</span>
                  <span>Test your code with sample cases</span>
                </li>
                <li className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-warning-600 mt-1">•</span>
                  <span>Stay calm and think systematically</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="h-6 w-6 text-primary-600" />
                <h3 className="text-lg font-semibold text-gray-900">Practice Strategy</h3>
              </div>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>Solve problems daily, even if just 30 minutes</span>
                </li>
                <li className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>Review solutions after contests</span>
                </li>
                <li className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>Learn from other people's code</span>
                </li>
                <li className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>Focus on understanding, not memorizing</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Mental Game</h3>
              </div>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Don't be afraid to try different approaches</span>
                </li>
                <li className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Learn from every mistake and failure</span>
                </li>
                <li className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Stay motivated and consistent</span>
                </li>
                <li className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Enjoy the process of learning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="card bg-gradient-to-r from-primary-500 to-purple-600 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Learn from the Best?</h2>
            <p className="text-primary-100 mb-6">Start your competitive programming journey with structured learning paths and expert guidance</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Start Practice Mode
              </button>
              <button className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors">
                Join Study Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 