import { NextRequest } from 'next/server';
import { verifyToken, extractTokenFromHeader, JWTPayload } from './jwt';

/**
 * Extract and verify JWT from request
 */
export async function getAuthFromRequest(request: NextRequest): Promise<JWTPayload> {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) {
    throw new Error('Missing authorization header');
  }

  const token = extractTokenFromHeader(authHeader);
  
  if (!token) {
    throw new Error('Invalid authorization header format');
  }

  const payload = verifyToken(token);
  return payload;
}

/**
 * Create error response for auth failures
 */
export function createAuthErrorResponse(message: string, status: number = 401) {
  return new Response(
    JSON.stringify({
      error: message,
      message: message,
    }),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
