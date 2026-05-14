"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Star,
  Heart,
  Download,
  Edit3,
  Utensils,
  Camera,
  CheckCircle,
  Brain
} from "lucide-react"

import { toast } from "sonner"

import AIChatAssistant from "./ai-chat-assistant"

interface ItineraryDisplayProps {
  itinerary: any
  onEdit?: () => void
}

const ActivityCard = ({
  activity,
  index,
}: {
  activity: any
  index: number
}) => (

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
      delay: index * 0.1,
    }}
    whileHover={{
      scale: 1.01,
      y: -3,
    }}
    className="
      glass-card
      p-4
      sm:p-6
      rounded-2xl
      hover:shadow-xl
      transition-all
    "
  >

    <div
      className="
        flex
        flex-col
        sm:flex-row
        sm:items-start
        sm:justify-between
        gap-4
        mb-4
      "
    >

      <div className="flex-1">

        <div className="flex items-center gap-2 mb-2">

          <div
            className="
              w-8
              h-8
              bg-gradient-to-br
              from-blue-500
              to-purple-600
              rounded-lg
              flex
              items-center
              justify-center
            "
          >
            <Camera className="w-4 h-4 text-white" />
          </div>

          <h4
            className="
              text-base
              sm:text-lg
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            {activity.name}
          </h4>
        </div>

        <p
          className="
            text-sm
            text-gray-600
            dark:text-gray-400
            mb-3
          "
        >
          {activity.description}
        </p>

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
            text-sm
            text-gray-500
            dark:text-gray-400
          "
        >

          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{activity.duration}</span>
          </div>

          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>
              {activity.location ||
                "Location"}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{activity.cost}</span>
          </div>
        </div>
      </div>

      <div
        className="
          flex
          flex-row
          sm:flex-col
          items-center
          sm:items-end
          gap-2
        "
      >

        <div className="flex items-center gap-1">

          <Star
            className="
              w-4
              h-4
              text-yellow-500
              fill-current
            "
          />

          <span
            className="
              text-sm
              font-medium
              text-gray-900
              dark:text-white
            "
          >
            {activity.rating || "4.8"}
          </span>
        </div>

        <motion.button
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.9,
          }}
          className="
            p-2
            rounded-lg
            bg-red-50
            dark:bg-red-900/20
            hover:bg-red-100
            dark:hover:bg-red-900/30
            transition-colors
          "
        >
          <Heart className="w-4 h-4 text-red-500" />
        </motion.button>
      </div>
    </div>
  </motion.div>
)

const MealCard = ({
  meal,
  index,
}: {
  meal: any
  index: number
}) => (

  <motion.div
    initial={{
      opacity: 0,
      x: 20,
    }}
    animate={{
      opacity: 1,
      x: 0,
    }}
    transition={{
      delay: index * 0.1,
    }}
    className="
      p-4
      bg-gradient-to-r
      from-orange-50
      to-red-50
      dark:from-orange-900/20
      dark:to-red-900/20
      rounded-xl
      border
      border-orange-200
      dark:border-orange-800
    "
  >

    <div
      className="
        flex
        items-center
        justify-between
        gap-3
      "
    >

      <div>

        <div className="flex items-center gap-2 mb-1">

          <Utensils
            className="
              w-4
              h-4
              text-orange-600
              dark:text-orange-400
            "
          />

          <span
            className="
              text-sm
              font-medium
              text-gray-900
              dark:text-white
              capitalize
            "
          >
            {meal.type}
          </span>
        </div>

        <h4
          className="
            font-semibold
            text-gray-900
            dark:text-white
          "
        >
          {meal.name}
        </h4>

        <p
          className="
            text-xs
            text-gray-600
            dark:text-gray-400
          "
        >
          {meal.cuisine || "Cuisine"}
        </p>
      </div>

      <div className="text-right">

        <div className="flex items-center gap-1 mb-1">

          <Star
            className="
              w-3
              h-3
              text-yellow-500
              fill-current
            "
          />

          <span
            className="
              text-xs
              font-medium
              text-gray-900
              dark:text-white
            "
          >
            {meal.rating || "4.7"}
          </span>
        </div>

        <span
          className="
            text-sm
            font-semibold
            text-gray-900
            dark:text-white
          "
        >
          {meal.cost}
        </span>
      </div>
    </div>
  </motion.div>
)

