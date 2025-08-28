import React, { useState } from "react";
import {
  PresentationChart, Lightning, BellSimple, Graph, LinkSimple, X, Sparkle,
} from "phosphor-react";

type Props = {
  onOpen?: () => void; // optional if you wire a global modal router
};

export default function OpsSightCard({ onOpen }: Props) {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
    onOpen?.();
  };

  return (
    <>
      {/* CARD */}
      <article className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400/40 hover:bg-white/10">
        {/* top badge row */}
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
            <Sparkle size={14} /> SaaS • AI • RevOps
          </span>
        </div>

        {/* title */}
        <h3 className="text-xl font-semibold text-white">
          OpsSight — <span className="text-cyan-300">AI-Powered Revenue Intelligence</span>
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/80">
          Real-time MRR, churn, failed payments and funnel health — with AI insights, alerts, and weekly growth reports.
        </p>

        {/* highlights */}
        <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <li className="flex items-center gap-2 text-white/80">
            <PresentationChart size={18} className="text-cyan-300" /> Live revenue dashboards
          </li>
          <li className="flex items-center gap-2 text-white/80">
            <Lightning size={18} className="text-cyan-300" /> AI summaries & actions
          </li>
          <li className="flex items-center gap-2 text-white/80">
            <BellSimple size={18} className="text-cyan-300" /> Slack / Email alerts
          </li>
          <li className="flex items-center gap-2 text-white/80">
            <Graph size={18} className="text-cyan-300" /> Weekly growth reports
          </li>
        </ul>

        {/* tech */}
        <div className="mt-5 flex flex-wrap gap-2">
          {["Next.js", "Tailwind", "Node.js", "Stripe API", "PostgreSQL", "OpenAI"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://builtbydarshit.netlify.app/opssight"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white shadow transition hover:opacity-90"
          >
            View Live Demo
          </a>
          <button
            onClick={openModal}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur transition hover:border-cyan-400/40 hover:text-white"
          >
            Book a Pilot
          </button>
        </div>

        {/* invisible full-click overlay on desktop */}
        <button
          aria-label="Open OpsSight details"
          onClick={openModal}
          className="absolute inset-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 md:pointer-events-auto md:bg-transparent"
        />
      </article>

      {/* MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-neutral-900"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between border-b border-white/10 p-5">
              <h4 className="text-lg font-semibold text-white">
                OpsSight — <span className="text-cyan-300">Case Study</span>
              </h4>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-2 text-white/70 transition hover:bg-white/5 hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </header>

            <div className="space-y-6 p-6">
              {/* Problem */}
              <section>
                <h5 className="text-sm font-semibold uppercase tracking-wider text-white/60">Problem</h5>
                <p className="mt-2 text-white/85">
                  SaaS founders silently lose <strong>10–20% MRR</strong> to failed payments, churn, and funnel leaks.
                  Issues are noticed late, buried across Stripe exports, dashboards, and ad-hoc spreadsheets.
                </p>
              </section>

              {/* Solution */}
              <section>
                <h5 className="text-sm font-semibold uppercase tracking-wider text-white/60">Solution</h5>
                <p className="mt-2 text-white/85">
                  <strong>OpsSight</strong> unifies revenue analytics with <em>real-time dashboards</em>,
                  <em>AI explanations</em>, <em>Slack/Email alerts</em>, and <em>weekly growth reports</em> so teams can
                  detect and fix leaks <em>before</em> they cost big money.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <h6 className="mb-1 font-medium text-white">AI Insights</h6>
                    <p className="text-sm text-white/75">
                      Plain-English summaries of spikes, dips, cohorts, and retention drivers with suggested next steps.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <h6 className="mb-1 font-medium text-white">Leak Alerts</h6>
                    <p className="text-sm text-white/75">
                      Alerts fire to Slack/Email for dunning risk, churn clusters, and sudden funnel anomalies.
                    </p>
                  </div>
                </div>
              </section>

              {/* Tech Stack & Role */}
              <section className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <h6 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/60">Tech Stack</h6>
                  <ul className="space-y-1 text-sm text-white/80">
                    <li>Next.js, Tailwind, Node.js</li>
                    <li>Stripe API, PostgreSQL</li>
                    <li>OpenAI (AI summaries & actions)</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <h6 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/60">My Role</h6>
                  <ul className="space-y-1 text-sm text-white/80">
                    <li>Designed the dashboard UI/UX</li>
                    <li>Integrated Stripe & data pipeline</li>
                    <li>Built AI insights engine</li>
                    <li>Implemented Slack/Email alerting</li>
                  </ul>
                </div>
              </section>

              {/* Impact */}
              <section>
                <h5 className="text-sm font-semibold uppercase tracking-wider text-white/60">Impact (Demo)</h5>
                <p className="mt-2 text-white/85">
                  In a mock data pilot for a seed-stage SaaS, OpsSight flagged dunning and churn cohorts that would have
                  recovered an estimated <strong className="text-cyan-300">₹50K/month</strong> in failed payments.
                </p>
              </section>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://builtbydarshit.netlify.app/opssight"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-5 py-2.5 text-sm font-medium text-white shadow transition hover:opacity-90"
                >
                  View Live Demo
                </a>
                <a
                  href="mailto:darshitshukla1777@gmail.com?subject=OpsSight Pilot&body=Hi Darshit, I'd like to run a pilot for our SaaS."
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur transition hover:border-cyan-400/40 hover:text-white"
                >
                  Book a Pilot
                </a>
                <a
                  href="https://cal.com/darshit/opssight"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 transition hover:border-cyan-400/40 hover:text-white"
                >
                  Schedule Call
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
