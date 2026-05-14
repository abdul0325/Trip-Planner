import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

export type JWTPayload = {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
};

type JwtPayloadInput = Omit<JWTPayload, 'iat' | 'exp'>;
/**
 * Generate a JWT token
 */
export function generateToken(payload: JwtPayloadInput, expiresIn: string = '7d'): string {
  return jwt.sign(payload as object, JWT_SECRET, { expiresIn: "7d" });
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): JWTPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Decode a JWT token without verification
 */
export function decodeToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.decode(token);
    return decoded as JWTPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(authHeader?: string): string | null {
  if (!authHeader) return null;

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
}
