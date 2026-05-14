"use client"

import { motion } from "framer-motion"
import { MapPin, Cloud, Clock, DollarSign, Star, Thermometer } from "lucide-react"
import Image from "next/image"

const DestinationCard = ({ 
  destination,
  delay 
}: { 
  destination: {
    name: string
    country: string
    image: string
    weather: string
    temperature: string
    budget: string
    duration: number
    aiScore: number
    activities: string[]
  }
  delay: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    viewport={{ once: true }}
    className="group cursor-pointer"
  >
    <div className="glass-card rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 glow-border">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Location Badge */}
        <div className="absolute top-4 left-4 glass-card px-3 py-1 rounded-full flex items-center space-x-1 z-20">
          <MapPin className="w-3 h-3 text-white" />
          <span className="text-xs font-medium text-white">{destination.country}</span>
        </div>

        {/* AI Score Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full flex items-center space-x-1 z-20">
          <Star className="w-3 h-3 text-white" />
          <span className="text-xs font-bold text-white">AI {destination.aiScore}</span>
        </div>

        {/* Weather Info */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-3 text-white z-20">
          <div className="flex items-center space-x-1">
            <Thermometer className="w-4 h-4" />
            <span className="text-sm">{destination.temperature}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Cloud className="w-4 h-4" />
            <span className="text-sm">{destination.weather}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{destination.name}</h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4" />
              <span>{destination.budget}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{destination.duration}</span>
            </div>
          </div>
        </div>

        {/* Activities */}
        <div className="flex flex-wrap gap-2">
          {destination.activities.slice(0, 3).map((activity, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 dark:from-blue-500/10 dark:to-purple-600/10 rounded-full text-xs font-medium text-blue-600 dark:text-blue-400"
            >
              {activity}
            </span>
          ))}
          {destination.activities.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400">
              +{destination.activities.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  </motion.div>
)

export default function DestinationShowcase() {
  const destinations = [
  {
    name: "Dubai",
    country: "United Arab Emirates",
    image: "/images/dubai.jpg",
    weather: "Sunny",
    temperature: "32°C",
    budget: "$2,500",
    duration: "5 days",
    aiScore: 98,
    activities: ["Desert Safari", "Burj Khalifa", "Shopping", "Beach", "Fine Dining"]
  },
  {
    name: "Hunza Valley",
    country: "Pakistan",
    image: "/images/hunza.jpg",
    weather: "Clear",
    temperature: "18°C",
    budget: "$800",
    duration: "7 days",
    aiScore: 95,
    activities: ["Trekking", "Photography", "Cultural Tour", "Mountain Views", "Local Cuisine"]
  },
  {
    name: "Istanbul",
    country: "Turkey",
    image: "/images/istanbul.jpg",
    weather: "Partly Cloudy",
    temperature: "22°C",
    budget: "$1,500",
    duration: "6 days",
    aiScore: 97,
    activities: ["Historical Sites", "Bazaar", "Bosphorus", "Museums", "Turkish Bath"]
  },
  {
    name: "Paris",
    country: "France",
    image: "/images/paris.jpg",
    weather: "Mild",
    temperature: "20°C",
    budget: "$2,200",
    duration: "5 days",
    aiScore: 99,
    activities: ["Eiffel Tower", "Louvre", "Seine Cruise", "Wine Tasting", "Art Galleries"]
  },
  {
    name: "Skardu",
    country: "Pakistan",
    image: "/images/skardu.jpg",
    weather: "Clear",
    temperature: "15°C",
    budget: "$1,000",
    duration: "8 days",
    aiScore: 94,
    activities: ["Mountaineering", "Lakes", "Camping", "Fishing", "Cultural Experience"]
  },
  {
    name: "Tokyo",
    country: "Japan",
    image: "/images/tokyo.jpg",
    weather: "Cherry Blossom",
    temperature: "18°C",
    budget: "$3,000",
    duration: "7 days",
    aiScore: 98,
    activities: ["Temples", "Sushi", "Technology", "Gardens", "Nightlife"]
  }
]

  return (
    <section id="destinations" className="py-20 relative overflow-hidden">
      {/* Background */}
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
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Live Destinations</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="gradient-text">Discover</span>
            <br />
            <span className="text-gray-900 dark:text-white">Amazing Places</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Explore handpicked destinations with real-time weather, AI-curated activities, and smart budget recommendations.
          </motion.p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.name}
              destination={destination}
              delay={0.5 + index * 0.1}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full glass-card hover:bg-white/20 transition-all font-medium text-gray-700 dark:text-gray-300"
          >
            Explore All 500+ Destinations
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
