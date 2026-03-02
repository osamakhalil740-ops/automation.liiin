/**
 * Test Script for Live Viewer
 * 
 * This simulates the worker sending live updates to test the live viewer functionality
 * Run this while viewing the live viewer page to see it in action
 * 
 * Usage: npx ts-node test-live-viewer.ts
 */

import { chromium } from 'playwright';

const API_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

async function sendEvent(type: string, message: string, screenshot?: string, metadata?: any) {
  try {
    const response = await fetch(`${API_URL}/api/worker-events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        data: { message, screenshot, metadata }
      }),
    });
    
    if (response.ok) {
      console.log(`✅ Sent: ${message}`);
    } else {
      console.error(`❌ Failed to send event: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`❌ Error sending event:`, error);
  }
}

async function simulateWorker() {
  console.log('🚀 Starting Live Viewer Test...');
  console.log(`📡 API URL: ${API_URL}`);
  console.log('👀 Open http://localhost:3000/dashboard/live-viewer to watch\n');

  // Clear old events
  await fetch(`${API_URL}/api/worker-events`, { method: 'DELETE' });
  
  const browser = await chromium.launch({ headless: false }); // Non-headless so you can see
  const page = await browser.newPage();

  try {
    // Step 1: Starting
    await sendEvent('status', '🚀 Worker started - initializing browser');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 2: Navigate to LinkedIn
    await sendEvent('action', 'Navigating to LinkedIn');
    await page.goto('https://www.linkedin.com/feed');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Capture screenshot
    const screenshot1 = await page.screenshot({ type: 'jpeg', quality: 70 });
    await sendEvent('screenshot', 'LinkedIn homepage loaded', screenshot1.toString('base64'));
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Step 3: Search
    await sendEvent('action', 'Searching for keyword: "AI"', undefined, { keyword: 'AI' });
    await sendEvent('log', 'Typing search query...');
    
    try {
      // Try to search if search box is available
      await page.fill('input[placeholder*="Search"]', 'AI', { timeout: 5000 });
      await page.press('input[placeholder*="Search"]', 'Enter');
    } catch (e) {
      // If not logged in, just simulate
      await sendEvent('log', 'Simulating search (not logged in)', 'warn');
    }
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const screenshot2 = await page.screenshot({ type: 'jpeg', quality: 70 });
    await sendEvent('screenshot', 'Search initiated', screenshot2.toString('base64'));
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Step 4: Processing
    await sendEvent('action', 'Scrolling to load posts');
    await sendEvent('log', 'Collecting post data...');
    await page.evaluate(() => window.scrollBy(0, 500));
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const screenshot3 = await page.screenshot({ type: 'jpeg', quality: 70 });
    await sendEvent('screenshot', 'Scrolling through posts', screenshot3.toString('base64'));
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Step 5: Found posts
    await sendEvent('status', 'Found 15 posts, analyzing engagement', undefined, { postCount: 15 });
    await sendEvent('log', 'Filtering posts by 500+ likes criteria');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 6: Selecting post
    await sendEvent('action', 'Selected high-engagement post', undefined, { 
      likes: 1523, 
      comments: 234 
    });
    await page.evaluate(() => window.scrollBy(0, 300));
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const screenshot4 = await page.screenshot({ type: 'jpeg', quality: 70 });
    await sendEvent('screenshot', 'High-engagement post selected', screenshot4.toString('base64'));
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Step 7: Posting comment
    await sendEvent('action', 'Opening comment box');
    await sendEvent('log', 'Typing comment...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    const screenshot5 = await page.screenshot({ type: 'jpeg', quality: 70 });
    await sendEvent('screenshot', 'Comment box opened', screenshot5.toString('base64'));
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Step 8: Success
    await sendEvent('action', '✅ Comment posted successfully!', undefined, {
      postUrl: 'https://linkedin.com/feed/update/urn:li:activity:1234567890',
      comment: 'Great insights! This really resonates with my experience in the AI space.'
    });
    
    await sendEvent('log', 'Comment saved to database');
    await new Promise(resolve => setTimeout(resolve, 2000));

    const screenshot6 = await page.screenshot({ type: 'jpeg', quality: 70 });
    await sendEvent('screenshot', '✅ Comment posted - success!', screenshot6.toString('base64'));
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Step 9: Waiting
    await sendEvent('status', '⏳ Waiting 45 minutes until next cycle', undefined, { 
      nextCycle: new Date(Date.now() + 45 * 60 * 1000).toLocaleTimeString() 
    });

    console.log('\n✅ Test completed successfully!');
    console.log('📊 Check the live viewer to see all events and screenshots\n');

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await sendEvent('error', `Automation failed: ${errorMessage}`, undefined, { 
      error: errorMessage 
    });
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
    await sendEvent('status', 'Worker stopped - test completed');
  }
}

// Run the simulation
simulateWorker().catch(console.error);
