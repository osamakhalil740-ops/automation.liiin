'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Eye, Terminal, Camera, AlertCircle } from 'lucide-react';

interface WorkerEvent {
  type: 'screenshot' | 'action' | 'log' | 'status' | 'error';
  timestamp: string;
  data: {
    message: string;
    screenshot?: string;
    metadata?: Record<string, any>;
  };
}

export default function LiveWorkerViewer() {
  const [events, setEvents] = useState<WorkerEvent[]>([]);
  const [currentScreenshot, setCurrentScreenshot] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Get current user ID from settings
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const data = await response.json();
          setUserId(data.userId);
        }
      } catch (error) {
        console.error('Failed to fetch user ID:', error);
      }
    };
    fetchUserId();
  }, []);

  // Real-time SSE connection for live updates
  useEffect(() => {
    if (!userId) return; // Wait for userId to be loaded

    console.log('🔌 Connecting to SSE stream...');
    
    // Create EventSource for SSE
    const eventSource = new EventSource(`/api/stream?userId=${encodeURIComponent(userId)}`);

    eventSource.onopen = () => {
      console.log('✅ SSE connection established');
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        // Handle different event types
        if (data.type === 'connected') {
          console.log('📡 Connected to live stream');
          return;
        }

        // Add new event to the list
        setEvents((prev) => {
          const updated = [...prev, data];
          // Keep only last 100 events
          return updated.slice(-100);
        });

        // Update screenshot if this is a screenshot event
        if (data.type === 'screenshot' && data.data?.screenshot) {
          setCurrentScreenshot(data.data.screenshot);
        }

      } catch (error) {
        console.error('Error parsing SSE event:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('❌ SSE connection error:', error);
      setIsConnected(false);
      eventSource.close();
    };

    // Cleanup on unmount
    return () => {
      console.log('🔌 Closing SSE connection');
      eventSource.close();
    };
  }, [userId]);

  // Auto-scroll to bottom when new events arrive
  useEffect(() => {
    if (autoScroll && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [events, autoScroll]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'screenshot': return <Camera className="w-4 h-4" />;
      case 'action': return <Activity className="w-4 h-4" />;
      case 'status': return <Eye className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Terminal className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'screenshot': return 'text-blue-400';
      case 'action': return 'text-green-400';
      case 'status': return 'text-purple-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Live Browser View */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
            <h3 className="text-lg font-semibold text-white">Live Browser View</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Camera className="w-4 h-4" />
            <span>Real-time</span>
          </div>
        </div>

        <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
          {currentScreenshot ? (
            <motion.img
              key={currentScreenshot}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={`data:image/jpeg;base64,${currentScreenshot}`}
              alt="Live browser view"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-center text-gray-500">
              <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Waiting for worker activity...</p>
              <p className="text-xs mt-1">Screenshots will appear here when automation starts</p>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
            {isConnected ? 'Live connected' : 'Disconnected'}
          </span>
          <span>{events.length} events captured</span>
        </div>
      </div>

      {/* Live Action Log */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-white">Live Action Log</h3>
          </div>
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`text-xs px-3 py-1 rounded-lg transition-colors ${
              autoScroll 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-gray-700 text-gray-400 border border-gray-600'
            }`}
          >
            Auto-scroll: {autoScroll ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 h-96 overflow-y-auto font-mono text-sm">
          {events.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Terminal className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No activity yet</p>
                <p className="text-xs mt-1">Logs will appear when worker starts</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {events.map((event, index) => (
                  <motion.div
                    key={`${event.timestamp}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-2 text-xs"
                  >
                    <span className="text-gray-600 flex-shrink-0">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                    <span className={`flex-shrink-0 ${getEventColor(event.type)}`}>
                      {getEventIcon(event.type)}
                    </span>
                    <span className="text-gray-300 flex-1">
                      {event.data.message}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={logsEndRef} />
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
          <span>Showing last 50 events</span>
          <button
            onClick={async () => {
              if (userId) {
                await fetch(`/api/worker-events?userId=${encodeURIComponent(userId)}`, { method: 'DELETE' });
                setEvents([]);
                setCurrentScreenshot(null);
              }
            }}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            Clear logs
          </button>
        </div>
      </div>
    </div>
  );
}
