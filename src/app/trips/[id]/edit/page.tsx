"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

import { TripService } from "@/services";

import { AuthGuard } from "@/components/shared/auth-guard";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Loader2,
  ArrowLeft,
  CalendarDays,
  MapPin,
  Wallet,
  FileText,
  BadgeCheck,
  Sparkles,
  Plane,
  Globe2,
  Clock3,
  Star,
} from "lucide-react";

import Link from "next/link";

import { toast } from "sonner";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { Form } from "@/components/ui/form";

import { PrimaryFormInput } from "@/components/shared/inputs/PrimaryFromInput";

import { Textarea } from "@/components/ui/textarea";

import { useEffect } from "react";

import { motion } from "framer-motion";

import { aiItineraryGenerator } from "@/utils/ai-itinerary-generator";

const updateTripSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255),

  description: z.string().optional(),

  destination: z
    .string()
    .min(1, "Destination is required")
    .max(255),

  startDate: z
    .string()
    .min(1, "Start date is required"),

  endDate: z
    .string()
    .min(1, "End date is required"),

  budget: z.number().optional(),

  status: z.string(),

  itineraryData:
    z.string().optional(),

  duration:
    z.number().optional(),
});

type UpdateTripSchema =
  z.infer<typeof updateTripSchema>;

const budgetOptions = [
  {
    label: "$500",
    value: "500",
    range: "Starter Trip",
  },

  {
    label: "$1000",
    value: "1000",
    range: "Comfort Trip",
  },

  {
    label: "$1500",
    value: "1500",
    range: "Premium Trip",
  },

  {
    label: "$3000",
    value: "3000",
    range: "Luxury Trip",
  },

  {
    label: "$5000",
    value: "5000",
    range: "Ultra Luxury",
  },
];

