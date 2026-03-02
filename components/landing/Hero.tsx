'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Premium Animated Background */}
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Premium Headline - Clean, Confident */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-white"
          >
            Automate Your LinkedIn
            <br />
            <span className="text-zinc-400">Growth on Autopilot</span>
          </motion.h1>

          {/* Refined Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl text-zinc-400 mb-16 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Professional AI-powered engagement that builds your presence, generates leads, 
            and grows your network—while you focus on what matters.
          </motion.p>

          {/* Premium CTA Buttons - Refined Accent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link href="/login">
              <button className="group px-10 py-4 bg-gradient-to-br from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-amber-900/50 hover:shadow-xl hover:shadow-amber-900/60 hover:scale-[1.02]">
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="px-10 py-4 bg-zinc-900/60 hover:bg-zinc-900/80 text-white font-semibold rounded-xl transition-all duration-300 border border-zinc-700/50 backdrop-blur-sm hover:border-zinc-600/50 hover:shadow-lg">
              Watch Demo
            </button>
          </motion.div>

          {/* Refined Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-center gap-8 text-sm"
          >
            {[
              { text: 'No credit card required' },
              { text: 'Setup in 2 minutes' },
              { text: 'Cancel anytime' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-zinc-500" />
                <span className="text-zinc-500 font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Refined Stats - Minimal & Professional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-24 pt-12 border-t border-zinc-800/50"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { value: '10K+', label: 'Comments Posted' },
                { value: '500+', label: 'Active Users' },
                { value: '2M+', label: 'Reach Generated' },
                { value: '99.9%', label: 'Uptime' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-zinc-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
