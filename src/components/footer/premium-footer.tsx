"use client"

import { motion } from "framer-motion"
import { Brain, ArrowUp } from "lucide-react"
import Link from "next/link"

export default function PremiumFooter() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="relative bg-gray-950 border-t border-white/10 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Main Footer Content */}
        <div className="flex flex-col items-center text-center">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              TripAI
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl text-sm sm:text-base text-gray-400 leading-relaxed"
          >
            Smart AI-powered travel planning platform that helps you create
            personalized itineraries, discover destinations, optimize budgets,
            and travel smarter with real-time insights.
          </motion.p>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8"
          >
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Home
            </Link>

            <Link
              href="#features"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#dashboard"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              AI Planner
            </Link>

            <Link
              href="#destinations"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Destinations
            </Link>

            <Link
              href="#reviews"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Reviews
            </Link>
          </motion.div>

          {/* Powered By */}
          

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-10 text-center text-xs sm:text-sm text-gray-500"
          >
            © 2026 TripAI. All rights reserved.
          </motion.div>
        </div>
      </div>

      {/* Scroll To Top */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg hover:shadow-blue-500/30 z-50"
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </motion.button>
    </footer>
  )
}