'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Clock, Target, Zap, CheckCircle, XCircle } from 'lucide-react'
import { problems } from '@/data/problems'
import CodeEditor from '@/components/CodeEditor'

export default function PracticePage() {
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [selectedProblem, setSelectedProblem] = useState(problems[0])
  const [problemStatus, setProblemStatus] = useState<'unsolved' | 'solved' | 'attempted'>('unsolved')
  const [showSolution, setShowSolution] = useState(false)
  const [practiceMode, setPracticeMode] = useState<'timed' | 'untimed'>('timed')

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

  const handleProblemSubmit = () => {
    // Simulate problem submission
    setProblemStatus('solved')
    setIsTimerRunning(false)
  }

  const handleShowSolution = () => {
    setShowSolution(!showSolution)
  }

  const getRandomProblem = () => {
    const randomIndex = Math.floor(Math.random() * problems.length)
    setSelectedProblem(problems[randomIndex])
    setProblemStatus('unsolved')
    setShowSolution(false)
    if (practiceMode === 'timed') {
      setTimeElapsed(0)
      setIsTimerRunning(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="h-8 w-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Practice Mode</h1>
          </div>
          <p className="text-gray-600">Solve problems with a timer and track your progress</p>
        </div>

        {/* Timer and Controls */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 font-mono">
                  {formatTime(timeElapsed)}
                </div>
                <div className="text-sm text-gray-600">Time Elapsed</div>
              </div>
              
              <div className="flex items-center space-x-2">
                {!isTimerRunning ? (
                  <button
                    onClick={handleStartTimer}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>Start Timer</span>
                  </button>
                ) : (
                  <button
                    onClick={handlePauseTimer}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Pause className="h-4 w-4" />
                    <span>Pause</span>
                  </button>
                )}
                
                <button
                  onClick={handleResetTimer}
                  className="btn-outline flex items-center space-x-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="timed"
                  name="practiceMode"
                  value="timed"
                  checked={practiceMode === 'timed'}
                  onChange={(e) => setPracticeMode(e.target.value as 'timed' | 'untimed')}
                  className="text-primary-600"
                />
                <label htmlFor="timed" className="text-sm font-medium">Timed Mode</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="untimed"
                  name="practiceMode"
                  value="untimed"
                  checked={practiceMode === 'untimed'}
                  onChange={(e) => setPracticeMode(e.target.value as 'timed' | 'untimed')}
                  className="text-primary-600"
                />
                <label htmlFor="untimed" className="text-sm font-medium">Untimed Mode</label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                problemStatus === 'solved' ? 'bg-success-100 text-success-700' :
                problemStatus === 'attempted' ? 'bg-warning-100 text-warning-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {problemStatus === 'solved' && <CheckCircle className="h-4 w-4 inline mr-1" />}
                {problemStatus === 'attempted' && <Clock className="h-4 w-4 inline mr-1" />}
                {problemStatus === 'unsolved' && <XCircle className="h-4 w-4 inline mr-1" />}
                {problemStatus.charAt(0).toUpperCase() + problemStatus.slice(1)}
              </span>
              
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedProblem.difficulty === 'Easy' ? 'difficulty-easy' :
                selectedProblem.difficulty === 'Medium' ? 'difficulty-medium' : 'difficulty-hard'
              }`}>
                {selectedProblem.difficulty}
              </span>
            </div>

            <button
              onClick={getRandomProblem}
              className="btn-primary flex items-center space-x-2"
            >
              <Zap className="h-4 w-4" />
              <span>Random Problem</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Problem Description */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                #{selectedProblem.id}. {selectedProblem.title}
              </h2>
              
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 mb-4">{selectedProblem.description}</p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Examples:</h3>
                {selectedProblem.examples.map((example, index) => (
                  <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="mb-2">
                      <strong>Input:</strong> <code className="text-sm">{example.input}</code>
                    </div>
                    <div className="mb-2">
                      <strong>Output:</strong> <code className="text-sm">{example.output}</code>
                    </div>
                    {example.explanation && (
                      <div>
                        <strong>Explanation:</strong> <span className="text-sm">{example.explanation}</span>
                      </div>
                    )}
                  </div>
                ))}
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Constraints:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {selectedProblem.constraints.map((constraint, index) => (
                    <li key={index} className="text-sm text-gray-700">{constraint}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleProblemSubmit}
                className="btn-primary flex-1"
                disabled={problemStatus === 'solved'}
              >
                Submit Solution
              </button>
              <button
                onClick={handleShowSolution}
                className="btn-secondary"
              >
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
            </div>

            {showSolution && selectedProblem.solution && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Solution</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{selectedProblem.solution}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div>
            <CodeEditor
              language="javascript"
              initialCode={selectedProblem.starterCode.javascript}
              onRun={(code) => console.log('Running code:', code)}
              onSave={(code) => console.log('Saving code:', code)}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600">12</div>
            <div className="text-sm text-gray-600">Problems Solved Today</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-success-600">85%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-warning-600">24m</div>
            <div className="text-sm text-gray-600">Avg Time per Problem</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-600">7</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
        </div>
      </div>
    </div>
  )
} 