import { useEffect, useState } from 'react';

const GalacticCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

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

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractiveElement =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.galactic-button') ||
        target.closest('.galactic-badge') ||
        target.classList.contains('cursor-pointer');

      setIsHovering(!!isInteractiveElement);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    // Smooth cursor movement
    const updateCursorPosition = () => {
      setCursorPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.15,
        y: prev.y + (mousePosition.y - prev.y) * 0.15
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
        className="custom-cursor"
        style={{
          left: cursorPosition.x - (isHovering ? 16 : 4),
          top: cursorPosition.y - (isHovering ? 16 : 4),
          opacity: isVisible ? 1 : 0,
        }}
      >
        {isHovering ? (
          <div className="cursor-ring"></div>
        ) : (
          <div className="cursor-dot"></div>
        )}
      </div>

      {/* Glow trail */}
      <div
        className="custom-cursor"
        style={{
          left: cursorPosition.x - 24,
          top: cursorPosition.y - 24,
          opacity: isVisible ? (isHovering ? 0.8 : 0.4) : 0,
        }}
      >
        <div className="cursor-glow"></div>
      </div>

      {/* Secondary trail */}
      <div
        className="custom-cursor"
        style={{
          left: cursorPosition.x - 32,
          top: cursorPosition.y - 32,
          opacity: isVisible ? (isHovering ? 0.3 : 0.1) : 0,
        }}
      >
        <div
          className="cursor-glow"
          style={{
            width: '64px',
            height: '64px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)'
          }}
        ></div>
      </div>
    </>
  );
};

export default GalacticCursor;
