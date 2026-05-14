"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Lightbulb, 
  DollarSign, 
  MapPin, 
  Calendar, 
  Clock, 
  Heart, 
  Camera, 
  Utensils,
  Hotel,
  Plane,
  TrendingUp,
  Zap,
  Brain,
  MessageCircle,
  Minimize2,
  Maximize2,
  X
} from "lucide-react"

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface QuickAction {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  prompt: string
  color: string
}

export default function AIChatAssistant({ 
  itinerary, 
  onItineraryUpdate 
}: { 
  itinerary: any
  onItineraryUpdate: (updates: any) => void 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI travel assistant. I can help you customize your itinerary, suggest activities, optimize your budget, and answer any travel questions. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "Suggest cheaper alternatives",
        "Add more outdoor activities",
        "Optimize travel routes",
        "Find local restaurants"
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickActions: QuickAction[] = [
    {
      id: 'budget',
      label: 'Optimize Budget',
      icon: DollarSign,
      prompt: 'Can you help me optimize my budget for this trip?',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'activities',
      label: 'More Activities',
      icon: Camera,
      prompt: 'What other activities can I add to my itinerary?',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'food',
      label: 'Local Food',
      icon: Utensils,
      prompt: 'Can you recommend some must-try local restaurants?',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'routes',
      label: 'Better Routes',
      icon: MapPin,
      prompt: 'Can you optimize my travel routes to save time?',
      color: 'from-purple-500 to-pink-600'
    }
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500))

    const message = userMessage.toLowerCase()
    
    if (message.includes('budget') || message.includes('cheaper') || message.includes('save money')) {
      return "I can help you optimize your budget! Here are some suggestions:\n\n💰 **Budget Optimization:**\n• Consider public transport instead of taxis\n• Look for free walking tours\n• Eat at local markets instead of tourist restaurants\n• Book accommodations slightly outside city center\n\nBased on your current itinerary, you could save approximately $200-300 by making these changes. Would you like me to update your itinerary with these suggestions?"
    }
    
    if (message.includes('activities') || message.includes('things to do')) {
      return "Here are some great activities I'd recommend adding to your trip:\n\n🎯 **Must-Try Experiences:**\n• Local cooking class - $45\n• Guided city walking tour - $25\n• Sunset viewpoint visit - Free\n• Traditional market shopping - $10-50\n• Cultural performance - $30\n\nThese activities will give you authentic local experiences while staying within your budget. Should I add them to your itinerary?"
    }
    
    if (message.includes('food') || message.includes('restaurants') || message.includes('eat')) {
      return "I've found some amazing local dining spots for you!\n\n🍽️ **Local Favorites:**\n• **Grandma's Kitchen** - Authentic local cuisine, $12-15\n• **Street Food Alley** - Budget-friendly local specialties, $5-8\n• **Rooftop Restaurant** - Great views, $25-30\n• **Hidden Gem Cafe** - Local breakfast spot, $8-10\n\nThese places offer authentic flavors at reasonable prices. Would you like me to add them to specific days in your itinerary?"
    }
    
    if (message.includes('route') || message.includes('travel') || message.includes('transport')) {
      return "Let me optimize your travel routes for maximum efficiency:\n\n🗺️ **Route Optimization:**\n• Group nearby attractions together\n• Use public transport day passes\n• Walk between close locations\n• Avoid peak hour traffic\n\nI've reorganized your daily schedule to minimize travel time and costs. This saves you about 2 hours and $15 in transportation daily. Should I update your itinerary with the optimized routes?"
    }
    
    return "That's a great question! Based on your itinerary and preferences, I'd be happy to help. Could you provide more details about what specifically you'd like to know or modify? I can assist with budget optimization, activity suggestions, dining recommendations, route planning, and much more!"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Generate AI response
    const aiResponse = await generateAIResponse(inputValue)
    
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: aiResponse,
      timestamp: new Date(),
      suggestions: [
        "Tell me more about this",
        "Apply these changes",
        "Show me alternatives",
        "Explain the costs"
      ]
    }

    setTimeout(() => {
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (action: QuickAction) => {
    setInputValue(action.prompt)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </motion.button>
        
        {/* Notification badge */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
        />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50 w-96 h-[600px] glass-card rounded-2xl border border-white/20 dark:border-white/10 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-pink-600">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">AI Travel Assistant</h3>
            <p className="text-white/80 text-xs">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4 text-white" /> : <Minimize2 className="w-4 h-4 text-white" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`flex items-center space-x-2 mb-1 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.type === 'ai' && <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                    {message.type === 'user' && <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    
                    {/* AI Suggestions */}
                    {message.suggestions && (
                      <div className="mt-3 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setInputValue(suggestion)}
                            className="w-full text-left p-2 bg-white/20 dark:bg-black/20 rounded-lg text-xs hover:bg-white/30 dark:hover:bg-black/30 transition-colors"
                          >
                            💡 {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-xl">
                    <div className="flex items-center space-x-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <motion.button
                  key={action.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickAction(action)}
                  className={`flex items-center space-x-2 p-2 rounded-lg bg-gradient-to-r ${action.color} text-white text-xs`}
                >
                  <action.icon className="w-3 h-3" />
                  <span>{action.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your trip..."
                className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}
