import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Briefcase,
  Calendar,
  MapPin,
  ArrowRight,
  Users,
  Code,
  GithubLogo,
  Star,
  Rocket
} from 'phosphor-react';
import { Button } from './ui/moving-border-button';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      title: 'Co-founder',
      company: 'BrotherhoodBytes',
      period: '2023 - Present',
      location: 'Remote',
      description: 'Leading the development of innovative web applications and digital solutions. Managing client relationships, technical strategy, and team coordination.',
      icon: Users,
      highlights: ['Business development', 'Technical leadership', 'Client management', 'Team coordination', 'Product strategy'],
      featured: true,
      color: 'from-purple-500 to-blue-500'
    },
    {
      title: 'Freelancer',
      company: 'Full-Stack Developer',
      period: '2022 - Present',
      location: 'Remote',
      description: 'Delivering high-quality web applications and digital solutions for diverse clients. Specializing in modern web technologies and responsive design.',
      icon: Code,
      highlights: ['React/Next.js development', 'Node.js backend', 'Database design', 'API development', 'UI/UX implementation'],
      featured: false,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Open Source Contributor',
      company: 'GitHub',
      period: '2021 - Present',
      location: 'Global',
      description: 'Contributing to open-source projects and sharing knowledge with the developer community. Building tools and libraries for the ecosystem.',
      icon: GithubLogo,
      highlights: ['Open source contributions', 'Community engagement', 'Tool development', 'Documentation', 'Code reviews'],
      featured: false,
      color: 'from-gray-600 to-gray-800'
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
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' }
    )
    // Timeline container
    .fromTo(timelineRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )
    // Individual experience items stagger
    .fromTo('.experience-item',
      { opacity: 0, x: -50, scale: 0.9 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.3,
        ease: 'back.out(1.7)'
      },
      '-=0.3'
    );

  }, []);

  return (
             <section id="experience" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden bg-transparent">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl lg:text-5xl font-bold mb-6 text-white"
          >
            Professional{' '}
            <span className="galactic-text">
              Experience
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            My journey from open source contributor to co-founder, showcasing growth,
            leadership, and technical expertise across different roles.
          </p>
        </div>

        {/* Animated Vertical Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-secondary/50 to-primary/50 transform lg:-translate-x-1/2"></div>

          <div className="space-y-16">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className={`experience-item relative flex items-start ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline dot with pulse animation */}
                <div className="absolute left-8 lg:left-1/2 w-4 h-4 bg-gradient-to-r from-primary to-secondary rounded-full border-4 border-background transform lg:-translate-x-1/2 z-10 timeline-dot">
                  {experience.featured && (
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full animate-ping"></div>
                  )}
                </div>

                {/* Content card */}
                <div className={`ml-16 lg:ml-0 lg:w-5/12 ${
                  index % 2 === 0 ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'
                }`}>
                  <div className={`glass-card p-8 rounded-2xl hover:glow-cyan transition-all duration-300 group relative overflow-hidden ${
                    experience.featured ? 'border border-primary/30' : ''
                  }`}>
                    {/* Featured badge */}
                    {experience.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-xs font-medium rounded-full">
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Gradient background overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${experience.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>

                    {/* Header */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 bg-gradient-to-r ${experience.color} bg-opacity-20 rounded-xl group-hover:bg-opacity-30 transition-all duration-300`}>
                            <experience.icon size={28} className="text-primary" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                              {experience.title}
                            </h3>
                            <p className="text-blue-400 font-medium text-lg">{experience.company}</p>
                          </div>
                        </div>
                      </div>

                      {/* Period and location */}
                      <div className="flex items-center space-x-6 mb-6 text-sm text-white/60">
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} />
                          <span>{experience.period}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin size={16} />
                          <span>{experience.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-white/80 mb-6 leading-relaxed text-base">
                        {experience.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-white flex items-center space-x-2">
                          <Star size={16} className="text-blue-400" />
                          <span>Key Responsibilities</span>
                        </h4>
                        <ul className="space-y-2">
                          {experience.highlights.map((highlight, highlightIndex) => (
                            <li key={highlightIndex} className="text-sm text-white/70 flex items-center space-x-3 group/item">
                              <ArrowRight size={12} className="text-blue-400 group-hover/item:translate-x-1 transition-transform duration-200" />
                              <span className="group-hover/item:text-white transition-colors duration-200">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action button for featured experience */}
                      {experience.featured && (
                        <div className="mt-6">
                          <Button
                            as="a"
                            href="#contact"
                            className="inline-flex items-center px-6 py-3 text-white font-medium"
                            containerClassName="w-auto"
                            duration={3000}
                          >
                            <Rocket size={16} className="mr-2" />
                            Learn More
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-white/70 mb-6">
            Ready to work together on your next project?
          </p>
          <Button
            as="a"
            href="#contact"
            className="inline-flex items-center px-8 py-4 text-white font-medium text-lg"
            containerClassName="w-auto"
            duration={4000}
            borderRadius="2rem"
          >
            <Briefcase size={20} className="mr-2" />
            Let's Collaborate
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
