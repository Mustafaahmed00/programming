'use client'

import { useState, useEffect } from 'react'
import { 
  Clock, 
  Target, 
  CheckCircle, 
  XCircle, 
  Play, 
  RotateCcw, 
  Settings,
  BookOpen,
  Code,
  Lightbulb,
  Timer,
  Trophy,
  Star,
  Share,
  Bookmark
} from 'lucide-react'
import { problems } from '@/data/problems'
import CodeEditor from '@/components/CodeEditor'

interface TestCase {
  id: string
  input: string
  expectedOutput: string
  description: string
}

interface Problem {
  id: string
  title: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string[]
  companies: string[]
  testCases: TestCase[]
  starterCode: string
  solution: string
  explanation: string
  timeComplexity: string
  spaceComplexity: string
  hints: string[]
  relatedProblems: string[]
}

export default function EnhancedPractice() {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timer, setTimer] = useState(0)
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [userCode, setUserCode] = useState('')
  const [executionResults, setExecutionResults] = useState<any>(null)

  // Mock problem data with test cases
  const mockProblem: Problem = {
    id: 'two-sum',
    title: 'Two Sum',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    difficulty: 'Easy',
    category: ['Array', 'Hash Table'],
    companies: ['Google', 'Amazon', 'Microsoft'],
    testCases: [
      {
        id: '1',
        input: '[2, 7, 11, 15], target = 9',
        expectedOutput: '[0, 1]',
        description: 'Basic test case with two numbers that sum to target'
      },
      {
        id: '2',
        input: '[3, 2, 4], target = 6',
        expectedOutput: '[1, 2]',
        description: 'Numbers at indices 1 and 2 sum to 6'
      },
      {
        id: '3',
        input: '[3, 3], target = 6',
        expectedOutput: '[0, 1]',
        description: 'Same number appears twice'
      },
      {
        id: '4',
        input: '[1, 5, 8, 10, 13, 21], target = 18',
        expectedOutput: '[2, 4]',
        description: 'Larger array with numbers at indices 2 and 4'
      }
    ],
    starterCode: `function twoSum(nums, target) {
  // Write your solution here
  // Return an array of two indices
}`,
    solution: `function twoSum(nums, target) {
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
    explanation: `This solution uses a hash map to achieve O(n) time complexity. For each number, we check if its complement (target - current) exists in the map. If it does, we've found our pair. If not, we add the current number and its index to the map.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hints: [
      'Try using a hash map to store numbers you\'ve seen',
      'For each number, check if its complement exists in the map',
      'The complement is target - current number',
      'Store each number with its index in the map'
    ],
    relatedProblems: ['Three Sum', 'Four Sum', 'Two Sum II - Input Array Is Sorted']
  }

  useEffect(() => {
    setSelectedProblem(mockProblem)
    setUserCode(mockProblem.starterCode)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartTimer = () => {
    setIsTimerRunning(true)
  }

  const handleStopTimer = () => {
    setIsTimerRunning(false)
  }

  const handleResetTimer = () => {
    setTimer(0)
    setIsTimerRunning(false)
  }

  const handleCodeRun = (code: string, results: any) => {
    setExecutionResults(results)
    console.log('Code executed:', code)
    console.log('Results:', results)
  }

  const handleCodeSave = (code: string) => {
    setUserCode(code)
    console.log('Code saved:', code)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-success-600 bg-success-100'
      case 'Medium':
        return 'text-warning-600 bg-warning-100'
      case 'Hard':
        return 'text-danger-600 bg-danger-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  if (!selectedProblem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading problem...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{selectedProblem.title}</h1>
            <div className="flex items-center space-x-4 mt-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedProblem.difficulty)}`}>
                {selectedProblem.difficulty}
              </span>
              <span className="text-sm text-gray-600">{selectedProblem.category.join(', ')}</span>
              <span className="text-sm text-gray-600">Companies: {selectedProblem.companies.join(', ')}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Timer className="h-5 w-5 text-gray-600" />
              <span className="text-lg font-mono text-gray-900">{formatTime(timer)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleStartTimer}
                disabled={isTimerRunning}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              >
                Start
              </button>
              <button
                onClick={handleStopTimer}
                disabled={!isTimerRunning}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                Stop
              </button>
              <button
                onClick={handleResetTimer}
                className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Problem Description */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Problem Description</h2>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{selectedProblem.description}</p>
              </div>
            </div>

            {/* Test Cases */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Cases</h3>
              <div className="space-y-3">
                {selectedProblem.testCases.map((testCase) => (
                  <div key={testCase.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">Test Case {testCase.id}</span>
                      <span className="text-xs text-gray-500">{testCase.description}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-gray-600">Input:</span>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{testCase.input}</code>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-gray-600">Expected:</span>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{testCase.expectedOutput}</code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hints */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Hints</h3>
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700"
                >
                  <Lightbulb className="h-4 w-4" />
                  <span>{showHints ? 'Hide' : 'Show'} Hints</span>
                </button>
              </div>
              
              {showHints && (
                <div className="space-y-2">
                  {selectedProblem.hints.map((hint, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-yellow-50 rounded-lg">
                      <span className="text-yellow-600 font-medium text-sm">{index + 1}.</span>
                      <p className="text-sm text-gray-700">{hint}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Solution */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Solution</h3>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700"
                >
                  <Code className="h-4 w-4" />
                  <span>{showSolution ? 'Hide' : 'Show'} Solution</span>
                </button>
              </div>
              
              {showSolution && (
                <div className="space-y-4">
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">JavaScript</span>
                      <button className="text-xs text-gray-400 hover:text-white">Copy</button>
                    </div>
                    <pre className="text-sm overflow-x-auto">
                      <code>{selectedProblem.solution}</code>
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Explanation</h4>
                    <p className="text-sm text-gray-700">{selectedProblem.explanation}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Time Complexity:</span>
                      <p className="text-sm text-gray-900">{selectedProblem.timeComplexity}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Space Complexity:</span>
                      <p className="text-sm text-gray-900">{selectedProblem.spaceComplexity}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Code Editor */}
          <div className="space-y-6">
            <CodeEditor
              language="javascript"
              initialCode={selectedProblem.starterCode}
              testCases={selectedProblem.testCases}
              onRun={handleCodeRun}
              onSave={handleCodeSave}
              problemId={selectedProblem.id}
            />

            {/* Execution Results */}
            {executionResults && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Execution Results</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    {executionResults.success ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="font-medium">
                      {executionResults.success ? 'All Tests Passed!' : 'Some Tests Failed'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{executionResults.executionTime.toFixed(2)}ms</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="h-4 w-4" />
                      <span>{executionResults.testCasesPassed}/{executionResults.totalTestCases} passed</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap">
                      {executionResults.output}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Problems */}
        <div className="mt-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Problems</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedProblem.relatedProblems.map((problem, index) => (
                <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <h4 className="font-medium text-gray-900">{problem}</h4>
                  <p className="text-sm text-gray-600 mt-1">Similar difficulty and approach</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 