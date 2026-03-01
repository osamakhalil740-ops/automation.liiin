import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromToken, unauthorized } from '@/lib/auth';

export async function GET() {
    const userId = await getUserFromToken();
    if (!userId) return unauthorized();

    try {
        const comments = await prisma.comment.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                keyword: {
                    select: {
                        id: true,
                        keyword: true
                    }
                }
            }
        });
        return NextResponse.json(comments);
    } catch (error) {
        console.error('Comments GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const userId = await getUserFromToken();
    if (!userId) return unauthorized();

    try {
        const { text, category, keywordId } = await req.json();
        const comment = await prisma.comment.create({
            data: { 
                text, 
                category: category || 'General', 
                userId,
                keywordId: keywordId || null
            }
        });
        return NextResponse.json(comment);
    } catch (error) {
        console.error('Comments POST error:', error);
        return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const userId = await getUserFromToken();
    if (!userId) return unauthorized();

    try {
        const { id } = await req.json();
        await prisma.comment.delete({
            where: { id, userId }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Comments DELETE error:', error);
        return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
    }
}
