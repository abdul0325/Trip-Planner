export interface TripPreferences {

  destination: string

  budget: number

  duration: number

  interests: string[]

  travelType: string

  notes?: string

  startDate: string

  endDate: string
}

export interface ItineraryData {
  title: string

  destination: string

  startDate: string

  endDate: string

  budget?: number | string

  summary?: string

  days: {
    day: number

    title: string

    theme?: string

    activities: {
      name: string

      description: string

      time: string

      duration: string

      cost: string

      type?: string
    }[]

    meals?: {
      type: string

      name: string

      cost: string
    }[]

    transportation?: {
      mode: string

      details?: string

      cost: string
    }

    accommodation?: {
      name: string

      type: string

      rating: string

      cost: string
    }
  }[]

  recommendations?: string[]
}

class AIItineraryGenerator {

  async generateItinerary(
    preferences: TripPreferences
  ): Promise<ItineraryData> {

    const response = await fetch(
      "/api/generate-itinerary",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          preferences
        ),
      }
    );

    if (!response.ok) {

      console.error(
        "API ERROR:",
        await response.text()
      );

      const totalDays =
        Number(
          preferences.duration
        ) || 7;

      const startDate =
        preferences.startDate
          ? new Date(
            preferences.startDate
          )
          : new Date();

      const endDate =
        preferences.endDate
          ? new Date(
            preferences.endDate
          )
          : new Date();

      return {
        title:
          "Fallback Trip",

        destination:
          preferences.destination,

        startDate:
          preferences.startDate,

        endDate:
          preferences.endDate,

        budget:
          preferences.budget || 1000,

        summary:
          `Fallback trip for ${preferences.destination}`,

        days: Array.from({
          length: totalDays,
        }).map((_, index) => ({
          day: index + 1,

          title:
            `Day ${index + 1}`,

          theme:
            "Discovery",

          activities: [
            {
              name:
                "City Tour",

              description:
                "Explore famous attractions.",

              time:
                "10:00 AM",

              duration:
                "3 Hours",

              cost:
                "$50",

              type:
                "Sightseeing",
            },
          ],

          transportation: {
            mode:
              "Taxi",

            details:
              "Local transportation",

            cost:
              "$20",
          },

          accommodation: {
            name:
              "Premium Hotel",

            type:
              "Hotel",

            rating:
              "4.5",

            cost:
              "$180/night",
          },
        })),
      };
    }

    const data = await response.json();

    return {

      ...data,

      startDate:
        data.startDate ||
        preferences.startDate,

      endDate:
        data.endDate ||
        preferences.endDate,
    };
  }
}

export const aiItineraryGenerator =
  new AIItineraryGenerator();