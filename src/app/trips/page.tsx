"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { AuthGuard } from '@/components/shared/auth-guard';
import PremiumDashboardLayout from '@/components/dashboard/premium-dashboard-layout';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Plus, 
  ArrowRight,
  Plane,
  Edit3,
  Trash2,
  Eye
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { TripService, type Trip } from "@/services/trip.service"
import { toast } from "sonner"

const TripCard = ({ 
  trip, 
  index,
  onDelete,
  onView 
}: { 
  trip: Trip, 
  index: number,
  onDelete: (id: string) => void
  onView: (id: string) => void
}) => {
  const startDate = new Date(trip.startDate)
  const endDate = new Date(trip.endDate)
  const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{trip.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{trip.destination}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{duration} days</span>
            </div>
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4" />
              <span>{trip.budget ? `${trip.budget}` : 'N/A'}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
            trip.status === 'active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : trip.status === 'completed'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : trip.status === 'cancelled'
              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
          }`}>
            {trip.status}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {trip.status === 'active' ? 'Trip is ready to explore!' : trip.status === 'completed' ? 'Trip completed successfully!' : 'Planning in progress...'}
        </p>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onView(trip.id)}
            className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(trip.id)}
            className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  change, 
  color,
  delay 
}: { 
  icon: React.ComponentType<{ className?: string }>, 
  label: string, 
  value: string, 
  change: string, 
  color: string,
  delay: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.02, y: -5 }}
    className="glass-card p-6 rounded-2xl hover:shadow-xl transition-all"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className="text-xs text-green-500 font-medium">{change}</span>
    </div>
    <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
    <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
  </motion.div>
)

export default function TripsPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  
  const { data: tripsData, isLoading, error } = useQuery({
    queryKey: ["trips"],
    queryFn: () => TripService.list(1, 100),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => TripService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] })
      toast.success("Trip deleted successfully")
    },
    onError: () => {
      toast.error("Failed to delete trip")
    }
  })

  const handleDeleteTrip = (tripId: string) => {
    if (confirm('Are you sure you want to delete this trip?')) {
      deleteMutation.mutate(tripId)
    }
  }

  const handleViewTrip = (tripId: string) => {
    router.push(`/trips/${tripId}`)
  }

  const trips = tripsData?.data || []
  
  // Calculate stats from trips
  const uniqueDestinations = [...new Set(trips.map(trip => trip.destination))].length
  const totalBudget = trips.reduce((sum, trip) => sum + (trip.budget || 0), 0)
  
  const stats = [
    { icon: MapPin, label: "Destinations", value: uniqueDestinations.toString(), change: "+2", color: "from-blue-500 to-cyan-500" },
    { icon: Calendar, label: "Total Trips", value: trips.length.toString(), change: "+1", color: "from-purple-500 to-pink-500" },
    { icon: DollarSign, label: "Total Budget", value: `$${(totalBudget / 1000).toFixed(1)}k`, change: "+$2k", color: "from-green-500 to-emerald-500" }
  ]

  return (
    <AuthGuard>
      <PremiumDashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">My Trips</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and plan your adventures</p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} {...stat} delay={index * 0.1} />
            ))}
          </div>

          {/* Trips Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">Loading trips...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400">Failed to load trips. Please try again.</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">All Trips</h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {trips.length} trips total
                </div>
              </div>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {trips.map((trip, index) => (
                  <TripCard key={trip.id} trip={trip} index={index} onDelete={handleDeleteTrip} onView={handleViewTrip} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty State (when no trips) */}
          {trips.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Plane className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No trips yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create your first trip to get started planning your next adventure!
              </p>
              <Link href="/trips/create">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Your First Trip</span>
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </PremiumDashboardLayout>
    </AuthGuard>
  )
}
