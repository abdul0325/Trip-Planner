"use client"

import { motion } from "framer-motion"
import { Zap, ArrowRight, Smartphone, Globe, Brain } from "lucide-react"
import Link from "next/link"

export default function MobileCTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        {/* Animated Background Elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500 rounded-full filter blur-3xl opacity-20"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Floating Icons */}
          <div className="flex justify-center space-x-8 mb-8">
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Globe className="w-8 h-8 text-white" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Brain className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-white">Your Next Adventure</span>
            <br />
            <span className="gradient-text">Starts With AI</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Join the future of travel planning. Create personalized itineraries in seconds, discover hidden gems, and travel smarter with AI-powered insights.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/auth/register">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg hover:shadow-xl transition-all flex items-center space-x-2"
            >
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Generate My Trip</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            </Link>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mt-12"
          >
            {[
              "✨ AI-Powered Planning",
              "🌍 500+ Destinations", 
              "💰 Smart Budgeting",
              "⚡ Instant Itineraries",
              "🎯 Personalized Recommendations"
            ].map((feature, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-gray-200"
              >
                {feature}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
