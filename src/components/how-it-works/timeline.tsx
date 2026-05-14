"use client"

import { motion } from "framer-motion"
import { Edit, Sparkles, Settings, Plane, ArrowRight } from "lucide-react"
import Link from "next/link";

const TimelineStep = ({ 
  step, 
  title, 
  description, 
  icon: Icon, 
  delay,
  isLast = false 
}: { 
  step: number, 
  title: string, 
  description: string, 
  icon: React.ComponentType<{ className?: string }>, 
  delay: number,
  isLast?: boolean 
}) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.6 }}
    viewport={{ once: true }}
    className="flex items-start space-x-6 relative"
  >
    {/* Step Number and Icon */}
    <div className="flex flex-col items-center">
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
      >
        <Icon className="w-8 h-8" />
      </motion.div>
      {!isLast && (
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          transition={{ delay: delay + 0.3, duration: 0.8 }}
          className="w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 mt-4 flex-1"
        />
      )}
    </div>

    {/* Content */}
    <div className="flex-1 pb-12">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Step {step}</span>
        <ArrowRight className="w-4 h-4 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
  </motion.div>
)

export default function Timeline() {
  const steps = [
    {
      step: 1,
      title: "Enter Preferences",
      description: "Tell us about your dream trip - destination preferences, budget, travel dates, and interests. Our AI understands your unique travel style.",
      icon: Edit
    },
    {
      step: 2,
      title: "AI Generates Trip",
      description: "Our advanced AI analyzes millions of data points to create a personalized itinerary that matches your preferences perfectly.",
      icon: Sparkles
    },
    {
      step: 3,
      title: "Customize Plan",
      description: "Fine-tune every detail of your trip. Add or remove activities, adjust timing, and personalize your schedule to perfection.",
      icon: Settings
    },
    {
      step: 4,
      title: "Travel Smart",
      description: "Embark on your perfectly planned adventure with real-time updates, local insights, and AI-powered assistance throughout your journey.",
      icon: Plane
    }
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">How It Works</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="gradient-text">Your Journey</span>
            <br />
            <span className="text-gray-900 dark:text-white">Made Simple</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            From idea to adventure in four simple steps. Experience the magic of AI-powered travel planning.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <TimelineStep
              key={step.step}
              step={step.step}
              title={step.title}
              description={step.description}
              icon={step.icon}
              delay={0.5 + index * 0.2}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.0, duration: 0.6 }}
  viewport={{ once: true }}
  className="mt-20 text-center"
>
  <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto relative z-10">
    
    <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
      Ready to Start Your Journey?
    </h3>

    <p className="text-gray-700 dark:text-gray-300 mb-6">
      Join thousands of travelers who have discovered the magic of AI-powered trip planning.
    </p>

    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <Link
        href="/auth/register"
        className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer"
      >
        Start Planning Now
      </Link>
    </motion.div>

  </div>
</motion.div>
      </div>
    </section>
  )
}
