import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo, ArrowSquareOut } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "BrotherhoodBytes Platform",
      description: "Complete business management platform for BrotherhoodBytes with client portal, project tracking, and analytics dashboard.",
      image: "/placeholder.svg",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      liveUrl: "https://brotherhoodbytes.com",
      githubUrl: "https://github.com/brotherhoodbytes/platform",
      featured: true
    },
    {
      id: 2,
      title: "E-commerce Solution",
      description: "Modern e-commerce platform with advanced features including AI-powered recommendations and real-time inventory.",
      image: "/placeholder.svg",
      tech: ["Next.js", "TypeScript", "MongoDB", "AWS"],
      liveUrl: "https://example-store.com",
      githubUrl: "https://github.com/darshit/ecommerce",
      featured: true
    },
    {
      id: 3,
      title: "AI Chat Interface",
      description: "Conversational AI platform with real-time responses, sentiment analysis, and multi-language support.",
      image: "/placeholder.svg",
      tech: ["React", "OpenAI", "Socket.io", "Redis"],
      liveUrl: "https://ai-chat-demo.com",
      githubUrl: "https://github.com/darshit/ai-chat",
      featured: true
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Interactive portfolio with 3D elements, smooth animations, and immersive user experience.",
      image: "/placeholder.svg",
      tech: ["React", "GSAP", "Vite"],
      liveUrl: "https://darshitshukla.com",
      githubUrl: "https://github.com/darshit/portfolio",
      featured: false
    },
    {
      id: 5,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates and team collaboration features.",
      image: "/placeholder.svg",
      tech: ["Vue.js", "Firebase", "Vuex", "Tailwind"],
      liveUrl: "https://task-app-demo.com",
      githubUrl: "https://github.com/darshit/task-manager",
      featured: false
    },
    {
      id: 6,
      title: "Weather Dashboard",
      description: "Beautiful weather application with location-based forecasts and interactive weather maps.",
      image: "/placeholder.svg",
      tech: ["React", "OpenWeather API", "Chart.js", "PWA"],
      liveUrl: "https://weather-dashboard.com",
      githubUrl: "https://github.com/darshit/weather-app",
      featured: false
    }
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse'
      }
    });

    // Section title animation
    tl.fromTo('.section-title',
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }
    )
    // Cards stagger animation
    .fromTo('.project-card',
      { opacity: 0, y: 100, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
      '-=0.4'
    );

    // Individual card hover animations
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -15,
          scale: 1.03,
          duration: 0.4,
          ease: 'power2.out'
        });
        gsap.to(card.querySelector('.project-image'), {
          scale: 1.1,
          duration: 0.4,
          ease: 'power2.out'
        });
        gsap.to(card.querySelector('.project-glow'), {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
        gsap.to(card.querySelector('.project-image'), {
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
        gsap.to(card.querySelector('.project-glow'), {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden bg-transparent">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl lg:text-5xl font-bold mb-6">
            Featured{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="section-title text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of innovative projects developed at BrotherhoodBytes and personal ventures,
            demonstrating expertise in modern web technologies and creative problem-solving.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card relative glass-card rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Hover glow effect */}
              <div className="project-glow absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 blur-xl transition-opacity duration-300"></div>

              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-xs font-medium rounded-full">
                    Featured
                  </span>
                </div>
              )}

              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image w-full h-full object-cover transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-primary/20 backdrop-blur-md rounded-full hover:bg-primary/30 transition-all duration-300 hover:scale-110"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowSquareOut size={16} className="text-primary" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-primary/20 backdrop-blur-md rounded-full hover:bg-primary/30 transition-all duration-300 hover:scale-110"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GithubLogo size={16} className="text-primary" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20 hover:bg-primary/20 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary rounded-full border border-primary/30 hover:glow-cyan transition-all duration-300 transform hover:scale-105"
          >
            View All Projects
            <ArrowUpRight size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
