'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Sparkles, Target, TrendingUp, Shield, Zap } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

const features = [
  {
    icon: MessageSquare,
    title: 'Smart Comment Engine',
    description: 'AI analyzes trending posts in your niche and generates contextual, value-adding comments that attract attention.',
    color: 'primary',
    gradient: 'from-primary-500 to-primary-600'
  },
  {
    icon: Sparkles,
    title: 'Auto-Generated Posts',
    description: 'Create thought leadership content automatically based on real trends and your brand voice.',
    color: 'secondary',
    gradient: 'from-secondary-500 to-secondary-600'
  },
  {
    icon: Target,
    title: 'Keyword Targeting',
    description: 'Set your target keywords and topics. The AI finds relevant conversations and engages authentically.',
    color: 'accent',
    gradient: 'from-accent-500 to-accent-600'
  },
  {
    icon: TrendingUp,
    title: 'Borrow Influencer Reach',
    description: 'Comment on high-reach posts to get your brand in front of thousands without paying for ads.',
    color: 'primary',
    gradient: 'from-primary-500 to-primary-600'
  },
  {
    icon: Shield,
    title: 'Human-Like Behavior',
    description: 'Built-in delays, engagement limits, and human emulation to keep your account safe.',
    color: 'success',
    gradient: 'from-success-500 to-success-600'
  },
  {
    icon: Zap,
    title: 'Set It & Forget It',
    description: 'Configure once, then let the AI run 24/7. Monitor performance from your dashboard.',
    color: 'secondary',
    gradient: 'from-secondary-500 to-secondary-600'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Everything You Need to Grow on LinkedIn
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Powerful AI automation that helps you build authority and generate leads
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={item}>
                <div className="h-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:bg-gray-900/70 hover:border-gray-700 transition-all duration-300">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-20 flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-primary-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100 rounded-full px-6 py-3">
            <Zap className="w-5 h-5 text-primary-500" />
            <span className="text-sm font-semibold text-gray-700">
              Join 1,000+ professionals automating their LinkedIn presence
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
