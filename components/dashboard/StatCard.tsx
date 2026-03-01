'use client';

import React from 'react';
import { motion } from 'motion/react';
import Card from '@/components/ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconColor?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'gray';
  trend?: string;
  trendUp?: boolean;
  maxValue?: number;
  showProgress?: boolean;
  delay?: number;
}

const iconColorClasses = {
  primary: 'bg-primary-50 text-primary-600',
  secondary: 'bg-secondary-50 text-secondary-600',
  accent: 'bg-accent-50 text-accent-600',
  success: 'bg-success-50 text-success-600',
  warning: 'bg-warning-50 text-warning-600',
  gray: 'bg-gray-50 text-gray-600'
};

const progressColorClasses = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  accent: 'bg-accent-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  gray: 'bg-gray-500'
};

export default function StatCard({
  title,
  value,
  icon,
  iconColor = 'primary',
  trend,
  trendUp,
  maxValue,
  showProgress = false,
  delay = 0
}: StatCardProps) {
  const progressPercentage = maxValue 
    ? Math.min(100, (Number(value) / maxValue) * 100) 
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card hover className="h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-extrabold text-gray-900">
                {value}
              </h3>
              {maxValue && (
                <span className="text-xl font-medium text-gray-400">
                  / {maxValue}
                </span>
              )}
            </div>
            
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <span className={`text-sm font-semibold ${
                  trendUp ? 'text-success-600' : 'text-error-600'
                }`}>
                  {trendUp ? '↑' : '↓'} {trend}
                </span>
                <span className="text-xs text-gray-500">from last week</span>
              </div>
            )}
          </div>
          
          <div className={`p-3 rounded-2xl flex-shrink-0 ${iconColorClasses[iconColor]}`}>
            {icon}
          </div>
        </div>

        {showProgress && maxValue && (
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
              className={`h-full rounded-full ${progressColorClasses[iconColor]}`}
            />
          </div>
        )}
      </Card>
    </motion.div>
  );
}
