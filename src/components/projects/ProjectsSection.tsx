import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Star,
  Users,
  Lightning,
  ArrowRight,
  Briefcase,
  Globe,
  Sparkle
} from "phosphor-react";
import ProfessionalProjectCard from "./ProfessionalProjectCard";
import ProjectFilters from "./ProjectFilters";
import ProjectStats from "./ProjectStats";
import ClientCTA from "./ClientCTA";
import { projects } from "../../data/projects";

export default function ProjectsSection() {
  const [activeFilters, setActiveFilters] = useState({
    category: [] as string[],
    complexity: [] as string[],
    impact: [] as string[]
  });

    // Calculate stats
  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const conceptProjects = projects.filter(p => p.status === 'concept').length;
    const totalTechnologies = new Set(projects.flatMap(p => p.iconLists)).size;
    const complexities = projects.map(p => p.complexity);
    const averageComplexity = complexities.includes('hard') ? 'Advanced' :
                             complexities.includes('medium') ? 'Intermediate' : 'Beginner';
    const impacts = projects.map(p => p.impact);
    const totalImpact = impacts.includes('Very High') ? 'Very High' :
                       impacts.includes('High') ? 'High' : 'Medium';
    const completionRate = 98; // Professional completion rate
    const averageDuration = "4-6"; // Average project duration

    return {
      totalProjects,
      completedProjects,
      conceptProjects,
      totalTechnologies,
      averageComplexity,
      totalImpact,
      completionRate,
      averageDuration
    };
  }, []);

  // Filter projects based on active filters
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const categoryMatch = activeFilters.category.length === 0 ||
                           activeFilters.category.includes(project.category);
      const complexityMatch = activeFilters.complexity.length === 0 ||
                             activeFilters.complexity.includes(project.complexity);
      const impactMatch = activeFilters.impact.length === 0 ||
                         activeFilters.impact.includes(project.impact);

      return categoryMatch && complexityMatch && impactMatch;
    });
  }, [activeFilters]);

  const handleFilterChange = (filterType: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType as keyof typeof prev].includes(value)
        ? prev[filterType as keyof typeof prev].filter(v => v !== value)
        : [...prev[filterType as keyof typeof prev], value]
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      category: [],
      complexity: [],
      impact: []
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-16">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          Professional <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">Portfolio</span>
        </h2>
        <p className="mx-auto max-w-3xl text-lg text-white/80">
          Showcasing completed projects and ready-to-build concepts that demonstrate my expertise.
          From AI-powered SaaS platforms to modern web applications, I bring ideas to life with
          cutting-edge technology and proven development practices.
        </p>
      </div>

      {/* Professional Stats Section */}
      <ProjectStats {...stats} />

      {/* Filter Section */}
      <ProjectFilters
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        totalProjects={projects.length}
        filteredCount={filteredProjects.length}
      />

      {/* Projects Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mb-12"
      >
        {/* Grid Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500">
              <Briefcase size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                Featured <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">Projects</span>
              </h3>
              <p className="text-sm text-white/60">
                {filteredProjects.length} of {projects.length} projects
              </p>
            </div>
          </div>

          {/* View All Projects Link */}
          <motion.a
            href="/projects"
            className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-white/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={JSON.stringify(activeFilters)}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="h-full"
                >
                  <ProfessionalProjectCard
                    project={project}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10">
                <Globe size={48} className="text-white/40" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white/80">No projects found</h3>
              <p className="text-white/60">
                Try adjusting your filters to see more projects
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/20 px-4 py-2 text-sm font-medium text-cyan-300 transition-all duration-200 hover:bg-cyan-400/30"
              >
                <Sparkle size={16} />
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/10 p-8 backdrop-blur-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500">
            <Rocket size={32} className="text-white" />
          </div>
          <h3 className="mb-3 text-2xl font-bold text-white">
            Ready to Build Something Amazing?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-white/80">
            Let's collaborate on your next project. I bring expertise in modern web technologies,
            AI integration, and scalable solutions that drive real business results.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Lightning size={16} />
              Start Your Project
            </motion.a>
            <motion.a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star size={16} />
              Download Resume
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Professional Client CTA */}
      <ClientCTA />
    </section>
  );
}
