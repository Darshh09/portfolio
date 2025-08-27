import { useEffect, useRef } from 'react';

const GalacticOrb = () => {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current) return;

      const rect = orbRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (mouseY / rect.height) * 20;
      const rotateY = (mouseX / rect.width) * 20;

      orbRef.current.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-20px)
        scale(1.05)
      `;
    };

    const handleMouseLeave = () => {
      if (!orbRef.current) return;
      orbRef.current.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(-20px)
        scale(1.05)
      `;
    };

    const orb = orbRef.current;
    if (orb) {
      orb.addEventListener('mousemove', handleMouseMove);
      orb.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (orb) {
        orb.removeEventListener('mousemove', handleMouseMove);
        orb.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        ref={orbRef}
        className="galactic-orb pointer-events-auto cursor-pointer transition-transform duration-300"
      >
        {/* Inner glow */}
        <div className="orb-inner-glow"></div>

        {/* Particle layer */}
        <div className="orb-particles"></div>

        {/* Surface highlights */}
        <div className="absolute inset-0 rounded-full">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-sm"></div>
          <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-white/8 rounded-full blur-sm"></div>
          <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-white/12 rounded-full blur-sm"></div>
        </div>

        {/* Ambient light swirls */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `
                conic-gradient(from 0deg,
                  transparent 0deg,
                  rgba(96, 165, 250, 0.3) 90deg,
                  transparent 180deg,
                  rgba(139, 92, 246, 0.2) 270deg,
                  transparent 360deg)
              `,
              animation: 'orb-rotate 15s linear infinite'
            }}
          ></div>
        </div>

        {/* Magnetic particles */}
        <div className="absolute inset-0 rounded-full">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${30 + (i * 8)}%`,
                animation: `twinkle ${2 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalacticOrb;
