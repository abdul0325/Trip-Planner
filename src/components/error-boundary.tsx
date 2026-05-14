"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error} reset={this.reset} />
    }

    return this.props.children
  }
}

const DefaultErrorFallback: React.FC<{ error?: Error; reset: () => void }> = ({ error, reset }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We encountered an unexpected error. This has been logged and our team will look into it.
        </p>

        {error && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-2">
              Technical details
            </summary>
            <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs font-mono text-gray-700 dark:text-gray-300 overflow-auto max-h-32">
              {error.message}
            </div>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={reset}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </motion.button>

          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              Go Home
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default ErrorBoundary
