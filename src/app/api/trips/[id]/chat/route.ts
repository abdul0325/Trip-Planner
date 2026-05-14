import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthFromRequest, createAuthErrorResponse } from '@/lib/auth-middleware';
import { getChatModel } from '@/lib/get-ai_model';

type ChatRequestBody = {
  message?: unknown;
};

type ChatResponseBody = {
  reply: string;
};


export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getAuthFromRequest(request);
    const { id: tripId } = await context.params;

    const body = (await request.json()) as ChatRequestBody;
    const message = body?.message;

    if (typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const trip = await prisma.trip.findFirst({
      where: {
        id: tripId,
        userId: auth.userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        destination: true,
        startDate: true,
        endDate: true,
        budget: true,
        status: true,
      },
    });

    if (!trip) {
      return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    }

    const model = await getChatModel();

    const tripContext = [
      `Title: ${trip.title}`,
      `Destination: ${trip.destination}`,
      `Start date: ${trip.startDate.toISOString()}`,
      `End date: ${trip.endDate.toISOString()}`,
      `Budget: ${trip.budget ?? 'N/A'}`,
      `Status: ${trip.status}`,
      `Description: ${trip.description ?? 'N/A'}`,
    ].join('\n');

    const system =
      'You are a helpful travel planning assistant. Use the provided trip details to answer and propose useful next steps. Keep answers concise and actionable.';

    const response = await model.invoke([
      { role: 'system', content: system },
      { role: 'system', content: `Trip details:\n${tripContext}` },
      { role: 'user', content: message.trim() },
    ]);

    const replyContent = (response as { content?: unknown })?.content;
    const reply = typeof replyContent === 'string' ? replyContent : JSON.stringify(replyContent);

    return NextResponse.json<ChatResponseBody>({ reply }, { status: 200 });
  } catch (error) {
    if (
      (error instanceof Error && error.message.includes('Missing authorization')) ||
      (error instanceof Error && error.message.includes('Invalid authorization'))
    ) {
      return createAuthErrorResponse((error as Error).message, 401);
    }

    console.error('Trip chat error:', error);
    return NextResponse.json({ error: 'Failed to generate reply' }, { status: 500 });
  }
}
