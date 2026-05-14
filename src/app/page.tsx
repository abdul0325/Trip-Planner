"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import PremiumNavbar from "@/components/navbar/premium-navbar"
import PremiumHero from "@/components/hero/premium-hero"
import AIFeatures from "@/components/features/ai-features"
import AIDashboardPreview from "@/components/dashboard/ai-dashboard-preview"
import Timeline from "@/components/how-it-works/timeline"
import Testimonials from "@/components/testimonials/testimonials"
import PremiumFooter from "@/components/footer/premium-footer"

export default function LandingPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <PremiumNavbar />

      {/* Hero Section */}
      <PremiumHero />

      {/* Features Section */}
      <AIFeatures />

      {/* Dashboard Preview Section */}
      <AIDashboardPreview />

      {/* How It Works Section */}
      <Timeline />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of travelers who have already discovered the joy of stress-free trip planning.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trips/create">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <span>Plan Your First Trip</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <PremiumFooter />
    </div>
  )
}
