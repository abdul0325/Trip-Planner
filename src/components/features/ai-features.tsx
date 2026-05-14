"use client"

import { motion } from "framer-motion"
import { Brain, CloudRain, DollarSign, Route, Save, Sparkles } from "lucide-react"

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay,
  gradient 
}: { 
  icon: React.ComponentType<{ className?: string }>, 
  title: string, 
  description: string, 
  delay: number,
  gradient: string 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    viewport={{ once: true }}
    className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300 glow-border group cursor-pointer"
  >
    <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      <Icon className="w-7 h-7 text-white " />
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
  </motion.div>
)

export default function AIFeatures() {
  const features = [
    {
      icon: Brain,
      title: "AI Itinerary Generator",
      description: "Get personalized travel plans tailored to your preferences, budget, and travel style with advanced AI algorithms.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: CloudRain,
      title: "Real-Time Weather",
      description: "Access live weather updates and forecasts for your destinations to plan the perfect timing for your activities.",
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      icon: DollarSign,
      title: "Smart Budget Planning",
      description: "Optimize your travel expenses with AI-powered budget recommendations and cost-saving insights.",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Route,
      title: "Route Optimization",
      description: "Find the most efficient routes between destinations to save time and reduce travel costs.",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: Save,
      title: "Save & Share Trips",
      description: "Store your itineraries securely and share them with friends, family, or travel companions.",
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: Sparkles,
      title: "AI Recommendations",
      description: "Discover hidden gems and local experiences based on your interests and past travel history.",
      gradient: "from-yellow-500 to-orange-600"
    }
  ]

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-cyan-950/20" />
      
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
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI-Powered Features</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="gradient-text">Smart Travel</span>
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
            Experience the future of travel planning with our cutting-edge AI technology that understands your unique travel needs.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.5 + index * 0.1}
              gradient={feature.gradient}
            />
          ))}
        </div>

        {/* Additional Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">500+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Destinations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">AI Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">1M+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Trips Planned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
