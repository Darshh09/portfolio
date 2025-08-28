import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import SplineScene from './SplineScene';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Senior Software Engineer",
    "Co-founder of BrotherhoodBytes",
    "Full-Stack Developer",
    "Open Source Contributor",
    "Freelance Developer"
  ];
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate hero content
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.4'
    )
    .fromTo(splineRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: 'power2.out' },
      '-=1'
    );

    // Floating background orbs
    gsap.to('.glow-orb', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5
    });

  }, []);

  // Typing animation effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];

    if (!isDeleting && currentText !== currentRole) {
      // Typing
      const timeout = setTimeout(() => {
        setCurrentText(currentRole.slice(0, currentText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentText !== '') {
      // Deleting
      const timeout = setTimeout(() => {
        setCurrentText(currentText.slice(0, -1));
      }, 50);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && currentText === currentRole) {
      // Finished typing, wait then start deleting
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentText === '') {
      // Finished deleting, move to next role
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }
  }, [currentText, isDeleting, currentRoleIndex, roles]);

  const handleCTAHover = () => {
    gsap.to(ctaRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleCTALeave = () => {
    gsap.to(ctaRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
        <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spline 3D Scene */}
      <SplineScene />

      {/* Centered Hero Content */}
      <div className="relative z-30 w-full max-w-4xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center min-h-screen py-8">
          {/* Professional Introduction */}
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-base md:text-lg lg:text-xl font-medium text-white/80 mb-6 tracking-wide"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Creating with code • Small details matter
            </span>
          </motion.div>

          {/* Main Name with Particles */}
          <div className="relative mb-6">
            {/* Particle effects */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
              {Array.from({ length: 15 }, (_, i) => (
                <motion.div
                  key={`spark-${i}`}
                  className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full opacity-80"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, 10, 0],
                    y: [0, -15, 0],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 1.5,
                    repeat: Infinity,
                    delay: Math.random() * 1.5,
                  }}
                />
              ))}
            </div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: -40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.68, -0.55, 0.265, 1.55] }}
              className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_20px_rgba(0,255,255,0.6)] relative z-30 text-shadow-lg whitespace-nowrap"
            >
              Darshit Shukla
            </motion.h1>
          </div>


          {/* Typing Animation Title */}
          <div className="mt-8 mb-8 h-10 md:h-12 flex items-center justify-center">
            <div className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/95">
              <span className="inline-flex items-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 font-bold">
                  {currentText}
                </span>
                <span className="ml-1 text-blue-400 animate-pulse">|</span>
              </span>
            </div>
          </div>



                    {/* Professional Description */}
          <motion.div
            ref={subtitleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl text-white/90 mb-10 md:mb-16 max-w-4xl mx-auto leading-relaxed font-medium px-4"
          >
            <p className="mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">
                Transforming ideas into exceptional digital solutions
              </span>
            </p>
            <p className="text-white/80 font-normal text-base md:text-lg">
              Specializing in scalable web applications, modern architectures, and innovative user experiences.
              <br className="hidden md:block" />
              From startups to enterprise solutions, I deliver excellence in every line of code.
            </p>
          </motion.div>

          {/* Professional CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-4 md:gap-6"
          >
            <a
              ref={ctaRef}
              href="#contact"
              onMouseEnter={handleCTAHover}
              onMouseLeave={handleCTALeave}
              className="group galactic-button inline-flex items-center px-8 md:px-10 py-4 md:py-5 text-white rounded-full font-semibold text-lg md:text-xl"
            >
              <span>Start a Project</span>
              <svg className="ml-3 w-5 md:w-6 h-5 md:h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            <a
              href="#projects"
              className="group inline-flex items-center px-6 md:px-8 py-3 md:py-4 text-white/80 hover:text-white rounded-full font-medium text-base md:text-lg border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              <span>View Work</span>
              <svg className="ml-2 w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a
              href="/resume.pdf"
              download="Darshit_Resume.pdf"
              className="group inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 hover:text-cyan-200 rounded-full font-medium text-base md:text-lg border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300 hover:from-cyan-500/30 hover:to-blue-600/30 backdrop-blur-sm"
            >
              <svg className="mr-2 w-4 md:w-5 h-4 md:h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Resume</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
