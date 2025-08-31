import React from "react";
import { Funnel, X, Sparkle, Rocket, Users, Star } from "phosphor-react";

interface ProjectFiltersProps {
  activeFilters: {
    category: string[];
    complexity: string[];
    impact: string[];
  };
  onFilterChange: (filterType: string, value: string) => void;
  onClearFilters: () => void;
  totalProjects: number;
  filteredCount: number;
}

export default function ProjectFilters({
  activeFilters,
  onFilterChange,
  onClearFilters,
  totalProjects,
  filteredCount
}: ProjectFiltersProps) {
  const categories = [
    { value: "web", label: "Web Apps", icon: "🌐" },
    { value: "mobile", label: "Mobile Apps", icon: "📱" },
    { value: "ai", label: "AI/ML", icon: "🤖" },
    { value: "saas", label: "SaaS", icon: "☁️" },
    { value: "ecommerce", label: "E-commerce", icon: "🛒" }
  ];

  const complexities = [
    { value: "easy", label: "Beginner", icon: <Star size={16} className="text-yellow-400" /> },
    { value: "medium", label: "Intermediate", icon: <Users size={16} className="text-blue-400" /> },
    { value: "hard", label: "Advanced", icon: <Rocket size={16} className="text-purple-400" /> }
  ];

  const impacts = [
    { value: "Low", label: "Low Impact" },
    { value: "Medium", label: "Medium Impact" },
    { value: "High", label: "High Impact" },
    { value: "Very High", label: "Very High Impact" }
  ];

  const hasActiveFilters = Object.values(activeFilters).some(filters => filters.length > 0);

  return (
    <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500">
            <Funnel size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Filter Projects</h3>
            <p className="text-sm text-white/60">
              {filteredCount} of {totalProjects} projects
            </p>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white/70 transition-all duration-200 hover:border-red-400/40 hover:text-red-300 hover:bg-white/20"
          >
            <X size={16} />
            Clear All
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="space-y-6">
        {/* Category Filters */}
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/60">
            Project Type
          </h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => onFilterChange("category", category.value)}
                className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  activeFilters.category.includes(category.value)
                    ? "border-cyan-400/40 bg-cyan-400/20 text-cyan-300"
                    : "border-white/20 bg-white/10 text-white/70 hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-white/20"
                }`}
              >
                <span>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Complexity Filters */}
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/60">
            Complexity Level
          </h4>
          <div className="flex flex-wrap gap-2">
            {complexities.map((complexity) => (
              <button
                key={complexity.value}
                onClick={() => onFilterChange("complexity", complexity.value)}
                className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  activeFilters.complexity.includes(complexity.value)
                    ? "border-cyan-400/40 bg-cyan-400/20 text-cyan-300"
                    : "border-white/20 bg-white/10 text-white/70 hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-white/20"
                }`}
              >
                {complexity.icon}
                {complexity.label}
              </button>
            ))}
          </div>
        </div>

        {/* Impact Filters */}
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/60">
            Business Impact
          </h4>
          <div className="flex flex-wrap gap-2">
            {impacts.map((impact) => (
              <button
                key={impact.value}
                onClick={() => onFilterChange("impact", impact.value)}
                className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  activeFilters.impact.includes(impact.value)
                    ? "border-cyan-400/40 bg-cyan-400/20 text-cyan-300"
                    : "border-white/20 bg-white/10 text-white/70 hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-white/20"
                }`}
              >
                <Sparkle size={16} className="text-cyan-300" />
                {impact.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
          <h4 className="mb-3 text-sm font-semibold text-white/80">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([filterType, values]) =>
              values.map((value) => (
                <span
                  key={`${filterType}-${value}`}
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200"
                >
                  {filterType}: {value}
                  <button
                    onClick={() => onFilterChange(filterType, value)}
                    className="ml-1 rounded-full p-0.5 hover:bg-cyan-400/20"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
