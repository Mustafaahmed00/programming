'use client'

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Play, Download, Copy, RotateCcw, Clock, Zap, AlertCircle, CheckCircle, XCircle, Settings } from 'lucide-react'

interface TestCase {
  id: string
  input: string
  expectedOutput: string
  description: string
}

interface ExecutionResult {
  success: boolean
  output: string
  error?: string
  executionTime: number
  memoryUsage?: number
  testCasesPassed: number
  totalTestCases: number
}

interface CodeEditorProps {
  language?: string
  initialCode?: string
  testCases?: TestCase[]
  onRun?: (code: string, results: ExecutionResult) => void
  onSave?: (code: string) => void
  problemId?: string
}

export default function CodeEditor({
  language = 'javascript',
  initialCode = '// Write your solution here\nfunction solution() {\n  \n}',
  testCases = [],
  onRun,
  onSave,
  problemId
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [isCopied, setIsCopied] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [executionResults, setExecutionResults] = useState<ExecutionResult | null>(null)
  const [customTestCases, setCustomTestCases] = useState<TestCase[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(language)

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' }
  ]

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleReset = () => {
    setCode(initialCode)
    setExecutionResults(null)
  }

  const handleSave = () => {
    onSave?.(code)
  }

  const executeCode = async (code: string, testCases: TestCase[]): Promise<ExecutionResult> => {
    const startTime = performance.now()
    
    try {
      // Create a safe execution environment
      const sandbox = new Function('input', `
        try {
          ${code}
          return solution(input);
        } catch (error) {
          throw new Error('Execution error: ' + error.message);
        }
      `)

      let passedTests = 0
      let output = ''

      for (const testCase of testCases) {
        try {
          const result = sandbox(testCase.input)
          const expected = testCase.expectedOutput
          
          if (String(result) === expected) {
            passedTests++
            output += `✅ Test ${testCase.id}: PASSED\n`
          } else {
            output += `❌ Test ${testCase.id}: FAILED\n`
            output += `   Expected: ${expected}\n`
            output += `   Got: ${result}\n`
          }
        } catch (error) {
          output += `❌ Test ${testCase.id}: ERROR\n`
          output += `   ${(error as Error).message}\n`
        }
      }

      const executionTime = performance.now() - startTime

      return {
        success: passedTests === testCases.length,
        output,
        executionTime,
        testCasesPassed: passedTests,
        totalTestCases: testCases.length
      }
    } catch (error) {
      const executionTime = performance.now() - startTime
      return {
        success: false,
        output: `❌ Execution Error: ${(error as Error).message}`,
        error: (error as Error).message,
        executionTime,
        testCasesPassed: 0,
        totalTestCases: testCases.length
      }
    }
  }

  const handleRun = async () => {
    setIsRunning(true)
    const allTestCases = [...testCases, ...customTestCases]
    
    if (allTestCases.length === 0) {
      // Add a simple test case if none provided
      allTestCases.push({
        id: '1',
        input: '[]',
        expectedOutput: '[]',
        description: 'Empty array test'
      })
    }

    const results = await executeCode(code, allTestCases)
    setExecutionResults(results)
    setIsRunning(false)
    onRun?.(code, results)
  }

  const addCustomTestCase = () => {
    const newTestCase: TestCase = {
      id: `custom-${Date.now()}`,
      input: '',
      expectedOutput: '',
      description: 'Custom test case'
    }
    setCustomTestCases([...customTestCases, newTestCase])
  }

  const updateCustomTestCase = (id: string, field: keyof TestCase, value: string) => {
    setCustomTestCases(customTestCases.map(tc => 
      tc.id === id ? { ...tc, [field]: value } : tc
    ))
  }

  const removeCustomTestCase = (id: string) => {
    setCustomTestCases(customTestCases.filter(tc => tc.id !== id))
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Code Editor</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Copy className="h-4 w-4" />
            <span>{isCopied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Save</span>
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="btn-primary flex items-center space-x-1 disabled:opacity-50"
          >
            {isRunning ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Play className="h-4 w-4" />
            )}
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Editor Settings</h4>
          <div className="flex items-center space-x-4">
            <div>
              <label className="text-xs text-gray-600">Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="ml-2 px-2 py-1 text-sm border rounded"
              >
                {languages.map(lang => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code Editor */}
        <div>
          <div className="relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-96 font-mono text-sm bg-gray-900 text-gray-100 rounded-lg p-4 pl-12 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Write your solution here..."
              spellCheck={false}
            />
            
            {/* Line numbers */}
            <div className="absolute left-0 top-0 w-12 h-96 bg-gray-800 text-gray-400 text-xs font-mono p-4 select-none">
              {code.split('\n').map((_, index) => (
                <div key={index} className="text-right">
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Test Cases and Output */}
        <div className="space-y-4">
          {/* Test Cases */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Test Cases</h4>
              <button
                onClick={addCustomTestCase}
                className="text-xs px-2 py-1 bg-primary-500 text-white rounded hover:bg-primary-600"
              >
                Add Test Case
              </button>
            </div>
            
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {testCases.map((testCase, index) => (
                <div key={testCase.id} className="text-xs bg-white p-2 rounded border">
                  <div className="font-medium">Test {index + 1}</div>
                  <div className="text-gray-600">Input: {testCase.input}</div>
                  <div className="text-gray-600">Expected: {testCase.expectedOutput}</div>
                </div>
              ))}
              
              {customTestCases.map((testCase) => (
                <div key={testCase.id} className="text-xs bg-white p-2 rounded border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">Custom Test</span>
                    <button
                      onClick={() => removeCustomTestCase(testCase.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Input"
                    value={testCase.input}
                    onChange={(e) => updateCustomTestCase(testCase.id, 'input', e.target.value)}
                    className="w-full mb-1 px-2 py-1 text-xs border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Expected Output"
                    value={testCase.expectedOutput}
                    onChange={(e) => updateCustomTestCase(testCase.id, 'expectedOutput', e.target.value)}
                    className="w-full px-2 py-1 text-xs border rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Execution Results */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Execution Results</h4>
            
            {executionResults && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  {executionResults.success ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm font-medium">
                    {executionResults.success ? 'All Tests Passed' : 'Some Tests Failed'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{executionResults.executionTime.toFixed(2)}ms</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="h-3 w-3" />
                    <span>{executionResults.testCasesPassed}/{executionResults.totalTestCases} passed</span>
                  </div>
                </div>
                
                <div className="bg-white p-2 rounded border">
                  <pre className="text-xs font-mono text-gray-800 whitespace-pre-wrap">
                    {executionResults.output}
                  </pre>
                </div>
              </div>
            )}
            
            {!executionResults && (
              <p className="text-gray-500 text-sm">Run your code to see the results...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 