export default function EditTripPage() {

  const params = useParams();

  const router = useRouter();

  const tripId = params.id as string;

  const form =
    useForm<UpdateTripSchema>({
      resolver: zodResolver(
        updateTripSchema
      ),
    });

  const {
    data: trip,
    isLoading,
  } = useQuery({
    queryKey: ["trip", tripId],

    queryFn: () =>
      TripService.getById(tripId),
  });

  useEffect(() => {

    if (trip) {

      form.reset({
        title: trip.title,

        description:
          trip.description || "",

        destination:
          trip.destination,

        startDate:
          trip.startDate.split("T")[0],

        endDate:
          trip.endDate.split("T")[0],

        budget:
          Number(trip.budget) || 1000,

        status: trip.status,
      });
    }
  }, [trip, form]);

  const updateMutation =
    useMutation({

      mutationFn: (
        data: UpdateTripSchema
      ) =>
        TripService.update(
          tripId,
          {
            ...data,

            budget:
              data.budget
                ? Number(data.budget)
                : undefined,
          }
        ),

      onSuccess: async () => {

        toast.success(
          "Trip updated successfully!"
        );

        await router.push(
          `/trips/${tripId}`
        );

        router.refresh();
      },

      onError: (
        error: {
          response?: {
            data?: {
              error?: string;
            };
          };
        }
      ) => {

        toast.error(
          error?.response?.data
            ?.error ||
          "Failed to update trip"
        );
      },
    });

  const onSubmit = async (
    data: UpdateTripSchema
  ) => {

    try {

      if (
        new Date(data.endDate) <=
        new Date(data.startDate)
      ) {

        toast.error(
          "End date must be after start date"
        );

        return;
      }

      // CALCULATE DURATION
      const duration =
        Math.ceil(
          (
            new Date(data.endDate).getTime() -
            new Date(data.startDate).getTime()
          ) /
          (1000 * 60 * 60 * 24)
        );

      // DETECT IMPORTANT CHANGES
      const importantChanges =
        trip.startDate.split("T")[0] !== data.startDate ||
        trip.endDate.split("T")[0] !== data.endDate ||
        Number(trip.budget) !== Number(data.budget);

      let itineraryData =
        trip.itineraryData;

      // REGENERATE ITINERARY
      if (importantChanges) {

        toast.loading(
          "Regenerating AI itinerary..."
        );

        const regeneratedItinerary =
          await aiItineraryGenerator.generateItinerary({

            destination:
              trip.destination,

            budget:
              Number(data.budget) || 1000,

            duration,

            interests:
              trip.interests
                ? typeof trip.interests === "string"
                  ? JSON.parse(trip.interests)
                  : trip.interests
                : [],

            travelType:
              trip.travelType || "Luxury",

            notes:
              data.description || "",

            startDate:
              data.startDate,

            endDate:
              data.endDate,
          });

        itineraryData =
          JSON.stringify(
            regeneratedItinerary
          );

        toast.dismiss();

        toast.success(
          "AI itinerary regenerated!"
        );
      }

      updateMutation.mutate({

        ...data,

        duration,

        itineraryData,
      });

    } catch (error) {

      toast.dismiss();

      toast.error(
        "Failed to regenerate itinerary"
      );
    }
  };

  if (isLoading) {

    return (
      <AuthGuard>

        <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4">

          <div className="text-center">

            <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-blue-500" />

            <p className="text-sm text-gray-400">
              Loading trip editor...
            </p>
          </div>
        </div>
      </AuthGuard>
    );
  }

  if (!trip) {

    return (
      <AuthGuard>

        <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4">

          <Link href="/trips">

            <Button
              variant="outline"
              className="
                border-white/10
                bg-white/5
                text-white
                hover:bg-white/10
              "
            >

              <ArrowLeft className="w-4 h-4 mr-2" />

              Back to Trips
            </Button>
          </Link>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>

      <div
        className="
          min-h-screen
          relative
          overflow-hidden
          bg-[#030712]
          text-white
          px-4
          py-6
          sm:px-6
          lg:px-8
        "
      >

        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full" />

          <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto space-y-8">

          {/* HERO */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              p-6
              sm:p-8
              lg:p-10
            "
          >

            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

              {/* LEFT */}
              <div className="flex items-start gap-4">

                <Link href={`/trips/${tripId}`}>

                  <Button
                    variant="outline"
                    size="icon"
                    className="
                      rounded-full
                      border-white/10
                      bg-white/5
                      hover:bg-white/10
                      text-white
                      shrink-0
                    "
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </Link>

                <div>

                  <div className="flex items-center gap-3 flex-wrap">

                    <div
                      className="
                        w-14
                        h-14
                        rounded-2xl
                        bg-gradient-to-r
                        from-blue-500
                        via-cyan-500
                        to-purple-600
                        flex
                        items-center
                        justify-center
                        shadow-xl
                        shadow-blue-500/20
                      "
                    >
                      <Globe2 className="w-7 h-7 text-white" />
                    </div>

                    <div>

                      <h1
                        className="
                          text-3xl
                          sm:text-4xl
                          lg:text-5xl
                          font-black
                          leading-tight
                          bg-gradient-to-r
                          from-white
                          via-blue-100
                          to-purple-300
                          bg-clip-text
                          text-transparent
                        "
                      >
                        Edit Trip
                      </h1>

                      <p className="text-gray-400 mt-2">
                        Upgrade and optimize your AI-powered travel experience.
                      </p>
                    </div>
                  </div>

                  {/* BADGE */}
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      mt-6
                      px-4
                      py-2
                      rounded-full
                      bg-gradient-to-r
                      from-blue-500/20
                      to-purple-500/20
                      border
                      border-white/10
                    "
                  >

                    <Sparkles className="w-4 h-4 text-cyan-300" />

                    <span className="text-sm text-cyan-200">
                      AI Smart Trip Optimizer
                    </span>
                  </div>
                </div>
              </div>

              {/* QUICK STATS */}
              <div className="grid grid-cols-2 gap-4 w-full xl:w-auto">

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    p-4
                    min-w-[150px]
                  "
                >

                  <div className="flex items-center gap-2 mb-3">

                    <Plane className="w-5 h-5 text-blue-400" />

                    <span className="text-sm text-gray-400">
                      Status
                    </span>
                  </div>

                  <div className="text-lg font-bold capitalize">
                    {trip.status}
                  </div>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    p-4
                    min-w-[150px]
                  "
                >

                  <div className="flex items-center gap-2 mb-3">

                    <Wallet className="w-5 h-5 text-yellow-400" />

                    <span className="text-sm text-gray-400">
                      Budget
                    </span>
                  </div>

                  <div className="text-lg font-bold">
                    ${trip.budget || 0}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >

            <Card
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                shadow-2xl
                shadow-black/20
              "
            >

              <CardHeader>

                <CardTitle
                  className="
                    text-2xl
                    sm:text-3xl
                    font-bold
                    text-white
                  "
                >
                  Trip Configuration
                </CardTitle>

                <CardDescription className="text-gray-400">
                  Modify destinations, schedules, budgets,
                  and AI planning preferences.
                </CardDescription>
              </CardHeader>

              <CardContent>

                <Form {...form}>

                  <form
                    onSubmit={form.handleSubmit(
                      onSubmit
                    )}
                    className="space-y-8"
                  >

                    {/* GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      {/* TITLE */}
                      <div className="md:col-span-2">

                        <div className="mb-3 flex items-center gap-2 text-blue-300">

                          <FileText className="w-4 h-4" />

                          <span className="text-sm font-medium">
                            Destination
                          </span>
                        </div>

                        <PrimaryFormInput
                          label=""
                          name="destination"
                          control={form.control}
                          disabled
                        />

                        <p className="text-xs text-gray-400 mt-2">
                          Destination cannot be changed after trip creation.
                        </p>
                      </div>

                      {/* START */}
                      <div>

                        <div className="mb-3 flex items-center gap-2 text-cyan-300">

                          <CalendarDays className="w-4 h-4" />

                          <span className="text-sm font-medium">
                            Start Date
                          </span>
                        </div>

                        <PrimaryFormInput
                          label=""
                          name="startDate"
                          type="date"
                          control={form.control}
                        />
                      </div>

                      {/* END */}
                      <div>

                        <div className="mb-3 flex items-center gap-2 text-pink-300">

                          <Clock3 className="w-4 h-4" />

                          <span className="text-sm font-medium">
                            End Date
                          </span>
                        </div>

                        <PrimaryFormInput
                          label=""
                          name="endDate"
                          type="date"
                          control={form.control}
                        />
                      </div>

                      {/* BUDGET */}
                      <div className="md:col-span-2">

                        <div className="mb-3 flex items-center gap-2 text-yellow-300">

                          <Wallet className="w-4 h-4" />

                          <span className="text-sm font-medium">
                            Budget Planning
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">

                          {budgetOptions.map((budget) => (

                            <button
                              type="button"
                              key={budget.value}
                              onClick={() =>
                                form.setValue(
                                  "budget",
                                  Number(budget.value),
                                  {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                  }
                                )
                              }
                              className={`
      h-20
      rounded-2xl
      border
      transition-all
      text-left
      px-4

      ${Number(form.watch("budget")) ===
                                  Number(budget.value)
                                  ? `
            border-yellow-500
            bg-yellow-500/20
            text-white
          `
                                  : `
            border-white/10
            bg-white/5
            text-gray-300
          `
                                }
    `}
                            >

                              <div className="font-semibold">
                                {budget.label}
                              </div>

                              <div className="text-xs opacity-70 mt-1">
                                {budget.range}
                              </div>
                            </button>
                          ))}
                        </div>

                      </div>

                      {/* DESCRIPTION */}
                      <div className="md:col-span-2">

                        <div className="mb-3 flex items-center gap-2 text-green-300">

                          <FileText className="w-4 h-4" />

                          <span className="text-sm font-medium">
                            AI Trip Notes
                          </span>
                        </div>

                        <Textarea
                          placeholder="
Add travel goals, hotel preferences,
special activities, luxury requests,
food interests, transportation notes...
                          "
                          className="
                            min-h-[160px]
                            border-white/10
                            bg-white/5
                            text-white
                            placeholder:text-gray-500
                            focus-visible:ring-blue-500
                          "
                          {...form.register(
                            "description"
                          )}
                        />
                      </div>

                      {/* STATUS */}
                      <div className="md:col-span-2">

                        <div className="mb-3 flex items-center gap-2 text-orange-300">

                          <BadgeCheck className="w-4 h-4" />

                          <span className="text-sm font-medium">
                            Trip Status
                          </span>
                        </div>

                        <select
                          className="
                            w-full
                            h-12
                            rounded-xl
                            border
                            border-white/10
                            bg-white/5
                            px-4
                            text-white
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                          "
                          {...form.register(
                            "status"
                          )}
                        >

                          <option
                            value="draft"
                            className="bg-[#111827]"
                          >
                            Draft
                          </option>

                          <option
                            value="active"
                            className="bg-[#111827]"
                          >
                            Active
                          </option>

                          <option
                            value="completed"
                            className="bg-[#111827]"
                          >
                            Completed
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">

                      <Button
                        type="submit"
                        disabled={
                          updateMutation.isPending
                        }
                        className="
                          flex-1
                          h-14
                          rounded-2xl
                          bg-gradient-to-r
                          from-blue-500
                          via-cyan-500
                          to-purple-600
                          hover:scale-[1.02]
                          transition-all
                          duration-300
                          shadow-lg
                          shadow-blue-500/20
                          text-base
                          font-semibold
                        "
                      >

                        {updateMutation.isPending && (

                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        )}

                        Save AI Trip Changes
                      </Button>

                      <Link
                        href={`/trips/${tripId}`}
                        className="flex-1"
                      >

                        <Button
                          variant="outline"
                          type="button"
                          className="
                            w-full
                            h-14
                            rounded-2xl
                            border-white/10
                            bg-white/5
                            text-white
                            hover:bg-white/10
                          "
                        >
                          Cancel
                        </Button>
                      </Link>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  );
}