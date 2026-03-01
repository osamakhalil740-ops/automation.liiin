'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Sparkles, Target, TrendingUp, Shield, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: MessageSquare,
    title: 'Smart Comment Engine',
    description: 'AI analyzes trending posts in your niche and generates contextual, value-adding comments that attract attention.',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    iconColor: 'text-blue-400'
  },
  {
    icon: Sparkles,
    title: 'Auto-Generated Posts',
    description: 'Create thought leadership content automatically based on real trends and your brand voice.',
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    iconColor: 'text-purple-400'
  },
  {
    icon: Target,
    title: 'Keyword Targeting',
    description: 'Set your target keywords and topics. The AI finds relevant conversations and engages authentically.',
    gradient: 'from-cyan-500 via-teal-500 to-emerald-500',
    iconColor: 'text-cyan-400'
  },
  {
    icon: TrendingUp,
    title: 'Borrow Influencer Reach',
    description: 'Comment on high-reach posts to get your brand in front of thousands without paying for ads.',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    iconColor: 'text-amber-400'
  },
  {
    icon: Shield,
    title: 'Human-Like Behavior',
    description: 'Built-in delays, engagement limits, and human emulation to keep your account safe.',
    gradient: 'from-emerald-500 via-green-500 to-teal-500',
    iconColor: 'text-emerald-400'
  },
  {
    icon: Zap,
    title: 'Set It & Forget It',
    description: 'Configure once, then let the AI run 24/7. Monitor performance from your dashboard.',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    iconColor: 'text-violet-400'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1 }
};

export default function Features() {
  return (
    <section id="features" className="relative py-32 px-4 overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0a14] to-[#0a0a0f] -z-10" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 backdrop-blur-sm">
              <span className="text-sm font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                POWERFUL FEATURES
              </span>
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Everything You Need to
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
              Dominate LinkedIn
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Powerful AI automation that helps you build authority, generate leads, 
            and grow your professional network—all on autopilot
          </p>
        </motion.div>

        {/* Premium Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-150px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index} 
                variants={item}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                {/* Glow Effect on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-opacity duration-500`} />
                
                {/* Card */}
                <div className="relative h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 overflow-hidden">
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon with Gradient Background */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5`}>
                      <div className="w-full h-full rounded-2xl bg-gray-900/90 flex items-center justify-center">
                        <Icon className={`w-7 h-7 ${feature.iconColor}`} />
                      </div>
                    </div>
                    
                    {/* Floating Badge */}
                    <motion.div
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed font-medium">
                    {feature.description}
                  </p>

                  {/* Bottom Gradient Line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Premium CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Glow Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-accent-500/20 blur-3xl -z-10" />
          
          {/* Card */}
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 md:p-16 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
            
            <div className="relative text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <Zap className="w-16 h-16 text-primary-400" />
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                Ready to 10x Your LinkedIn Presence?
              </h3>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join <span className="font-bold text-white">1,000+</span> professionals automating their LinkedIn growth
              </p>
              
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold rounded-2xl transition-all duration-300 flex items-center gap-3 mx-auto shadow-2xl shadow-primary-500/40 text-lg"
                >
                  <span>Start Growing Today</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
