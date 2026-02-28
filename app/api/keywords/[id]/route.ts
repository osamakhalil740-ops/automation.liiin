import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromToken, unauthorized } from '@/lib/auth';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const userId = await getUserFromToken();
    if (!userId) return unauthorized();

    try {
        const { id } = await params;
        await prisma.keyword.deleteMany({ where: { id, userId } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete keyword' }, { status: 500 });
    }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const userId = await getUserFromToken();
    if (!userId) return unauthorized();

    try {
        const { id } = await params;
        const data = await request.json();
        const keyword = await prisma.keyword.updateMany({
            where: { id, userId },
            data
        });
        return NextResponse.json(keyword);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update keyword' }, { status: 500 });
    }
}

