import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChatCircle, ArrowRight, ArrowLeft } from 'phosphor-react';

interface CardData {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  rating?: number;
  author?: string;
  avatar?: string;
  color: string;
}

const StackedCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const cards: CardData[] = [
    {
      id: '1',
      title: 'React Development',
      subtitle: 'Frontend Excellence',
      content: 'Building modern, responsive web applications with React, TypeScript, and modern tooling. Specializing in performance optimization and clean architecture.',
      rating: 5,
      author: 'Darshit Shukla',
      avatar: '👨‍💻',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: '2',
      title: 'Full-Stack Solutions',
      subtitle: 'End-to-End Development',
      content: 'Complete web solutions from database design to deployment. Experience with Node.js, PostgreSQL, and cloud infrastructure.',
      rating: 5,
      author: 'Darshit Shukla',
      avatar: '🚀',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: '3',
      title: 'UI/UX Design',
      subtitle: 'Beautiful Interfaces',
      content: 'Creating intuitive and visually stunning user experiences. Expertise in Tailwind CSS, Framer Motion, and modern design principles.',
      rating: 5,
      author: 'Darshit Shukla',
      avatar: '🎨',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: '4',
      title: 'Open Source',
      subtitle: 'Community Contributor',
      content: 'Active contributor to open source projects. Building tools and libraries that help developers create better software.',
      rating: 5,
      author: 'Darshit Shukla',
      avatar: '🌟',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextCard, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, currentIndex]);

  const getCardStyle = (index: number) => {
    const offset = (index - currentIndex + cards.length) % cards.length;
    const zIndex = cards.length - offset;
    const scale = 1 - offset * 0.1;
    const translateY = offset * 20;
    const opacity = 1 - offset * 0.3;

    return {
      zIndex,
      transform: `translateY(${translateY}px) scale(${scale})`,
      opacity: Math.max(opacity, 0.1)
    };
  };

  return (
    <section className="py-20 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
            Skills & Expertise
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Discover what makes me unique in the world of web development
          </p>
        </motion.div>

        {/* Stacked Cards Container */}
        <div className="relative h-96 flex items-center justify-center">
          <div
            ref={containerRef}
            className="relative w-full max-w-md h-80"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait">
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="absolute inset-0 cursor-pointer"
                  style={getCardStyle(index)}
                  onClick={() => setCurrentIndex(index)}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${card.color} rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105`}>
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{card.avatar}</div>
                      {card.rating && (
                        <div className="flex items-center gap-1">
                          {[...Array(card.rating)].map((_, i) => (
                            <Star key={i} size={16} className="text-yellow-300 fill-current" />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="text-white">
                      <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                      <p className="text-sm opacity-90 mb-3">{card.subtitle}</p>
                      <p className="text-sm leading-relaxed opacity-80">{card.content}</p>
                    </div>

                    {/* Card Footer */}
                    {card.author && (
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-medium">
                              {card.author.charAt(0)}
                            </div>
                            <div>
                              <p className="text-white font-medium text-sm">{card.author}</p>
                              <p className="text-white/70 text-xs">Developer</p>
                            </div>
                          </div>
                          <ChatCircle size={20} className="text-white/50" />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            <button
              onClick={prevCard}
              className="p-3 bg-slate-800/50 hover:bg-slate-700/50 text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <ArrowLeft size={20} />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 scale-125'
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextCard}
              className="p-3 bg-slate-800/50 hover:bg-slate-700/50 text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Interactive Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <h3 className="text-2xl font-bold text-slate-100 mb-6">
            Try the Interactive Demo
          </h3>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Hover over the cards to pause the auto-rotation, click to bring them to the front,
            or use the navigation controls below. This creates a unique 3D layered experience!
          </p>

          {/* Code Snippet */}
          <div className="bg-slate-800/50 rounded-xl p-6 max-w-4xl mx-auto text-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-slate-400 text-sm ml-2">StackedCards.tsx</span>
            </div>
            <pre className="text-sm text-slate-300 overflow-x-auto">
              <code>{`// Key Features:
// • 3D Layered Effect with z-index management
// • Auto-rotation with hover pause
// • Smooth animations using Framer Motion
// • Responsive design with Tailwind CSS
// • Interactive navigation controls
// • Beautiful gradient backgrounds

const getCardStyle = (index: number) => {
  const offset = (index - currentIndex + cards.length) % cards.length;
  const zIndex = cards.length - offset;
  const scale = 1 - offset * 0.1;
  const translateY = offset * 20;
  const opacity = 1 - offset * 0.3;

  return {
    zIndex,
    transform: \`translateY(\${translateY}px) scale(\${scale})\`,
    opacity: Math.max(opacity, 0.1)
  };
};`}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StackedCards;
