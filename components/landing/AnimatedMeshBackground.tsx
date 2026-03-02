'use client';

import React from 'react';

export default function AnimatedMeshBackground() {
  return (
    <>
      {/* PURE BLACK BASE - NEVER CHANGES */}
      <div className="fixed inset-0 -z-50 bg-[#0a0a0a]" />
      
      {/* SUBTLE WHITE EFFECTS LAYER - Minimal, clean */}
      <div className="fixed inset-0 -z-40 pointer-events-none">
        {/* Animated Network Grid */}
        <div className="absolute inset-0 animated-network-grid" />
        
        {/* Flowing Lines */}
        <div className="absolute inset-0 flowing-lines" />
      </div>
    </>
  );
}
