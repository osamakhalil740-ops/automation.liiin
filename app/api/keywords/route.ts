import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromToken, unauthorized } from '@/lib/auth';

export async function GET() {
    const userId = await getUserFromToken();
    if (!userId) return unauthorized();

    try {
        const keywords = await prisma.keyword.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(keywords);
    } catch (error) {
        console.error('Keywords GET error:', error);
        console.error('Error details:', error instanceof Error ? error.message : String(error));
        return NextResponse.json({ 
            error: 'Failed to fetch keywords',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const userId = await getUserFromToken();
    if (!userId) return unauthorized();

    try {
        const body = await req.json();
        console.log('Received keyword POST:', body);
        
        // Handle both 'keyword' and 'term' from frontend
        const keywordText = body.keyword || body.term;
        const targetReach = body.targetReach || 1000; // Default to 1000 if not provided
        
        if (!keywordText) {
            return NextResponse.json({ error: 'Keyword text is required' }, { status: 400 });
        }
        
        const newKeyword = await prisma.keyword.create({
            data: { 
                keyword: keywordText,
                targetReach: parseInt(targetReach.toString()),
                userId 
            }
        });
        
        console.log('Created keyword:', newKeyword);
        return NextResponse.json(newKeyword);
    } catch (error) {
        console.error('Keywords POST error:', error);
        console.error('Error details:', error instanceof Error ? error.message : String(error));
        console.error('Stack:', error instanceof Error ? error.stack : 'No stack');
        return NextResponse.json({ 
            error: 'Failed to create keyword',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const userId = await getUserFromToken();
    if (!userId) return unauthorized();

    try {
        const { id } = await req.json();
        await prisma.keyword.delete({
            where: { id, userId }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Keywords DELETE error:', error);
        return NextResponse.json({ 
            error: 'Failed to delete keyword',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
