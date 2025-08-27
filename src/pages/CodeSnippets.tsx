import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Star, Code, Zap, Heart, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GalacticBackground from '@/components/GalacticBackground';

interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  category: 'shadows' | 'gradients' | 'animations' | 'effects' | 'buttons' | 'cards';
  css: string;
  component: React.ReactNode;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
}

const CodeSnippets = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);

  const copyToClipboard = async (css: string, id: string) => {
    try {
      await navigator.clipboard.writeText(css);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const showcaseItems: ShowcaseItem[] = [
    {
      id: 'glow-shadow',
      title: 'Glow Shadow Effect',
      description: 'Beautiful glowing shadow with color transitions',
      category: 'shadows',
      difficulty: 'beginner',
      tags: ['shadow', 'glow', 'hover', 'transition'],
      demoUrl: 'https://codepen.io/demo/glow-shadow',
      githubUrl: 'https://github.com/darshitshukla/css-snippets',
      css: `.glow-shadow {
  box-shadow:
    0 0 20px rgba(139, 92, 246, 0.3),
    0 0 40px rgba(139, 92, 246, 0.2),
    0 0 60px rgba(139, 92, 246, 0.1);
  transition: all 0.3s ease;
}

.glow-shadow:hover {
  box-shadow:
    0 0 30px rgba(139, 92, 246, 0.5),
    0 0 60px rgba(139, 92, 246, 0.3),
    0 0 90px rgba(139, 92, 246, 0.2);
  transform: translateY(-2px);
}`,
      component: (
        <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl glow-shadow flex items-center justify-center text-white font-bold text-lg">
          Glow
        </div>
      )
    },
    {
      id: 'gradient-border',
      title: 'Gradient Border',
      description: 'Animated gradient border with moving colors',
      category: 'gradients',
      difficulty: 'intermediate',
      tags: ['gradient', 'border', 'animation', 'keyframes'],
      demoUrl: 'https://codepen.io/demo/gradient-border',
      githubUrl: 'https://github.com/darshitshukla/css-snippets',
      css: `.gradient-border {
  position: relative;
  background: linear-gradient(45deg, #f093fb, #f5576c, #4facfe, #00f2fe);
  background-size: 400% 400%;
  animation: gradientShift 3s ease infinite;
  border-radius: 1rem;
  padding: 2px;
}

.gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #1f2937;
  border-radius: inherit;
  margin: 2px;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}`,
      component: (
        <div className="gradient-border w-32 h-32 flex items-center justify-center">
          <div className="text-white font-bold text-lg">Border</div>
        </div>
      )
    },
    {
      id: 'floating-card',
      title: 'Floating Card',
      description: 'Card with subtle floating animation',
      category: 'animations',
      difficulty: 'beginner',
      tags: ['animation', 'float', 'keyframes', 'transform'],
      demoUrl: 'https://codepen.io/demo/floating-card',
      githubUrl: 'https://github.com/darshitshukla/css-snippets',
      css: `.floating-card {
  animation: float 6s ease-in-out infinite;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 1px 8px rgba(0, 0, 0, 0.2);
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}`,
      component: (
        <div className="floating-card w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
          Float
        </div>
      )
    },
    {
      id: 'glass-effect',
      title: 'Glass Morphism',
      description: 'Modern glass effect with backdrop blur',
      category: 'effects',
      difficulty: 'intermediate',
      tags: ['glass', 'backdrop-filter', 'blur', 'modern'],
      demoUrl: 'https://codepen.io/demo/glass-effect',
      githubUrl: 'https://github.com/darshitshukla/css-snippets',
      css: `.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}`,
      component: (
        <div className="glass-effect w-32 h-32 rounded-2xl flex items-center justify-center text-white font-bold text-lg border border-white/20">
          Glass
        </div>
      )
    },
    {
      id: 'neon-text',
      title: 'Neon Text Effect',
      description: 'Glowing neon text with shadow',
      category: 'effects',
      difficulty: 'intermediate',
      tags: ['neon', 'text-shadow', 'glow', 'animation'],
      demoUrl: 'https://codepen.io/demo/neon-text',
      githubUrl: 'https://github.com/darshitshukla/css-snippets',
      css: `.neon-text {
  color: #fff;
  text-shadow:
    0 0 5px #fff,
    0 0 10px #fff,
    0 0 15px #0ff,
    0 0 20px #0ff,
    0 0 25px #0ff,
    0 0 30px #0ff,
    0 0 35px #0ff;
  animation: neonPulse 1.5s ease-in-out infinite alternate;
}

@keyframes neonPulse {
  from { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0ff; }
  to { text-shadow: 0 0 5px #fff, 0 0 20px #fff, 0 0 30px #0ff; }
}`,
      component: (
        <div className="w-32 h-32 bg-black rounded-2xl flex items-center justify-center">
          <span className="neon-text font-bold text-lg">NEON</span>
        </div>
      )
    },
    {
      id: 'magnetic-button',
      title: 'Magnetic Button',
      description: 'Button with magnetic hover effect',
      category: 'buttons',
      difficulty: 'intermediate',
      tags: ['button', 'hover', 'transform', '3d'],
      demoUrl: 'https://codepen.io/demo/magnetic-button',
      githubUrl: 'https://github.com/darshitshukla/css-snippets',
      css: `.magnetic-button {
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  transform-style: preserve-3d;
}

.magnetic-button:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}`,
      component: (
        <button className="magnetic-button w-32 h-12 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold rounded-xl">
          Magnetic
        </button>
      )
    },
    {
      id: 'gradient-button',
      title: 'Gradient Button',
      description: 'Button with animated gradient background',
      category: 'buttons',
      difficulty: 'beginner',
      tags: ['button', 'gradient', 'animation', 'hover'],
      demoUrl: 'https://codepen.io/demo/gradient-button',
      githubUrl: 'https://github.com/darshitshukla/css-snippets',
      css: `.gradient-button {
  background: linear-gradient(45deg, #667eea, #764ba2);
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
  transition: all 0.3s ease;
}

.gradient-button:hover {
  background-size: 100% 100%;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}`,
      component: (
        <button className="gradient-button w-32 h-12 text-white font-bold rounded-xl">
          Gradient
        </button>
      )
    },
    {
      id: 'card-hover',
      title: 'Card Hover Effect',
      description: 'Interactive card with smooth hover animations',
      category: 'cards',
      difficulty: 'beginner',
      tags: ['card', 'hover', 'transform', 'shadow'],
      demoUrl: 'https://codepen.io/demo/card-hover',
      githubUrl: 'https://github.com/darshitshukla/css-snippets',
      css: `.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.card-hover:hover {
  transform: translateY(-8px) rotateX(5deg);
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}`,
      component: (
        <div className="card-hover w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
          Card
        </div>
      )
    }
  ];

  const categories = ['all', 'shadows', 'gradients', 'animations', 'effects', 'buttons', 'cards'];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  const filteredItems = showcaseItems.filter(item => {
    const categoryMatch = activeTab === 'all' || item.category === activeTab;
    return categoryMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-300';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-300';
      case 'advanced': return 'bg-red-500/20 text-red-300';
      default: return 'bg-slate-500/20 text-slate-300';
    }
  };

  const handleStartBuilding = () => {
    // Scroll to the showcase section
    const showcaseSection = document.getElementById('showcase-grid');
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewDemo = (item: ShowcaseItem) => {
    if (item.demoUrl) {
      window.open(item.demoUrl, '_blank');
    }
  };

  const handleViewSource = (item: ShowcaseItem) => {
    if (item.githubUrl) {
      window.open(item.githubUrl, '_blank');
    }
  };

  return (
    <div className="galactic-theme min-h-screen">
      <GalacticBackground />
      <Navigation />

      <main className="relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Code className="w-12 h-12 text-purple-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-slate-100">
                Code Snippets
              </h1>
              <Zap className="w-12 h-12 text-blue-400" />
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Reusable CSS components and effects you can copy and use in your projects.
              Each snippet is optimized for performance and cross-browser compatibility.
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === category
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Showcase Grid */}
          <div id="showcase-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-purple-500/10"
              >
                {/* Component Preview */}
                <div className="flex justify-center mb-6">
                  {item.component}
                </div>

                {/* Item Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm mb-3">{item.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Difficulty Badge */}
                  <span className={`inline-block px-3 py-1 text-xs rounded-full ${getDifficultyColor(item.difficulty)}`}>
                    {item.difficulty}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => copyToClipboard(item.css, item.id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 text-white rounded-lg transition-all duration-300 hover:scale-105 group border border-purple-500/30"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check size={16} className="text-green-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy CSS
                      </>
                    )}
                  </button>

                  <div className="flex gap-2">
                    {item.demoUrl && (
                      <button
                        onClick={() => handleViewDemo(item)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-all duration-300 hover:scale-105 text-sm"
                      >
                        <ExternalLink size={14} />
                        Demo
                      </button>
                    )}
                    {item.githubUrl && (
                      <button
                        onClick={() => handleViewSource(item)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-all duration-300 hover:scale-105 text-sm"
                      >
                        <Star size={14} />
                        Source
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Code Snippet Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h3 className="text-2xl font-bold text-slate-100 mb-6">
              How to Use These Components
            </h3>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Copy the CSS code and apply the classes to your HTML elements.
              All effects are optimized for performance and work across modern browsers.
            </p>

            {/* Usage Instructions */}
            <div className="bg-slate-800/50 rounded-xl p-6 max-w-4xl mx-auto text-left">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-slate-400 text-sm ml-2">Usage Example</span>
              </div>
              <pre className="text-sm text-slate-300 overflow-x-auto">
                <code>{`// 1. Copy the CSS from any component above
// 2. Add it to your stylesheet
// 3. Apply the class to your HTML

<div class="glow-shadow">
  Your content here
</div>

// For Tailwind CSS users, you can also:
// - Extract the key properties
// - Create custom utility classes
// - Use @apply directive in your CSS

// Pro Tips:
// - Combine multiple effects for unique results
// - Adjust colors and values to match your design
// - Test across different browsers for compatibility`}</code>
              </pre>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-16"
          >
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-8">
              <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Build Something Amazing?
              </h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Use these code snippets as a starting point for your next project.
                Feel free to modify and combine them to create unique effects!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleStartBuilding}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/25"
                >
                  Start Building
                </button>
                <button
                  onClick={() => window.open('https://github.com/darshitshukla/css-snippets', '_blank')}
                  className="px-8 py-3 bg-slate-700/50 text-white font-bold rounded-xl hover:bg-slate-600/50 transition-all duration-300 hover:scale-105 border border-slate-600"
                >
                  View All Snippets
                  <ArrowRight className="inline ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CodeSnippets;
