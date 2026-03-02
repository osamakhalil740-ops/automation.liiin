/**
 * Worker Broadcasting Utilities
 * Sends live updates and screenshots to the dashboard
 */

import { Page } from 'playwright';

// Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export interface BroadcastOptions {
  type: 'screenshot' | 'action' | 'log' | 'status' | 'error';
  message: string;
  screenshot?: string; // base64 encoded
  metadata?: Record<string, any>;
}

/**
 * Send live update to dashboard
 */
export async function broadcastUpdate(options: BroadcastOptions): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/worker-events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: options.type,
        data: {
          message: options.message,
          screenshot: options.screenshot,
          metadata: options.metadata,
        },
      }),
    });

    if (!response.ok) {
      console.warn('Failed to broadcast update:', response.statusText);
    }
  } catch (error) {
    // Silently fail - don't break worker if dashboard is unreachable
    console.warn('Broadcast error (non-fatal):', error);
  }
}

/**
 * Capture and broadcast page screenshot
 */
export async function broadcastScreenshot(page: Page, message: string, metadata?: Record<string, any>): Promise<void> {
  try {
    // Capture screenshot
    const screenshot = await page.screenshot({ 
      type: 'jpeg',
      quality: 70, // Reduced quality for faster streaming
      fullPage: false, // Only visible viewport
    });
    
    // Convert to base64
    const base64Screenshot = screenshot.toString('base64');
    
    // Broadcast
    await broadcastUpdate({
      type: 'screenshot',
      message,
      screenshot: base64Screenshot,
      metadata,
    });
  } catch (error) {
    console.warn('Screenshot broadcast failed:', error);
  }
}

/**
 * Broadcast worker action
 */
export async function broadcastAction(action: string, details?: Record<string, any>): Promise<void> {
  await broadcastUpdate({
    type: 'action',
    message: action,
    metadata: details,
  });
}

/**
 * Broadcast worker log
 */
export async function broadcastLog(message: string, level: 'info' | 'warn' | 'error' = 'info'): Promise<void> {
  await broadcastUpdate({
    type: 'log',
    message,
    metadata: { level },
  });
}

/**
 * Broadcast worker status
 */
export async function broadcastStatus(status: string, metadata?: Record<string, any>): Promise<void> {
  await broadcastUpdate({
    type: 'status',
    message: status,
    metadata,
  });
}

/**
 * Broadcast worker error
 */
export async function broadcastError(error: string, metadata?: Record<string, any>): Promise<void> {
  await broadcastUpdate({
    type: 'error',
    message: error,
    metadata,
  });
}
