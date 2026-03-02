# 🎥 Live Worker Viewer - Integration Guide

## What Is This?

The **Live Worker Viewer** allows clients to watch the LinkedIn automation happening **in real-time** with:
- ✅ Live browser screenshots (updated every 2-3 seconds)
- ✅ Real-time action logs (every search, click, comment)
- ✅ Works regardless of where the worker is running (local, Render, Railway, etc.)
- ✅ Perfect for client demos and transparency

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Client Device (Anywhere in the world)                  │
│  ┌────────────────────────────────────┐                │
│  │   Browser - Live Viewer Page       │                │
│  │   /dashboard/live-viewer           │                │
│  │                                     │                │
│  │   - Polls API every 2 seconds      │                │
│  │   - Displays latest screenshot     │                │
│  │   - Shows real-time action log     │                │
│  └────────────────────────────────────┘                │
└─────────────────────────────────────────────────────────┘
                    ↑
                    │ HTTP Polling
                    │
┌─────────────────────────────────────────────────────────┐
│  Dashboard Server (Vercel)                              │
│  ┌────────────────────────────────────┐                │
│  │   API: /api/worker-events          │                │
│  │                                     │                │
│  │   GET  - Fetch recent events       │                │
│  │   POST - Add new event             │                │
│  │   DELETE - Clear events            │                │
│  │                                     │                │
│  │   In-memory event storage          │                │
│  │   (last 100 events kept)           │                │
│  └────────────────────────────────────┘                │
└─────────────────────────────────────────────────────────┘
                    ↑
                    │ HTTP POST (broadcasts)
                    │
┌─────────────────────────────────────────────────────────┐
│  Worker (Render/Railway/Local - Anywhere!)             │
│  ┌────────────────────────────────────┐                │
│  │   Enhanced Worker with Broadcasting│                │
│  │                                     │                │
│  │   1. Launches browser               │                │
│  │   2. Takes screenshot every 3sec   │                │
│  │   3. Sends to API endpoint         │                │
│  │   4. Logs every action             │                │
│  │   5. Sends action logs to API      │                │
│  └────────────────────────────────────┘                │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Files Created

### 1. API Routes
- **`app/api/worker-events/route.ts`** - Main API for receiving/serving worker events
- **`app/api/stream/route.ts`** - Server-Sent Events endpoint (for future WebSocket upgrade)

### 2. Libraries
- **`lib/worker-stream.ts`** - In-memory event storage manager
- **`lib/worker-broadcast.ts`** - Worker broadcasting utilities (send screenshots, logs, actions)
- **`lib/worker-enhanced.ts`** - Enhanced worker wrapper with live streaming

### 3. UI Components
- **`components/dashboard/LiveWorkerViewer.tsx`** - Main live viewer component
- **`app/dashboard/live-viewer/page.tsx`** - Dedicated live viewer page

---

## 🚀 How to Integrate with Your Worker

### Option 1: Minimal Integration (Quick - 5 minutes)

Add these lines to your existing `worker.ts`:

```typescript
import { broadcastScreenshot, broadcastAction, broadcastLog } from './lib/worker-broadcast';

// After launching browser and navigating to LinkedIn
async function runAutomation(page: Page) {
  // Broadcast that you're starting
  await broadcastLog('🚀 Starting LinkedIn automation');
  
  // Before searching
  await broadcastAction('Searching for keyword: AI');
  await broadcastScreenshot(page, 'LinkedIn search page');
  
  // After finding posts
  await broadcastAction('Found 15 posts, filtering by engagement');
  await broadcastScreenshot(page, 'Post search results');
  
  // Before posting comment
  await broadcastAction('Posting comment on high-engagement post');
  await broadcastScreenshot(page, 'About to post comment');
  
  // After posting
  await broadcastAction('✅ Comment posted successfully');
  await broadcastScreenshot(page, 'Comment posted confirmation');
}
```

### Option 2: Full Integration with Auto-Screenshots (Recommended)

Replace your worker main function:

