import { useEffect, useRef, useState } from 'react';
import { Users, Star, Rocket, Code, Database, Cloud } from 'phosphor-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface Skill {
  icon: React.ReactNode;
  name: string;
  description: string;
}

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const skills: Skill[] = [
    {
      icon: <Code className="w-6 h-6" />,
      name: 'React/Next.js',
      description: 'Modern frontend development'
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      name: 'React Native',
      description: 'Cross-platform mobile apps'
    },
    {
      icon: <Database className="w-6 h-6" />,
      name: 'Node/Express',
      description: 'Scalable backend APIs'
    },
    {
      icon: <Star className="w-6 h-6" />,
      name: 'PostgreSQL/Mongo',
      description: 'Database design & optimization'
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      name: 'AWS/CI/CD',
      description: 'Cloud infrastructure & deployment'
    }
  ];

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Main section fade in
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        }
      );

      // Image animations
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          {
            opacity: 0,
            x: -100,
            rotationY: -45,
            scale: 0.8
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            scale: 1,
            duration: 1.2,
            delay: 0.3,
            ease: "power3.out"
          }
        );
      }

      // Content slide in
      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.6,
            ease: "power3.out"
          }
        );
      }

      // Metrics stagger
      if (metricsRef.current) {
        gsap.fromTo(metricsRef.current.children,
          { opacity: 0, y: 50, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.9,
            stagger: 0.2,
            ease: "back.out(1.7)"
          }
        );
      }

      // Skills stagger
      if (skillsRef.current) {
        gsap.fromTo(skillsRef.current.children,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: 1.2,
            stagger: 0.1,
            ease: "power2.out"
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      id="about"
    >
      {/* Galaxy Blob Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-fuchsia-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column - Profile Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Circular Frame */}
              <div className="w-80 h-80 rounded-full p-2 bg-gradient-to-r from-cyan-400 to-fuchsia-400">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                  {!imageError ? (
                    <img
                      src="/profile-image.jpg"
                      alt="Darshit Shukla"
                      className={`w-full h-full object-cover transition-opacity duration-500 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                    />
                  ) : (
                    <img
                      src="/myimg.jpg"
                      alt="Darshit Shukla"
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  )}

                  {/* Fallback if both images fail */}
                  {imageError && (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                      <div className="text-6xl">👨‍💻</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-400 to-fuchsia-400 text-slate-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Co-founder of BrotherhoodBytes
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div ref={contentRef} className="space-y-8">
            {/* Main Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                About Me
              </h2>

                            <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  I'm a passionate full-stack developer and co-founder of BrotherhoodBytes, specializing in creating immersive digital experiences that push the boundaries of web technology. With over 5 years of experience, I've led the development of innovative solutions that combine cutting-edge design with robust functionality.
                </p>
                <p>
                  At BrotherhoodBytes, we've built a reputation for delivering exceptional digital products that not only meet client expectations but exceed them. Our collaborative approach and commitment to excellence have resulted in successful partnerships with clients across various industries.
                </p>
                <p>
                  When I'm not coding or leading development teams, you'll find me exploring the latest web technologies, contributing to open-source projects, or experimenting with 3D animations and interactive experiences that bring ideas to life.
                </p>
              </div>
            </div>

            {/* Metrics Cards */}
            <div ref={metricsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                <div className="text-3xl font-bold text-cyan-400 mb-2">5+</div>
                <div className="text-white/60 text-sm">Years Experience</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                <div className="text-3xl font-bold text-fuchsia-400 mb-2">30+</div>
                <div className="text-white/60 text-sm">Projects Completed</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                <div className="text-3xl font-bold text-purple-400 mb-2">Full-Stack</div>
                <div className="text-white/60 text-sm">React → Node → AWS</div>
              </div>
            </div>

            {/* Skills Grid */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Core Skills</h3>
              <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm hover:border-cyan-400/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-cyan-400 group-hover:text-fuchsia-400 transition-colors duration-300">
                        {skill.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{skill.name}</div>
                        <div className="text-sm text-white/60">{skill.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Resume Download */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 border border-cyan-400/20 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-semibold text-white">
                  Ready to Work Together?
                </h3>
                <p className="text-white/80 max-w-md mx-auto">
                  Download my professional resume for interviews, freelance opportunities, or to learn more about my experience.
                </p>
                <a
                  href="/resume.pdf"
                  download="Darshit_Resume.pdf"
                  className="inline-flex items-center space-x-3 px-8 py-8 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-fuchsia-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Resume</span>
                </a>
                <div className="flex items-center justify-center space-x-6 text-sm text-white/60">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Available for Interviews
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Freelance Projects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
