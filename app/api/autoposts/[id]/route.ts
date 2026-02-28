import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromToken, unauthorized } from '@/lib/auth';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const userId = await getUserFromToken();
    if (!userId) return unauthorized();

    try {
        const { id } = await params;
        await prisma.autoPost.deleteMany({
            where: { id, userId }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
