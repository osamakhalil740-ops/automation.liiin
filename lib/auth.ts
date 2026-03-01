import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth-options';

export const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-default-key-change-in-production';

/**
 * Get user ID from session (supports both NextAuth and legacy JWT)
 * This provides backward compatibility
 */
export async function getUserFromToken() {
    // Try NextAuth session first (preferred method)
    const session = await getServerSession(authOptions);
    if (session?.user?.id) {
        return session.user.id;
    }

    // Fallback to legacy JWT token
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) return null;

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        return decoded.userId;
    } catch (err) {
        return null;
    }
}

export function unauthorized() {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
