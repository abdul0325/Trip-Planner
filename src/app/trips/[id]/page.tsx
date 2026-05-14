"use client";

import { useQuery } from "@tanstack/react-query";
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

import ItineraryDisplay from "@/components/trip-planning/itinerary-display";

import {
  Loader2,
  ArrowLeft,
  Edit2,
  Trash2,
  CalendarDays,
  MapPin,
  Wallet,
  BadgeCheck,
  Clock3,
  Sparkles,
  Plane,
  Star,
  Globe2,
} from "lucide-react";

import Link from "next/link";

import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useState } from "react";

import { IconRobotFace } from "@tabler/icons-react";

import { motion } from "framer-motion";

export default function TripDetailPage() {

  const params = useParams();

  const router = useRouter();

  const tripId = params.id as string;

  const [isDeleting, setIsDeleting] =
    useState(false);

  const [showDeleteDialog, setShowDeleteDialog] =
    useState(false);

  const {
    data: trip,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trip", tripId],

    queryFn: () =>
      TripService.getById(tripId),
  });

  const itinerary =
    trip?.itineraryData
      ? typeof trip.itineraryData === "string"
        ? JSON.parse(trip.itineraryData)
        : trip.itineraryData
      : null;

  const tripDays =
    itinerary?.days?.length ||
    trip?.duration ||
    (
      trip?.startDate &&
        trip?.endDate
        ? Math.max(
          1,
          Math.ceil(
            (
              new Date(trip.endDate).getTime() -
              new Date(trip.startDate).getTime()
            ) /
            (1000 * 60 * 60 * 24)
          )
        )
        : 0
    );

  const totalActivities =
    itinerary?.days?.reduce(
      (acc: number, day: any) =>
        acc +
        (day.activities?.length || 0),
      0
    ) || 0;

  const estimatedBudget =
    trip?.budget || "Custom";

  const travelType =
    trip?.travelType || "Explorer";

  const interests =
    trip?.interests
      ? typeof trip.interests === "string"
        ? JSON.parse(trip.interests)
        : trip.interests
      : [];

  const handleDelete = async () => {

    setIsDeleting(true);

    try {

      await TripService.delete(tripId);

      toast.success(
        "Trip deleted successfully"
      );

      router.push("/trips");

    } catch (error) {

      toast.error(
        "Failed to delete trip"
      );

    } finally {

      setIsDeleting(false);

      setShowDeleteDialog(false);
    }
  };

  if (isLoading) {

    return (
      <AuthGuard>
        <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4">

          <div className="text-center">

            <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-blue-500" />

            <p className="text-sm text-gray-400">
              Loading trip details...
            </p>
          </div>
        </div>
      </AuthGuard>
    );
  }

  if (error || !trip) {

    return (
      <AuthGuard>
        <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4">

          <Card
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-red-500/20
              bg-red-500/10
              backdrop-blur-xl
            "
          >

            <CardHeader>

              <CardTitle className="text-red-400">
                Failed to Load Trip
              </CardTitle>

              <CardDescription className="text-red-300">
                Something went wrong while fetching your trip.
              </CardDescription>
            </CardHeader>

            <CardContent>

              <Link href="/trips">

                <Button
                  variant="outline"
                  className="
                    w-full
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
            </CardContent>
          </Card>
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

        <div className="relative z-10 max-w-7xl mx-auto space-y-8">

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
              relative
              overflow-hidden
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

                <Link href="/trips">

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

                <div className="min-w-0">

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
                          break-words
                        "
                      >
                        {trip.title}
                      </h1>

                      <div className="flex items-center gap-2 mt-3 text-blue-200">

                        <MapPin className="w-5 h-5 shrink-0" />

                        <span className="text-sm sm:text-base font-medium">
                          {trip.destination}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* AI BADGE */}
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
                      AI Optimized Luxury Travel Experience
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">

                <Link
                  href={`/trips/${trip.id}/chat`}
                  className="w-full sm:w-auto"
                >

                  <Button
                    className="
                      w-full
                      sm:w-auto
                      rounded-xl
                      bg-gradient-to-r
                      from-blue-500
                      via-cyan-500
                      to-purple-600
                      hover:scale-105
                      transition-all
                      duration-300
                      shadow-lg
                      shadow-blue-500/20
                    "
                  >
                    <IconRobotFace className="w-4 h-4 mr-2" />

                    Chat with AI
                  </Button>
                </Link>

                <Link
                  href={`/trips/${trip.id}/edit`}
                  className="w-full sm:w-auto"
                >

                  <Button
                    className="
                      w-full
                      sm:w-auto
                      rounded-xl
                      bg-white/10
                      border
                      border-white/10
                      hover:bg-white/20
                      text-white
                    "
                  >
                    <Edit2 className="w-4 h-4 mr-2" />

                    Edit
                  </Button>
                </Link>

                <Button
                  onClick={() =>
                    setShowDeleteDialog(true)
                  }
                  disabled={isDeleting}
                  className="
                    w-full
                    sm:w-auto
                    rounded-xl
                    bg-red-500/90
                    hover:bg-red-600
                    transition-all
                  "
                >

                  <Trash2 className="w-4 h-4 mr-2" />

                  Delete
                </Button>
              </div>
            </div>
          </motion.div>

          {/* STATS */}
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
              delay: 0.15,
            }}
            className="
              grid
              grid-cols-2
              lg:grid-cols-4
              gap-4
            "
          >

            {/* DAYS */}
            <Card
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-5
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-400">
                    Trip Duration
                  </p>

                  <h3 className="text-3xl font-black text-white mt-2">
                    {tripDays}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Days Planned
                  </p>
                </div>

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-blue-500/20
                    flex
                    items-center
                    justify-center
                  "
                >
                  <CalendarDays className="w-7 h-7 text-blue-400" />
                </div>
              </div>
            </Card>

            {/* ACTIVITIES */}
            <Card
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-5
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-400">
                    Activities
                  </p>

                  <h3 className="text-3xl font-black text-white mt-2">
                    {totalActivities}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Planned Stops
                  </p>
                </div>

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-purple-500/20
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Plane className="w-7 h-7 text-purple-400" />
                </div>
              </div>
            </Card>

            {/* BUDGET */}
            <Card
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-5
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-400">
                    Budget
                  </p>

                  <h3 className="text-2xl font-black text-white mt-2">
                    ${estimatedBudget}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Estimated
                  </p>
                </div>

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-yellow-500/20
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Wallet className="w-7 h-7 text-yellow-400" />
                </div>
              </div>
            </Card>

            {/* TYPE */}
            <Card
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-5
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-400">
                    Travel Type
                  </p>

                  <h3 className="text-xl font-black text-white mt-2">
                    {travelType}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Personalized
                  </p>
                </div>

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-cyan-500/20
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Star className="w-7 h-7 text-cyan-400" />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* INTERESTS */}
          {interests.length > 0 && (

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
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
                  p-6
                "
              >

                <div className="flex items-center gap-3 mb-5">

                  <Sparkles className="w-5 h-5 text-pink-400" />

                  <h2 className="text-2xl font-bold text-white">
                    AI Interests Analysis
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3">

                  {interests.map(
                    (
                      interest: string,
                      index: number
                    ) => (

                      <div
                        key={index}
                        className="
                          px-5
                          py-2
                          rounded-full
                          border
                          border-white/10
                          bg-gradient-to-r
                          from-blue-500/10
                          to-purple-500/10
                          text-sm
                          text-blue-100
                        "
                      >
                        {interest}
                      </div>
                    )
                  )}
                </div>
              </Card>
            </motion.div>
          )}

          {/* DETAILS */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* DETAILS CARD */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="xl:col-span-2"
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
                    Trip Details
                  </CardTitle>
                </CardHeader>

                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  {/* STATUS */}
                  <div
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/5
                      p-5
                    "
                  >

                    <div className="flex items-center gap-2 mb-3">

                      <BadgeCheck className="w-5 h-5 text-green-400" />

                      <p className="font-medium text-white">
                        Status
                      </p>
                    </div>

                    <div
                      className="
                        inline-flex
                        items-center
                        px-3
                        py-1
                        rounded-full
                        bg-green-500/20
                        border
                        border-green-500/30
                        text-green-400
                        text-sm
                        font-medium
                        capitalize
                      "
                    >
                      {trip.status}
                    </div>
                  </div>

                  {/* DESTINATION */}
                  <div
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/5
                      p-5
                    "
                  >

                    <div className="flex items-center gap-2 mb-3">

                      <MapPin className="w-5 h-5 text-blue-400" />

                      <p className="font-medium text-white">
                        Destination
                      </p>
                    </div>

                    <p className="text-gray-300">
                      {trip.destination}
                    </p>
                  </div>

                  {/* START */}
                  <div
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/5
                      p-5
                    "
                  >

                    <div className="flex items-center gap-2 mb-3">

                      <CalendarDays className="w-5 h-5 text-purple-400" />

                      <p className="font-medium text-white">
                        Start Date
                      </p>
                    </div>

                    <p className="text-gray-300">
                      {trip?.startDate
                        ? new Date(
                          trip.startDate
                        ).toLocaleDateString()
                        : "Not Available"}
                    </p>
                  </div>

                  {/* END */}
                  <div
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/5
                      p-5
                    "
                  >

                    <div className="flex items-center gap-2 mb-3">

                      <Clock3 className="w-5 h-5 text-pink-400" />

                      <p className="font-medium text-white">
                        End Date
                      </p>
                    </div>

                    <p className="text-gray-300">
                      {trip?.endDate
                        ? new Date(
                          trip.endDate
                        ).toLocaleDateString()
                        : "Not Available"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* DESCRIPTION */}
            {trip.description && (

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
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
                    h-full
                  "
                >

                  <CardHeader>

                    <CardTitle className="text-2xl font-bold text-white">
                      AI Summary
                    </CardTitle>
                  </CardHeader>

                  <CardContent>

                    <p
                      className="
                        text-gray-300
                        whitespace-pre-wrap
                        leading-relaxed
                      "
                    >
                      {trip.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* ITINERARY */}
          {itinerary && (

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
                delay: 0.2,
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
                  overflow-hidden
                "
              >

                <CardHeader
                  className="
                    border-b
                    border-white/10
                    bg-gradient-to-r
                    from-blue-500/10
                    to-purple-500/10
                  "
                >

                  <CardTitle
                    className="
                      text-2xl
                      sm:text-3xl
                      font-black
                      bg-gradient-to-r
                      from-white
                      via-blue-100
                      to-purple-300
                      bg-clip-text
                      text-transparent
                    "
                  >
                    AI Generated Itinerary
                  </CardTitle>

                  <CardDescription className="text-gray-400">
                    Smart travel plan generated by AI
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 sm:p-8">

                  <ItineraryDisplay itinerary={itinerary} />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* DELETE DIALOG */}
        <AlertDialog
          open={showDeleteDialog}
          onOpenChange={
            setShowDeleteDialog
          }
        >

          <AlertDialogContent
            className="
              rounded-3xl
              border
              border-white/10
              bg-[#0B1120]
              text-white
            "
          >

            <AlertDialogHeader>

              <AlertDialogTitle>
                Delete Trip
              </AlertDialogTitle>

              <AlertDialogDescription className="text-gray-400">
                Are you sure you want to delete this trip?
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">

              <AlertDialogCancel
                className="
                  w-full
                  sm:w-auto
                  border-white/10
                  bg-white/5
                  text-white
                  hover:bg-white/10
                "
              >
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
                className="
                  w-full
                  sm:w-auto
                  bg-red-600
                  hover:bg-red-700
                "
              >

                {isDeleting && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}

                Delete
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AuthGuard>
  );
}