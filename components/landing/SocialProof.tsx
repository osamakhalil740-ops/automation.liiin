'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechFlow',
    content: 'Nexora transformed my LinkedIn presence. 3x more engagement in just 2 weeks without lifting a finger.',
    rating: 5,
    image: null
  },
  {
    name: 'Michael Rodriguez',
    role: 'Founder & CEO',
    company: 'GrowthLabs',
    content: 'The ROI is incredible. Our lead generation increased by 250% while I focus on closing deals.',
    rating: 5,
    image: null
  },
  {
    name: 'Emily Watson',
    role: 'VP of Sales',
    company: 'SaaS Corp',
    content: 'Smart automation that actually works. My network grew by 500+ quality connections in 30 days.',
    rating: 5,
    image: null
  }
];

export default function SocialProof() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Trusted by Professionals
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Join thousands growing their LinkedIn presence on autopilot
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div className="h-full bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-8 hover:bg-zinc-900/60 hover:border-amber-900/30 transition-all duration-300 backdrop-blur-sm">
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-amber-500/20 mb-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-zinc-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  {/* Avatar Placeholder */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  
                  <div>
                    <div className="font-semibold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-zinc-500">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-8 text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 border-2 border-zinc-900 flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium">10,000+ happy users</span>
            </div>
            <span className="text-zinc-600">•</span>
            <span className="text-sm font-medium">4.9/5 average rating</span>
            <span className="text-zinc-600">•</span>
            <span className="text-sm font-medium">2M+ comments posted</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
