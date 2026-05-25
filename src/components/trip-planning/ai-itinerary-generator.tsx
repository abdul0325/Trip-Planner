"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import {
  Target,
  Brain,
  Globe,
  DollarSign,
  Sun,
  CheckCircle,
  TrendingUp,
  Zap,
} from "lucide-react"

import {
  aiItineraryGenerator,
} from "@/utils/ai-itinerary-generator"

import type {
  ItineraryData,
} from "@/utils/ai-itinerary-generator"

// Form preferences interface (matches ai-preference-form)
interface FormTripPreferences {
  destination: string
  budget: number
  duration: number
  interests: string[]
  travelType: string
  accommodation: string
  transportation: string
  groupSize: string
  season: string
  startDate: string
  endDate: string
}

interface GenerationStep {
  id: string
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  status: "pending" | "processing" | "completed"
  progress?: number
}

export default function AIItineraryGenerator({
  preferences,
  onComplete,
}: {
  preferences: FormTripPreferences | null
  onComplete: (itinerary: ItineraryData) => void
}) {
  const [isGenerating, setIsGenerating] = useState(true)

  const [currentStep, setCurrentStep] = useState(0)

  const [generationSteps, setGenerationSteps] =
    useState<GenerationStep[]>([
      {
        id: "analyze",
        label: "Analyzing Preferences",
        description:
          "Understanding your travel style and requirements",
        icon: Brain,
        status: "pending",
      },

      {
        id: "research",
        label: "Researching Destination",
        description: `Finding best attractions in ${preferences?.destination || "your destination"
          }`,
        icon: Globe,
        status: "pending",
      },

      {
        id: "optimize",
        label: "Optimizing Route",
        description:
          "Creating efficient travel routes and schedules",
        icon: Target,
        status: "pending",
      },

      {
        id: "budget",
        label: "Budget Planning",
        description:
          "Allocating costs within your budget",
        icon: DollarSign,
        status: "pending",
      },

      {
        id: "weather",
        label: "Weather Analysis",
        description:
          "Checking weather conditions and forecasts",
        icon: Sun,
        status: "pending",
      },

      {
        id: "finalize",
        label: "Finalizing Itinerary",
        description:
          "Creating your personalized travel plan",
        icon: CheckCircle,
        status: "pending",
      },
    ])

  useEffect(() => {
    if (!isGenerating || !preferences) return

    const simulateGeneration = async () => {
      try {

        // PROCESS STEPS
        for (let i = 0; i < generationSteps.length; i++) {

          setCurrentStep(i)

          // SET PROCESSING
          setGenerationSteps((prev) =>
            prev.map((step, index) =>
              index === i
                ? {
                  ...step,
                  status: "processing",
                }
                : step
            )
          )

          // PROGRESS
          for (
            let progress = 0;
            progress <= 100;
            progress += 20
          ) {
            await new Promise((resolve) =>
              setTimeout(resolve, 200)
            )

            setGenerationSteps((prev) =>
              prev.map((step, index) =>
                index === i
                  ? {
                    ...step,
                    progress,
                  }
                  : step
              )
            )
          }

          // COMPLETE STEP
          setGenerationSteps((prev) =>
            prev.map((step, index) =>
              index === i
                ? {
                  ...step,
                  status: "completed",
                  progress: 100,
                }
                : step
            )
          )
        }

        // TRANSFORM PREFERENCES TO MATCH GENERATOR INTERFACE
        const totalDays =
          Number(preferences.duration) || 7

        const startDate =
          preferences.startDate
            ? new Date(preferences.startDate)
            : new Date()

        const endDate =
          preferences.endDate
            ? new Date(preferences.endDate)
            : new Date(
              startDate.getTime() +
              ((totalDays - 1) * 86400000)
            )

        const transformedPreferences = {
          destination:
            preferences.destination,

          duration:
            totalDays,

          startDate:
            startDate.toISOString(),

          endDate:
            endDate.toISOString(),

          budget:
            Number(preferences.budget) || 1000,

          travelers:
            parseInt(
              preferences.groupSize?.replace(/\D/g, "") || "1"
            ) || 1,

          interests:
            preferences.interests || [],

          accommodationType:
            preferences.accommodation || "hotel",

          transportationPreference:
            preferences.transportation || "any",

          dietaryRestrictions: [],

          activityLevel:
            "moderate" as const,

          specialRequirements: [],
        }

        // GENERATE FINAL ITINERARY
        const itinerary =
          await aiItineraryGenerator.generateItinerary(
            transformedPreferences
          )

        // SAFETY CHECK
        if (
          !itinerary ||
          !itinerary.days ||
          !Array.isArray(itinerary.days)
        ) {
          throw new Error(
            "Invalid itinerary structure"
          )
        }

        setIsGenerating(false)

        onComplete(itinerary)

      } catch (error) {

        console.error(
          "Failed to generate itinerary:",
          error
        )

        setIsGenerating(false)

        // FALLBACK
        const fallbackItinerary =
          generateFallbackItinerary(preferences)

        onComplete(fallbackItinerary)
      }
    }

    simulateGeneration()

  }, [isGenerating, preferences, onComplete, generationSteps.length])

  // FALLBACK GENERATOR
  const generateFallbackItinerary = (
    prefs: FormTripPreferences | null
  ): ItineraryData => {

    const days =
      Number(prefs?.duration) || 7

    const startDate =
      preferences.startDate
        ? new Date(
          preferences.startDate
        )
        : new Date()

    const endDate =
      preferences.endDate
        ? new Date(
          preferences.endDate
        )
        : new Date()

    return {
      id: `itinerary_${Date.now()}`,

      title: `${prefs?.destination || "Your Destination"
        } Adventure`,

      destination:
        prefs?.destination || "Your Destination",

      startDate:
        preferences?.startDate || undefined,

      endDate:
        preferences?.endDate || undefined,

      budget:
        Number(prefs?.budget) || 1000,

      // IMPORTANT FIX
      days: Array.from({ length: days }).map(
        (_, i) => ({
          day: i + 1,

          title: `Day ${i + 1}`,

          activities: [
            "Breakfast",
            "City exploration",
            "Lunch",
            "Sightseeing",
            "Dinner",
          ],
        })
      ),

      recommendations: [],

      weatherInfo: undefined,
    }
  }

  return (
    <div className="max-w-4xl mx-auto">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >

        <div className="flex items-center justify-center space-x-3 mb-4">

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              w-12
              h-12
              bg-gradient-to-br
              from-purple-500
              to-pink-600
              rounded-xl
              flex
              items-center
              justify-center
            "
          >
            <Brain className="w-6 h-6 text-white" />
          </motion.div>

          <h2 className="text-2xl font-bold gradient-text">
            AI is Creating Your Perfect Trip
          </h2>
        </div>

        <p className="text-gray-600 dark:text-gray-400">
          Our intelligent system is analyzing your
          travel preferences to create a personalized
          itinerary.
        </p>
      </motion.div>

      {/* STEPS */}
      <div className="space-y-4">

        {generationSteps.map((step, index) => (

          <motion.div
            key={step.id}
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.1,
            }}
            className={`
              glass-card
              p-6
              rounded-2xl
              border-2
              transition-all

              ${step.status === "completed"
                ? `
                    border-green-500
                    bg-green-50
                    dark:bg-green-900/20
                  `
                : step.status === "processing"
                  ? `
                    border-blue-500
                    bg-blue-50
                    dark:bg-blue-900/20
                  `
                  : `
                    border-white/20
                    dark:border-white/10
                  `
              }
            `}
          >

            <div className="flex items-center space-x-4">

              {/* ICON */}
              <div
                className={`
                  w-12
                  h-12
                  rounded-xl
                  flex
                  items-center
                  justify-center

                  ${step.status === "completed"
                    ? "bg-green-500"
                    : step.status === "processing"
                      ? "bg-blue-500"
                      : "bg-gray-400"
                  }
                `}
              >
                <step.icon className="w-6 h-6 text-white" />
              </div>

              {/* CONTENT */}
              <div className="flex-1">

                <div className="flex items-center justify-between mb-2">

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {step.label}
                  </h3>

                  {step.status === "processing" && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="
                        w-5
                        h-5
                        border-2
                        border-blue-500
                        border-t-transparent
                        rounded-full
                      "
                    />
                  )}

                  {step.status === "completed" && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {step.description}
                </p>

                {/* PROGRESS */}
                <AnimatePresence>

                  {step.status === "processing" &&
                    step.progress !== undefined && (

                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">

                        <motion.div
                          className="
                          h-full
                          bg-gradient-to-r
                          from-blue-500
                          to-purple-600
                        "
                          initial={{ width: 0 }}
                          animate={{
                            width: `${step.progress}%`,
                          }}
                          transition={{
                            duration: 0.3,
                          }}
                        />
                      </div>
                    )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI INSIGHTS */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.8,
        }}
        className="
          mt-8
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
      >

        <div className="glass-card p-6 rounded-2xl text-center">

          <div
            className="
              w-12
              h-12
              bg-gradient-to-br
              from-blue-500
              to-cyan-600
              rounded-xl
              flex
              items-center
              justify-center
              mx-auto
              mb-4
            "
          >
            <TrendingUp className="w-6 h-6 text-white" />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Smart Optimization
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            AI analyzes travel patterns for efficient
            planning.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl text-center">

          <div
            className="
              w-12
              h-12
              bg-gradient-to-br
              from-purple-500
              to-pink-600
              rounded-xl
              flex
              items-center
              justify-center
              mx-auto
              mb-4
            "
          >
            <Zap className="w-6 h-6 text-white" />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Real-Time Data
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Weather and destination insights included.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl text-center">

          <div
            className="
              w-12
              h-12
              bg-gradient-to-br
              from-green-500
              to-emerald-600
              rounded-xl
              flex
              items-center
              justify-center
              mx-auto
              mb-4
            "
          >
            <Target className="w-6 h-6 text-white" />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Personalized
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tailored to your interests and budget.
          </p>
        </div>
      </motion.div>

      {/* COMPLETION */}
      {!isGenerating && (

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="mt-8 text-center"
        >

          <div
            className="
              inline-flex
              items-center
              space-x-3
              px-6
              py-3
              bg-gradient-to-r
              from-green-500
              to-emerald-600
              text-white
              rounded-full
            "
          >
            <CheckCircle className="w-5 h-5" />

            <span className="font-semibold">
              Your AI Itinerary is Ready!
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}