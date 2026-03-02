import { NextRequest, NextResponse } from 'next/server';
import { streamManager } from '@/lib/worker-stream';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET - Fetch recent worker events
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const count = parseInt(url.searchParams.get('count') || '50');
    const userId = url.searchParams.get('userId'); // Filter by user
    
    const events = streamManager.getRecentEvents(count, userId || undefined);
    
    const response = NextResponse.json({ events });
    
    // Add CORS headers for worker calls from external servers
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return response;
  } catch (error) {
    console.error('Error fetching worker events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

// POST - Add new worker event (called by worker)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data, userId, sessionId } = body;
    
    if (!type || !data) {
      return NextResponse.json({ error: 'Missing type or data' }, { status: 400 });
    }
    
    console.log(`📡 [WORKER-EVENTS] Received ${type} event from user ${userId || 'unknown'}`);
    
    const event = streamManager.addEvent({ type, data, userId, sessionId });
    
    const response = NextResponse.json({ success: true, event });
    
    // Add CORS headers for worker calls from external servers
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return response;
  } catch (error) {
    console.error('Error adding worker event:', error);
    return NextResponse.json({ error: 'Failed to add event' }, { status: 500 });
  }
}

// OPTIONS - Handle CORS preflight
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

// DELETE - Clear all events
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    
    streamManager.clearEvents(userId || undefined);
    
    const response = NextResponse.json({ success: true });
    
    // Add CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return response;
  } catch (error) {
    console.error('Error clearing events:', error);
    return NextResponse.json({ error: 'Failed to clear events' }, { status: 500 });
  }
}
