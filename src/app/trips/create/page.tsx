"use client"

import { useState } from "react"

import { AuthGuard } from "@/components/shared/auth-guard"

import PremiumDashboardLayout from "@/components/dashboard/premium-dashboard-layout"

import AIPreferenceForm from "@/components/trip-planning/ai-preference-form"

import AIItineraryGenerator from "@/components/trip-planning/ai-itinerary-generator"

import ItineraryDisplay from "@/components/trip-planning/itinerary-display"

import { motion, AnimatePresence } from "framer-motion"

import {
  ArrowLeft,
  Brain,
  Loader2,
} from "lucide-react"

import Link from "next/link"

import { useRouter } from "next/navigation"

import { TripService } from "@/services/trip.service"

import { useQueryClient } from "@tanstack/react-query"

import { toast } from "sonner"

import type {
  ItineraryData,
} from "@/utils/ai-itinerary-generator"

interface TripPreferences {
  destination: string
  budget: number
  duration: number
  interests: string[]
  travelType: string
  accommodation: string
  transportation: string
  groupSize: string
  season: string
}

export default function CreateTripPage() {

  const router = useRouter()

  const queryClient =
    useQueryClient()

  const [
    step,
    setStep,
  ] = useState<
    "preferences" |
    "generating" |
    "itinerary"
  >("preferences")

  const [
    preferences,
    setPreferences,
  ] =
    useState<TripPreferences | null>(
      null
    )

  const [
    itinerary,
    setItinerary,
  ] =
    useState<ItineraryData | null>(
      null
    )

  const [
    isSaving,
    setIsSaving,
  ] = useState(false)

  const handleSaveTrip =
    async () => {

      if (!itinerary) {

        toast.error(
          "No itinerary generated"
        )

        return
      }

      try {

        setIsSaving(true)

        const totalDays =
          Number(
            preferences?.duration
          ) || 7

        const fallbackStartDate =
          new Date()

        const fallbackEndDate =
          new Date(
            fallbackStartDate.getTime() +
            (
              totalDays *
              86400000
            )
          )

        await TripService.create({

          title:
            itinerary.title,

          description:
            itinerary.summary ||
            `AI generated trip to ${itinerary.destination}`,

          destination:
            itinerary.destination,

          startDate:
            itinerary.startDate ||
            fallbackStartDate.toISOString(),

          endDate:
            itinerary.endDate ||
            fallbackEndDate.toISOString(),

          budget:
            Number(
              preferences?.budget
            ) || 1000,

          status: "active",

          itineraryData:
            JSON.stringify(
              itinerary
            ),

          interests:
            JSON.stringify(
              preferences?.interests || []
            ),

          travelType:
            preferences?.travelType || "",

          duration:
            preferences?.duration || 7,
        })

        queryClient.invalidateQueries({
          queryKey: ["trips"],
        })

        toast.success(
          "Trip created successfully!"
        )

        router.push(
          "/dashboard"
        )

      } catch (error: any) {

        console.error(
          "SAVE ERROR:",
          error
        )

        toast.error(
          error?.message ||
          "Failed to save trip"
        )

      } finally {

        setIsSaving(false)
      }
    }

  return (

    <AuthGuard>

      <PremiumDashboardLayout>

        <div
          className="
            max-w-6xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-6
          "
        >

          {/* HEADER */}

          <motion.div

            initial={{
              opacity: 0,
              y: -16,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-5
              mb-8
            "
          >

            {/* LEFT */}

            <div
              className="
                flex
                items-start
                sm:items-center
                gap-3
              "
            >

              <Link href="/dashboard">

                <motion.button

                  whileHover={{
                    scale: 1.05,
                  }}

                  whileTap={{
                    scale: 0.95,
                  }}

                  className="
                    p-2.5
                    rounded-xl
                    bg-white
                    dark:bg-gray-900
                    border
                    border-gray-200
                    dark:border-gray-700
                    hover:bg-gray-100
                    dark:hover:bg-gray-800
                    transition-all
                    shadow-sm
                  "
                >

                  <ArrowLeft
                    className="
                      w-5
                      h-5
                      text-gray-700
                      dark:text-gray-300
                    "
                  />
                </motion.button>
              </Link>

              <div>

                <h1
                  className="
                    text-2xl
                    sm:text-3xl
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  AI Trip Creator
                </h1>

                <p
                  className="
                    text-sm
                    sm:text-base
                    text-gray-600
                    dark:text-gray-400
                    mt-1
                  "
                >
                  Generate a personalised itinerary with AI
                </p>
              </div>
            </div>

            {/* BADGE */}

            <div
              className="
                self-start
                lg:self-auto
                flex
                items-center
                gap-2
                px-4
                py-2
                bg-gradient-to-r
                from-purple-600
                to-pink-600
                rounded-full
                shadow-md
              "
            >

              <Brain
                className="
                  w-4
                  h-4
                  text-white
                "
              />

              <span
                className="
                  text-sm
                  font-medium
                  text-white
                "
              >
                AI Powered
              </span>
            </div>
          </motion.div>

          {/* CONTENT */}

          <AnimatePresence mode="wait">

            {step === "preferences" && (

              <motion.div

                key="prefs"

                initial={{
                  opacity: 0,
                  x: -20,
                }}

                animate={{
                  opacity: 1,
                  x: 0,
                }}

                exit={{
                  opacity: 0,
                  x: 20,
                }}
              >

                <AIPreferenceForm
                  onGenerate={(p) => {

                    setPreferences(p)

                    setStep(
                      "generating"
                    )
                  }}
                />
              </motion.div>
            )}

            {step === "generating" && (

              <motion.div

                key="gen"

                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}

                animate={{
                  opacity: 1,
                  scale: 1,
                }}

                exit={{
                  opacity: 0,
                  scale: 0.95,
                }}
              >

                <AIItineraryGenerator
                  preferences={preferences}
                  onComplete={(i) => {

                    setItinerary(i)

                    setStep(
                      "itinerary"
                    )
                  }}
                />
              </motion.div>
            )}

            {step === "itinerary" && (

              <motion.div

                key="itin"

                initial={{
                  opacity: 0,
                  y: 20,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                exit={{
                  opacity: 0,
                  y: -20,
                }}
              >

                <ItineraryDisplay
                  itinerary={itinerary}
                  onEdit={() =>
                    setStep(
                      "preferences"
                    )
                  }
                />

                {/* ACTION BUTTONS */}

                <motion.div

                  initial={{
                    opacity: 0,
                    y: 16,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    delay: 0.4,
                  }}

                  className="
                    flex
                    flex-col
                    md:flex-row
                    gap-4
                    mt-8
                  "
                >

                  {/* SAVE */}

                  <motion.button

                    whileHover={{
                      scale: 1.02,
                    }}

                    whileTap={{
                      scale: 0.98,
                    }}

                    onClick={
                      handleSaveTrip
                    }

                    disabled={isSaving}

                    className="
                      flex-1
                      flex
                      items-center
                      justify-center
                      gap-2
                      py-3.5
                      rounded-2xl
                      bg-gradient-to-r
                      from-green-500
                      to-emerald-600
                      text-white
                      font-semibold
                      shadow-lg
                      hover:shadow-xl
                      disabled:opacity-60
                      transition-all
                    "
                  >

                    {isSaving ? (

                      <>

                        <Loader2
                          className="
                            w-4
                            h-4
                            animate-spin
                          "
                        />

                        Saving...
                      </>

                    ) : (

                      "Save Trip to Dashboard"
                    )}
                  </motion.button>

                  {/* REGENERATE */}

                  <motion.button

                    whileHover={{
                      scale: 1.02,
                    }}

                    whileTap={{
                      scale: 0.98,
                    }}

                    onClick={() =>
                      setStep(
                        "preferences"
                      )
                    }

                    disabled={isSaving}

                    className="
                      flex-1
                      py-3.5
                      rounded-2xl
                      bg-white
                      dark:bg-gray-900
                      border
                      border-gray-200
                      dark:border-gray-700
                      text-gray-800
                      dark:text-white
                      font-semibold
                      hover:bg-gray-100
                      dark:hover:bg-gray-800
                      shadow-sm
                      transition-all
                    "
                  >

                    Regenerate with AI
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PremiumDashboardLayout>
    </AuthGuard>
  )
}