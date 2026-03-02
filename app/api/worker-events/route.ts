import { NextRequest, NextResponse } from 'next/server';
import { streamManager } from '@/lib/worker-stream';

export const dynamic = 'force-dynamic';

// GET - Fetch recent worker events
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const count = parseInt(url.searchParams.get('count') || '50');
    
    const events = streamManager.getRecentEvents(count);
    
    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching worker events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

// POST - Add new worker event (called by worker)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;
    
    if (!type || !data) {
      return NextResponse.json({ error: 'Missing type or data' }, { status: 400 });
    }
    
    const event = streamManager.addEvent({ type, data });
    
    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error('Error adding worker event:', error);
    return NextResponse.json({ error: 'Failed to add event' }, { status: 500 });
  }
}

// DELETE - Clear all events
export async function DELETE() {
  try {
    streamManager.clearEvents();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error clearing events:', error);
    return NextResponse.json({ error: 'Failed to clear events' }, { status: 500 });
  }
}