export default function ItineraryDisplay({
  itinerary,
  onEdit,
}: ItineraryDisplayProps) {

  const [activeDay, setActiveDay] =
    useState(1)

  const handleExport = () => {

    try {

      const data =
        JSON.stringify(
          itinerary,
          null,
          2
        )

      const blob =
        new Blob(
          [data],
          {
            type:
              "application/json",
          }
        )

      const url =
        URL.createObjectURL(blob)

      const a =
        document.createElement("a")

      a.href = url

      a.download =
        `${itinerary.destination}-trip.json`

      document.body.appendChild(a)

      a.click()

      document.body.removeChild(a)

      URL.revokeObjectURL(url)

      toast.success(
        "Trip exported successfully!"
      )

    } catch (error) {

      console.error(error)

      toast.error(
        "Failed to export trip"
      )
    }
  }

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
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
        "
      >

        <div>

          <h2
            className="
              text-2xl
              sm:text-3xl
              font-bold
              text-gray-900
              dark:text-white
              mb-2
            "
          >
            {itinerary.destination} Adventure
          </h2>

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-4
              text-sm
              text-gray-600
              dark:text-gray-400
            "
          >

            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {itinerary?.days?.length || 0} Days
              </span>
            </div>

            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>
                ${itinerary?.budget || 1000}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Brain className="w-4 h-4" />
              <span>AI Generated</span>
            </div>
          </div>
        </div>

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={onEdit}
            className="
              h-11
              px-5
              rounded-xl
              glass-card
              flex
              items-center
              gap-2
              hover:bg-white/20
              transition-colors
            "
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={handleExport}
            className="
              h-11
              px-5
              rounded-xl
              bg-gradient-to-r
              from-blue-500
              to-purple-600
              text-white
              flex
              items-center
              gap-2
              shadow-lg
            "
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </motion.button>
        </div>
      </motion.div>

      {/* DAY SELECTOR */}

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
          delay: 0.1,
        }}
        className="
          flex
          items-center
          gap-2
          overflow-x-auto
          pb-2
          w-full
        "
      >

        {(itinerary?.days || []).map(
          (day: any) => (

            <motion.button
              key={day.day}
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() =>
                setActiveDay(day.day)
              }
              className={`
                min-w-[110px]
                px-4
                py-3
                rounded-2xl
                border-2
                transition-all
                flex-shrink-0
                ${
                  activeDay === day.day
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

              <div className="text-center">

                <p
                  className="
                    text-sm
                    font-semibold
                    text-gray-900
                    dark:text-white
                  "
                >
                  Day {day.day}
                </p>

                <p
                  className="
                    text-xs
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  {day.title}
                </p>
              </div>
            </motion.button>
          )
        )}
      </motion.div>

      {/* DAY CONTENT */}

      {(itinerary?.days || []).map(
        (day: any) => (

          <motion.div
            key={day.day}
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity:
                activeDay === day.day
                  ? 1
                  : 0,

              x:
                activeDay === day.day
                  ? 0
                  : 20,
            }}
            transition={{
              duration: 0.3,
            }}
            className={
              activeDay === day.day
                ? "block"
                : "hidden"
            }
          >

            <div
              className="
                grid
                grid-cols-1
                xl:grid-cols-3
                gap-6
                lg:gap-8
              "
            >

              {/* MAIN */}

              <div className="xl:col-span-2 space-y-6">

                {/* ACTIVITIES */}

                <div>

                  <h3
                    className="
                      text-xl
                      font-semibold
                      text-gray-900
                      dark:text-white
                      mb-4
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <Camera
                      className="
                        w-5
                        h-5
                        text-blue-600
                        dark:text-blue-400
                      "
                    />

                    <span>Activities</span>
                  </h3>

                  <div className="space-y-4">

                    {(day.activities || []).map(
                      (
                        activity: any,
                        index: number
                      ) => (

                        <ActivityCard
                          key={index}
                          activity={activity}
                          index={index}
                        />
                      )
                    )}
                  </div>
                </div>

                {/* MEALS */}

                {(day.meals || []).length >
                  0 && (

                  <div>

                    <h3
                      className="
                        text-xl
                        font-semibold
                        text-gray-900
                        dark:text-white
                        mb-4
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <Utensils
                        className="
                          w-5
                          h-5
                          text-orange-600
                          dark:text-orange-400
                        "
                      />

                      <span>Dining</span>
                    </h3>

                    <div
                      className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-4
                      "
                    >

                      {(day.meals || []).map(
                        (
                          meal: any,
                          index: number
                        ) => (

                          <MealCard
                            key={`${meal.type}-${index}`}
                            meal={meal}
                            index={index}
                          />
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )
      )}

      {/* AI CHAT */}

      <AIChatAssistant
        itinerary={itinerary}
        onItineraryUpdate={(updates) =>
          console.log(
            "Itinerary updated:",
            updates
          )
        }
      />
    </div>
  )
}