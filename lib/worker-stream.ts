// Worker streaming utilities for real-time browser updates

export interface WorkerEvent {
  type: 'screenshot' | 'action' | 'log' | 'status' | 'error';
  timestamp: string;
  data: any;
  userId?: string;
  sessionId?: string;
}

export class WorkerStreamManager {
  private static instance: WorkerStreamManager;
  private events: WorkerEvent[] = [];
  private maxEvents = 100;

  static getInstance(): WorkerStreamManager {
    if (!this.instance) {
      this.instance = new WorkerStreamManager();
    }
    return this.instance;
  }

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

    console.log(`📝 [STREAM] Added ${fullEvent.type} event for user ${fullEvent.userId || 'unknown'} (total: ${this.events.length})`);

    return fullEvent;
  }

  getRecentEvents(count: number = 50, userId?: string): WorkerEvent[] {
    let filtered = this.events;
    
    // Filter by userId if provided
    if (userId) {
      filtered = this.events.filter(e => e.userId === userId);
      console.log(`📊 [STREAM] Filtered events for user ${userId}: ${filtered.length}/${this.events.length}`);
    }
    
    return filtered.slice(-count);
  }

  clearEvents(userId?: string) {
    if (userId) {
      this.events = this.events.filter(e => e.userId !== userId);
      console.log(`🧹 [STREAM] Cleared events for user ${userId}`);
    } else {
      this.events = [];
      console.log(`🧹 [STREAM] Cleared all events`);
    }
  }
}

export const streamManager = WorkerStreamManager.getInstance();
