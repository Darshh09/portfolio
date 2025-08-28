import { useState, useEffect, useCallback } from 'react';

interface Section {
  id: string;
  name: string;
  element: HTMLElement;
}

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  const handleScroll = useCallback(() => {
    const sections: Section[] = [];

    // Get all sections with IDs
    const sectionIds = ['home', 'about', 'experience', 'skills', 'projects', 'code-snippets', 'contact'];

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        sections.push({ id, name: id, element });
      }
    });

    const scrollPosition = window.scrollY + window.innerHeight / 3; // Offset for better detection

    let currentSection = '';

    // Find which section is currently in view
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const rect = section.element.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionBottom = sectionTop + rect.height;

      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        currentSection = section.id;
        break;
      }
    }

    // If we're at the very top, consider it the home section
    if (window.scrollY < 100) {
      currentSection = 'home';
    }

    if (currentSection !== activeSection) {
      setActiveSection(currentSection);
    }
  }, [activeSection]);

  useEffect(() => {
    // Initial check
    handleScroll();

    // Add scroll listener with throttling
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll]);

  return activeSection;
};
