import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Star, Code, Zap, Heart, Sparkles, ArrowRight, ExternalLink, Palette, Layers, Mouse, Eye } from 'lucide-react';

interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tailwindClasses: string;
  demoUrl?: string;
  githubUrl?: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: 'glow-shadow',
    title: 'Glow Shadow Effect',
    description: 'Beautiful glowing shadow with hover animations using Tailwind',
    category: 'shadows',
    difficulty: 'Easy',
    tailwindClasses: `class="bg-purple-600 text-white px-6 py-3 rounded-lg
shadow-[0_0_20px_rgba(139,92,246,0.3),0_0_40px_rgba(139,92,246,0.2)]
hover:shadow-[0_0_30px_rgba(139,92,246,0.5),0_0_60px_rgba(139,92,246,0.3)]
hover:-translate-y-1 transition-all duration-300"`,
    demoUrl: '#demo-glow-shadow',
    githubUrl: 'https://github.com/darshitshukla/tailwind-snippets'
  },
  {
    id: 'gradient-border',
    title: 'Gradient Border',
    description: 'Animated gradient border with moving colors',
    category: 'borders',
    difficulty: 'Medium',
    tailwindClasses: `class="relative p-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
bg-[length:200%_200%] animate-[gradient_3s_ease_infinite] rounded-lg
before:content-[''] before:absolute before:inset-0.5 before:bg-slate-900 before:rounded-[calc(0.5rem-2px)]"`,
    demoUrl: '#demo-gradient-border',
    githubUrl: 'https://github.com/darshitshukla/tailwind-snippets'
  },
  {
    id: 'floating-card',
    title: 'Floating Card',
    description: 'Smooth floating animation with depth using Tailwind',
    category: 'cards',
    difficulty: 'Easy',
    tailwindClasses: `class="bg-gradient-to-br from-blue-500 to-purple-600 text-white px-8 py-6 rounded-xl
shadow-lg animate-[float_6s_ease-in-out_infinite] hover:scale-105 transition-transform duration-300"`,
    demoUrl: '#demo-floating-card',
    githubUrl: 'https://github.com/darshitshukla/tailwind-snippets'
  },
  {
    id: 'glass-effect',
    title: 'Glass Effect',
    description: 'Modern glassmorphism with backdrop blur using Tailwind',
    category: 'effects',
    difficulty: 'Easy',
    tailwindClasses: `class="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6
shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:bg-white/20 transition-all duration-300"`,
    demoUrl: '#demo-glass-effect',
    githubUrl: 'https://github.com/darshitshukla/tailwind-snippets'
  },
  {
    id: 'neon-text',
    title: 'Neon Text',
    description: 'Glowing neon text effect with Tailwind',
    category: 'text',
    difficulty: 'Easy',
    tailwindClasses: `class="text-white text-4xl font-bold
text-shadow-[0_0_5px_#fff,0_0_10px_#fff,0_0_15px_#0ff,0_0_20px_#0ff]
animate-[pulse_2s_ease-in-out_infinite_alternate]"`,
    demoUrl: '#demo-neon-text',
    githubUrl: 'https://github.com/darshitshukla/tailwind-snippets'
  },
  {
    id: 'magnetic-button',
    title: 'Magnetic Button',
    description: 'Interactive magnetic hover effect using Tailwind',
    category: 'buttons',
    difficulty: 'Medium',
    tailwindClasses: `class="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg
font-bold shadow-lg hover:-translate-y-2 hover:scale-105 hover:shadow-2xl
transition-all duration-300 ease-out transform-gpu"`,
    demoUrl: '#demo-magnetic-button',
    githubUrl: 'https://github.com/darshitshukla/tailwind-snippets'
  },
  {
    id: 'gradient-button',
    title: 'Gradient Button',
    description: 'Animated gradient with hover effects using Tailwind',
    category: 'buttons',
    difficulty: 'Easy',
    tailwindClasses: `class="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-8 py-4
rounded-lg font-bold bg-[length:200%_200%] animate-[gradient_3s_ease_infinite]
hover:bg-[length:100%_100%] hover:-translate-y-1 hover:shadow-xl transition-all duration-300"`,
    demoUrl: '#demo-gradient-button',
    githubUrl: 'https://github.com/darshitshukla/tailwind-snippets'
  },
  {
    id: 'card-hover',
    title: 'Card Hover',
    description: '3D card hover with perspective using Tailwind',
    category: 'cards',
    difficulty: 'Medium',
    tailwindClasses: `class="bg-gradient-to-br from-green-500 to-blue-600 text-white p-8 rounded-xl
shadow-lg hover:-translate-y-3 hover:rotate-1 hover:shadow-2xl
transition-all duration-300 ease-out transform-gpu hover:scale-105"`,
    demoUrl: '#demo-card-hover',
    githubUrl: 'https://github.com/darshitshukla/tailwind-snippets'
  },
  {
    id: 'animated-bg',
    title: 'Animated Background',
    description: 'Moving gradient background with Tailwind',
    category: 'effects',
    difficulty: 'Easy',
    tailwindClasses: `class="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500
bg-[length:400%_400%] animate-[gradient_8s_ease_infinite] p-8 rounded-xl
text-white font-bold text-center"`,
    demoUrl: '#demo-animated-bg',
    githubUrl: 'https://github.com/darshitshukla/tailwind-snippets'
  },
  {
    id: 'bounce-text',
    title: 'Bounce Text',
    description: 'Bouncy text animation with Tailwind',
    category: 'text',
    difficulty: 'Easy',
    tailwindClasses: `class="text-4xl font-bold text-white
animate-[bounce_2s_ease-in-out_infinite] hover:animate-[bounce_0.5s_ease-in-out_infinite]
transition-all duration-300"`,
    demoUrl: '#demo-bounce-text',
    githubUrl: 'https://github.com/darshitshukla/tailwind-snippets'
  },
  {
    id: 'ripple-effect',
    title: 'Ripple Effect',
    description: 'Click ripple animation using Tailwind',
    category: 'effects',
    difficulty: 'Advanced',
    tailwindClasses: `class="relative overflow-hidden bg-purple-600 text-white px-8 py-4 rounded-lg
font-bold hover:bg-purple-700 active:scale-95 transition-all duration-150
after:content-[''] after:absolute after:inset-0 after:bg-white/20 after:scale-0
after:rounded-full after:animate-[ripple_0.6s_ease-out]"`,
    demoUrl: '#demo-ripple-effect',
    githubUrl: 'https://github.com/darshitshukla/tailwind-snippets'
  },
  {
    id: 'flip-card',
    title: 'Flip Card',
    description: '3D flip card effect with Tailwind',
    category: 'cards',
    difficulty: 'Advanced',
    tailwindClasses: `class="group perspective-1000 w-64 h-96 cursor-pointer
[transform-style:preserve-3d] hover:[transform:rotateY(180deg)] transition-transform duration-1000
[&>*]:absolute [&>*]:w-full [&>*]:h-full [&>*]:backface-hidden"`,
    demoUrl: '#demo-flip-card',
    githubUrl: 'https://github.com/darshitshukla/tailwind-snippets'
  }
];

