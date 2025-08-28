import { useState, useEffect } from 'react';
import { List, X } from 'phosphor-react';
import { gsap } from 'gsap';
import { Link, useLocation } from 'react-router-dom';
import { useNavigation } from '../contexts/NavigationContext';
import { useActiveSection } from '../hooks/useActiveSection';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isCommandPaletteOpen } = useNavigation();
  const activeSection = useActiveSection();

      const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();

    // If we're not on the home page, navigate to home with hash
    if (location.pathname !== '/') {
      // Store the hash in sessionStorage to scroll after navigation
      sessionStorage.setItem('scrollToHash', hash);
      window.location.href = `/${hash}`;
      return;
    }

    // If we're on home page, scroll to section
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
  };

  const navItems = [
    { name: 'Home', href: '/', isActive: location.pathname === '/' && activeSection === 'home' && !isCommandPaletteOpen },
    { name: 'About', href: '#about', isActive: location.pathname === '/' && activeSection === 'about' && !isCommandPaletteOpen },
    { name: 'Experience', href: '#experience', isActive: location.pathname === '/' && activeSection === 'experience' && !isCommandPaletteOpen },
    { name: 'Skills', href: '#skills', isActive: location.pathname === '/' && activeSection === 'skills' && !isCommandPaletteOpen },
    { name: 'Projects', href: '/projects', isActive: location.pathname === '/projects' && !isCommandPaletteOpen },
    { name: 'Code Snippets', href: '#code-snippets', isActive: location.pathname === '/' && activeSection === 'code-snippets' && !isCommandPaletteOpen },
    { name: 'Blog', href: '/blog', isActive: location.pathname === '/blog' && !isCommandPaletteOpen },
    { name: 'Analytics', href: '/blog/analytics', isActive: location.pathname === '/blog/analytics' && !isCommandPaletteOpen },
    { name: 'Contact', href: '#contact', isActive: location.pathname === '/' && activeSection === 'contact' && !isCommandPaletteOpen }
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

  // Handle scroll to hash after navigation from other pages
  useEffect(() => {
    if (location.pathname === '/') {
      const scrollToHash = sessionStorage.getItem('scrollToHash');
      if (scrollToHash) {
        // Clear the stored hash
        sessionStorage.removeItem('scrollToHash');

        // Wait for the page to fully load, then scroll
        setTimeout(() => {
          const element = document.querySelector(scrollToHash);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100);
      }
    }
  }, [location.pathname]);

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
            {navItems.map((item) => {
              // Handle hash links for home page sections
              if (item.href.startsWith('#')) {
                const hash = item.href; // Keep the hash as is
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleHashClick(e, hash)}
                    className={`text-foreground hover:text-primary transition-colors duration-300 relative group ${
                      item.isActive ? 'text-primary' : ''
                    }`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      item.isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </a>
                );
              }

              // Handle route links for separate pages
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-foreground hover:text-primary transition-colors duration-300 relative group ${
                    item.isActive ? 'text-primary' : ''
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    item.isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            onClick={(e) => handleHashClick(e, 'contact')}
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
              {navItems.map((item, index) => {
                // Handle hash links for home page sections
                if (item.href.startsWith('#')) {
                  const hash = item.href; // Keep the hash as is
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleHashClick(e, hash)}
                      className="mobile-nav-item text-2xl font-light text-foreground hover:text-primary transition-colors duration-300"
                    >
                      {item.name}
                    </a>
                  );
                }

                // Handle route links for separate pages
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="mobile-nav-item text-2xl font-light text-foreground hover:text-primary transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                );
              })}
              <a
                href="#contact"
                onClick={(e) => handleHashClick(e, 'contact')}
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
