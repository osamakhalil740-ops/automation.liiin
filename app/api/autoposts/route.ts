import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromToken, unauthorized } from '@/lib/auth';
import { GoogleGenAI } from '@google/genai';

export async function GET() {
    const userId = await getUserFromToken();
    if (!userId) return unauthorized();

    try {
        const posts = await prisma.autoPost.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch auto posts' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const userId = await getUserFromToken();
    if (!userId) return unauthorized();

    try {
        const { topic } = await req.json();
        if (!topic) return NextResponse.json({ error: 'Topic is required' }, { status: 400 });

        // Generate content using Gemini AI
        let content = '';
        try {
            // Initialize AI only when needed and if API key exists
            if (process.env.GEMINI_API_KEY) {
                const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
                const response = await ai.models.generateContent({
                    model: 'gemini-2.0-flash',
                    contents: `You are a LinkedIn content creator. Write a highly engaging, professional LinkedIn post about: "${topic}".

Requirements:
- Write in first-person perspective
- Open with a strong hook (a question or bold statement)
- Be 150-250 words
- Include 2-3 specific, actionable insights
- End with a thought-provoking question to drive comments
- Use line breaks for readability
- Do NOT include hashtags
- Sound authentic and human, not generic

Write only the post content, no preamble.`
                });
                content = response.text || '';
            } else {
                throw new Error('GEMINI_API_KEY not configured');
            }
        } catch (aiErr) {
            console.error('Gemini generation failed:', aiErr);
            content = `[Draft] LinkedIn post about: ${topic}\n\nThis post was saved without AI generation because the API key may not be configured. Edit this content manually or add your GEMINI_API_KEY to your .env file.`;
        }

        const post = await prisma.autoPost.create({
            data: { topic, content, userId, status: 'Pending' }
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error('AutoPost creation error:', error);
        return NextResponse.json({ error: 'Failed to generate post' }, { status: 500 });
    }
}