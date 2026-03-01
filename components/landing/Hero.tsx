'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Check, Sparkles, Zap, TrendingUp } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Premium Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#0a0514] to-[#0a0a0f] -z-10" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 -left-48 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="max-w-5xl mx-auto text-center">
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-gray-300">
              AI-Powered LinkedIn Automation
            </span>
            <Zap className="w-4 h-4 text-secondary-400" />
          </motion.div>

          {/* Premium Headline with Gradient Text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-8"
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Dominate LinkedIn
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent animate-gradient">
              While You Sleep
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Let AI handle your LinkedIn engagement 24/7. Intelligent commenting, 
            auto-generated posts, and influencer reach—all on <span className="text-white font-medium">autopilot</span>.
          </motion.p>

          {/* Premium CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-2xl shadow-primary-500/30 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <span className="relative text-lg">Get Started Free</span>
                <ArrowRight className="w-6 h-6 relative group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all duration-300 border-2 border-white/10 hover:border-white/20 backdrop-blur-sm text-lg"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Premium Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 text-sm"
          >
            {[
              { icon: Check, text: 'No credit card required', color: 'text-success-400' },
              { icon: Zap, text: 'Setup in 60 seconds', color: 'text-primary-400' },
              { icon: TrendingUp, text: 'Join 1,000+ professionals', color: 'text-secondary-400' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-gray-300 font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: '10K+', label: 'Comments Posted', delay: 0.1 },
              { value: '500+', label: 'Active Users', delay: 0.2 },
              { value: '2M+', label: 'Reach Generated', delay: 0.3 },
              { value: '99.9%', label: 'Uptime', delay: 0.4 },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: stat.delay }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
