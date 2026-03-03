import { NextRequest } from 'next/server';
import { streamManager } from '@/lib/worker-stream';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Server-Sent Events (SSE) endpoint for real-time worker updates
 * Dashboard connects here to receive live broadcasts from worker
 */
export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();
  
  // Extract userId from query params (optional filtering)
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId') || undefined;

  console.log(`📡 [SSE] New connection${userId ? ` for user ${userId.slice(0, 8)}` : ''}`);
  
  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      const connectionEvent = {
        type: 'connected',
        message: 'Live stream connected to worker',
        timestamp: new Date().toISOString()
      };
      
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(connectionEvent)}\n\n`)
      );

      // Send recent events (last 20) for initial state
      const recentEvents = streamManager.getRecentEvents(20, userId);
      if (recentEvents.length > 0) {
        console.log(`📤 [SSE] Sending ${recentEvents.length} recent events to new connection`);
        recentEvents.forEach(event => {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(event)}\n\n`)
          );
        });
      }

      // Subscribe to new events
      const unsubscribe = streamManager.subscribe((event) => {
        // Filter by userId if specified
        if (userId && event.userId && event.userId !== userId) {
          return; // Skip events for other users
        }

        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(event)}\n\n`)
          );
        } catch (error) {
          console.error('Error sending event to client:', error);
        }
      });

      // Keep connection alive with heartbeat
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(': heartbeat\n\n'));
        } catch (error) {
          // Client disconnected
          clearInterval(heartbeat);
        }
      }, 15000);

      // Cleanup on close
      req.signal.addEventListener('abort', () => {
        console.log(`📡 [SSE] Connection closed${userId ? ` for user ${userId.slice(0, 8)}` : ''}`);
        clearInterval(heartbeat);
        unsubscribe();
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable nginx buffering
    },
  });
}
