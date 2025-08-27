import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate text entrance
    tl.fromTo(textRef.current,
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }
    )
    // Animate progress bar
    .to(progressBarRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out",
    }, "-=0.3")
    // Exit animation
    .to([textRef.current, progressBarRef.current?.parentElement], {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: "power2.in"
    }, "+=0.3")
    .to(preloaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: "power2.in",
      onComplete: () => {
        onComplete();
      }
    }, "-=0.2");

  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-xl float"></div>
        <div className="absolute top-2/3 right-1/4 w-24 h-24 bg-secondary/20 rounded-full blur-xl float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-40 h-40 bg-accent/10 rounded-full blur-xl float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Logo/Text */}
      <div ref={textRef} className="text-center mb-8">
        <h1 className="text-6xl md:text-8xl font-bold neon-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Darshit Shukla
        </h1>
        <p className="text-lg text-muted-foreground mt-2 tracking-wider">Web Developer</p>
      </div>

      {/* Progress Bar Container */}
      <div className="w-64 md:w-80 h-1 bg-muted rounded-full overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full glow-cyan"
          style={{ width: '0%' }}
        />
      </div>

      {/* Loading text */}
      <p className="text-sm text-muted-foreground mt-4 tracking-widest">LOADING EXPERIENCE</p>
    </div>
  );
};

export default LoadingScreen;
