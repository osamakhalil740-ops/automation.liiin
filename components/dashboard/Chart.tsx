'use client';

import React from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { TrendingUp } from 'lucide-react';

interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

interface ChartProps {
  data: ChartDataPoint[];
  title?: string;
  description?: string;
  dataKey?: string;
  type?: 'line' | 'area';
  color?: string;
  height?: number;
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3">
        <p className="text-xs font-bold text-gray-900 mb-1">{label}</p>
        <p className="text-sm font-semibold text-primary-600">
          {payload[0].value} comments
        </p>
      </div>
    );
  }
  return null;
};

export default function Chart({
  data,
  title = 'Weekly Activity',
  description = 'Comments and engagement over time',
  dataKey = 'value',
  type = 'area',
  color = '#ff6b35',
  height = 300
}: ChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-500" />
              <CardTitle>{title}</CardTitle>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-900 text-white">
                7 Days
              </button>
              <button className="px-3 py-1.5 text-xs font-semibold rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                30 Days
              </button>
            </div>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <ResponsiveContainer width="100%" height={height}>
            {type === 'area' ? (
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                <XAxis 
                  dataKey="name" 
                  stroke="#78716c"
                  style={{ fontSize: '12px', fontWeight: 600 }}
                />
                <YAxis 
                  stroke="#78716c"
                  style={{ fontSize: '12px', fontWeight: 600 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey={dataKey}
                  stroke={color}
                  strokeWidth={3}
                  fill="url(#colorValue)"
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
              </AreaChart>
            ) : (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                <XAxis 
                  dataKey="name" 
                  stroke="#78716c"
                  style={{ fontSize: '12px', fontWeight: 600 }}
                />
                <YAxis 
                  stroke="#78716c"
                  style={{ fontSize: '12px', fontWeight: 600 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey={dataKey}
                  stroke={color}
                  strokeWidth={3}
                  dot={{ fill: color, r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
