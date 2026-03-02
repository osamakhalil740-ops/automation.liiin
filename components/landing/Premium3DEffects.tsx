'use client';

import React from 'react';
import { motion } from 'motion/react';

export default function Premium3DEffects() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* HIGHLY VISIBLE Ambient Gradient Orbs - 3D floating effect */}
      
      {/* Large Amber Orb - TOP LEFT - VERY VISIBLE */}
      <motion.div
        className="absolute -top-32 -left-32 w-[800px] h-[800px] rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.7) 0%, rgba(245, 158, 11, 0.4) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 150, -100, 0],
          y: [0, -100, 150, 0],
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Large Amber Orb - BOTTOM RIGHT - VERY VISIBLE */}
      <motion.div
        className="absolute -bottom-32 -right-32 w-[900px] h-[900px] rounded-full opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.65) 0%, rgba(217, 119, 6, 0.4) 40%, transparent 70%)',
          filter: 'blur(90px)',
        }}
        animate={{
          x: [0, -150, 100, 0],
          y: [0, 120, -80, 0],
          scale: [1, 1.25, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
      
      {/* Center Ambient Glow - VISIBLE */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, rgba(217, 119, 6, 0.3) 40%, transparent 70%)',
          filter: 'blur(100px)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          x: [0, 80, -100, 0],
          y: [0, -120, 70, 0],
          scale: [1, 1.4, 0.95, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
      />
      
      {/* Additional Accent Orbs - VISIBLE */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 90, -70, 0],
          scale: [1, 1.2, 1, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 7,
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-[650px] h-[650px] rounded-full opacity-28"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.55) 0%, transparent 70%)',
          filter: 'blur(75px)',
        }}
        animate={{
          x: [0, 100, -90, 0],
          y: [0, -80, 100, 0],
          scale: [1, 1.3, 1.05, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 12,
        }}
      />
      
      {/* VISIBLE Light Beams / Rays */}
      <motion.div
        className="absolute top-0 left-1/4 w-[2px] h-full opacity-20"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(251, 191, 36, 0.6) 50%, transparent 100%)',
          filter: 'blur(2px)',
        }}
        animate={{
          opacity: [0.1, 0.25, 0.1],
          scaleY: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-0 right-1/3 w-[2px] h-full opacity-15"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(245, 158, 11, 0.5) 50%, transparent 100%)',
          filter: 'blur(2px)',
        }}
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scaleY: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      
      {/* VISIBLE Floating Particles - Larger and Brighter */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-amber-400/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 15px rgba(251, 191, 36, 0.8)',
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -200, -400],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 10,
          }}
        />
      ))}
      
      {/* VISIBLE Glow Particles - Much Brighter */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`glow-particle-${i}`}
          className="absolute w-4 h-4 rounded-full"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, rgba(245, 158, 11, 0.4) 50%, transparent 80%)',
            filter: 'blur(4px)',
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.6)',
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 60, 0],
            scale: [1, 2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* VISIBLE Abstract Shapes - 3D effect */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-48 h-48 opacity-20"
        style={{
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.5), rgba(217, 119, 6, 0.3))',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          filter: 'blur(30px)',
          boxShadow: '0 0 60px rgba(251, 191, 36, 0.3)',
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-56 h-56 opacity-18"
        style={{
          background: 'linear-gradient(225deg, rgba(245, 158, 11, 0.45), rgba(251, 191, 36, 0.3))',
          borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
          filter: 'blur(35px)',
          boxShadow: '0 0 70px rgba(245, 158, 11, 0.3)',
        }}
        animate={{
          rotate: [360, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Glass-like Light Movement */}
      <motion.div
        className="absolute top-1/3 left-1/2 w-64 h-64 opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -80, 80, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* VISIBLE Wave Lines with Glow */}
      <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.6" />
          </linearGradient>
          <filter id="wave-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d="M 0,200 Q 250,150 500,200 T 1000,200 T 1500,200 T 2000,200"
          stroke="url(#wave-gradient)"
          strokeWidth="3"
          fill="none"
          filter="url(#wave-glow)"
          animate={{
            d: [
              "M 0,200 Q 250,150 500,200 T 1000,200 T 1500,200 T 2000,200",
              "M 0,200 Q 250,250 500,200 T 1000,200 T 1500,200 T 2000,200",
              "M 0,200 Q 250,150 500,200 T 1000,200 T 1500,200 T 2000,200",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M 0,400 Q 300,350 600,400 T 1200,400 T 1800,400 T 2400,400"
          stroke="url(#wave-gradient)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#wave-glow)"
          animate={{
            d: [
              "M 0,400 Q 300,350 600,400 T 1200,400 T 1800,400 T 2400,400",
              "M 0,400 Q 300,450 600,400 T 1200,400 T 1800,400 T 2400,400",
              "M 0,400 Q 300,350 600,400 T 1200,400 T 1800,400 T 2400,400",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </svg>
      
      {/* Subtle radial gradient overlay - Less aggressive to show effects */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#0a0a0a]/10 to-[#0a0a0a]/60" />
    </div>
  );
}
