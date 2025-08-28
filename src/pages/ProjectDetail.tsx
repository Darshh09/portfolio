import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Code, Calendar, Clock, Users } from 'lucide-react';
import { projects } from '@/data/projects';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GalacticCursor from '@/components/GalacticCursor';
import GalacticBackground from '@/components/GalacticBackground';
import CommandPalette from '@/components/CommandPalette';
import PerformanceMonitor from '@/components/PerformanceMonitor';

const ProjectDetail = () => {
  const { projectName } = useParams();
  const [project, setProject] = useState<typeof projects[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find project by name (convert URL slug to project title)
    const foundProject = projects.find(p =>
      p.title.toLowerCase().replace(/\s+/g, '-') === projectName?.toLowerCase()
    );

    if (foundProject) {
      setProject(foundProject);
    }

    setIsLoading(false);
  }, [projectName]);

  if (isLoading) {
    return (
      <div className="galactic-theme min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="galactic-theme min-h-screen">
        <GalacticBackground />
        <GalacticCursor />
        <Navigation />
        <div className="pt-32 px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-slate-400 mb-8">The project you're looking for doesn't exist.</p>
          <Link
            to="/projects"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
          >
            Back to Projects
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="galactic-theme min-h-screen">
      <GalacticBackground />
      <GalacticCursor />
      <CommandPalette />
      <PerformanceMonitor />
      <Navigation />

      <main className="relative z-10 pt-20">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>

        {/* Project Header */}
        <section className="px-4 mb-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-6">
                {project.title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-8">
                {project.des}
              </p>

              {/* Project Stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">6</div>
                  <div className="text-slate-400">Technologies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400 mb-2">3</div>
                  <div className="text-slate-400">Months</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">100%</div>
                  <div className="text-slate-400">Responsive</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 text-lg"
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </a>
                <a
                  href={project.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 text-lg"
                >
                  <Code className="w-5 h-5" />
                  Source Code
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Project Details */}
        <section className="px-4 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Project Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-slate-700/50">
                  <div className="text-8xl">🚀</div>
                </div>
              </motion.div>

              {/* Project Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8"
              >
                {/* Tech Stack */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Tech Stack</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {project.iconLists.map((icon, index) => (
                      <div
                        key={index}
                        className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center hover:border-purple-500/50 transition-colors duration-300"
                      >
                        <div className="text-2xl mb-2">⚡</div>
                        <div className="text-sm text-slate-300">
                          {icon.split('/').pop()?.split('.')[0]?.toUpperCase()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {[
                      'Responsive design for all devices',
                      'Modern UI/UX with smooth animations',
                      'Performance optimized',
                      'SEO friendly',
                      'Cross-browser compatibility',
                      'Accessibility features'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-slate-300">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Project Timeline */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Development Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <div className="text-white font-medium">Planning & Design</div>
                        <div className="text-slate-400 text-sm">2 weeks</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <div className="text-white font-medium">Development</div>
                        <div className="text-slate-400 text-sm">8 weeks</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <div>
                        <div className="text-white font-medium">Testing & Deployment</div>
                        <div className="text-slate-400 text-sm">2 weeks</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        <section className="px-4 mb-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-white text-center mb-12">Related Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects
                  .filter(p => p.id !== project.id)
                  .slice(0, 3)
                  .map((relatedProject, index) => (
                    <Link
                      key={relatedProject.id}
                      to={`/projects/${relatedProject.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="group bg-slate-800/30 rounded-xl border border-slate-700/50 p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
                    >
                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                        {relatedProject.title}
                      </h4>
                      <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                        {relatedProject.des}
                      </p>
                      <div className="flex gap-2">
                        {relatedProject.iconLists.slice(0, 3).map((icon, iconIndex) => (
                          <div
                            key={iconIndex}
                            className="w-6 h-6 bg-slate-700 rounded text-xs text-slate-300 flex items-center justify-center"
                          >
                            {icon.split('/').pop()?.split('.')[0]?.charAt(0).toUpperCase()}
                          </div>
                        ))}
                      </div>
                    </Link>
                  ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
