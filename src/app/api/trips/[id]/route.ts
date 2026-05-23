//src/app/api/trips/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthFromRequest, createAuthErrorResponse } from '@/lib/auth-middleware';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const auth = await getAuthFromRequest(request);
    const { id: tripId } = await params;

    // Get trip and verify ownership
    const trip = await prisma.trip.findFirst({
      where: {
        id: tripId,
        userId: auth.userId,
      },
    });

    if (!trip) {
      return NextResponse.json(
        { error: 'Trip not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(trip, { status: 200 });
  } catch (error) {
    if (error instanceof Error && (error.message.includes('Missing authorization') || error.message.includes('Invalid authorization'))) {
      return createAuthErrorResponse(error.message, 401);
    }
    console.error('Get trip error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trip' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const auth = await getAuthFromRequest(request);
    const { id: tripId } = await params;
    const body = await request.json() as unknown;

    // Verify ownership first
    const existingTrip = await prisma.trip.findFirst({
      where: {
        id: tripId,
        userId: auth.userId,
      },
    });

    if (!existingTrip) {
      return NextResponse.json(
        { error: 'Trip not found or you do not have permission' },
        { status: 404 }
      );
    }

    // Update trip
    const parsedBody = (body ?? {}) as Record<string, unknown>;
    const title = typeof parsedBody.title === 'string' ? parsedBody.title : undefined;
    const destination = typeof parsedBody.destination === 'string' ? parsedBody.destination : undefined;
    const status = typeof parsedBody.status === 'string' ? parsedBody.status : undefined;

    const description =
      typeof parsedBody.description === 'string'
        ? parsedBody.description
        : parsedBody.description === null
          ? null
          : parsedBody.description === undefined
            ? undefined
            : undefined;

    const startDate = typeof parsedBody.startDate === 'string' ? parsedBody.startDate : undefined;
    const endDate = typeof parsedBody.endDate === 'string' ? parsedBody.endDate : undefined;
    const budget =
      parsedBody.budget !== undefined &&
        parsedBody.budget !== null
        ? Number(parsedBody.budget)
        : parsedBody.budget === null
          ? null
          : undefined;

    const duration =
      parsedBody.duration !== undefined
        ? Number(parsedBody.duration)
        : undefined;

    const itineraryData =
      typeof parsedBody.itineraryData === "string"
        ? parsedBody.itineraryData
        : undefined;

    const updatedTrip = await prisma.trip.update({
      where: { id: tripId },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(destination && { destination }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(budget !== undefined && {
          budget:
            budget === null
              ? null
              : Number(budget),
        }),
        ...(duration !== undefined && {
          duration,
        }),

        ...(itineraryData && {
          itineraryData,
        }),
        ...(status && { status }),
      },
    });

    return NextResponse.json(updatedTrip, { status: 200 });
  } catch (error) {
    if (error instanceof Error && (error.message.includes('Missing authorization') || error.message.includes('Invalid authorization'))) {
      return createAuthErrorResponse((error as Error).message, 401);
    }
    console.error('Update trip error:', error);
    return NextResponse.json(
      { error: 'Failed to update trip' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const auth = await getAuthFromRequest(request);
    const { id: tripId } = await params;

    // Verify ownership first
    const existingTrip = await prisma.trip.findFirst({
      where: {
        id: tripId,
        userId: auth.userId,
      },
    });

    if (!existingTrip) {
      return NextResponse.json(
        { error: 'Trip not found or you do not have permission' },
        { status: 404 }
      );
    }

    // Delete trip
    await prisma.trip.delete({
      where: { id: tripId },
    });

    return NextResponse.json(
      { message: 'Trip deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error && (error.message.includes('Missing authorization') || error.message.includes('Invalid authorization'))) {
      return createAuthErrorResponse((error as Error).message, 401);
    }
    console.error('Delete trip error:', error);
    return NextResponse.json(
      { error: 'Failed to delete trip' },
      { status: 500 }
    );
  }
}
