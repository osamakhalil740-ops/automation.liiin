'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-[#0a0a0f] to-[#0a0a0f] -z-10" />
      
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Main Headline - Moderate size, centered */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-white"
        >
          Automate Your LinkedIn Presence
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Let AI handle your LinkedIn engagement while you focus on what matters. 
          Intelligent commenting, auto-generated posts, and 24/7 presence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link href="/login">
            <button className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg shadow-primary-500/20">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-200 border border-gray-700">
            Watch Demo
          </button>
        </motion.div>

        {/* Feature List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 text-sm text-gray-400"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary-500" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary-500" />
            <span>Setup in 2 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary-500" />
            <span>Cancel anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
