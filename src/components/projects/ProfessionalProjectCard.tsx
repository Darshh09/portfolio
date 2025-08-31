import React, { useState } from "react";
import {
  ArrowUpRight,
  GithubLogo,
  Play,
  Star,
  Users,
  Calendar,
  Lightning,
  Rocket,
  Code,
  Eye,
  Lightbulb
} from "phosphor-react";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    des: string;
    img: string;
    iconLists: string[];
    link: string;
    sourceCode: string;
    category?: string;
    complexity?: string;
    duration?: string;
    impact?: string;
    status: "completed" | "concept" | "in-progress";
    clientType?: string;
  };
  index: number;
}

export default function ProfessionalProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  const getCategoryColor = (category: string = "web") => {
    const colors = {
      web: "from-blue-500 to-cyan-500",
      mobile: "from-purple-500 to-pink-500",
      ai: "from-emerald-500 to-teal-500",
      saas: "from-orange-500 to-red-500",
      ecommerce: "from-violet-500 to-indigo-500"
    };
    return colors[category as keyof typeof colors] || colors.web;
  };

  const getComplexityIcon = (complexity: string = "medium") => {
    const icons = {
      easy: <Star size={16} className="text-yellow-400" />,
      medium: <Users size={16} className="text-blue-400" />,
      hard: <Rocket size={16} className="text-purple-400" />
    };
    return icons[complexity as keyof typeof icons] || icons.medium;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: {
        text: "Live Demo",
        color: "from-green-500 to-emerald-500",
        icon: <Play size={12} />
      },
      concept: {
        text: "Concept Ready",
        color: "from-blue-500 to-cyan-500",
        icon: <Lightbulb size={12} />
      },
      "in-progress": {
        text: "In Progress",
        color: "from-yellow-500 to-orange-500",
        icon: <Rocket size={12} />
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.concept;

    return (
      <div className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${config.color} px-2 py-1 text-xs font-medium text-white`}>
        {config.icon}
        {config.text}
      </div>
    );
  };

  const isConcept = project.status === "concept";

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/20 ${
        isHovered ? 'scale-[1.02]' : 'scale-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-transparent to-fuchsia-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Content Container */}
      <div className="relative z-10 p-6">
        {/* Header Section */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            {/* Status Badge */}
            <div className="mb-3 flex items-center gap-2">
              {getStatusBadge(project.status)}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${getCategoryColor(project.category)}`} />
                {project.category || "Web App"}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
              {project.title}
            </h3>
          </div>

          {/* Complexity Indicator */}
          <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70">
            {getComplexityIcon(project.complexity)}
            <span className="capitalize">{project.complexity || "Medium"}</span>
          </div>
        </div>

        {/* Description */}
        <p className="mb-4 text-sm leading-6 text-white/80">
          {project.des}
        </p>

        {/* Client Type */}
        {project.clientType && (
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/70">
              <Users size={12} />
              {project.clientType}
            </div>
          </div>
        )}

        {/* Project Image */}
        <div className="relative mb-4 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900">
          {!imageError ? (
            <img
              src={project.img}
              alt={project.title}
              className={`h-48 w-full object-cover transition-all duration-500 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          ) : (
            <div className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
              <div className="text-4xl">🚀</div>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              {isConcept ? <Lightbulb size={24} className="text-white" /> : <Play size={24} className="text-white ml-1" />}
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-4">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.iconLists.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-cyan-400/40 hover:text-cyan-300"
              >
                <Code size={12} />
                {tech.replace('/tech/', '').replace('.svg', '').replace(/([A-Z])/g, ' $1').trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Project Metrics */}
        <div className="mb-6 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-lg border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
            <div className="text-lg font-bold text-cyan-400">
              {project.duration || "2-3"}
            </div>
            <div className="text-xs text-white/60">Weeks</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
            <div className="text-lg font-bold text-fuchsia-400">
              {project.impact || "High"}
            </div>
            <div className="text-xs text-white/60">Impact</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
            <div className="text-lg font-bold text-emerald-400">
              {project.complexity || "Medium"}
            </div>
            <div className="text-xs text-white/60">Complexity</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {isConcept ? (
            <>
              <a
<<<<<<< HEAD
                href="#about"
=======
                href="/contact"
>>>>>>> 4c32745 (feat: Create professional projects section with OpsSight showcase and concept projects - Realistic portfolio for freelance clients)
                className="group/btn flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105"
              >
                <Lightbulb size={16} className="transition-transform duration-300 group-hover/btn:scale-110" />
                Build This Project
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </a>

              <button
                className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/40 hover:text-blue-300 hover:bg-white/20"
              >
                <Eye size={16} />
                View Details
              </button>
            </>
          ) : (
            <>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-105"
              >
                <Play size={16} className="transition-transform duration-300 group-hover/btn:scale-110" />
                Live Demo
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </a>

              <a
                href={project.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-white/20"
              >
                <GithubLogo size={16} />
                Code
              </a>
            </>
          )}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-150" />
      <div className="absolute -bottom-2 -left-2 h-3 w-3 rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-400 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-150" />
    </div>
  );
}
