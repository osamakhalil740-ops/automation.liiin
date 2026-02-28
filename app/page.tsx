import Link from 'next/link';
import { Bot, MessageSquare, PenTool } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen pt-6 text-zinc-900 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 font-sans">

      {/* Navigation */}
      <nav className="flex justify-between items-center bg-white/80 backdrop-blur-md rounded-full px-8 py-4 shadow-sm border border-gray-100 mb-16">
        <div className="flex items-center gap-2">
          <div className="bg-[#FF6B35] text-white px-3 py-1.5 rounded-l-full font-bold text-xl tracking-tight leading-none">
            Linqin
          </div>
          <div className="bg-gray-100 p-1.5 rounded-full flex items-center justify-center -ml-5 shadow-sm border border-white">
            <Bot size={20} className="text-[#FF6B35]" />
          </div>
        </div>

        <div className="hidden md:flex gap-8 font-medium text-sm text-gray-600">
          <a href="#" className="bg-zinc-900 text-white px-4 py-2 rounded-full hover:bg-zinc-800 transition">How It Works</a>
          <a href="#" className="px-4 py-2 hover:text-zinc-900 transition">Features</a>
          <a href="#" className="px-4 py-2 hover:text-zinc-900 transition">FAQ</a>
          <Link href="/login" className="px-4 py-2 hover:text-zinc-900 transition">Login</Link>
        </div>

        <Link href="/login" className="bg-[#FF6B35] text-white font-semibold px-6 py-2.5 rounded-full hover:bg-[#e5531d] transition shadow-md shadow-orange-500/20">
          Start Free
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="text-center max-w-4xl mx-auto pt-10 pb-20">
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-8 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          <span className="text-sm font-semibold text-gray-600 tracking-wide">Your AI LinkedIn Agent — Always On</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          Stop Chasing Clients.<br />
          <span className="text-[#FF6B35]">Let Them Come to You.</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed font-medium">
          Linqin is your AI agent that <span className="text-zinc-900 font-bold">borrows reach from influencers</span> by commenting on their posts with added value, and <span className="text-zinc-900 font-bold">auto-generates thought leadership posts</span> based on real trends and your brand.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-16 text-gray-500 font-semibold tracking-wide">
          <span className="flex items-center gap-2"><MessageSquare className="text-orange-400" size={20} /> Smart Comments</span>
          <span className="flex items-center gap-2"><PenTool className="text-orange-400" size={20} /> Auto Posts</span>
          <span className="flex items-center gap-2"><Bot className="text-orange-400" size={20} /> Full Autopilot</span>
        </div>

        <Link href="/login" className="inline-block bg-zinc-900 text-white font-bold text-lg px-8 py-4 rounded-2xl hover:bg-zinc-800 hover:-translate-y-1 transition-all shadow-xl shadow-zinc-900/20">
          Get Started for Free
        </Link>
        <p className="text-sm text-gray-500 mt-4 font-medium">No credit card required. Setup in 2 minutes.</p>
      </main>

      {/* Feature / Mockup Container */}
      <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 p-6 md:p-12 mb-32 border border-gray-100 flex items-center justify-center min-h-[400px]">
        <div className="space-y-6 w-full max-w-2xl text-left bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-zinc-200"></div>
              <div>
                <div className="h-4 w-32 bg-zinc-200 rounded mb-2"></div>
                <div className="h-3 w-24 bg-zinc-100 rounded"></div>
              </div>
            </div>
            <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Bot size={12} /> AI Agent Active
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-3 w-full bg-zinc-200 rounded"></div>
            <div className="h-3 w-4/5 bg-zinc-200 rounded"></div>
            <div className="h-3 w-6/12 bg-zinc-200 rounded"></div>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 flex gap-3 mt-6 relative">
            <div className="absolute -left-3 -top-3 bg-[#FF6B35] text-white p-2 rounded-full shadow-md">
              <Bot size={16} />
            </div>
            <div className="pl-4">
              <p className="text-sm font-semibold text-zinc-800">Your Auto-Comment</p>
              <p className="text-sm text-orange-800 mt-1">"This framework completely shifts the paradigm on scalable outreach. Adding intent signals to the top of funnel changes everything. Spot on."</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
