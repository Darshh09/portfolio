import React from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Star,
  Lightning,
  ArrowRight,
  Briefcase,
  Lightbulb,
  CheckCircle
} from "phosphor-react";
import { projects } from "../../data/projects";

export default function ProjectsSection() {
  const completedProjects = projects.filter(p => p.status === 'completed');
  const conceptProjects = projects.filter(p => p.status === 'concept');

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

      {/* Stats Row */}
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 backdrop-blur-sm">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
            <Rocket size={32} className="text-cyan-400" />
          </div>
          <div className="text-3xl font-bold text-white">{projects.length}</div>
          <div className="text-sm text-white/60">Total Projects</div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 backdrop-blur-sm">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
            <CheckCircle size={32} className="text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white">{completedProjects.length}</div>
          <div className="text-sm text-white/60">Completed</div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 backdrop-blur-sm">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
            <Lightbulb size={32} className="text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white">{conceptProjects.length}</div>
          <div className="text-sm text-white/60">Concepts Ready</div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 backdrop-blur-sm">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
            <Star size={32} className="text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-white">25+</div>
          <div className="text-sm text-white/60">Technologies</div>
        </div>
      </div>

      {/* Featured Project - OpsSight SaaS */}
      <div className="mb-16">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500">
            <Star size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              Featured <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">SaaS Product</span>
            </h3>
            <p className="text-sm text-white/60">My flagship AI-powered revenue intelligence platform</p>
          </div>
        </div>

        {/* OpsSight Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-8 backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/20"
        >
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Content */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1 text-xs font-medium text-white">
                  <CheckCircle size={14} /> Live Demo
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 text-xs font-medium text-white">
                  <Lightning size={14} /> Available for Clients
                </span>
              </div>

              <h4 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                OpsSight — <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">AI-Powered Revenue Intelligence</span>
              </h4>

              <p className="mb-6 text-lg leading-7 text-white/80">
                Real-time MRR tracking, churn analysis, and predictive insights with AI-powered
                recommendations. Built for SaaS companies to optimize growth and revenue operations.
                This demonstrates my expertise in building enterprise-level SaaS platforms.
              </p>

              {/* Detailed Features */}
              <div className="mb-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 mt-0.5">
                    <CheckCircle size={12} className="text-cyan-400" />
                  </div>
                  <div className="text-sm text-white/80">
                    <span className="font-semibold text-white">Real-time MRR Tracking:</span> Monitor monthly recurring revenue with live updates,
                    automated calculations, and trend analysis
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-500/20 mt-0.5">
                    <CheckCircle size={12} className="text-fuchsia-400" />
                  </div>
                  <div className="text-sm text-white/80">
                    <span className="font-semibold text-white">AI-Powered Churn Prediction:</span> Machine learning algorithms identify at-risk customers
                    30 days before they churn, with actionable retention strategies
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 mt-0.5">
                    <CheckCircle size={12} className="text-emerald-400" />
                  </div>
                  <div className="text-sm text-white/80">
                    <span className="font-semibold text-white">Predictive Analytics:</span> Advanced forecasting models predict revenue trends,
                    customer lifetime value, and growth opportunities
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/20 mt-0.5">
                    <CheckCircle size={12} className="text-orange-400" />
                  </div>
                  <div className="text-sm text-white/80">
                    <span className="font-semibold text-white">Automated Reporting:</span> Generate executive dashboards, investor reports,
                    and team insights automatically with customizable templates
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="mb-6">
                <h5 className="mb-3 text-lg font-semibold text-white">Technical Architecture</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                      <span className="text-white/80">Next.js 14 + TypeScript</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-fuchsia-400"></div>
                      <span className="text-white/80">Node.js + Express API</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                      <span className="text-white/80">PostgreSQL + Redis</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                      <span className="text-white/80">OpenAI GPT-4 Integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                      <span className="text-white/80">AWS Infrastructure</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                      <span className="text-white/80">Real-time WebSockets</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Impact Metrics */}
              <div className="mb-6">
                <h5 className="mb-3 text-lg font-semibold text-white">Business Impact</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-2 text-2xl font-bold text-cyan-400">60%</div>
                    <div className="text-sm text-white/60">Reduction in manual reporting time</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-2 text-2xl font-bold text-fuchsia-400">40%</div>
                    <div className="text-sm text-white/60">Increase in revenue retention</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-2 text-2xl font-bold text-emerald-400">3x</div>
                    <div className="text-sm text-white/60">Faster decision making</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-2 text-2xl font-bold text-orange-400">$200K+</div>
                    <div className="text-sm text-white/60">Annual cost savings</div>
                  </div>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {["Next.js", "Node.js", "PostgreSQL", "OpenAI", "Tailwind", "TypeScript", "Redis", "AWS", "WebSockets", "Machine Learning"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://builtbydarshit.netlify.app/opssight"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-105"
                >
                  <Lightning size={16} />
                  View Live Demo
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <a
                  href="https://github.com/Darshh09/opssight"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-white/20"
                >
                  <Briefcase size={16} />
                  View Code
                </a>
              </div>
            </div>

            {/* Right Side - Service Offering */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900">
              <div className="h-full w-full p-8">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500">
                    <Rocket size={40} className="text-white" />
                  </div>
                  <h5 className="text-xl font-bold text-white mb-2">Want Something Similar?</h5>
                  <p className="text-white/60 text-sm">I can build this for your business</p>
                </div>

                {/* Money-Saving Punchline */}
                <div className="mb-6 rounded-xl border border-green-500/20 bg-green-500/10 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                      <Star size={14} className="text-white" />
                    </div>
                    <span className="font-bold text-green-400 text-lg">Save $50K+ Annually</span>
                  </div>
                  <p className="text-sm text-white/80">
                    Stop losing money on manual processes. AI automation reduces operational costs by 60% while increasing revenue by 40%.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
                      <CheckCircle size={14} className="text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Custom SaaS Platform</div>
                      <div className="text-sm text-white/60">
                        <span className="text-green-400 font-semibold">Save $100K+</span> vs. enterprise solutions.
                        Tailored to your exact needs, no unnecessary features.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                      <Lightning size={14} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">AI Integration</div>
                      <div className="text-sm text-white/60">
                        <span className="text-blue-400 font-semibold">10x faster</span> decision making.
                        Reduce manual work by 80% with intelligent automation.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20">
                      <Star size={14} className="text-purple-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Revenue Analytics</div>
                      <div className="text-sm text-white/60">
                        <span className="text-purple-400 font-semibold">Stop revenue leaks</span> and identify
                        growth opportunities worth $200K+ annually.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/20">
                      <Rocket size={14} className="text-orange-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Scalable Architecture</div>
                      <div className="text-sm text-white/60">
                        <span className="text-orange-400 font-semibold">Future-proof</span> your business.
                        Handle 10x growth without expensive rebuilds.
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROI Calculator */}
                <div className="mt-6 rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4">
                  <div className="text-center mb-3">
                    <span className="text-cyan-400 font-bold text-sm">ROI Calculator</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="text-center">
                      <div className="text-cyan-400 font-bold">Investment</div>
                      <div className="text-white/60">$15K - $50K</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-400 font-bold">Annual Savings</div>
                      <div className="text-white/60">$50K - $200K</div>
                    </div>
                    <div className="text-center">
                      <div className="text-emerald-400 font-bold">Payback Period</div>
                      <div className="text-white/60">3-6 months</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-400 font-bold">5-Year ROI</div>
                      <div className="text-white/60">500% - 1000%</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <a
                    href="#about"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-105"
                  >
                    <Lightning size={16} />
                    Build This for Me
                  </a>
                  <p className="text-xs text-white/50 mt-2">Start saving money in 3 months</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Ready-to-Build ANYTHING Section */}
      <div className="mb-16">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
            <Lightning size={32} className="text-white" />
          </div>
          <h3 className="mb-3 text-3xl font-bold text-white md:text-4xl">
            Ready to Build <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300 bg-clip-text text-transparent">ANYTHING</span>
          </h3>
          <p className="mx-auto max-w-3xl text-lg text-white/80">
            From simple landing pages to complex enterprise platforms, I can bring your vision to life.
            No project is too big or too small - let's build something extraordinary together.
          </p>
        </div>

        {/* Dynamic Capabilities Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Web Applications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6 backdrop-blur-sm transition-all duration-500 hover:border-blue-400/40 hover:shadow-2xl hover:shadow-blue-500/20"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
              <Rocket size={24} className="text-white" />
            </div>
            <h4 className="mb-3 text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
              Web Applications
            </h4>
            <p className="mb-4 text-sm leading-6 text-white/80">
              Full-stack web apps, dashboards, admin panels, and custom business solutions
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70">React/Next.js</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70">Node.js</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70">Full-Stack</span>
            </div>
            <div className="text-center text-xs text-white/60">
              <span className="font-bold text-blue-400">4-16 weeks</span> • <span className="font-bold text-cyan-400">Any Scale</span>
            </div>
          </motion.div>

          {/* AI & Machine Learning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 backdrop-blur-sm transition-all duration-500 hover:border-purple-400/40 hover:shadow-2xl hover:shadow-purple-500/20"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
              <Lightning size={24} className="text-white" />
            </div>
            <h4 className="mb-3 text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
              AI & Machine Learning
            </h4>
            <p className="mb-4 text-sm leading-6 text-white/80">
              Chatbots, recommendation systems, data analysis, and intelligent automation
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70">OpenAI API</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70">Python</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70">TensorFlow</span>
            </div>
            <div className="text-center text-xs text-white/60">
              <span className="font-bold text-purple-400">6-20 weeks</span> • <span className="font-bold text-pink-400">AI-Powered</span>
            </div>
          </motion.div>

          {/* E-Commerce & Marketplaces */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 backdrop-blur-sm transition-all duration-500 hover:border-green-400/40 hover:shadow-2xl hover:shadow-green-500/20"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-500">
              <Star size={24} className="text-white" />
            </div>
            <h4 className="mb-3 text-xl font-bold text-white group-hover:text-green-300 transition-colors duration-300">
              E-Commerce & Marketplaces
            </h4>
            <p className="mb-4 text-sm leading-6 text-white/80">
              Online stores, multi-vendor platforms, subscription services, and payment systems
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70">Stripe</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70">Shopify API</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70">Multi-Vendor</span>
            </div>
            <div className="text-center text-xs text-white/60">
              <span className="font-bold text-green-400">8-24 weeks</span> • <span className="font-bold text-emerald-400">Revenue Ready</span>
            </div>
          </motion.div>

          {/* Mobile Applications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/10 to-red-500/10 p-6 backdrop-blur-sm transition-all duration-500 hover:border-orange-400/40 hover:shadow-2xl hover:shadow-orange-500/20"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-red-500">
              <Rocket size={24} className="text-white" />
            </div>
            <h4 className="mb-3 text-xl font-bold text-white group-hover:text-orange-300 transition-colors duration-300">
              Mobile Applications
            </h4>
            <p className="mb-4 text-sm leading-6 text-white/80">
              Cross-platform mobile apps, PWA solutions, and native mobile experiences
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70">React Native</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70">Flutter</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70">PWA</span>
            </div>
            <div className="text-center text-xs text-white/60">
              <span className="font-bold text-orange-400">6-18 weeks</span> • <span className="font-bold text-red-400">Cross-Platform</span>
            </div>
          </motion.div>

          {/* SaaS Platforms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 p-6 backdrop-blur-sm transition-all duration-500 hover:border-indigo-400/40 hover:shadow-2xl hover:shadow-indigo-500/20"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500">
              <CheckCircle size={24} className="text-white" />
            </div>
            <h4 className="mb-3 text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
              SaaS Platforms
            </h4>
            <p className="mb-4 text-sm leading-6 text-white/80">
              Subscription-based software, user management, analytics, and scalable architecture
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70">Microservices</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70">AWS</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70">Scalable</span>
            </div>
            <div className="text-center text-xs text-white/60">
              <span className="font-bold text-indigo-400">12-32 weeks</span> • <span className="font-bold text-blue-400">Enterprise Ready</span>
            </div>
          </motion.div>

          {/* Custom Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-pink-500/10 to-rose-500/10 p-6 backdrop-blur-sm transition-all duration-500 hover:border-pink-400/40 hover:shadow-2xl hover:shadow-pink-500/20"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-rose-500">
              <Lightbulb size={24} className="text-white" />
            </div>
            <h4 className="mb-3 text-xl font-bold text-white group-hover:text-pink-300 transition-colors duration-300">
              Custom Solutions
            </h4>
            <p className="mb-4 text-sm leading-6 text-white/80">
              Unique business requirements, integrations, automation, and specialized tools
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70">Custom API</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70">Integration</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70">Tailored</span>
            </div>
            <div className="text-center text-xs text-white/60">
              <span className="font-bold text-pink-400">4-∞ weeks</span> • <span className="font-bold text-rose-400">100% Custom</span>
            </div>
          </motion.div>
        </div>

        {/* Unlimited Possibilities CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 to-white/10 p-8 backdrop-blur-sm"
        >
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
              <Lightning size={40} className="text-white" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              Your Vision, My Expertise
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-lg text-white/80">
              Don't see exactly what you need? That's perfect! I specialize in bringing unique ideas to life.
              Whether it's a simple landing page or a complex enterprise platform, I can build it.
            </p>
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                No project too small
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                No project too complex
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                No deadline too tight
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href="#about"
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Lightning size={20} />
                Start Your Project
              </motion.a>
              <motion.a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-lg font-medium text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/40 hover:text-purple-300 hover:bg-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Star size={20} />
                Download Resume
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
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
    </section>
  );
}
