'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Play, Download, Copy, RotateCcw } from 'lucide-react'

interface CodeEditorProps {
  language?: string
  initialCode?: string
  onRun?: (code: string) => void
  onSave?: (code: string) => void
}

export default function CodeEditor({
  language = 'javascript',
  initialCode = '// Write your solution here\nfunction solution() {\n  \n}',
  onRun,
  onSave
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleReset = () => {
    setCode(initialCode)
  }

  const handleRun = () => {
    onRun?.(code)
  }

  const handleSave = () => {
    onSave?.(code)
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Code Editor</h3>
        <div className="flex items-center space-x-2">
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
            className="btn-primary flex items-center space-x-1"
          >
            <Play className="h-4 w-4" />
            <span>Run</span>
          </button>
        </div>
      </div>

      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-96 font-mono text-sm bg-gray-900 text-gray-100 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
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

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Output:</h4>
        <div className="font-mono text-sm text-gray-800">
          {/* Output will be displayed here */}
          <p className="text-gray-500">Run your code to see the output...</p>
        </div>
      </div>
    </div>
  )
} 