export interface Trip {
  id: string

  title: string

  description?: string

  destination: string

  startDate: string

  endDate: string

  budget?: number

  status: string

  // IMPORTANT

  itineraryData?: string

  interests?: string

  travelType?: string

  duration?: string

  createdAt: string

  updatedAt: string
}