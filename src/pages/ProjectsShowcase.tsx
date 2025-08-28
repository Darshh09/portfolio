import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Eye } from 'lucide-react';
import { projects } from '@/data/projects';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GalacticCursor from '@/components/GalacticCursor';
import GalacticBackground from '@/components/GalacticBackground';
import CommandPalette from '@/components/CommandPalette';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import LoadingScreen from '@/components/LoadingScreen';
import { AnimatePresence } from 'framer-motion';

const ProjectsShowcase = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    // Simulate loading time for smooth transition
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project =>
        project.iconLists.some(icon => icon.includes(filter.toLowerCase()))
      );

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

          <main className="relative z-10 pt-20">
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center px-4">
              <motion.div
                className="text-center max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1
                  className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  Live Projects
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Explore my latest projects with live demos, source code, and detailed insights.
                  Each project showcases different technologies and problem-solving approaches.
                </motion.p>

                {/* Filter Buttons */}
                <motion.div
                  className="flex flex-wrap justify-center gap-4 mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {['all', 'react', 'nodejs', 'nextjs', 'typescript', 'python'].map((tech) => (
                    <button
                      key={tech}
                      onClick={() => setFilter(tech)}
                      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                        filter === tech
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                          : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700'
                      }`}
                    >
                      {tech === 'all' ? 'All Projects' : tech.charAt(0).toUpperCase() + tech.slice(1)}
                    </button>
                  ))}
                </motion.div>
              </motion.div>
            </section>

            {/* Projects Grid */}
            <section className="px-4 pb-20">
              <motion.div
                className="max-w-7xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="group relative bg-slate-800/30 rounded-2xl border border-slate-700/50 overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:scale-105"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -10 }}
                    >
                      {/* Project Image */}
                      <div className="relative h-48 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                          <div className="text-6xl">🚀</div>
                        </div>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300" />
                      </div>

                      {/* Project Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                          {project.des}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.iconLists.slice(0, 4).map((icon, iconIndex) => (
                            <div
                              key={iconIndex}
                              className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-xs text-slate-300"
                            >
                              {icon.split('/').pop()?.split('.')[0]?.toUpperCase()}
                            </div>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Link
                            to={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                          >
                            <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                            View Details
                          </Link>
                          <a
                            href={project.sourceCode}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                  <motion.div
                    className="text-center py-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-white mb-2">No projects found</h3>
                    <p className="text-slate-400">Try adjusting your filter criteria</p>
                  </motion.div>
                )}
              </motion.div>
            </section>
          </main>

          <Footer />
        </div>
      )}
    </>
  );
};

export default ProjectsShowcase;