```typescript
import { LiveWorkerWrapper } from './lib/worker-enhanced';

async function runAutomation() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Initialize live wrapper
  const liveWorker = new LiveWorkerWrapper();
  
  try {
    // Start live broadcasting (screenshots every 3 seconds automatically)
    await liveWorker.start(page, 3);
    
    // Navigate to LinkedIn
    await liveWorker.logAction('Navigating to LinkedIn');
    await page.goto('https://www.linkedin.com/feed');
    
    // Search for posts
    await liveWorker.logAction('Searching for keyword: AI', { keyword: 'AI' });
    await page.fill('input[placeholder*="Search"]', 'AI');
    await page.press('input[placeholder*="Search"]', 'Enter');
    
    // Wait for results
    await liveWorker.logMessage('Waiting for search results...');
    await page.waitForSelector('.feed-shared-update-v2');
    
    // Capture specific moment
    await liveWorker.captureScreenshot(page, 'Search results loaded', { 
      keyword: 'AI',
      postCount: 15 
    });
    
    // Find and click post
    await liveWorker.logAction('Clicking on high-engagement post');
    // ... your posting logic ...
    
    // Post comment
    await liveWorker.logAction('✅ Comment posted successfully');
    
  } catch (error) {
    await liveWorker.logError('Automation failed', { error: error.message });
  } finally {
    // Stop broadcasting
    await liveWorker.stop();
    await browser.close();
  }
}
```

---

## 🔧 Configuration

### Environment Variables

Add to your `.env`:

```bash
# For worker to know where to send updates
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app

# Or for local testing
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### For Render/Railway Deployment

Add environment variable in dashboard:
- **Key**: `NEXT_PUBLIC_APP_URL`
- **Value**: `https://your-vercel-app.vercel.app`

---

## 🎬 How to Use (Client Demo)

### 1. Start the Worker
```bash
# Locally
npm run worker

# Or it's already running on Render/Railway
```

### 2. Open Live Viewer
Navigate to: `https://your-app.vercel.app/dashboard/live-viewer`

### 3. Watch in Real-Time
- **Left side**: Live browser screenshots (updates every 2-3 seconds)
- **Right side**: Real-time action log with timestamps
- **Status**: Green dot = worker is active and broadcasting

---

## 📺 Demo Script

**"Let me show you something amazing..."**

1. Open live viewer page
2. Start worker (locally or on server)
3. Point to screen:
   - "This is the actual browser running on the server"
   - "See it searching LinkedIn right now?"
   - "Watch - it's scrolling through posts"
   - "There - it found a high-engagement post"
   - "Now it's posting a comment... done!"
4. "And here's the action log - every single step is logged"
5. "Notice the timestamp - all happening in real-time"
6. "You can watch this from anywhere - phone, tablet, laptop"
7. "The worker can be running on a server in Oregon, and you're watching from Tokyo"

**Impact**: Client sees the automation is real, professional, and completely transparent.

---

## 🎯 Features

### Current Features
✅ Live browser screenshots (JPEG, 70% quality for speed)
✅ Real-time action logging with timestamps
✅ Event type icons (camera, activity, terminal, error)
✅ Color-coded log levels
✅ Auto-scroll option
✅ Clear logs button
✅ Connection status indicator
✅ In-memory event storage (last 100 events)
✅ Polling every 2 seconds
✅ Works with worker running anywhere

### Future Enhancements (Optional)
🔄 WebSocket connection for true real-time (no polling)
🔄 Multiple worker support (track multiple automation instances)
🔄 Video recording option
🔄 Playback mode (replay automation sessions)
🔄 Download logs as file
🔄 Share live view link with clients
🔄 Performance metrics overlay

---

## 🔍 Troubleshooting

### "No screenshots appearing"

**Check:**
1. Is `NEXT_PUBLIC_APP_URL` set correctly in worker environment?
2. Can worker reach the dashboard API? (check worker logs)
3. Is the dashboard API accessible? (test: `GET /api/worker-events`)

**Fix:**
```bash
# Test API endpoint
curl https://your-app.vercel.app/api/worker-events

# Should return: {"events": []}
```

### "Screenshots are delayed"

**Cause**: Polling interval (2 seconds by default)

**Options:**
1. Reduce polling interval in `LiveWorkerViewer.tsx`:
```typescript
const interval = setInterval(pollEvents, 1000); // Change to 1 second
```

2. Or upgrade to WebSocket for instant updates (see WebSocket upgrade guide)

### "Worker can't send updates"

**Check worker logs for:**
```
Broadcast error (non-fatal): fetch failed
```

**Fix:**
1. Verify `NEXT_PUBLIC_APP_URL` is set
2. Check network connectivity from worker to dashboard
3. Ensure API routes are deployed on Vercel

### "Memory usage increasing"

**Cause**: Events accumulate in memory

**Current limit**: 100 events (configurable in `lib/worker-stream.ts`)

**To change:**
```typescript
// In lib/worker-stream.ts
private maxEvents = 50; // Reduce to 50 events
```

