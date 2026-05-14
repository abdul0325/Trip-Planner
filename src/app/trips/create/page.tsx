"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/shared/auth-guard"
import PremiumDashboardLayout from "@/components/dashboard/premium-dashboard-layout"
import AIPreferenceForm from "@/components/trip-planning/ai-preference-form"
import AIItineraryGenerator from "@/components/trip-planning/ai-itinerary-generator"
import ItineraryDisplay from "@/components/trip-planning/itinerary-display"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Brain, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { TripService } from "@/services/trip.service"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { ItineraryData } from "@/utils/ai-itinerary-generator"

// Form preferences interface (matches ai-preference-form)
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
  const queryClient = useQueryClient()
  const [step, setStep] = useState<"preferences" | "generating" | "itinerary">("preferences")
  const [preferences, setPreferences] = useState<TripPreferences | null>(null)
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveTrip = async () => {

    if (!itinerary) {

      toast.error(
        "No itinerary generated"
      );

      return;
    }

    try {

      setIsSaving(true);

      const totalDays =
        Number(
          preferences?.duration
        ) || 7;

      const fallbackStartDate =
        new Date();

      const fallbackEndDate =
        new Date(
          fallbackStartDate.getTime() +
          (totalDays * 86400000)
        );

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
      });

      toast.success(
        "Trip created successfully!"
      );

      router.push(
        "/dashboard"
      );

    } catch (error: any) {

      console.error(
        "SAVE ERROR:",
        error
      );

      toast.error(
        error?.message ||
        "Failed to save trip"
      );

    } finally {

      setIsSaving(false);
    }
  };

  return (
    <AuthGuard>
      <PremiumDashboardLayout>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/30 dark:border-white/10 hover:bg-white transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </motion.button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Trip Creator</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Generate a personalised itinerary with AI</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full">
              <Brain className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-medium text-white">AI Powered</span>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {step === "preferences" && (
              <motion.div key="prefs" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <AIPreferenceForm onGenerate={(p) => { setPreferences(p); setStep("generating") }} />
              </motion.div>
            )}
            {step === "generating" && (
              <motion.div key="gen" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                <AIItineraryGenerator preferences={preferences} onComplete={(i) => { setItinerary(i); setStep("itinerary") }} />
              </motion.div>
            )}
            {step === "itinerary" && (
              <motion.div key="itin" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <ItineraryDisplay
                  itinerary={itinerary}
                  onEdit={() => setStep("preferences")}
                  onShare={() => toast.info("Share coming soon!")}
                  onExport={() => toast.info("Export coming soon!")}
                />
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3 mt-6">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={handleSaveTrip} disabled={isSaving}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-md disabled:opacity-60">
                    {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : "Save Trip to Dashboard"}
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setStep("preferences")} disabled={isSaving}
                    className="flex-1 py-3 bg-white/70 dark:bg-gray-800/70 border border-white/30 dark:border-white/10 rounded-xl font-semibold hover:bg-white/90 transition-colors">
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
