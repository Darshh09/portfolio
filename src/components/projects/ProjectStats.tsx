import React from "react";
import {
  Rocket,
  Users,
  Star,
  Lightning,
  Trophy,
  TrendUp,
  CheckCircle,
  Clock,
  Lightbulb
} from "phosphor-react";

interface ProjectStatsProps {
  totalProjects: number;
  completedProjects: number;
  conceptProjects: number;
  totalTechnologies: number;
  averageComplexity: string;
  totalImpact: string;
  completionRate: number;
  averageDuration: string;
}

export default function ProjectStats({
  totalProjects,
  completedProjects,
  conceptProjects,
  totalTechnologies,
  averageComplexity,
  totalImpact,
  completionRate,
  averageDuration
}: ProjectStatsProps) {
  const stats = [
    {
      icon: <Rocket size={24} className="text-cyan-400" />,
      label: "Total Projects",
      value: totalProjects.toString(),
      subtext: "Completed + Concepts",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: <CheckCircle size={24} className="text-green-400" />,
      label: "Completed",
      value: completedProjects.toString(),
      subtext: "Live & Functional",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Lightbulb size={24} className="text-blue-400" />,
      label: "Concepts Ready",
      value: conceptProjects.toString(),
      subtext: "Ready to Build",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Lightning size={24} className="text-fuchsia-400" />,
      label: "Technologies",
      value: totalTechnologies.toString(),
      subtext: "Modern Stack Mastery",
      gradient: "from-fuchsia-500 to-purple-500"
    },
    {
      icon: <Trophy size={24} className="text-emerald-400" />,
      label: "Complexity Level",
      value: averageComplexity,
      subtext: "Advanced Solutions",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: <TrendUp size={24} className="text-rose-400" />,
      label: "Business Impact",
      value: totalImpact,
      subtext: "Value-Driven Results",
      gradient: "from-rose-500 to-pink-500"
    }
  ];

  return (
    <div className="mb-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Professional <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">Portfolio</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-white/80">
          Showcasing completed projects and ready-to-build concepts that demonstrate my expertise.
          From AI-powered SaaS platforms to modern web applications, I bring ideas to life with
          cutting-edge technology and proven development practices.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/20"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* Gradient Border Effect */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10`} />

            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
                {stat.icon}
              </div>

              {/* Value */}
              <div className="mb-2 text-3xl font-bold text-white">
                {stat.value}
              </div>

              {/* Label */}
              <div className="mb-2 text-lg font-semibold text-white/90">
                {stat.label}
              </div>

              {/* Subtext */}
              <div className="text-sm text-white/60">
                {stat.subtext}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-2 -right-2 h-3 w-3 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-150" />
            <div className="absolute -bottom-2 -left-2 h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-400 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-150" />
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm text-white/70 backdrop-blur-sm">
          <Clock size={16} className="text-cyan-400" />
          Average Project Duration: {averageDuration} weeks
        </div>
      </div>
    </div>
  );
}
