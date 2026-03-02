/**
 * Enhanced Worker with Live Broadcasting
 * This module wraps the existing worker with live streaming capabilities
 */

import { Page } from 'playwright';
import { 
  broadcastScreenshot, 
  broadcastAction, 
  broadcastLog, 
  broadcastStatus,
  broadcastError 
} from './worker-broadcast';

export class LiveWorkerWrapper {
  private screenshotInterval: NodeJS.Timeout | null = null;
  private isActive = false;

  /**
   * Start live broadcasting with automatic screenshots
   */
  async start(page: Page, intervalSeconds: number = 3) {
    this.isActive = true;
    
    // Broadcast initial status
    await broadcastStatus('Worker started - live streaming enabled');
    
    // Start periodic screenshot broadcasting
    this.screenshotInterval = setInterval(async () => {
      if (this.isActive && page) {
        try {
          await broadcastScreenshot(page, 'Live browser view');
        } catch (error) {
          // Page might be closed, ignore
        }
      }
    }, intervalSeconds * 1000);
  }

  /**
   * Stop live broadcasting
   */
  async stop() {
    this.isActive = false;
    
    if (this.screenshotInterval) {
      clearInterval(this.screenshotInterval);
      this.screenshotInterval = null;
    }
    
    await broadcastStatus('Worker stopped');
  }

  /**
   * Log an action with live broadcast
   */
  async logAction(action: string, details?: Record<string, any>) {
    console.log(`   ✅ ${action}`);
    await broadcastAction(action, details);
  }

  /**
   * Log a message with live broadcast
   */
  async logMessage(message: string, level: 'info' | 'warn' | 'error' = 'info') {
    console.log(`   ${level === 'error' ? '❌' : level === 'warn' ? '⚠️' : 'ℹ️'} ${message}`);
    await broadcastLog(message, level);
  }

  /**
   * Log an error with live broadcast
   */
  async logError(error: string, details?: Record<string, any>) {
    console.error(`   ❌ ${error}`);
    await broadcastError(error, details);
  }

  /**
   * Capture and broadcast a specific screenshot with message
   */
  async captureScreenshot(page: Page, message: string, metadata?: Record<string, any>) {
    await broadcastScreenshot(page, message, metadata);
  }

  /**
   * Update worker status
   */
  async updateStatus(status: string, metadata?: Record<string, any>) {
    console.log(`   📊 ${status}`);
    await broadcastStatus(status, metadata);
  }
}
