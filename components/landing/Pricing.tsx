'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Crown, Rocket } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    price: '29',
    period: '/month',
    description: 'Perfect for professionals starting their LinkedIn journey',
    features: [
      '50 comments per day',
      '2 keyword searches',
      'Basic analytics',
      'Email support',
      'Auto-engagement',
    ],
    popular: false,
    cta: 'Start Free Trial'
  },
  {
    name: 'Professional',
    icon: Crown,
    price: '79',
    period: '/month',
    description: 'For serious professionals scaling their presence',
    features: [
      '200 comments per day',
      'Unlimited keyword searches',
      'Advanced analytics & insights',
      'Priority support',
      'Custom comment templates',
      'Lead tracking',
      'Performance reports',
    ],
    popular: true,
    cta: 'Start Free Trial'
  },
  {
    name: 'Enterprise',
    icon: Rocket,
    price: '199',
    period: '/month',
    description: 'Maximum power for teams and agencies',
    features: [
      'Unlimited comments',
      'Unlimited keywords',
      'White-label reports',
      'Dedicated account manager',
      'API access',
      'Custom integrations',
      'Team collaboration',
      'SLA guarantee',
    ],
    popular: false,
    cta: 'Contact Sales'
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-32 px-4 overflow-hidden">
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
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Choose the plan that fits your growth goals. All plans include a 14-day free trial.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Card */}
                <div className={`h-full rounded-2xl p-8 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-2 border-amber-500/30 shadow-xl shadow-amber-900/20'
                    : 'bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-900/60 hover:border-zinc-700/50'
                } backdrop-blur-sm`}>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/20 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-amber-500" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-white">
                        ${plan.price}
                      </span>
                      <span className="text-zinc-500">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href="/login" className="block mb-6">
                    <button className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white shadow-lg shadow-amber-900/30 hover:shadow-xl hover:shadow-amber-900/50'
                        : 'bg-zinc-800/80 hover:bg-zinc-700/80 text-white border border-zinc-700/50 hover:border-amber-500/30'
                    }`}>
                      {plan.cta}
                    </button>
                  </Link>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="text-zinc-300 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-zinc-400">
            <span className="font-semibold text-white">30-day money-back guarantee.</span> No questions asked.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
