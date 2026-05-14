import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { comparePasswords } from '@/lib/password';
import { generateToken } from '@/lib/jwt';

const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginRequest = z.infer<typeof LoginSchema>;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as unknown;

    // Validate input
    const validData = LoginSchema.parse(body);
    const { email, password } = validData;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        role: true,
        isBlocked: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (user.isBlocked) {
      return NextResponse.json(
        { error: 'Account is blocked' },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const accessToken = generateToken({
      userId: user.id,
      email: user.email,
    });

    // Return token and user (without password)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        accessToken,
        user: userWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 }
      );
    }

    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
