/**
 * Worker Streaming - Real-time SSE updates for dashboard
 * Manages worker events and broadcasts them to connected clients
 */

export interface WorkerEvent {
  type: 'screenshot' | 'action' | 'log' | 'status' | 'error';
  timestamp: string;
  data: any;
  userId?: string;
  sessionId?: string;
}

// Global event subscribers (SSE connections)
type EventSubscriber = (event: WorkerEvent) => void;
const subscribers = new Set<EventSubscriber>();

export class WorkerStreamManager {
  private static instance: WorkerStreamManager;
  private events: WorkerEvent[] = [];
  private maxEvents = 200; // Increased for better history

  static getInstance(): WorkerStreamManager {
    if (!this.instance) {
      this.instance = new WorkerStreamManager();
    }
    return this.instance;
  }

  /**
   * Add event and notify all subscribers immediately
   */
  addEvent(event: Omit<WorkerEvent, 'timestamp'>) {
    const fullEvent: WorkerEvent = {
      ...event,
      timestamp: new Date().toISOString(),
    };

    this.events.push(fullEvent);
    
    // Keep only last N events
    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }

    console.log(`📝 [STREAM] ${fullEvent.type.toUpperCase()} - ${typeof fullEvent.data === 'string' ? fullEvent.data : fullEvent.data?.message || 'event'}`);

    // Notify all subscribers immediately
    this.notifySubscribers(fullEvent);

    return fullEvent;
  }

  /**
   * Subscribe to real-time events (used by SSE endpoint)
   */
  subscribe(callback: EventSubscriber): () => void {
    subscribers.add(callback);
    console.log(`📡 [STREAM] New subscriber connected (total: ${subscribers.size})`);

    // Return unsubscribe function
    return () => {
      subscribers.delete(callback);
      console.log(`📡 [STREAM] Subscriber disconnected (total: ${subscribers.size})`);
    };
  }

  /**
   * Notify all subscribers of new event
   */
  private notifySubscribers(event: WorkerEvent) {
    subscribers.forEach(callback => {
      try {
        callback(event);
      } catch (error) {
        console.error('Error notifying subscriber:', error);
      }
    });
  }

  /**
   * Get recent events (for initial connection or history)
   */
  getRecentEvents(count: number = 50, userId?: string): WorkerEvent[] {
    let filtered = this.events;
    
    // Filter by userId if provided
    if (userId) {
      filtered = this.events.filter(e => e.userId === userId);
    }
    
    return filtered.slice(-count);
  }

  /**
   * Clear events for user or all
   */
  clearEvents(userId?: string) {
    if (userId) {
      this.events = this.events.filter(e => e.userId !== userId);
      console.log(`🧹 [STREAM] Cleared events for user ${userId}`);
    } else {
      this.events = [];
      console.log(`🧹 [STREAM] Cleared all events`);
    }
  }

  /**
   * Get active subscriber count
   */
  getSubscriberCount(): number {
    return subscribers.size;
  }
}

export const streamManager = WorkerStreamManager.getInstance();
