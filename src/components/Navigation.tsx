import { useState, useEffect } from 'react';
import { List, X } from 'phosphor-react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Code Snippets', href: '#code-snippets' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '#contact' }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.mobile-nav-item',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.1 }
      );
    }
  }, [isOpen]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold neon-text">
            Darshit Shukla
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            className="hidden md:inline-flex px-6 py-2 bg-primary text-primary-foreground rounded-full hover:glow-cyan transition-all duration-300 transform hover:scale-105"
          >
            Hire Me
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-lg">
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="mobile-nav-item text-2xl font-light text-foreground hover:text-primary transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mobile-nav-item px-8 py-3 bg-primary text-primary-foreground rounded-full hover:glow-cyan transition-all duration-300"
              >
                Hire Me
              </a>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 p-2 text-foreground hover:text-primary transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      )}
    </>
  );
};

export default Navigation;
