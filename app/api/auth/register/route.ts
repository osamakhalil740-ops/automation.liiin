import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-to-a-very-long-random-string-in-production-min-32-chars';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Check if user exists
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with default settings
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        // Create default settings for new user
        await prisma.settings.create({
            data: {
                userId: user.id,
                maxCommentsPerDay: 50,
                maxProfileViewsPerDay: 100,
                minLikes: 10,
                maxLikes: 10000,
                minComments: 2,
                maxComments: 1000,
                minDelayMins: 15,
                maxDelayMins: 45,
                systemActive: false,
                linkedinSessionCookie: ''
            }
        });

        // Auto-login: Create session token
        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

        // Return success with auth cookie
        const response = NextResponse.json({ success: true, userId: user.id });
        response.cookies.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7
        });

        return response;
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
