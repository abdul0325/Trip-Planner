import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthFromRequest, createAuthErrorResponse } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthFromRequest(request);

    // Get pagination params with validation
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10')));
    const skip = (page - 1) * limit;

    // Get all trips for the user with error handling
    const trips = await prisma.trip.findMany({
      where: { userId: auth.userId },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.trip.count({
      where: { userId: auth.userId },
    });

    return NextResponse.json(
      {
        data: trips,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get trips error:', error);

    if (error instanceof Error && (error.message.includes('Missing authorization') || error.message.includes('Invalid authorization') || error.message.includes('Invalid or expired token'))) {
      return createAuthErrorResponse(error.message, 401);
    }

    return NextResponse.json(
      { error: 'Failed to fetch trips', message: 'Unable to retrieve your trips at this time' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await getAuthFromRequest(request);
    const body = await request.json() as unknown;

    const { title, description, destination, startDate, endDate, budget, status } = body as {
      title: string;
      description?: string;
      destination: string;
      startDate: string;
      endDate: string;
      budget?: string | number;
      status?: string;
    };

    // Validate required fields with better error messages
    const missingFields = []
    if (!title?.trim()) missingFields.push('title')
    if (!destination?.trim()) missingFields.push('destination')
    if (!startDate) missingFields.push('startDate')
    if (!endDate) missingFields.push('endDate')

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          message: `Please provide: ${missingFields.join(', ')}`,
          fields: missingFields
        },
        { status: 400 }
      );
    }

    // Validate date format and logic
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format', message: 'Please provide valid dates' },
        { status: 400 }
      );
    }

    if (end < start) {
      return NextResponse.json(
        { error: 'Invalid date range', message: 'End date must be after start date' },
        { status: 400 }
      );
    }

    // Create trip with proper error handling
    const trip = await prisma.trip.create({
      data: {
        title: title.trim(),

        description:
          description?.trim() || null,

        destination:
          destination.trim(),

        startDate:
          new Date(startDate),

        endDate:
          new Date(endDate),

        budget:
          budget !== undefined &&
            budget !== null
            ? Number(budget)
            : null,

        status,

        userId: auth.userId,
      },
    });

    return NextResponse.json(trip, { status: 201 });
  } catch (error) {
    console.error('Create trip error:', error);

    if (error instanceof Error && (error.message.includes('Missing authorization') || error.message.includes('Invalid authorization') || error.message.includes('Invalid or expired token'))) {
      return createAuthErrorResponse(error.message, 401);
    }

    // Handle Prisma unique constraint errors
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'Duplicate entry', message: 'A trip with this information already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create trip', message: 'Unable to create your trip at this time' },
      { status: 500 }
    );
  }
}
