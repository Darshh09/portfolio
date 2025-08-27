import { useEffect, useRef } from 'react';

const GalacticBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Remove scroll-based parallax effect to keep background truly fixed
  // The background will now stay completely static while content scrolls over it

  // Generate stars with different sizes and positions
  const generateStars = (count: number, sizeClass: string) => {
    return Array.from({ length: count }, (_, i) => (
      <div
        key={`${sizeClass}-${i}`}
        className={`star ${sizeClass}`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`
        }}
      />
    ));
  };

  return (
    <div ref={containerRef} className="galactic-bg fixed inset-0 w-full h-full z-0 pointer-events-none">
      {/* Nebula layers */}
      <div className="nebula-layer nebula-1"></div>
      <div className="nebula-layer nebula-2"></div>

      {/* Fixed star layers */}
      <div className="star-field parallax-bg">
        {generateStars(50, 'star-small')}
      </div>

      <div className="star-field parallax-bg">
        {generateStars(30, 'star-medium')}
      </div>

      <div className="star-field parallax-bg">
        {generateStars(20, 'star-large')}
      </div>

      {/* Additional ambient particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Subtle cosmic dust */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
    </div>
  );
};

export default GalacticBackground;
