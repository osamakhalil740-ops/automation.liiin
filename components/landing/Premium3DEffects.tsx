'use client';

import React from 'react';
import { motion } from 'motion/react';

export default function Premium3DEffects() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Ambient Gradient Orbs - 3D floating effect */}
      <motion.div
        className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 120, 0],
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-[600px] h-[600px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 100, -60, 0],
          scale: [1, 1.2, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(217, 119, 6, 0.3) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
        animate={{
          x: [0, 60, -80, 0],
          y: [0, -100, 50, 0],
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
      
      {/* Particle System - Premium floating particles */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 10px rgba(251, 191, 36, 0.5)',
          }}
          animate={{
            y: [0, -150, -300],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 10,
          }}
        />
      ))}
      
      {/* Larger Ambient Particles with Glow */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`glow-particle-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, transparent 70%)',
            filter: 'blur(3px)',
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, 50, 0],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Abstract Shapes - 3D effect */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 opacity-5"
        style={{
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(217, 119, 6, 0.2))',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          filter: 'blur(20px)',
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-40 h-40 opacity-5"
        style={{
          background: 'linear-gradient(225deg, rgba(245, 158, 11, 0.25), rgba(251, 191, 36, 0.15))',
          borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
          filter: 'blur(25px)',
        }}
        animate={{
          rotate: [360, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Subtle Wave Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 0,200 Q 250,150 500,200 T 1000,200 T 1500,200 T 2000,200"
          stroke="url(#wave-gradient)"
          strokeWidth="2"
          fill="none"
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
          strokeWidth="1.5"
          fill="none"
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
      
      {/* Radial gradient overlay to blend with black */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#0a0a0a]/30 to-[#0a0a0a]" />
    </div>
  );
}
