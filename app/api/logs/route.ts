import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromToken, unauthorized } from '@/lib/auth';

export async function GET() {
    const userId = await getUserFromToken();
    if (!userId) return unauthorized();

    try {
        const logs = await prisma.log.findMany({
            where: { userId },
            orderBy: { timestamp: 'desc' },
            take: 50
        });
        return NextResponse.json(logs);
    } catch (error) {
        console.error('Logs error:', error);
        return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
    }
}
