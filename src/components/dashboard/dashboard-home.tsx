"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  MapPin, Calendar, DollarSign, Star, Brain, Zap,
  ArrowRight, Plus, Plane, Loader2, Eye, Edit3, Trash2, MessageCircle,
} from "lucide-react"
import Link from "next/link"
import { TripService, type Trip } from "@/services/trip.service"
import { useAuthStore } from "@/hooks/useAuthStore"
import { toast } from "sonner"

// ── Stat card ─────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color, delay }: {
  icon: React.ComponentType<{ className?: string }>
  label: string; value: string; color: string; delay: number
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay }} whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white/70 dark:bg-gray-800/70 backdrop-blur border border-white/30 dark:border-white/10 p-5 rounded-2xl shadow hover:shadow-lg transition-all">
      <div className={`w-11 h-11 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{label}</div>
    </motion.div>
  )
}

// ── Trip card ─────────────────────────────────────────────────────
const STATUS_BADGE: Record<string, string> = {
  draft:     "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  active:    "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  completed: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
}
const CARD_GRADIENTS = [
  "from-blue-400 to-indigo-600","from-violet-400 to-purple-600",
  "from-pink-400 to-rose-600","from-amber-400 to-orange-500",
  "from-emerald-400 to-teal-600",
]

function TripCard({ trip, index, onDelete, isDeleting }: {
  trip: Trip; index: number
  onDelete: (id: string) => void; isDeleting: boolean
}) {
  const start = new Date(trip.startDate).toLocaleDateString("en-US",{ month:"short", day:"numeric" })
  const end   = new Date(trip.endDate).toLocaleDateString("en-US",{ month:"short", day:"numeric", year:"numeric" })
  const nights = Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / 86400000)
  const grad  = CARD_GRADIENTS[index % CARD_GRADIENTS.length]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }} whileHover={{ y: -4 }}
      className="bg-white/70 dark:bg-gray-800/70 backdrop-blur border border-white/30 dark:border-white/10 rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all">
      {/* Colour band */}
      <div className={`h-2 bg-gradient-to-r ${grad}`} />
      <div className="p-5">
        {/* Title row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-9 h-9 bg-gradient-to-br ${grad} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Plane className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate text-sm">{trip.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate flex items-center gap-1">
                <MapPin className="w-3 h-3" />{trip.destination}
              </p>
            </div>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ml-2 flex-shrink-0 ${STATUS_BADGE[trip.status] ?? STATUS_BADGE.draft}`}>
            {trip.status}
          </span>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400 mb-4">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{start} – {end}</span>
          <span>{nights} night{nights !== 1 ? "s" : ""}</span>
          {trip.budget && <span className="flex items-center gap-0.5"><DollarSign className="w-3 h-3" />{trip.budget.toLocaleString()}</span>}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 pt-3 border-t border-gray-100 dark:border-gray-700">
          <Link href={`/trips/${trip.id}`} className="flex-1">
            <button className="w-full flex items-center justify-center gap-1 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium hover:bg-blue-100 transition-colors">
              <Eye className="w-3.5 h-3.5" />View
            </button>
          </Link>
          <Link href={`/trips/${trip.id}/edit`} className="flex-1">
            <button className="w-full flex items-center justify-center gap-1 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs font-medium hover:bg-amber-100 transition-colors">
              <Edit3 className="w-3.5 h-3.5" />Edit
            </button>
          </Link>
          <Link href={`/trips/${trip.id}/chat`} className="flex-1">
            <button className="w-full flex items-center justify-center gap-1 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs font-medium hover:bg-purple-100 transition-colors">
              <MessageCircle className="w-3.5 h-3.5" />Chat
            </button>
          </Link>
          <button onClick={() => onDelete(trip.id)} disabled={isDeleting}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-medium hover:bg-red-100 transition-colors disabled:opacity-50">
            {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><Trash2 className="w-3.5 h-3.5" />Del</>}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── Main ───────────────────────────────────────────────────────────
export default function DashboardHome() {
  const user = useAuthStore((s) => s.user)
  const queryClient = useQueryClient()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Shared query key ['trips'] — same as /trips page so cache is shared
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["trips"],
    queryFn: () => TripService.list(1, 100),
  })

  const trips: Trip[] = data?.data ?? []
  const total = data?.pagination?.total ?? 0

  const deleteMutation = useMutation({
    mutationFn: (id: string) => TripService.delete(id),
    onMutate: (id) => setDeletingId(id),
    onSuccess: () => {
      toast.success("Trip deleted")
      queryClient.invalidateQueries({ queryKey: ["trips"] })
    },
    onError: () => toast.error("Failed to delete trip"),
    onSettled: () => setDeletingId(null),
  })

  const handleDelete = (id: string) => {
    if (confirm("Delete this trip?")) deleteMutation.mutate(id)
  }

  const stats = [
    { icon: MapPin,    label: "Destinations", value: [...new Set(trips.map(t=>t.destination))].length.toString(), color: "from-blue-500 to-cyan-500" },
    { icon: Calendar,  label: "Total Trips",  value: total.toString(),                                            color: "from-purple-500 to-pink-500" },
    { icon: DollarSign,label: "Budget",       value: trips.reduce((s,t)=>s+(t.budget??0),0) > 0 ? `$${(trips.reduce((s,t)=>s+(t.budget??0),0)/1000).toFixed(1)}k` : "$0", color: "from-green-500 to-emerald-500" },
    { icon: Star,      label: "Upcoming",     value: trips.filter(t=>new Date(t.startDate)>new Date()).length.toString(), color: "from-orange-500 to-red-500" },
  ]

  if (isError) return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl">⚠️</span>
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Failed to load trips</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Check that your server is running and you are logged in.</p>
      <button onClick={() => refetch()} className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
        Try Again
      </button>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}! 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Here's your travel overview</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.08} />)}
      </div>

      {/* Trips section */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Trips</h2>
            {trips.length > 4 && (
              <Link href="/trips" className="text-xs text-blue-500 hover:underline flex items-center gap-1 mt-0.5">
                View all {total} trips <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
          <Link href="/trips/create">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-medium shadow-md">
              <Plus className="w-4 h-4" />New Trip
            </motion.button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-7 h-7 animate-spin text-blue-500" />
          </div>
        ) : trips.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {trips.slice(0, 6).map((trip, i) => (
              <TripCard key={trip.id} trip={trip} index={i} onDelete={handleDelete} isDeleting={deletingId === trip.id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">No trips yet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Create your first AI-powered trip plan</p>
            <Link href="/trips/create">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-medium shadow-md">
                <Zap className="w-4 h-4" />Plan with AI
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
