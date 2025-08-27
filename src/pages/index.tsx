import { useEffect, useRef, lazy, Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GalacticCursor from '@/components/GalacticCursor';
import GalacticBackground from '@/components/GalacticBackground';
import CommandPalette from '@/components/CommandPalette';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import LoadingScreen from '@/components/LoadingScreen';

// Lazy load heavy components
const HeroSection = lazy(() => import('@/components/HeroSection'));
const AboutSection = lazy(() => import('@/components/AboutSection'));
const ExperienceSection = lazy(() => import('@/components/ExperienceSection'));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const BlogSection = lazy(() => import('@/components/BlogSection'));
const StackedCards = lazy(() => import('@/components/StackedCards'));
const CodeSnippetsSection = lazy(() => import('@/components/CodeSnippetsSection'));

// Loading component
const SectionLoader = () => (
  <div className="h-96 flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
  </div>
);

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize smooth scrolling and other global animations
    const initAnimations = () => {
      // Set up smooth scroll behavior
      gsap.registerPlugin(ScrollTrigger);

      // Refresh ScrollTrigger on window resize with debouncing
      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 250);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout);
      };
    };

    initAnimations();
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="galactic-theme min-h-screen">
          <GalacticBackground />
          <GalacticCursor />
          <CommandPalette />
          <PerformanceMonitor />
          <Navigation />
          <main className="relative z-10">
            <section id="home">
              <Suspense fallback={<SectionLoader />}>
                <HeroSection />
              </Suspense>
            </section>

            <section id="about">
              <Suspense fallback={<SectionLoader />}>
                <AboutSection />
              </Suspense>
            </section>

            <section id="experience">
              <Suspense fallback={<SectionLoader />}>
                <ExperienceSection />
              </Suspense>
            </section>

            <section id="skills">
              <Suspense fallback={<SectionLoader />}>
                <StackedCards />
              </Suspense>
            </section>

            <section id="projects">
              <Suspense fallback={<SectionLoader />}>
                <ProjectsSection />
              </Suspense>
            </section>

            <section id="code-snippets">
              <Suspense fallback={<SectionLoader />}>
                <CodeSnippetsSection />
              </Suspense>
            </section>

            <section id="blog">
              <Suspense fallback={<SectionLoader />}>
                <BlogSection />
              </Suspense>
            </section>

            <section id="contact">
              <Suspense fallback={<SectionLoader />}>
                <ContactSection />
              </Suspense>
            </section>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
