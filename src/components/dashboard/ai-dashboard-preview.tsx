"use client"

import { motion } from "framer-motion"
import { Brain, MapPin, Calendar, DollarSign, TrendingUp, Settings, Search, Bell, User, BarChart3, Activity, Zap } from "lucide-react"
import Link from "next/link"

const MetricCard = ({ 
  icon: Icon, 
  label, 
  value, 
  change, 
  delay 
}: { 
  icon: React.ComponentType<{ className?: string }>, 
  label: string, 
  value: string, 
  change: string,
  delay: number 
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="glass-card p-4 rounded-xl"
  >
    <div className="flex items-center justify-between mb-2">
      <Icon className="w-5 h-5 text-blue-500" />
      <span className="text-xs text-green-400 font-medium">{change}</span>
    </div>
   <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
  {value}
</div>
    <div className="text-xs text-gray-300 dark:text-gray-400">{label}</div>
  </motion.div>
)

export default function AIDashboardPreview() {
  return (
    <section id="dashboard" className="py-14 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10" />
      </div>
      
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
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-300">Advanced AI Dashboard</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
          >
            <span className="gradient-text">Intelligent Travel</span>
            <br />
            <span className="text-white">Control Center</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2"
          >
            Experience the power of AI-driven travel management with real-time insights and smart recommendations.
          </motion.p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
         className="max-w-6xl mx-auto overflow-hidden"
        >
          <div className="glass-card rounded-2xl overflow-hidden border border-white/10 backdrop-blur-xl">
            {/* Dashboard Header */}
          <div className="border-b border-white/10 p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">AI Travel Dashboard</h3>
                    <p className="text-sm text-gray-400">Welcome back, Traveler</p>
                  </div>
                </div>
                <div className="flex items-center flex-wrap gap-2 sm:gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="p-2 rounded-lg glass-card hover:bg-white/10 transition-colors"
                  >
                    <Search className="w-5 h-5 text-gray-300" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="p-2 rounded-lg glass-card hover:bg-white/10 transition-colors"
                  >
                    <Bell className="w-5 h-5 text-gray-300" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="p-2 rounded-lg glass-card hover:bg-white/10 transition-colors"
                  >
                    <Settings className="w-5 h-5 text-gray-300" />
                  </motion.button>
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <MetricCard 
                  icon={MapPin} 
                  label="Destinations" 
                  value="24" 
                  change="+12%" 
                  delay={0.6}
                />
                <MetricCard 
                  icon={Calendar} 
                  label="Upcoming Trips" 
                  value="3" 
                  change="This month" 
                  delay={0.7}
                />
                <MetricCard 
                  icon={DollarSign} 
                  label="Total Spent" 
                  value="$8,450" 
                  change="+8%" 
                  delay={0.8}
                />
                <MetricCard 
                  icon={TrendingUp} 
                  label="Savings" 
                  value="$1,230" 
                  change="+15%" 
                  delay={0.9}
                />
              </div>
            </div>

            {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-4">
                
              </div>

              {/* Main Content */}
              <div>
                {/* Current Itinerary */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="glass-card p-4 sm:p-5 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-white">Current Itinerary</h4>
                    <span className="text-xs text-gray-400">Tokyo, Japan</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { time: "9:00 AM", activity: "Tsukiji Fish Market", icon: MapPin },
                      { time: "11:00 AM", activity: "Senso-ji Temple", icon: MapPin },
                      { time: "2:00 PM", activity: "Shibuya Crossing", icon: MapPin },
                      { time: "6:00 PM", activity: "Robot Restaurant", icon: Activity }
                    ].map((item) => (
                     <div
  key={item.activity}
  className="flex items-start sm:items-center gap-3 p-3 rounded-lg bg-white/5 flex-wrap sm:flex-nowrap"
>
                       <span className="text-xs text-gray-400 min-w-[70px]">
  {item.time}
</span>
                        <item.icon className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-300 break-words">
  {item.activity}
</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/auth/register">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all"
          >
            Access Your Dashboard
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
