"use client";

import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';

const SplineScene = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const splineRef = useRef<any>(null);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`absolute inset-0 flex h-full w-full items-center justify-center transition-all duration-500 ${
        isHovered ? 'opacity-70 scale-105' : 'opacity-40 scale-100'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative mx-auto h-[600px] md:h-[800px] lg:h-[1000px] xl:h-[1200px] w-full max-w-none overflow-hidden">
        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-blue-400 text-sm">Loading 3D Scene...</p>
            </div>
          </div>
        )}

        {/* Spline Scene */}
        <div className="h-full w-full">
          <Spline
            ref={splineRef}
            scene="https://prod.spline.design/YFsWF6CChRLgzc99/scene.splinecode"
            onLoad={handleLoad}
          />
        </div>

        {/* Interactive overlay */}
        <div className="absolute inset-0 z-30 pointer-events-auto cursor-grab active:cursor-grabbing" />

        {/* Bottom gradient fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-60 w-full select-none bg-gradient-to-b from-transparent to-slate-900/80" />

        {/* Visual feedback */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {isHovered && (
            <div className="absolute top-4 left-4 text-xs text-blue-400/80 bg-black/10 px-3 py-2 rounded-lg backdrop-blur-sm border border-blue-400/20 animate-pulse">
              ✨ Interactive Background
            </div>
          )}

          <div className="absolute bottom-4 right-4 text-xs text-white/40 bg-black/5 px-2 py-1 rounded backdrop-blur-sm">
            Drag to explore
          </div>

          {/* Center indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className={`w-1 h-1 bg-blue-400/50 rounded-full animate-ping ${isHovered ? 'opacity-80' : 'opacity-20'}`} />
          </div>
        </div>

        {/* Ambient glow */}
        <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
          isHovered
            ? 'bg-gradient-radial from-blue-500/8 via-transparent to-transparent'
            : 'bg-gradient-radial from-blue-500/3 via-transparent to-transparent'
        }`} />
      </div>
    </div>
  );
};

export default SplineScene;
