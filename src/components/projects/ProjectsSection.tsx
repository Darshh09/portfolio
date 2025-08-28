import OpsSightCard from "./OpsSightCard";

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-16">
      <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">
        A small selection of <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">recent projects</span>
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <OpsSightCard />
        {/* add more cards later */}
      </div>
    </section>
  );
}
