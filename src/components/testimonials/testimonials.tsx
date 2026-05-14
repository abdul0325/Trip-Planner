"use client"

import { motion } from "framer-motion"
import { Star, MapPin, Quote } from "lucide-react"

const TestimonialCard = ({ 
  testimonial,
  delay 
}: { 
  testimonial: {
    name: string
    avatar: string
    destination: string
    rating: number
    quote: string
    tripType: string
  }
  delay: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    viewport={{ once: true }}
    className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300 glow-border"
  >
    {/* Header */}
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-3 h-3" />
            <span>{testimonial.destination}</span>
          </div>
        </div>
      </div>
      <Quote className="w-6 h-6 text-blue-500/20" />
    </div>

    {/* Rating */}
    <div className="flex items-center space-x-1 mb-3">
      {[...Array(testimonial.rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
      ))}
      <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">({testimonial.rating}.0)</span>
    </div>

    {/* Quote */}
    <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      &ldquo;{testimonial.quote}&rdquo;
    </blockquote>

    {/* Trip Type Badge */}
    <div className="inline-flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 dark:from-blue-500/10 dark:to-purple-600/10 rounded-full">
      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{testimonial.tripType}</span>
    </div>
  </motion.div>
)

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      avatar: "/api/placeholder/100/100",
      destination: "Tokyo, Japan",
      rating: 5,
      quote: "TripAI completely transformed how I plan vacations. The AI suggestions were spot-on and saved me hours of research. The itinerary was perfectly balanced between culture, food, and adventure!",
      tripType: "Cultural Adventure"
    },
    {
      name: "Michael Chen",
      avatar: "/api/placeholder/100/100",
      destination: "Dubai, UAE",
      rating: 5,
      quote: "I was skeptical about AI travel planning, but TripAI exceeded all expectations. It found hidden gems I would have never discovered and optimized my budget perfectly. This is the future of travel!",
      tripType: "Luxury Travel"
    },
    {
      name: "Emma Rodriguez",
      avatar: "/api/placeholder/100/100",
      destination: "Paris, France",
      rating: 5,
      quote: "As a busy professional, I don't have time for extensive trip planning. TripAI created the perfect romantic getaway itinerary in minutes. Every recommendation was thoughtful and personalized.",
      tripType: "Romantic Getaway"
    },
    {
      name: "David Kim",
      avatar: "/api/placeholder/100/100",
      destination: "Bali, Indonesia",
      rating: 5,
      quote: "The AI's understanding of my travel preferences was incredible. It suggested activities I loved but wouldn't have found on my own. The real-time weather updates were a lifesaver!",
      tripType: "Beach Vacation"
    },
    {
      name: "Lisa Thompson",
      avatar: "/api/placeholder/100/100",
      destination: "Istanbul, Turkey",
      rating: 5,
      quote: "TripAI made our family vacation stress-free. The AI considered everyone's interests and created an itinerary that kept both kids and adults happy. The budget optimization saved us over $500!",
      tripType: "Family Trip"
    },
    {
      name: "James Wilson",
      avatar: "/api/placeholder/100/100",
      destination: "Hunza Valley, Pakistan",
      rating: 5,
      quote: "I love off-the-beaten-path destinations, and TripAI's AI found incredible hidden treasures in Hunza. The cultural insights and local recommendations made this trip unforgettable.",
      tripType: "Adventure Travel"
    }
  ]

  return (
    <section id="reviews" className="py-20 relative overflow-hidden">
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
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Traveler Reviews</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="gradient-text">Real Stories</span>
            <br />
            <span className="text-gray-900 dark:text-white">From Real Travelers</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Join thousands of satisfied travelers who have discovered the magic of AI-powered trip planning.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              delay={0.5 + index * 0.1}
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 glass-card p-8 rounded-2xl"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">4.9/5</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">10,000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Happy Travelers</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Countries Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Would Recommend</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