Or clear events periodically:
```bash
# API call to clear
curl -X DELETE https://your-app.vercel.app/api/worker-events
```

---

## 🚀 Performance

### Screenshot Quality Settings

Current: **70% JPEG quality** for balance

**Adjust in `lib/worker-broadcast.ts`:**

```typescript
// Higher quality (slower, larger)
const screenshot = await page.screenshot({ 
  type: 'jpeg',
  quality: 90, // Increase quality
});

// Lower quality (faster, smaller)
const screenshot = await page.screenshot({ 
  type: 'jpeg',
  quality: 50, // Reduce quality
});
```

### Polling vs WebSocket

**Current: Polling (2 second interval)**
- ✅ Simple, works everywhere
- ✅ No WebSocket infrastructure needed
- ⚠️ 2-second delay
- ⚠️ More HTTP requests

**Future: WebSocket**
- ✅ Instant updates
- ✅ Less bandwidth
- ⚠️ Requires WebSocket server
- ⚠️ More complex setup

---

## 📊 Bandwidth Usage

**Per screenshot:**
- Resolution: ~1920x1080 (viewport)
- JPEG 70%: ~50-150KB per screenshot
- Frequency: Every 3 seconds (worker side)
- Polling: Every 2 seconds (client side)

**Total bandwidth:**
- Worker upload: ~1-3 MB/min
- Client download: ~1-3 MB/min

**For demo (30 minutes):**
- Worker: ~30-90 MB
- Client: ~30-90 MB

**Note**: Acceptable for wifi/4G, may be slow on 3G

---

## 🎯 Integration Checklist

Before going live:

- [ ] `NEXT_PUBLIC_APP_URL` set in worker environment
- [ ] API routes deployed on Vercel
- [ ] Live viewer page accessible
- [ ] Worker can send broadcasts (test locally first)
- [ ] Screenshots appearing in live viewer
- [ ] Action logs showing in real-time
- [ ] Connection status showing green
- [ ] Auto-scroll working
- [ ] Clear logs button working
- [ ] Tested with client device (phone/tablet)

---

## 🎬 Client Demo Checklist

- [ ] Worker started (Render/Railway/Local)
- [ ] Live viewer open on big screen
- [ ] Client can see clearly
- [ ] Explain what they're seeing
- [ ] Show browser automation live
- [ ] Show action logs
- [ ] Emphasize transparency
- [ ] Show they can watch from anywhere
- [ ] Highlight professional quality

---

## 💡 Tips for Best Demo Experience

1. **Use large screen** - Projector or big monitor for client viewing
2. **Start worker before client arrives** - Have it running and ready
3. **Have backup** - Local worker + Render worker (redundancy)
4. **Test beforehand** - Run through entire flow 1 hour before
5. **Prepare talking points** - Know what to say at each step
6. **Show mobile too** - Open live viewer on phone to show "anywhere" access
7. **Keep it simple** - Don't overwhelm with technical details
8. **Focus on value** - "This saves you 3 hours per day"

---

## 🔐 Security Notes

**Current setup:**
- No authentication on API endpoints (anyone can view events)
- Events stored in-memory (cleared on server restart)
- No sensitive data in screenshots (LinkedIn UI only)

**For production:**
Consider adding:
- API authentication (session-based or API key)
- User-specific event streams
- Encrypted screenshot transmission
- HTTPS only (Vercel provides this automatically)

---

## 📚 Code Examples

### Send Custom Screenshot with Metadata

```typescript
await broadcastScreenshot(page, 'Found high-engagement post', {
  keyword: 'AI',
  postLikes: 1500,
  postComments: 234,
  postUrl: 'https://linkedin.com/feed/update/...'
});
```

### Send Different Log Levels

```typescript
await broadcastLog('Processing keyword...', 'info');
await broadcastLog('Retrying action...', 'warn');
await broadcastLog('Failed to post comment', 'error');
```

### Update Status with Progress

```typescript
await broadcastStatus('Processing keywords', { 
  current: 1, 
  total: 5,
  progress: 20 
});
```

---

## ✅ Summary

**What you get:**
- 🎥 Live browser view on client device
- 📝 Real-time action logs
- 🌍 Works anywhere (worker can be remote)
- 💻 Perfect for demos
- 🚀 Easy to integrate

**Next steps:**
1. Test integration with your worker
2. Deploy to Vercel
3. Set environment variables
4. Test with client device
5. Prepare demo script
6. Wow your client! 🎉

---

**Questions? Check the code comments or test with `npm run worker` locally first!**
