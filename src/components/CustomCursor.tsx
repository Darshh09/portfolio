import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Detect interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractiveElement =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||qaseasdasdasd
        target.closest('.glass-card') ||
        target.closest('.project-card') ||
        target.closest('.experience-item') ||
        target.classList.contains('cursor-pointer');

      setIsInteractive(!!isInteractiveElement);

      if (isInteractiveElement) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      setIsInteractive(false);
    };

    // Magnetic cursor effect with smooth movement
    const updateCursorPosition = () => {
      setCursorPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1,
        y: prev.y + (mousePosition.y - prev.y) * 0.1
      }));
    };

    const animationFrame = () => {
      updateCursorPosition();
      requestAnimationFrame(animationFrame);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Start magnetic cursor animation
    requestAnimationFrame(animationFrame);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mousePosition]);

  return (
    <>
      {/* Main cursor dot/ring */}
      <div
        className="fixed pointer-events-none z-50 transition-all duration-200 ease-out"
        style={{
          left: cursorPosition.x - (isHovering ? 20 : 4),
          top: cursorPosition.y - (isHovering ? 20 : 4),
          opacity: isVisible ? 1 : 0,
        }}
      >
        {isHovering ? (
          // Ring cursor for interactive elements
          <div className="w-10 h-10 border-2 border-primary rounded-full animate-pulse">
            <div className="w-2 h-2 bg-primary rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        ) : (
          // Dot cursor for normal state
          <div className="w-2 h-2 bg-primary rounded-full shadow-lg"></div>
        )}
      </div>

      {/* Trailing glow effect with ripple */}
      <div
        className="fixed pointer-events-none z-40 transition-all duration-300 ease-out"
        style={{
          left: cursorPosition.x - 25,
          top: cursorPosition.y - 25,
          opacity: isVisible ? (isInteractive ? 0.8 : 0.4) : 0,
        }}
      >
        <div
          className={`rounded-full blur-sm transition-all duration-300 ${
            isInteractive
              ? 'w-14 h-14 bg-gradient-to-r from-primary/50 to-secondary/50'
              : 'w-12 h-12 bg-gradient-to-r from-primary/30 to-secondary/30'
          }`}
        />
      </div>

      {/* Secondary trailing effect */}
      <div
        className="fixed pointer-events-none z-35 transition-all duration-500 ease-out"
        style={{
          left: cursorPosition.x - 30,
          top: cursorPosition.y - 30,
          opacity: isVisible ? (isInteractive ? 0.3 : 0.1) : 0,
        }}
      >
        <div
          className={`rounded-full blur-md transition-all duration-500 ${
            isInteractive
              ? 'w-20 h-20 bg-gradient-to-r from-primary/20 to-secondary/20'
              : 'w-16 h-16 bg-gradient-to-r from-primary/10 to-secondary/10'
          }`}
        />
      </div>

      {/* Outer ring for interactive elements */}
      {isInteractive && (
        <div
          className="fixed pointer-events-none z-30 transition-all duration-500 ease-out"
          style={{
            left: cursorPosition.x - 35,
            top: cursorPosition.y - 35,
            opacity: isVisible ? 0.3 : 0,
          }}
        >
          <div className="w-24 h-24 border border-primary/40 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
        </div>
      )}

      {/* Sparkle effect for interactive elements */}
      {isInteractive && (
        <>
          <div
            className="fixed pointer-events-none z-35 transition-all duration-200 ease-out"
            style={{
              left: cursorPosition.x + 20,
              top: cursorPosition.y - 15,
              opacity: isVisible ? 0.9 : 0,
            }}
          >
            <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
          </div>
          <div
            className="fixed pointer-events-none z-35 transition-all duration-200 ease-out"
            style={{
              left: cursorPosition.x - 15,
              top: cursorPosition.y + 20,
              opacity: isVisible ? 0.7 : 0,
            }}
          >
            <div className="w-1 h-1 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <div
            className="fixed pointer-events-none z-35 transition-all duration-200 ease-out"
            style={{
              left: cursorPosition.x + 10,
              top: cursorPosition.y + 10,
              opacity: isVisible ? 0.5 : 0,
            }}
          >
            <div className="w-0.5 h-0.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </>
      )}
    </>
  );
};

export default CustomCursor;
