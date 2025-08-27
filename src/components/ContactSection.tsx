import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  PaperPlaneTilt,
  GithubLogo,
  LinkedinLogo,
  TwitterLogo,
  Envelope,
  MapPin,
  Phone
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Animate submit button
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out'
    });

    // Here you would typically handle form submission
    console.log('Form submitted:', formData);
  };

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse'
      }
    });

    // Section animation
    tl.fromTo('.contact-title',
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }
    )
    .fromTo('.contact-form',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo('.contact-info',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    )
    .fromTo('.social-icon',
      { opacity: 0, y: 20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.4'
    );

    // Input focus animations
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        gsap.to(input, {
          scale: 1.02,
          duration: 0.2,
          ease: 'power2.out'
        });
      });

      input.addEventListener('blur', () => {
        gsap.to(input, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        });
      });
    });

  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="contact-title text-4xl lg:text-5xl font-bold mb-6">
            Get In{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="contact-title text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Drop me a message and let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="contact-form">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full px-6 py-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:glow-cyan transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full px-6 py-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:glow-cyan transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="form-input w-full px-6 py-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:glow-cyan transition-all duration-300 backdrop-blur-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="submit-btn w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl font-medium hover:glow-cyan transition-all duration-300 transform hover:scale-[1.02]"
              >
                <PaperPlaneTilt size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-info space-y-8">
            {/* Contact Details */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Envelope size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground">shukladarshit52@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-foreground">+91 9131371800</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-foreground">Jabalpur, MP</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="social-icon p-4 bg-primary/20 rounded-xl hover:bg-primary/30 hover:glow-cyan transition-all duration-300 transform hover:scale-110"
                >
                  <GithubLogo size={24} className="text-primary" />
                </a>
                <a
                  href="#"
                  className="social-icon p-4 bg-primary/20 rounded-xl hover:bg-primary/30 hover:glow-cyan transition-all duration-300 transform hover:scale-110"
                >
                  <LinkedinLogo size={24} className="text-primary" />
                </a>
                <a
                  href="#"
                  className="social-icon p-4 bg-primary/20 rounded-xl hover:bg-primary/30 hover:glow-cyan transition-all duration-300 transform hover:scale-110"
                >
                  <TwitterLogo size={24} className="text-primary" />
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4">Availability</h3>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">Available for freelance projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
