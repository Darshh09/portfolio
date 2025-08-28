import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, MagnifyingGlass, ArrowRight, Star } from 'phosphor-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNavigation } from '../contexts/NavigationContext';

interface CommandItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: () => void;
  category: 'navigation' | 'social' | 'action';
}

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsCommandPaletteOpen } = useNavigation();

  const commands: CommandItem[] = [
    {
      id: 'home',
      title: 'Go to Home',
      description: 'Navigate to the main page',
      icon: '🏠',
      action: () => {
        if (location.pathname !== '/') {
          navigate('/');
        } else {
          // Scroll to top of home page
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
      category: 'navigation'
    },
    {
      id: 'about',
      title: 'About Me',
      description: 'Learn more about Darshit',
      icon: '👨‍💻',
      action: () => {
        if (location.pathname !== '/') {
          // Store hash for post-navigation scroll
          sessionStorage.setItem('scrollToHash', '#about');
          navigate('/#about');
        } else {
          // If already on home page, scroll to section
          const element = document.querySelector('#about');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      },
      category: 'navigation'
    },
    {
      id: 'experience',
      title: 'Experience',
      description: 'View my work experience',
      icon: '💼',
      action: () => {
        if (location.pathname !== '/') {
          sessionStorage.setItem('scrollToHash', '#experience');
          navigate('/#experience');
        } else {
          const element = document.querySelector('#experience');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      },
      category: 'navigation'
    },
    {
      id: 'skills',
      title: 'Skills',
      description: 'See my technical skills',
      icon: '⚡',
      action: () => {
        if (location.pathname !== '/') {
          sessionStorage.setItem('scrollToHash', '#skills');
          navigate('/#skills');
        } else {
          const element = document.querySelector('#skills');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      },
      category: 'navigation'
    },
    {
      id: 'projects',
      title: 'View Projects',
      description: 'See my latest work',
      icon: '🚀',
      action: () => navigate('/projects'),
      category: 'navigation'
    },
    {
      id: 'code-snippets',
      title: 'Code Snippets',
      description: 'Browse my code examples',
      icon: '💻',
      action: () => {
        if (location.pathname !== '/') {
          sessionStorage.setItem('scrollToHash', '#code-snippets');
          navigate('/#code-snippets');
        } else {
          const element = document.querySelector('#code-snippets');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      },
      category: 'navigation'
    },
    {
      id: 'blog',
      title: 'Read Blog',
      description: 'Check out my latest articles',
      icon: '📝',
      action: () => navigate('/blog'),
      category: 'navigation'
    },
    {
      id: 'analytics',
      title: 'Blog Analytics',
      description: 'View blog statistics',
      icon: '📊',
      action: () => navigate('/blog/analytics'),
      category: 'navigation'
    },
    {
      id: 'contact',
      title: 'Get in Touch',
      description: 'Send me a message',
      icon: '💬',
      action: () => {
        if (location.pathname !== '/') {
          sessionStorage.setItem('scrollToHash', '#contact');
          navigate('/#contact');
        } else {
          const element = document.querySelector('#contact');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      },
      category: 'navigation'
    },
    {
      id: 'github',
      title: 'GitHub Profile',
      description: 'View my open source contributions',
      icon: '🐙',
      action: () => window.open('https://github.com/Darshh09', '_blank'),
      category: 'social'
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Profile',
      description: 'Connect with me professionally',
      icon: '💼',
      action: () => window.open('https://www.linkedin.com/in/darshitshukla/', '_blank'),
      category: 'social'
    },
    {
      id: 'resume',
      title: 'Download Resume',
      description: 'Get my professional resume',
      icon: '📄',
      action: () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Darshit_Resume.pdf';
        link.click();
      },
      category: 'action'
    },
    {
      id: 'hire',
      title: 'Hire Me',
      description: 'Start a project together',
      icon: '✨',
      action: () => {
        if (location.pathname !== '/') {
          sessionStorage.setItem('scrollToHash', '#contact');
          navigate('/#contact');
        } else {
          const element = document.querySelector('#contact');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      },
      category: 'action'
    }
  ];

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(query.toLowerCase()) ||
    command.description.toLowerCase().includes(query.toLowerCase()) ||
    command.category.includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setIsCommandPaletteOpen(true);
    } else {
      setIsCommandPaletteOpen(false);
    }
  }, [isOpen, setIsCommandPaletteOpen]);

  const handleSelect = (command: CommandItem) => {
    command.action();
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        handleSelect(filteredCommands[selectedIndex]);
      }
    }
  };

  return (
    <>
      {/* Command Palette Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 group"
        title="Open Command Palette (⌘+K)"
      >
        <Command size={24} className="group-hover:rotate-12 transition-transform duration-300" />
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-mono">
          ⌘K
        </div>
      </button>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl shadow-purple-500/20 overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3 p-4 border-b border-slate-700/50">
                  <MagnifyingGlass className="w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Type a command or search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-white placeholder-slate-400 outline-none text-lg"
                    autoFocus
                  />
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <kbd className="px-2 py-1 bg-slate-800 rounded">↑↓</kbd>
                    <span>navigate</span>
                    <kbd className="px-2 py-1 bg-slate-800 rounded">↵</kbd>
                    <span>select</span>
                  </div>
                </div>

                {/* Commands List */}
                <div className="max-h-96 overflow-y-auto">
                  {filteredCommands.length > 0 ? (
                    filteredCommands.map((command, index) => (
                      <motion.div
                        key={command.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 ${
                          index === selectedIndex
                            ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-l-4 border-purple-400'
                            : 'hover:bg-slate-800/50'
                        }`}
                        onClick={() => handleSelect(command)}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <div className="text-2xl">{command.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium text-white">{command.title}</div>
                          <div className="text-sm text-slate-400">{command.description}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            command.category === 'navigation' ? 'bg-blue-500/20 text-blue-300' :
                            command.category === 'social' ? 'bg-green-500/20 text-green-300' :
                            'bg-purple-500/20 text-purple-300'
                          }`}>
                            {command.category}
                          </span>
                          <ArrowRight className="w-4 h-4 text-slate-400" />
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-slate-400">
                      <Star className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                      <p>No commands found for "{query}"</p>
                      <p className="text-sm mt-2">Try a different search term</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-700/50 bg-slate-800/20">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>Powered by React & Framer Motion</span>
                    <span>Press ESC to close</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
