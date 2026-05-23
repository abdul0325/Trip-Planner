"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import {
  Plane,
  Wallet,
  Calendar,
  Heart,
  Users,
  Sparkles,
  Globe2,
} from "lucide-react"

const interests = [
  "Adventure",
  "Food",
  "Luxury",
  "Shopping",
  "Photography",
  "Nature",
  "History",
  "Nightlife",
  "Beach",
  "Culture",
]

const budgets = [
  {
    label: "$500",
    value: 500,
  },

  {
    label: "$1000",
    value: 1000,
  },

  {
    label: "$1500",
    value: 1500,
  },

  {
    label: "$2000",
    value: 2000,
  },

  {
    label: "$3000",
    value: 3000,
  },

  {
    label: "$5000",
    value: 5000,
  },
]

const durations = [
  {
    label: "3 Days",
    value: 3,
  },

  {
    label: "5 Days",
    value: 5,
  },

  {
    label: "7 Days",
    value: 7,
  },

  {
    label: "10 Days",
    value: 10,
  },
];

const travelTypes = [
  "Solo",
  "Couple",
  "Family",
  "Friends",
  "Business",
]

interface FormData {
  destination: string
  duration: number
  budget: number
  travelType: string
  accommodation: string
  travelPace: string
  interests: string[]
  notes: string
  startDate: string
  endDate: string
}