const categories = [
  { id: 'all', label: 'All', icon: Code, color: 'from-purple-500 to-blue-500' },
  { id: 'shadows', label: 'Shadows', icon: Zap, color: 'from-yellow-500 to-orange-500' },
  { id: 'borders', label: 'Borders', icon: Heart, color: 'from-pink-500 to-red-500' },
  { id: 'cards', label: 'Cards', icon: Sparkles, color: 'from-indigo-500 to-purple-500' },
  { id: 'effects', label: 'Effects', icon: Star, color: 'from-green-500 to-blue-500' },
  { id: 'text', label: 'Text', icon: Code, color: 'from-cyan-500 to-blue-500' },
  { id: 'buttons', label: 'Buttons', icon: Mouse, color: 'from-purple-500 to-pink-500' }
];

const CodeSnippetsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredItems = selectedCategory === 'all'
    ? showcaseItems
    : showcaseItems.filter(item => item.category === selectedCategory);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleStartBuilding = () => {
    const showcaseSection = document.getElementById('showcase-grid');
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  // Render demo element based on snippet type
  const renderDemo = (item: ShowcaseItem) => {
    switch (item.id) {
      case 'glow-shadow':
        return (
          <div className="demo-container p-6 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(139,92,246,0.3),0_0_40px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5),0_0_60px_rgba(139,92,246,0.3)] hover:-translate-y-1 transition-all duration-300">
              Hover Me
            </button>
          </div>
        );

      case 'gradient-border':
        return (
          <div className="demo-container p-6 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <div className="relative p-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-[length:200%_200%] animate-[gradient_3s_ease_infinite] rounded-lg">
              <div className="bg-slate-900 rounded-[calc(0.5rem-2px)] p-4 text-white text-center">
                <div className="text-lg">Gradient</div>
                <div className="text-sm">Border</div>
              </div>
            </div>
          </div>
        );

      case 'floating-card':
        return (
          <div className="demo-container p-6 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white px-8 py-6 rounded-xl shadow-lg animate-[float_6s_ease-in-out_infinite] hover:scale-105 transition-transform duration-300 text-center font-bold">
              Float
            </div>
          </div>
        );

      case 'glass-effect':
        return (
          <div className="demo-container p-6 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:bg-white/20 transition-all duration-300 text-white text-center font-bold">
              Glass
            </div>
          </div>
        );

      case 'neon-text':
        return (
          <div className="demo-container p-6 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <div className="text-white text-4xl font-bold text-shadow-[0_0_5px_#fff,0_0_10px_#fff,0_0_15px_#0ff,0_0_20px_#0ff] animate-[pulse_2s_ease-in-out_infinite_alternate] text-center">
              NEON TEXT
            </div>
          </div>
        );

      case 'magnetic-button':
        return (
          <div className="demo-container p-6 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:-translate-y-2 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-out transform-gpu">
              Magnetic
            </button>
          </div>
        );

      case 'gradient-button':
        return (
          <div className="demo-container p-6 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-8 py-4 rounded-lg font-bold bg-[length:200%_200%] animate-[gradient_3s_ease_infinite] hover:bg-[length:100%_100%] hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              Gradient
            </button>
          </div>
        );

      case 'card-hover':
        return (
          <div className="demo-container p-6 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <div className="bg-gradient-to-br from-green-500 to-blue-600 text-white p-8 rounded-xl shadow-lg hover:-translate-y-3 hover:rotate-1 hover:shadow-2xl transition-all duration-300 ease-out transform-gpu hover:scale-105 text-center font-bold">
              Hover Me
            </div>
          </div>
        );

      case 'animated-bg':
        return (
          <div className="demo-container p-6 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-[length:400%_400%] animate-[gradient_8s_ease_infinite] p-8 rounded-xl text-white font-bold text-center">
              Animated
            </div>
          </div>
        );

      case 'bounce-text':
        return (
          <div className="demo-container p-6 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <div className="text-4xl font-bold text-white animate-[bounce_2s_ease-in-out_infinite] hover:animate-[bounce_0.5s_ease-in-out_infinite] transition-all duration-300 text-center">
              Bounce
            </div>
          </div>
        );

      case 'ripple-effect':
        return (
          <div className="demo-container p-6 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <button className="relative overflow-hidden bg-purple-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-purple-700 active:scale-95 transition-all duration-150">
              Click Me
            </button>
          </div>
        );

      case 'flip-card':
        return (
          <div className="demo-container p-6 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <div className="group perspective-1000 w-32 h-24 cursor-pointer [transform-style:preserve-3d] hover:[transform:rotateY(180deg)] transition-transform duration-1000">
              <div className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold backface-hidden">
                Front
              </div>
              <div className="absolute w-full h-full bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold backface-hidden [transform:rotateY(180deg)]">
                Back
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Tailwind CSS Components
            </h2>
          </div>
          <p className="text-xl text-slate-400 max-w-4xl mx-auto mb-6">
            Beautiful, ready-to-use Tailwind CSS components that are <span className="text-purple-400 font-semibold">easy to copy and paste</span> into your projects.
            No more writing custom CSS - just use these utility classes!
          </p>
          <div className="flex items-center justify-center gap-6 text-slate-300">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Easy to use</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Copy & paste</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Responsive</span>
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            const itemCount = category.id === 'all'
              ? showcaseItems.length
              : showcaseItems.filter(item => item.category === category.id).length;

            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-purple-500/25`
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white hover:scale-105'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {itemCount}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Showcase Grid */}
        <motion.div
          id="showcase-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:bg-slate-700/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-purple-500/10"
              >
                {/* Header */}
                <div className="p-6 border-b border-slate-700/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full border ${getDifficultyColor(item.difficulty)}`}>
                          {item.difficulty}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm mb-3">{item.description}</p>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Demo Section */}
                <div className="p-6 bg-slate-900/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="w-4 h-4 text-slate-400" />
                    <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Live Demo</h4>
                  </div>
                  {renderDemo(item)}
                </div>

                {/* Tailwind Classes Section */}
                <div className="p-6 bg-slate-900/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-slate-400" />
                      <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Tailwind Classes</h4>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(item.tailwindClasses, item.id)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white rounded-lg transition-colors duration-200 text-sm"
                        title="Copy Tailwind Classes"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="w-3 h-3 text-green-400" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Copy
                          </>
                        )}
                      </button>

                      {item.githubUrl && (
                        <button
                          onClick={() => window.open(item.githubUrl!, '_blank')}
                          className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white rounded-lg transition-colors duration-200 text-sm"
                          title="View Source"
                        >
                          <Code className="w-3 h-3" />
                          Source
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-900/80 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto border border-slate-700/50">
                    <pre className="whitespace-pre-wrap leading-relaxed">{item.tailwindClasses}</pre>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-8">
            <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Build Something Amazing with Tailwind CSS?
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              These Tailwind CSS components are designed to be <span className="text-purple-400 font-semibold">easy to use</span> and <span className="text-blue-400 font-semibold">copy-paste ready</span>.
              Just copy the classes and add them to your HTML elements!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleStartBuilding}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/25"
              >
                Start Building
              </button>
              <button
                onClick={() => window.open('https://github.com/darshitshukla/tailwind-snippets', '_blank')}
                className="px-8 py-3 bg-slate-700/50 text-white font-bold rounded-xl hover:bg-slate-600/50 transition-all duration-300 hover:scale-105 border border-slate-600"
              >
                View All Snippets
                <ArrowRight className="inline ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodeSnippetsSection;
