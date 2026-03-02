// Worker streaming utilities for real-time browser updates

export interface WorkerEvent {
  type: 'screenshot' | 'action' | 'log' | 'status' | 'error';
  timestamp: string;
  data: any;
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

    return fullEvent;
  }

  getRecentEvents(count: number = 50): WorkerEvent[] {
    return this.events.slice(-count);
  }

  clearEvents() {
    this.events = [];
  }
}

export const streamManager = WorkerStreamManager.getInstance();
