import LiveWorkerViewer from '@/components/dashboard/LiveWorkerViewer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LiveViewerPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Live Worker Viewer
              </h1>
              <p className="text-gray-400">
                Watch the automation in real-time as it searches LinkedIn and posts comments
              </p>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm font-semibold">LIVE</span>
            </div>
          </div>
        </div>

        {/* Live Viewer Component */}
        <LiveWorkerViewer />

        {/* Instructions */}
        <div className="mt-8 bg-gray-800/50 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-300">
            <div>
              <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center mb-3">
                <span className="text-blue-400 font-bold">1</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Live Screenshots</h4>
              <p>See exactly what the automation browser is doing in real-time. Screenshots update every few seconds.</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center mb-3">
                <span className="text-green-400 font-bold">2</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Action Log</h4>
              <p>Every action is logged - searching, scrolling, clicking, posting. Complete transparency.</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center mb-3">
                <span className="text-purple-400 font-bold">3</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Remote Worker</h4>
              <p>Works regardless of where the worker is running - local machine, Render, Railway, or any server.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
