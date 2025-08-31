import React, { useMemo, useState } from "react";
import {
  PresentationChart, Lightning, BellSimple, Graph, X, Sparkle, CheckCircle, Image as ImageIcon,
} from "phosphor-react";

/**
 * Optional analytics hook — swap with PostHog/Umami if you use them.
 */
function useTrack() {
  return {
    track: (event: string, props?: Record<string, any>) => {
      // Replace with your analytics tool
      // example: posthog.capture(event, props)
      // console.log("track:", event, props);
    },
  };
}

type TabKey = "Overview" | "Screens" | "Alerts" | "AI Insights";

export default function OpsSightCard() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<TabKey>("Overview");
  const { track } = useTrack();

  const tabs: TabKey[] = useMemo(
    () => ["Overview", "Screens", "Alerts", "AI Insights"],
    []
  );

  const onOpen = () => {
    setOpen(true);
    setActive("Overview");
    track("opssight_modal_open");
  };

  const onClose = () => {
    setOpen(false);
    track("opssight_modal_close");
  };

  return (
    <>
      {/* CARD */}
      <article
        className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400/40 hover:bg-white/10"
        aria-label="OpsSight Project Card"
      >
        {/* Top row: product mark + title + metric */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/30 ring-1 ring-white/20 flex items-center justify-center">
              <span className="text-sm font-bold text-white">OS</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white leading-tight">
                OpsSight — <span className="text-cyan-300">AI Revenue Intelligence</span>
              </h3>
              <p className="text-[13px] text-white/70">
                Stops silent revenue leaks across Stripe & funnels.
              </p>
            </div>
          </div>

          <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
            ₹50K/mo recovered (pilot)
          </span>
        </div>

        {/* Badge Row */}
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
            <Sparkle size={14} /> SaaS • AI • RevOps
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
            Stripe + OpenAI verified demo
          </span>
        </div>

        {/* Teaser image */}
        <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <div className="relative aspect-[16/9]">
            {/* preload this image in <Head> for LCP if used in hero */}
            <img
              src="/opssight/preview.png" // TODO: replace with your actual path
              alt="OpsSight Dashboard Preview"
              className="h-full w-full object-cover opacity-90 transition group-hover:scale-[1.02] group-hover:opacity-100"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>

        {/* Highlights */}
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

        {/* Tech */}
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
            onClick={() => track("opssight_demo_clicked")}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white shadow transition hover:opacity-90"
          >
            View Live Demo
          </a>
          <button
            onClick={() => {
              setOpen(true);
              track("opssight_modal_open_book");
            }}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur transition hover:border-cyan-400/40 hover:text-white"
          >
            Book a Pilot
          </button>
        </div>

        {/* Invisible full-click overlay (desktop) */}
        <button
          aria-label="Open OpsSight details"
          onClick={onOpen}
          className="absolute inset-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 md:pointer-events-auto md:bg-transparent"
        />
      </article>

      {/* MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-label="OpsSight Case Study"
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-neutral-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <header className="flex items-center justify-between border-b border-white/10 p-5">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/30 ring-1 ring-white/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">OS</span>
                </div>
                <h4 className="text-lg font-semibold text-white">
                  OpsSight — <span className="text-cyan-300">Case Study</span>
                </h4>
              </div>
              <button
                onClick={onClose}
                className="rounded-md p-2 text-white/70 transition hover:bg-white/5 hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </header>

            {/* Tabs */}
            <nav className="flex gap-2 border-b border-white/10 px-5 pt-3">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActive(tab);
                    track("opssight_modal_tab", { tab });
                  }}
                  className="rounded-full px-3 py-1.5 text-xs text-white/80 hover:bg-white/5 data-[active=true]:bg-white/10 data-[active=true]:text-white"
                  data-active={active === tab}
                >
                  {tab}
                </button>
              ))}
            </nav>

            {/* Content */}
            <div className="max-h-[75vh] space-y-6 overflow-y-auto p-6">
              {active === "Overview" && (
                <>
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
                      <em> AI explanations</em>, <em> Slack/Email alerts</em>, and <em> weekly growth reports</em> so teams can
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

                  {/* Tech & Role */}
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
                    <p className="mt-1 text-xs text-white/50">
                      *Demo environment; real-world numbers vary by product, pricing, and user cohorts.
                    </p>
                  </section>
                </>
              )}

              {active === "Screens" && (
                <section className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-2 flex items-center gap-2 text-white">
                      <ImageIcon size={18} className="text-cyan-300" />
                      <h6 className="font-medium">Dashboard (MRR, Churn, Dunning)</h6>
                    </div>
                    <img
                      src="/opssight/screens/dashboard.png"
                      alt="OpsSight main dashboard"
                      className="w-full rounded-lg border border-white/10"
                      loading="lazy"
                    />
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-2 flex items-center gap-2 text-white">
                      <ImageIcon size={18} className="text-cyan-300" />
                      <h6 className="font-medium">Cohorts & Retention</h6>
                    </div>
                    <img
                      src="/opssight/screens/cohorts.png"
                      alt="OpsSight retention/cohorts"
                      className="w-full rounded-lg border border-white/10"
                      loading="lazy"
                    />
                  </div>
                </section>
              )}

              {active === "Alerts" && (
                <section className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <h6 className="mb-1 font-medium text-white">Slack Alert — Dunning Spike</h6>
                    <p className="text-sm text-white/75">
                      Auto-detects spikes in failed charges and notifies channels with suggested actions (retry cadence, email copy).
                    </p>
                    <div className="mt-3 rounded-lg border border-white/10 bg-neutral-950 p-3 text-sm text-white/80">
                      <pre className="whitespace-pre-wrap break-words">
{`[OpsSight • Revenue Alerts]
⚠️ Dunning risk up 35% last 24h
• Affected cohort: new trials (IN)
• Suggested: shorten retry window to 12h / update retries=4
• Link: /revenue/dunning?date=today`}
                      </pre>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <h6 className="mb-1 font-medium text-white">Email — Weekly Growth Report (PDF)</h6>
                    <p className="text-sm text-white/75">
                      Auto-generated PDF with AI summary for execs/investors.
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-emerald-300 text-sm">
                      <CheckCircle size={16} /> Sample report delivered to founders@company.com
                    </div>
                  </div>
                </section>
              )}

              {active === "AI Insights" && (
                <section className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <h6 className="mb-1 font-medium text-white">Examples</h6>
                    <ul className="list-disc pl-5 text-sm text-white/80 space-y-2">
                      <li>
                        “Churn up 2.1% WoW from India SMBs — likely tied to recent pricing change. Suggest testing 2-month
                        discount for at-risk cohort.”
                      </li>
                      <li>
                        “MRR dip on 15th due to failed renewals; 45% recovered after retry. Recommend proactive email on day-2.”
                      </li>
                    </ul>
                  </div>
                </section>
              )}
            </div>

            {/* Sticky footer CTAs */}
            <footer className="sticky bottom-0 z-10 border-t border-white/10 bg-neutral-900/90 px-6 py-4 backdrop-blur">
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://builtbydarshit.netlify.app/opssight"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("opssight_demo_clicked_footer")}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-5 py-2.5 text-sm font-medium text-white shadow transition hover:opacity-90"
                >
                  View Live Demo
                </a>
                <a
                  href="mailto:darshitshukla1777@gmail.com?subject=OpsSight Pilot&body=Hi Darshit, I'd like to run a pilot for our SaaS."
                  onClick={() => track("opssight_book_pilot_clicked")}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur transition hover:border-cyan-400/40 hover:text-white"
                >
                  Book a Pilot
                </a>
                <a
                  href="https://cal.com/darshit/opssight"
                  onClick={() => track("opssight_schedule_clicked")}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 transition hover:border-cyan-400/40 hover:text-white"
                >
                  Schedule Call
                </a>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