export default function AIPreferenceForm({
  onGenerate,
}: {
  onGenerate: (data: any) => void
}) {

  const [formData, setFormData] = useState<FormData>({
    destination: "",

    duration: 0,

    budget: 1000,

    travelType: "",

    accommodation: "",

    travelPace: "",

    interests: [] as string[],

    notes: "",

    startDate: "",
    endDate: "",
  })
  const calculateDuration = (
    start: string,
    end: string
  ) => {

    if (!start || !end)
      return 0

    const startDate =
      new Date(start)

    const endDate =
      new Date(end)

    const diffTime =
      endDate.getTime() -
      startDate.getTime()

    return Math.ceil(
      diffTime /
      (1000 * 60 * 60 * 24)
    )
  }
  const toggleInterest = (interest: string) => {

    setFormData((prev) => ({
      ...prev,

      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  return (
    <div
      className="
        max-w-5xl
        mx-auto
        rounded-3xl
        border
        border-gray-200 dark:border-white/10
        bg-white dark:bg-white/5
        backdrop-blur-xl
        p-6
        sm:p-8
        lg:p-10
      "
    >

      {/* HEADER */}
      <div className="text-center mb-10">

        <div
          className="
            w-20
            h-20
            rounded-3xl
            bg-gradient-to-r
            from-blue-500
            to-purple-600
            flex
            items-center
            justify-center
            mx-auto
            mb-6
            shadow-xl
            shadow-blue-500/20
          "
        >
          <Sparkles className="w-10 h-10 text-gray-900 dark:text-white" />
        </div>

        <h2
          className="
    text-3xl
    sm:text-4xl
    font-black
    bg-gradient-to-r
    from-gray-900
    via-blue-700
    to-purple-700
    dark:from-white
    dark:via-blue-100
    dark:to-purple-300
    bg-clip-text
    text-transparent
  "
        >
          Plan Your Perfect Journey
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
          Tell our AI about your dream trip and receive
          a personalized luxury itinerary.
        </p>
      </div>

      <div className="space-y-10">

        {/* DESTINATION */}
        <div className="space-y-3">

          <label
            className="
      flex
      items-center
      gap-2
      text-sm
      sm:text-base
      font-semibold
      text-gray-800
      dark:text-white
    "
          >

            <Globe2
              className="
        w-5
        h-5
        text-blue-600
        dark:text-blue-400
      "
            />

            Destination
          </label>

          <input
            type="text"

            placeholder="Where do you want to go?"

            value={formData.destination}

            onChange={(e) =>
              setFormData({
                ...formData,
                destination: e.target.value,
              })
            }

            className="
      w-full
      h-14
      rounded-2xl
      border
      border-gray-300
      dark:border-white/10

      bg-white
      dark:bg-white/5

      px-5

      text-base
      text-gray-900
      dark:text-white

      placeholder:text-gray-400
      dark:placeholder:text-gray-500

      shadow-sm
      dark:shadow-none

      transition-all

      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      focus:border-blue-500

      hover:border-blue-300
      dark:hover:border-white/20
    "
          />
        </div>
        {/* TRAVEL DATES */}
        <div className="space-y-4">

          <label
            className="
      flex
      items-center
      gap-2
      text-sm
      sm:text-base
      font-semibold
      text-gray-800
      dark:text-white
    "
          >
            <Calendar className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />

            Travel Dates
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* START DATE */}
            <div>
              <input
                type="date"

                min={new Date().toISOString().split("T")[0]}

                value={formData.startDate}

                onChange={(e) => {

                  const newStartDate =
                    e.target.value

                  setFormData({
                    ...formData,

                    startDate: newStartDate,

                    duration: calculateDuration(
                      newStartDate,
                      formData.endDate
                    ),
                  })
                }}

                className="
          w-full
          h-14
          rounded-2xl
          border
          border-gray-300
          dark:border-white/10
          bg-white
          dark:bg-white/5
          px-5
          text-gray-900
          dark:text-white
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
              />
            </div>

            {/* END DATE */}
            <div>
              <input
                type="date"

                min={
                  formData.startDate ||
                  new Date().toISOString().split("T")[0]
                }

                value={formData.endDate}

                onChange={(e) => {

                  const newEndDate =
                    e.target.value

                  setFormData({
                    ...formData,

                    endDate: newEndDate,

                    duration: calculateDuration(
                      formData.startDate,
                      newEndDate
                    ),
                  })
                }}

                className="
          w-full
          h-14
          rounded-2xl
          border
          border-gray-300
          dark:border-white/10
          bg-white
          dark:bg-white/5
          px-5
          text-gray-900
          dark:text-white
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
              />
            </div>
          </div>
        </div>
        {/* BUDGET */}
        <div>

          <label className="flex items-center gap-2 mb-4 text-gray-900 dark:text-white font-medium">

            <Wallet className="w-5 h-5 text-green-400" />

            Budget Style
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {budgets.map((budget) => (

              <motion.button
                type="button"
                key={budget.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  setFormData({
                    ...formData,
                    budget: budget.value,
                  })
                }
                className={`
          relative
          overflow-hidden
          rounded-3xl
          border
          p-6
          text-left
          transition-all

          ${formData.budget === budget.value
                    ? `
                border-white/30
                bg-white/10
                shadow-xl
              `
                    : `
                border-gray-200 dark:border-white/10
                bg-white dark:bg-white/5
              `
                  }
        `}
              >

                {/* GRADIENT */}
                <div
                  className={`
            absolute
            inset-0
            opacity-20
            bg-gradient-to-r
            ${budget.color}
          `}
                />

                {/* CONTENT */}
                <div className="relative z-10">

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {budget.label}
                  </h3>

                  <p className="text-gray-300 text-sm">
                    {budget.range}
                  </p>

                  <div
                    className="
              mt-5
              inline-flex
              items-center
              px-3
              py-1
              rounded-full
              bg-white/10
              text-xs
              text-gray-900 dark:text-white
            "
                  >
                    AI Optimized
                  </div>
                </div>

                {/* ACTIVE BORDER */}
                {formData.budget === budget.value && (

                  <div
                    className="
              absolute
              top-3
              right-3
              w-3
              h-3
              rounded-full
              bg-green-400
              shadow-lg
              shadow-green-400/50
            "
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* INTERESTS */}
        <div className="space-y-4">

          <label
            className="
      flex
      items-center
      gap-2
      text-sm
      sm:text-base
      font-semibold
      text-gray-800
      dark:text-white
    "
          >

            <Heart
              className="
        w-5
        h-5
        text-pink-600
        dark:text-pink-400
      "
            />

            Interests
          </label>

          <div
            className="
      flex
      flex-wrap
      gap-3
    "
          >

            {interests.map((interest) => (

              <motion.button
                key={interest}

                whileHover={{
                  scale: 1.05,
                }}

                whileTap={{
                  scale: 0.95,
                }}

                type="button"

                onClick={() =>
                  toggleInterest(interest)
                }

                className={`
          px-5
          py-3
          rounded-full
          border
          text-sm
          font-medium
          transition-all
          shadow-sm

          ${formData.interests.includes(
                  interest
                )

                    ? `
                border-pink-500
                bg-gradient-to-r
                from-pink-500
                to-rose-500
                text-white
                shadow-lg
              `

                    : `
                border-gray-300
                dark:border-white/10

                bg-white
                dark:bg-white/5

                text-gray-800
                dark:text-gray-300

                hover:border-pink-400
                dark:hover:border-white/20

                hover:bg-pink-50
                dark:hover:bg-white/10
              `
                  }
        `}
              >

                {interest}
              </motion.button>
            ))}
          </div>
        </div>

        {/* TRAVEL TYPE */}
        <div className="space-y-4">

          <label
            className="
      flex
      items-center
      gap-2
      text-sm
      sm:text-base
      font-semibold
      text-gray-800
      dark:text-white
    "
          >

            <Users
              className="
        w-5
        h-5
        text-yellow-600
        dark:text-yellow-400
      "
            />

            Travel Type
          </label>

          <div
            className="
      grid
      grid-cols-2
      md:grid-cols-5
      gap-4
    "
          >

            {travelTypes.map((type) => (

              <motion.button
                key={type}

                whileHover={{
                  scale: 1.03,
                }}

                whileTap={{
                  scale: 0.97,
                }}

                type="button"

                onClick={() =>
                  setFormData({
                    ...formData,
                    travelType: type,
                  })
                }

                className={`
          h-14
          rounded-2xl
          border
          text-sm
          font-semibold
          transition-all
          shadow-sm

          ${formData.travelType === type

                    ? `
                border-yellow-500
                bg-gradient-to-r
                from-yellow-500
                to-orange-500
                text-white
                shadow-lg
              `

                    : `
                border-gray-300
                dark:border-white/10

                bg-white
                dark:bg-white/5

                text-gray-800
                dark:text-gray-300

                hover:border-yellow-400
                dark:hover:border-white/20

                hover:bg-yellow-50
                dark:hover:bg-white/10
              `
                  }
        `}
              >

                {type}
              </motion.button>
            ))}
          </div>
        </div>

        {/* NOTES */}
        <div>

          <label className="flex items-center gap-2 mb-3 text-gray-900 dark:text-white font-medium">

            <Plane className="w-5 h-5 text-purple-400" />

            Extra AI Instructions
          </label>

          <textarea
            rows={5}
            placeholder="Tell AI anything special about your trip..."
            value={formData.notes}
            onChange={(e) =>
              setFormData({
                ...formData,
                notes: e.target.value,
              })
            }
            className="
              w-full
              rounded-2xl
              border
              border-gray-200 dark:border-white/10
              bg-white dark:bg-white/5
              p-5
              text-gray-900 dark:text-white
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* SUBMIT */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {

            if (!formData.destination) {
              return alert(
                "Please enter destination"
              )
            }

            if (!formData.startDate) {
              return alert(
                "Please select start date"
              )
            }

            if (!formData.endDate) {
              return alert(
                "Please select end date"
              )
            }

            if (
              new Date(formData.endDate) <=
              new Date(formData.startDate)
            ) {
              return alert(
                "End date must be after start date"
              )
            }

            onGenerate(formData)
          }}
          className="
            w-full
            h-16
            rounded-2xl
            bg-gradient-to-r
            from-blue-500
            via-cyan-500
            to-purple-600
            text-gray-900 dark:text-white
            text-lg
            font-bold
            shadow-2xl
            shadow-blue-500/20
          "
        >
          Generate AI Itinerary
        </motion.button>
      </div>
    </div>
  )
}