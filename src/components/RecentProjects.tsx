import { projects } from "@/data/projects";
import { PinContainer } from "./ui/3d-pin";

export const RecentProjects = () => {
  return (
    <section id="projects" className="py-20 lg:py-32 relative overflow-hidden bg-transparent">
      {/* Section Title */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            A small selection of{" "}
            <span className="galactic-text">recent projects</span>
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Explore some of my latest work showcasing modern web technologies and innovative solutions
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(({ id, des, iconLists, img, link, sourceCode, title }) => (
            <div
              key={id}
              className="flex h-[32rem] w-full items-center justify-center"
            >
              <PinContainer title="Visit" href={link}>
                <div className="relative mb-6 flex h-[20vh] w-full items-center justify-center overflow-hidden rounded-2xl">
                  <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl">
                    {/* Background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />

                    {/* Project image placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                        <span className="text-4xl">🚀</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white line-clamp-1">
                    {title}
                  </h3>

                  <p className="text-sm text-white/70 line-clamp-3 leading-relaxed">
                    {des}
                  </p>

                  {/* Tech Stack & Links */}
                  <div className="flex items-center justify-between pt-4">
                    {/* Tech Icons */}
                    <div className="flex items-center space-x-2">
                      {iconLists.slice(0, 3).map((icon, i) => (
                        <div
                          key={icon}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm"
                          style={{
                            transform: `translateX(-${i * 2}px)`,
                          }}
                        >
                          <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full" />
                        </div>
                      ))}
                      {iconLists.length > 3 && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm text-xs text-white/60">
                          +{iconLists.length - 3}
                        </div>
                      )}
                    </div>

                    {/* Source Code Link */}
                    <a
                      href={sourceCode}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300"
                    >
                      Source Code
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </PinContainer>
            </div>
          ))}
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
};
