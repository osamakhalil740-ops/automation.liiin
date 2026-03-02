'use client';

import React from 'react';

export default function AnimatedMeshBackground() {
  return (
    <>
      {/* TRUE BACKGROUND LAYER - Behind everything */}
      <div className="fixed inset-0 -z-50">
        {/* Animated Gradient Mesh Background */}
        <div className="absolute inset-0 animated-gradient-mesh" />
        
        {/* Cinematic Light Sweep */}
        <div className="absolute inset-0 cinematic-light-sweep" />
        
        {/* Depth Grid Pattern */}
        <div className="absolute inset-0 depth-grid opacity-10" />
      </div>
      
      {/* BLACK OVERLAY - Creates the dark theme on top of animated bg */}
      <div className="fixed inset-0 -z-40 bg-[#0a0a0a]/85 backdrop-blur-[2px]" />
    </>
  );
}
