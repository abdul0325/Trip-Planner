"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Play, Sparkles, Globe, Brain, Zap, Users, MapPin } from "lucide-react"
import Link from "next/link"

const FloatingCard = ({ children, delay, duration = 6 }: { children: React.ReactNode, delay: number, duration?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="floating"
    style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
  >
    {children}
  </motion.div>
)

const StatCard = ({ icon: Icon, label, value, delay }: { icon: React.ComponentType<{ className?: string }>, label: string, value: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="glass-card p-4 rounded-xl hover:scale-105 transition-transform cursor-pointer"
  >
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        <p className="text-xl font-bold gradient-text">{value}</p>
      </div>
    </div>
  </motion.div>
)

export default function PremiumHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 aurora-bg opacity-30" />
      
      {/* Floating Orbs */}
      <motion.div
        animate={{
          x: mousePosition.x * 0.05,
          y: mousePosition.y * 0.05,
        }}
        className="absolute top-20 left-20 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-blue-500 rounded-full filter blur-3xl opacity-20"
      />
      <motion.div
        animate={{
          x: mousePosition.x * -0.03,
          y: mousePosition.y * -0.03,
        }}
        className="absolute bottom-20 right-20 w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20"
      />
      <motion.div
        animate={{
          x: mousePosition.x * 0.04,
          y: mousePosition.y * 0.04,
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-cyan-500 rounded-full filter blur-3xl opacity-20"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left pt-25"
          >
           

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="gradient-text">Plan Smarter</span>
              <br />
              <span className="text-gray-900 dark:text-white">Trips With AI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
            >
              Generate personalized itineraries, discover hidden destinations, optimize your budget, and explore the world intelligently.
            </motion.p>

            <Link href="/auth/register">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="
      flex
      items-center
      justify-center
      gap-2
      px-6
      sm:px-8
      py-3
      sm:py-4
      rounded-full
      bg-gradient-to-r
      from-blue-500
      to-purple-600
      text-white
      font-semibold
      hover:shadow-xl
      hover:shadow-blue-500/25
      transition-all
      w-full
      sm:w-auto
    "
  >
    <Zap className="w-5 h-5" />
    <span>Start Planning Free</span>
  </motion.button>
</Link>           
          </motion.div>

          {/* Right Side - 3D World Map Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[600px] hidden md:block"
          >
            {/* Central Globe */}
            <FloatingCard delay={0.3}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-cyan-400 rounded-full shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full" />
                  <Globe className="absolute inset-0 w-full h-full text-white/30" />
                </div>
              </motion.div>
            </FloatingCard>

            {/* Floating Itinerary Cards */}
            <FloatingCard delay={0.5} duration={8}>
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-10 right-4 sm:top-16 sm:right-8 md:top-20 md:right-10 glass-card p-3 sm:p-4 rounded-xl w-36 sm:w-44 md:w-48"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold text-sm">Tokyo, Japan</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">7 days • $2,500</p>
                <div className="mt-2 flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Sparkles key={star} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            </FloatingCard>

            <FloatingCard delay={0.7} duration={7}>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-24 left-4 sm:bottom-28 sm:left-6 md:bottom-32 md:left-8 glass-card p-3 sm:p-4 rounded-xl w-36 sm:w-44 md:w-48"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-purple-500" />
                  <span className="font-semibold text-sm">Paris, France</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">5 days • $1,800</p>
                <div className="mt-2 flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Sparkles key={star} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            </FloatingCard>

            <FloatingCard delay={0.9} duration={9}>
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-32 left-8 sm:top-36 sm:left-12 md:top-40 md:left-16 glass-card p-3 sm:p-4 rounded-xl w-36 sm:w-44 md:w-48"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-cyan-500" />
                  <span className="font-semibold text-sm">Dubai, UAE</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">4 days • $2,200</p>
                <div className="mt-2 flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Sparkles key={star} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            </FloatingCard>

            {/* AI Assistant Bubble */}
            <FloatingCard delay={1.1} duration={6}>
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-12 right-12 sm:bottom-16 sm:right-16 md:bottom-20 md:right-20 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <Brain className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </motion.div>
            </FloatingCard>

            {/* Route Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.line
                x1="50%"
                y1="50%"
                x2="80%"
                y2="20%"
                stroke="url(#gradient1)"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.5 }}
              />
              <motion.line
                x1="50%"
                y1="50%"
                x2="20%"
                y2="65%"
                stroke="url(#gradient2)"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.7 }}
              />
              <motion.line
                x1="50%"
                y1="50%"
                x2="30%"
                y2="35%"
                stroke="url(#gradient3)"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.9 }}
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
