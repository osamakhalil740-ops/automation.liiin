import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromToken, unauthorized } from '@/lib/auth';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const userId = await getUserFromToken();
    if (!userId) return unauthorized();

    try {
        const { id } = await params;
        await prisma.comment.deleteMany({ where: { id, userId } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
    }
}

