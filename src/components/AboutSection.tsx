import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code,
  DeviceMobile,
  Globe,
  Lightbulb,
  Rocket,
  Palette,
  Users,
  Trophy,
  Star
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const skills = [
    { icon: Code, name: 'HTML/CSS', level: 95 },
    { icon: Globe, name: 'JavaScript', level: 90 },
    { icon: DeviceMobile, name: 'React', level: 88 },
    { icon: Rocket, name: 'Node.js', level: 85 },
    { icon: Palette, name: 'GSAP', level: 82 },
    { icon: Lightbulb, name: 'UI/UX', level: 80 }
  ];

  const achievements = [
    { icon: Users, text: 'Co-founded BrotherhoodBytes', highlight: true },
    { icon: Trophy, text: '5+ Years of Experience' },
    { icon: Star, text: '50+ Projects Completed' }
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

    // Section fade in
    tl.fromTo(sectionRef.current,
      { opacity: 0, filter: 'blur(10px)' },
      { opacity: 1, filter: 'blur(0px)', duration: 0.8 }
    )
    // Badge animation
    .fromTo(badgeRef.current,
      { opacity: 0, scale: 0.5, y: -30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.3'
    )
    // Image animation
    .fromTo(imageRef.current,
      { opacity: 0, x: -50, rotateY: 15 },
      { opacity: 1, x: 0, rotateY: 0, duration: 1, ease: 'power2.out' },
      '-=0.5'
    )
    // Content animation
    .fromTo(contentRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.7'
    )
    // Achievements stagger
    .fromTo('.achievement-item',
      { opacity: 0, y: 20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.5'
    )
    // Skills stagger
    .fromTo('.skill-item',
      { opacity: 0, y: 30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.5'
    );

  }, []);

  return (
             <section id="about" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden bg-transparent">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* BrotherhoodBytes Badge */}
        <div ref={badgeRef} className="flex justify-center mb-12">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-full text-primary font-medium text-lg backdrop-blur-sm hover:glow-cyan transition-all duration-300">
            <Users size={20} className="mr-2" />
            Co‑founder of BrotherhoodBytes
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative w-80 h-80 mx-auto">
              {/* Glowing frame */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full p-1 glow-cyan">
                <div className="w-full h-full bg-background rounded-full overflow-hidden">
                  {/* Profile image */}
                  <img
                    src="/src/assets/myimg.JPG"
                    alt="Darshit Shukla"
                    className="w-full h-full object-cover scale-125"
                  />
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-sm float"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary/20 rounded-full blur-sm float" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
                                   <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
                       About{' '}
                       <span className="galactic-text">
                         Me
                       </span>
                     </h2>
                                   <p className="text-lg text-white/80 leading-relaxed mb-6">
                       I'm a passionate full-stack developer and co-founder of BrotherhoodBytes, specializing in creating
                       immersive digital experiences that push the boundaries of web technology. With over 5 years of
                       experience, I've led the development of innovative solutions that combine cutting-edge design
                       with robust functionality.
                     </p>
                     <p className="text-lg text-white/80 leading-relaxed mb-6">
                       At BrotherhoodBytes, we've built a reputation for delivering exceptional digital products that
                       not only meet client expectations but exceed them. Our collaborative approach and commitment
                       to excellence have resulted in successful partnerships with clients across various industries.
                     </p>
                     <p className="text-lg text-white/80 leading-relaxed">
                       When I'm not coding or leading development teams, you'll find me exploring the latest web
                       technologies, contributing to open-source projects, or experimenting with 3D animations
                       and interactive experiences that bring ideas to life.
                     </p>
            </div>

            {/* Achievements */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-6">Key Achievements</h3>
              <div className="grid gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="achievement-item flex items-center space-x-3 p-4 glass-card rounded-xl group hover:glow-cyan transition-all duration-300">
                    <achievement.icon
                      size={24}
                      className={`${achievement.highlight ? 'text-primary' : 'text-muted-foreground'}`}
                    />
                    <span className={`font-medium ${achievement.highlight ? 'text-primary' : 'text-foreground'}`}>
                      {achievement.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef} className="space-y-4">
              <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="skill-item glass-card p-4 rounded-xl group hover:glow-cyan transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-2">
                      <skill.icon size={24} className="text-primary" />
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
