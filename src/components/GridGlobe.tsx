"use client";

import { useEffect, useRef, useState } from "react";
import { World } from "./ui/globe";

export const GridGlobe = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);

  const globeConfig = {
    pointSize: 3,
    globeColor: "#1e293b", // Darker base to blend with background
    showAtmosphere: true,
    atmosphereColor: "#60a5fa", // Light blue atmosphere
    atmosphereAltitude: 0.15, // Moderate atmosphere
    emissive: "#3b82f6", // Blue emissive glow
    emissiveIntensity: 0.2, // Subtle intensity
    shininess: 0.4, // Less shiny for subtlety
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#60a5fa", // Ambient light
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1200, // Slower arc animation for subtlety
    arcLength: 0.8,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.1, // Very slow rotation
  };

  const colors = ["#3b82f6", "#60a5fa", "#8b5cf6", "#a855f7", "#6366f1"];
  const sampleArcs = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -1.303396,
      endLng: 36.852443,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: -15.785493,
      startLng: -47.909029,
      endLat: 36.162809,
      endLng: -115.119411,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: 21.3099,
      startLng: -157.8581,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: -34.6037,
      startLng: -58.3816,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 14.5995,
      startLng: 120.9842,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
  ];

  // Interactive event handlers
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (globeRef.current) {
      const globe = globeRef.current;
      const controls = globe.controls();
      controls.autoRotateSpeed = 0.3; // Speed up rotation on hover
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (globeRef.current) {
      const globe = globeRef.current;
      const controls = globe.controls();
      controls.autoRotateSpeed = 0.1; // Return to normal speed
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
    if (globeRef.current) {
      const globe = globeRef.current;
      const controls = globe.controls();
      controls.autoRotate = false; // Stop auto-rotation when dragging
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (globeRef.current) {
      const globe = globeRef.current;
      const controls = globe.controls();
      controls.autoRotate = true; // Resume auto-rotation
    }
  };

  const handleClick = () => {
    setIsClicked(true);
    // Reset click state after animation
    setTimeout(() => setIsClicked(false), 1000);

    // Add a random rotation effect on click
    if (globeRef.current) {
      const globe = globeRef.current;
      const randomLat = (Math.random() - 0.5) * 180;
      const randomLng = (Math.random() - 0.5) * 360;
      globe.pointOfView({ lat: randomLat, lng: randomLng, altitude: 2 }, 2000);
    }
  };

  // Enhanced globe configuration for interactivity
  const enhancedGlobeConfig = {
    ...globeConfig,
    autoRotateSpeed: isHovered ? 0.3 : 0.1,
    atmosphereAltitude: isHovered ? 0.2 : 0.15,
    emissiveIntensity: isHovered ? 0.4 : 0.2,
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 flex h-full w-full items-center justify-center transition-all duration-500 ${
        isHovered ? 'opacity-80 scale-105' : 'opacity-60 scale-100'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      <div className="relative mx-auto h-[400px] md:h-[500px] lg:h-[600px] w-full max-w-none overflow-hidden">
        {/* Interactive overlay for better mouse control */}
        <div className="absolute inset-0 z-30 pointer-events-auto cursor-grab active:cursor-grabbing" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-40 w-full select-none bg-gradient-to-b from-transparent to-slate-900" />

        <div
          className={`absolute z-10 h-full w-full flex items-center justify-center transition-all duration-700 ${
            isHovered ? 'animate-pulse' : ''
          } ${isClicked ? 'animate-bounce' : ''}`}
          style={{ animationDuration: isHovered ? '2s' : '4s' }}
        >
          <World
            ref={globeRef}
            data={sampleArcs}
            globeConfig={enhancedGlobeConfig}
          />
        </div>

        {/* Interactive controls and hints */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Hover effect indicator */}
          {isHovered && (
            <div className="absolute top-4 left-4 text-xs text-blue-400 bg-black/20 px-3 py-2 rounded-lg backdrop-blur-sm border border-blue-400/30 animate-pulse">
              ✨ Interactive Mode
            </div>
          )}

          {/* Drag hint */}
          {!isDragging && (
            <div className="absolute bottom-4 right-4 text-xs text-white/60 bg-black/10 px-2 py-1 rounded backdrop-blur-sm">
              Drag to rotate • Scroll to zoom
            </div>
          )}

          {/* Loading indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className={`w-2 h-2 bg-blue-400 rounded-full animate-ping ${isHovered ? 'opacity-100' : 'opacity-30'}`} />
          </div>

          {/* Click effect */}
          {isClicked && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-blue-400/50 rounded-full animate-ping" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded-full animate-pulse" />
            </div>
          )}
        </div>

        {/* Ambient glow effect */}
        <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
          isHovered
            ? 'bg-gradient-radial from-blue-500/10 via-transparent to-transparent'
            : 'bg-gradient-radial from-blue-500/5 via-transparent to-transparent'
        }`} />
      </div>
    </div>
  );
};
