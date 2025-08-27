import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, GithubLogo, LinkedinLogo, TwitterLogo } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    // Floating particles animation
    gsap.to('.particle', {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.8
    });

    gsap.to('.particle', {
      x: 15,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 1.2
    });

    // Footer fade in animation
    gsap.fromTo(footerRef.current,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );

  }, []);

  return (
    <footer ref={footerRef} className="relative py-16 border-t border-border/30 overflow-hidden">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="particle absolute top-1/4 left-1/6 w-2 h-2 bg-primary/20 rounded-full blur-sm"></div>
        <div className="particle absolute top-1/2 left-1/3 w-3 h-3 bg-secondary/20 rounded-full blur-sm"></div>
        <div className="particle absolute top-1/3 right-1/4 w-2 h-2 bg-accent/20 rounded-full blur-sm"></div>
        <div className="particle absolute bottom-1/3 left-1/2 w-4 h-4 bg-primary/10 rounded-full blur-md"></div>
        <div className="particle absolute top-2/3 right-1/3 w-2 h-2 bg-secondary/20 rounded-full blur-sm"></div>
        <div className="particle absolute bottom-1/4 right-1/6 w-3 h-3 bg-accent/15 rounded-full blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold neon-text mb-2">Darshit</h3>
            <p className="text-muted-foreground text-sm">
            Creating with code • Small details matter
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center">
            <nav className="flex space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end space-x-4">
            <a
              href="#"
              className="p-2 text-muted-foreground hover:text-primary hover:glow-cyan transition-all duration-300 transform hover:scale-110"
            >
              <GithubLogo size={20} />
            </a>
            <a
              href="#"
              className="p-2 text-muted-foreground hover:text-primary hover:glow-cyan transition-all duration-300 transform hover:scale-110"
            >
              <LinkedinLogo size={20} />
            </a>
            <a
              href="#"
              className="p-2 text-muted-foreground hover:text-primary hover:glow-cyan transition-all duration-300 transform hover:scale-110"
            >
              <TwitterLogo size={20} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/30 mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center space-x-1">
            <span>© 2024 Darshit Shukla </span>
           {/*  <Heart size={16} className="text-red-500 animate-pulse" />
            <span>using React & GSAP</span> */}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
