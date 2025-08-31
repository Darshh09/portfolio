import React from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Star,
  Lightning,
  CheckCircle,
  ArrowRight,
  Clock,
  Users,
  Trophy,
  Lightbulb
} from "phosphor-react";

export default function ClientCTA() {
  const benefits = [
    {
      icon: <Rocket size={20} className="text-cyan-400" />,
      title: "Fast Development",
      description: "Projects completed in 2-8 weeks with regular updates"
    },
    {
      icon: <Star size={20} className="text-yellow-400" />,
      title: "Premium Quality",
      description: "Clean, scalable code with modern best practices"
    },
    {
      icon: <Lightning size={20} className="text-fuchsia-400" />,
      title: "Ongoing Support",
      description: "Post-launch support and maintenance included"
    },
    {
      icon: <CheckCircle size={20} className="text-green-400" />,
      title: "Client Satisfaction",
      description: "Focused on delivering exactly what you need"
    }
  ];

  const capabilities = [
    { icon: <Lightbulb size={16} className="text-blue-400" />, value: "AI Integration", label: "OpenAI, ML Models" },
    { icon: <Rocket size={16} className="text-cyan-400" />, value: "Modern Stack", label: "React, Node.js, Cloud" },
    { icon: <Trophy size={16} className="text-yellow-400" />, value: "Scalable Solutions", label: "Enterprise Ready" }
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-20 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-10 right-20 h-32 w-32 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/10 to-white/5 p-8 md:p-12 backdrop-blur-sm"
      >
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-transparent to-fuchsia-500/20 opacity-0 transition-opacity duration-1000 hover:opacity-100" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 shadow-2xl shadow-cyan-500/25"
            >
              <Rocket size={40} className="text-white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl"
            >
              Ready to Build Your <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">Digital Solution</span>?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mx-auto max-w-3xl text-lg text-white/80 md:text-xl"
            >
              I specialize in building modern, scalable applications that drive business growth.
              From AI-powered platforms to enterprise solutions, I bring your vision to life with
              cutting-edge technology and proven development practices.
            </motion.p>
          </div>

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
                  {benefit.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {benefit.title}
                </h3>
                <p className="text-sm text-white/70">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Capabilities Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mb-12 flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
          >
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.value}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="mb-2 flex items-center justify-center gap-2">
                  {capability.icon}
                  <span className="text-lg font-bold text-white">{capability.value}</span>
                </div>
                <div className="text-sm text-white/60">{capability.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <motion.a
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-cyan-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Lightning size={24} />
              Start Your Project
              <ArrowRight size={24} className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-lg font-medium text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star size={24} />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-white/50">
              💼 Professional Service • ⚡ Fast Development • 🔒 Secure & Confidential
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
