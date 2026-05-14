import { Trip } from '@/services/trip.service'

// Local storage utilities for trips (fallback when API is unavailable)
const TRIPS_STORAGE_KEY = 'trips_data'

export interface TripStorage {
  trips: Trip[]
  lastUpdated: string
}

export const tripStorage = {
  // Get trips from localStorage
  getTrips: (): Trip[] => {
    if (typeof window === 'undefined') return []
    
    try {
      const stored = localStorage.getItem(TRIPS_STORAGE_KEY)
      if (!stored) return []
      
      const data: TripStorage = JSON.parse(stored)
      return data.trips || []
    } catch (error) {
      console.error('Failed to get trips from storage:', error)
      return []
    }
  },

  // Save trips to localStorage
  saveTrips: (trips: Trip[]): void => {
    if (typeof window === 'undefined') return
    
    try {
      const data: TripStorage = {
        trips,
        lastUpdated: new Date().toISOString()
      }
      localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save trips to storage:', error)
    }
  },

  // Add a single trip
  addTrip: (trip: Trip): void => {
    const trips = tripStorage.getTrips()
    trips.push(trip)
    tripStorage.saveTrips(trips)
  },

  // Update a trip
  updateTrip: (id: string, updates: Partial<Trip>): void => {
    const trips = tripStorage.getTrips()
    const index = trips.findIndex(trip => trip.id === id)
    
    if (index !== -1) {
      trips[index] = { ...trips[index], ...updates }
      tripStorage.saveTrips(trips)
    }
  },

  // Delete a trip
  deleteTrip: (id: string): void => {
    const trips = tripStorage.getTrips()
    const filteredTrips = trips.filter(trip => trip.id !== id)
    tripStorage.saveTrips(filteredTrips)
  },

  // Clear all trips
  clearTrips: (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(TRIPS_STORAGE_KEY)
  },

  // Get last updated timestamp
  getLastUpdated: (): string | null => {
    if (typeof window === 'undefined') return null
    
    try {
      const stored = localStorage.getItem(TRIPS_STORAGE_KEY)
      if (!stored) return null
      
      const data: TripStorage = JSON.parse(stored)
      return data.lastUpdated || null
    } catch (error) {
      console.error('Failed to get last updated from storage:', error)
      return null
    }
  },

  // Get trip statistics
  getTripStats: () => {
    const trips = tripStorage.getTrips()
    const uniqueDestinations = [...new Set(trips.map(trip => trip.destination))].length
    const totalBudget = trips.reduce((sum, trip) => sum + (trip.budget || 0), 0)
    const upcomingTrips = trips.filter(trip => new Date(trip.startDate) > new Date()).length
    const completedTrips = trips.filter(trip => trip.status === 'completed').length

    return {
      destinations: uniqueDestinations,
      total: trips.length,
      totalBudget,
      upcoming: upcomingTrips,
      completed: completedTrips
    }
  }
}

// Re-export Trip type for convenience
export type { Trip }
