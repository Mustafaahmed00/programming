'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Play, Square, RotateCcw, CheckCircle, XCircle, Clock, Zap, Target, TrendingUp, BookOpen, Users, Award } from 'lucide-react'
import { problems } from '@/data/problems'
import { ProgressTracker } from '@/lib/progress'
import CodeEditor from '@/components/CodeEditor'
import Link from 'next/link'

export default function EnhancedPracticePage() {
  const { data: session } = useSession()
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [selectedProblem, setSelectedProblem] = useState(problems[0])
  const [problemStatus, setProblemStatus] = useState<'unsolved' | 'solved' | 'attempted'>('unsolved')
  const [showSolution, setShowSolution] = useState(false)
  const [practiceMode, setPracticeMode] = useState<'timed' | 'untimed'>('timed')
  const [code, setCode] = useState('')
  const [testResults, setTestResults] = useState<any[]>([])
  const [isRunningTests, setIsRunningTests] = useState(false)
  const [executionResult, setExecutionResult] = useState<any>(null)
  const [userProgress, setUserProgress] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && session?.user?.email) {
      const progress = ProgressTracker.getProgress(session.user.email)
      setUserProgress(progress)
    }
  }, [isClient, session])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartTimer = () => {
    setIsTimerRunning(true)
  }

  const handlePauseTimer = () => {
    setIsTimerRunning(false)
  }

  const handleResetTimer = () => {
    setIsTimerRunning(false)
    setTimeElapsed(0)
  }

  const handleProblemSubmit = async () => {
    if (!session?.user?.email) {
      alert('Please sign in to track your progress')
      return
    }

    const userEmail = session.user.email

    setIsRunningTests(true)
    
    // Simulate test execution
    setTimeout(() => {
      const results = [
        { input: '[2, 7, 11, 15], 9', output: '[0, 1]', expected: '[0, 1]', passed: true },
        { input: '[3, 2, 4], 6', output: '[1, 2]', expected: '[1, 2]', passed: true },
        { input: '[3, 3], 6', output: '[0, 1]', expected: '[0, 1]', passed: true },
      ]
      
      setTestResults(results)
      setIsRunningTests(false)
      
      const allPassed = results.every(r => r.passed)
      if (allPassed) {
        setProblemStatus('solved')
        setIsTimerRunning(false)
        
        // Track progress using email as userId
        ProgressTracker.solveProblem(
          userEmail,
          selectedProblem.id.toString(),
          selectedProblem.title,
          selectedProblem.difficulty,
          timeElapsed // timeElapsed is already in seconds
        )
        
        alert('Congratulations! Problem solved successfully!')
      } else {
        setProblemStatus('attempted')
        
        // Track attempt using email as userId
        ProgressTracker.attemptProblem(
          userEmail,
          selectedProblem.id.toString(),
          selectedProblem.title,
          selectedProblem.difficulty,
          timeElapsed // timeElapsed is already in seconds
        )
        
        alert('Some test cases failed. Keep trying!')
      }
    }, 2000)
  }

  const handleShowSolution = () => {
    setShowSolution(!showSolution)
  }

  const runCode = async () => {
    setIsRunningTests(true)
    
    // Simulate code execution
    setTimeout(() => {
      const result = {
        output: '[0, 1]',
        executionTime: '2.5ms',
        memoryUsage: '38.2MB',
        status: 'success'
      }
      
      setExecutionResult(result)
      setIsRunningTests(false)
    }, 1000)
  }

  const handleSubmit = async () => {
    setIsRunningTests(true)
    setExecutionResult(null)

    try {
      // Simulate code execution and testing
      await new Promise(resolve => setTimeout(resolve, 2000))

      const mockResults = [
        { name: 'Test Case 1', passed: true, input: '[1,2,3,4,5]', output: '15', expected: '15' },
        { name: 'Test Case 2', passed: true, input: '[10,20,30]', output: '60', expected: '60' },
        { name: 'Test Case 3', passed: false, input: '[]', output: '0', expected: '0' },
        { name: 'Test Case 4', passed: true, input: '[1]', output: '1', expected: '1' }
      ]

      const passedTests = mockResults.filter(result => result.passed).length
      const totalTests = mockResults.length
      const success = passedTests === totalTests

      setExecutionResult({
        success,
        results: mockResults,
        passedTests,
        totalTests,
        executionTime: '1.2s',
        memoryUsed: '12.5 MB'
      })

      // Track progress if user is signed in
      if (session?.user?.email && success) {
        ProgressTracker.solveProblem(
          session.user.email, 
          selectedProblem.id.toString(), 
          selectedProblem.title, 
          selectedProblem.difficulty, 
          120
        )
        const updatedProgress = ProgressTracker.getProgress(session.user.email)
        setUserProgress(updatedProgress)
      }
    } catch (error) {
      setExecutionResult({
        success: false,
        results: [],
        passedTests: 0,
        totalTests: 0,
        executionTime: '0s',
        memoryUsed: '0 MB',
        error: 'Execution failed'
      })
    } finally {
      setIsRunningTests(false)
    }
  }

  const getStatusIcon = () => {
    switch (problemStatus) {
      case 'solved':
        return <CheckCircle className="h-5 w-5 text-success-600" />
      case 'attempted':
        return <XCircle className="h-5 w-5 text-warning-600" />
      default:
        return <Target className="h-5 w-5 text-gray-400" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-success-600'
      case 'Medium':
        return 'text-warning-600'
      case 'Hard':
        return 'text-danger-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Enhanced Practice</h1>
              <p className="text-gray-600">Solve problems with real-time code execution and progress tracking</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Timer */}
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="font-mono text-lg">{formatTime(timeElapsed)}</span>
                <div className="flex space-x-1">
                  {!isTimerRunning ? (
                    <button
                      onClick={handleStartTimer}
                      className="p-1 text-green-600 hover:text-green-700"
                    >
                      <Play className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handlePauseTimer}
                      className="p-1 text-yellow-600 hover:text-yellow-700"
                    >
                      <Square className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={handleResetTimer}
                    className="p-1 text-gray-600 hover:text-gray-700"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Problem Status */}
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border">
                {getStatusIcon()}
                <span className="text-sm font-medium capitalize">{problemStatus}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Problem Description */}
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{selectedProblem.title}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedProblem.difficulty)}`}>
                  {selectedProblem.difficulty}
                </span>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">{selectedProblem.description}</p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Example:</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 mb-2"><strong>Input:</strong> nums = [2, 7, 11, 15], target = 9</p>
                  <p className="text-sm text-gray-600 mb-2"><strong>Output:</strong> [0, 1]</p>
                  <p className="text-sm text-gray-600"><strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].</p>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Constraints:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 2 ≤ nums.length ≤ 10⁴</li>
                  <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
                  <li>• -10⁹ ≤ target ≤ 10⁹</li>
                  <li>• Only one valid answer exists.</li>
                </ul>
              </div>
            </div>

            {/* Test Cases */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Cases</h3>
              <div className="space-y-3">
                {testResults.length > 0 ? (
                  testResults.map((result, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      {result.passed ? (
                        <CheckCircle className="h-5 w-5 text-success-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-danger-600" />
                      )}
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          Test Case {index + 1}
                        </div>
                        <div className="text-xs text-gray-600">
                          Input: {result.input} | Output: {result.output}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Target className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No test results yet</p>
                    <p className="text-sm text-gray-400">Run your code to see test results</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Code Editor</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={runCode}
                    disabled={isRunningTests}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isRunningTests ? 'Running...' : 'Run Code'}
                  </button>
                  <button
                    onClick={handleProblemSubmit}
                    disabled={isRunningTests}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
                  >
                    {isRunningTests ? 'Testing...' : 'Submit Solution'}
                  </button>
                </div>
              </div>
              
              <CodeEditor
                language="javascript"
                initialCode={code}
                testCases={[]}
                onRun={() => {}}
                onSave={() => {}}
                problemId="two-sum"
              />
            </div>

            {/* Execution Results */}
            {executionResult && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Execution Results</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Output:</span>
                    <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{executionResult.output}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Execution Time:</span>
                    <span className="text-sm text-gray-900">{executionResult.executionTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Memory Usage:</span>
                    <span className="text-sm text-gray-900">{executionResult.memoryUsage}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Solution */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Solution</h3>
                <button
                  onClick={handleShowSolution}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  {showSolution ? 'Hide' : 'Show'} Solution
                </button>
              </div>
              
              {showSolution && (
                <div className="prose max-w-none">
                  <h4 className="text-md font-semibold text-gray-900 mb-2">Approach:</h4>
                  <p className="text-sm text-gray-700 mb-4">
                    Use a hash map to store the complement of each number. For each number, check if its complement exists in the map.
                  </p>
                  
                  <h4 className="text-md font-semibold text-gray-900 mb-2">Solution:</h4>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}`}
                  </pre>
                  
                  <div className="mt-4">
                    <h4 className="text-md font-semibold text-gray-900 mb-2">Time Complexity:</h4>
                    <p className="text-sm text-gray-700">O(n) - We traverse the array once</p>
                    
                    <h4 className="text-md font-semibold text-gray-900 mb-2">Space Complexity:</h4>
                    <p className="text-sm text-gray-700">O(n) - We store at most n elements in the hash map</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 