import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Search,
  FileSearch,
  Fingerprint,
  Lightbulb,
  FlaskConical,
  Gavel,
  FileText,
  Presentation,
  X,
  MousePointer2,
  TrendingDown,
  Target,
  Repeat,
  Zap,
  Map,
  SplitSquareHorizontal,
} from "lucide-react";
const notionHero = { url: "/assets/notion-hero.jpg" };
const notionBefore = { url: "/assets/notion-before.jpg" };
const notionAfter = { url: "/assets/notion-after.jpg" };
const deck = { url: "https://drive.google.com/file/d/1_Tj8XkFOFrQvULYWyIn9RTBIYm8OJUJp/view?usp=sharing" };
import { AtAGlance } from "@/components/at-a-glance";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/work/notion")({
  head: () => ({
    meta: [
      { title: "Notion — A Product Investigation | Shipra Maurya" },
      {
        name: "description",
        content:
          "A product teardown of Notion: why thousands of students sign up but never build anything — and an evidence-backed recommendation to turn it into a Career Growth OS.",
      },
      { property: "og:title", content: "Notion — A Product Investigation" },
      {
        property: "og:description",
        content:
          "Question → Evidence → Patterns → Hypothesis → Experiment → Recommendation. A calm, evidence-led product investigation.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: notionHero.url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NotionInvestigation,
});

/* ----------------------------- Palette ----------------------------------- */
const C = {
  black: "#191918",
  ink: "#37352F",
  grey: "#787066",
  greyLight: "#9B958A",
  line: "#E9E6DF",
  soft: "#F7F5F1",
  softer: "#FBFAF7",
  beige: "#EFEAE0",
  white: "#FFFFFF",
  blue: "#2383E2",
  green: "#3F9E6E",
  amber: "#D9A441",
  red: "#C6524A",
};
const DISPLAY = "'Space Grotesk', sans-serif";
const MONO = "'IBM Plex Mono', monospace";

/* ----------------------------- Hooks ------------------------------------- */
function useCountUp(target: number, decimals = 0, duration = 1500) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduce]);
  return { ref, display: val.toFixed(decimals) };
}

/* ----------------------------- Atoms ------------------------------------- */
function Fade({
  children,
  delay = 0,
  className,
  y = 22,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function StageLabel({ icon: Icon, step, label }: { icon: typeof Search; step: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="flex size-9 items-center justify-center rounded-xl"
        style={{ background: C.beige, color: C.ink }}
      >
        <Icon className="size-[18px]" />
      </span>
      <div className="leading-tight">
        <span className="block text-[0.64rem] font-semibold uppercase tracking-[0.24em]" style={{ color: C.greyLight, fontFamily: MONO }}>
          {step}
        </span>
        <span className="block text-sm font-semibold" style={{ color: C.ink }}>
          {label}
        </span>
      </div>
    </div>
  );
}

function SectionHead({
  icon,
  step,
  kicker,
  title,
  lead,
}: {
  icon: typeof Search;
  step: string;
  kicker: string;
  title: string;
  lead?: string;
}) {
  return (
    <Fade className="max-w-2xl">
      <StageLabel icon={icon} step={step} label={kicker} />
      <h2
        className="mt-6 text-[clamp(1.7rem,3.6vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.02em]"
        style={{ color: C.black, fontFamily: DISPLAY }}
      >
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-[1.02rem] leading-relaxed" style={{ color: C.grey }}>
          {lead}
        </p>
      )}
    </Fade>
  );
}

/* ----------------------------- Progress ---------------------------------- */
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left" style={{ scaleX, background: C.ink }} />;
}

/* ----------------------------- At a Glance ------------------------------- */
function GlanceCard() {
  return (
    <AtAGlance
      project="Notion · Investigation"
      rows={[
        { k: "Overview", v: "A product teardown: why students sign up but never build anything." },
        { k: "Evidence", v: "100K sign-ups → 18K activated. 82K never reach value." },
        { k: "Root Cause", v: "Not difficulty — a career-progression gap. Purpose, not usability." },
        { k: "Hypotheses", v: "H1 career onboarding lifts activation · H2 habit nudges lift retention." },
        { k: "Experiments", v: "Choose-a-goal onboarding vs blank canvas; ~4-week A/B." },
        { k: "Recommendation", v: "Don't make Notion easier — make it a Career Growth OS." },
        { k: "Downloads", v: "Investigation deck · Product report." },
      ]}
      palette={{
        cardBg: "rgba(251,250,247,0.96)",
        border: C.line,
        title: C.ink,
        label: C.greyLight,
        value: C.ink,
        chipBg: C.beige,
        chipFg: C.ink,
        btnBg: C.black,
        btnFg: C.white,
        shadow: "0 24px 60px -30px rgba(25,25,24,0.4)",
      }}
    />
  );
}

/* ----------------------------- Data -------------------------------------- */
const EVIDENCE = [
  { value: 100, suffix: "K+", label: "Sign-ups", tone: C.ink },
  { value: 18, suffix: "%", label: "Activated", tone: C.amber },
  { value: 82, suffix: "K", label: "Never create value", tone: C.red },
];

const FUNNEL = [
  { stage: "Visits", value: 500, pct: 100 },
  { stage: "Sign-ups", value: 100, pct: 20 },
  { stage: "First page", value: 55, pct: 11 },
  { stage: "Template users", value: 40, pct: 8 },
  { stage: "Activated (3+ pages)", value: 18, pct: 3.6, leak: true },
  { stage: "D7 active", value: 16, pct: 3.2 },
  { stage: "D30 active", value: 7, pct: 1.4 },
];

const JOURNEY = ["Saw Notion on YouTube", "Signed up", "Opened workspace", "Blank canvas — no idea what to build", "Left"];

const CONVERSION = [
  { k: "Visit→Signup", v: 20 },
  { k: "3+ Pages", v: 18 },
  { k: "D7", v: 16 },
  { k: "D30", v: 7 },
  { k: "Referral", v: 5 },
  { k: "Paid", v: 1.2 },
];

const DATA_CARDS = [
  {
    icon: TrendingDown,
    tag: "AARRR Funnel",
    headline: "−55%",
    sub: "template users who never activate",
    insight: "Activation — not acquisition — is the biggest leak in the funnel.",
  },
  {
    icon: Target,
    tag: "North Star Metric",
    headline: "WRAU",
    sub: "Weekly Returning Activated Users",
    insight: "3+ pages AND return in 2+ distinct weeks — activation and habit in one number.",
  },
  {
    icon: MousePointer2,
    tag: "Activation Drop",
    headline: "18%",
    sub: "reach a useful workspace",
    insight: "Activation drops before retention drops — the disease, not the symptom.",
  },
  {
    icon: Repeat,
    tag: "Retention Drop",
    headline: "56%",
    sub: "of D7 users churn by D30",
    insight: "A real habit leak remains at D7→D30, so we treat activation and retention together.",
  },
];

const HYPOTHESES = [
  {
    tag: "H1 · Activation",
    title: "Career onboarding increases activation",
    evidence: "Only 18% of sign-ups reach 3+ pages — the blank canvas creates paralysis.",
    why: "A placement-prep “Start with 3 pages” wizard gives students a reason to build on day one.",
    metric: "Activation",
    from: "18%",
    to: "28%",
    tone: C.blue,
  },
  {
    tag: "H2 · Retention",
    title: "Habit nudges improve retention",
    evidence: "56% of D7 users churn by D30 — activation without habit still leaks.",
    why: "D1/D3/D7 nudges tied to a recurring task give activated users a reason to return.",
    metric: "D30 Retention",
    from: "7%",
    to: "12%",
    tone: C.green,
  },
];

const WIZARD_STEPS = ["Placement Preparation", "Resume Tracker", "Projects", "Internships", "Interview Prep", "Career Dashboard"];

const VERDICT_KPIS = [
  { label: "Activation", from: "18%", to: "28%" },
  { label: "D7 Retention", from: "16%", to: "24%" },
  { label: "D30 Retention", from: "7%", to: "12–15%" },
];

const SOLUTION_TABS = [
  {
    id: "prioritisation",
    label: "Prioritisation",
    icon: Zap,
    heading: "Where the 24 points go",
    note: "5 initiatives across activation, retention & referral. A 3-point buffer left on purpose.",
    quadrants: [
      { title: "Quick Wins", items: ["Onboarding checklist · 3", "Simpler template preview · 3", "D1/D3/D7 nudges · 4"], tone: C.green },
      { title: "Strategic Investments", items: ["Career productivity bundle · 5", "3-page wizard · 6"], tone: C.blue },
      { title: "Future Opportunities", items: ["WhatsApp share · 4", "Group workspace template · 5"], tone: C.amber },
      { title: "Attractive Distractions", items: ["AI workspace builder · 9", "Creator marketplace · 8"], tone: C.red },
    ],
  },
  {
    id: "roadmap",
    label: "90-Day Roadmap",
    icon: Map,
    heading: "A staircase, not a checklist",
    note: "Each step compounds on the last — discovery, system, then identity.",
    steps: [
      { step: "Days 1–30", title: "Discover Your Path", items: ["3-page wizard", "Career productivity bundle", "Template preview"], metric: "Activation 18% → 28%" },
      { step: "Days 31–60", title: "Build Your System", items: ["D1/D3/D7 habit nudges", "Weekly recurring view", "In-app checklist"], metric: "D7 16% → 24%" },
      { step: "Days 61–90", title: "Create Career Identity", items: ["Career bundle → paid", "Convert early-career", "Experiment analysis"], metric: "D30 7% → 12%" },
    ],
  },
  {
    id: "experiment",
    label: "Experiment Design",
    icon: SplitSquareHorizontal,
    heading: "Choose-a-goal onboarding vs the blank canvas",
    note: "Success: 3+ page creation within 7 days. Guardrail: no drop in first-page rate. ~4 weeks, new Indian student sign-ups.",
    control: ["Sign up", "Blank workspace"],
    variant: ["Sign up", "Choose your goal", "Placement prep", "3-page wizard"],
    success: "18% → 28%",
  },
];

/* ----------------------------- Page -------------------------------------- */
function NotionInvestigation() {
  const [tab, setTab] = useState(SOLUTION_TABS[0].id);
  const [zoom, setZoom] = useState<string | null>(null);
  const active = SOLUTION_TABS.find((t) => t.id === tab)!;

  return (
    <div style={{ background: C.white, color: C.ink, fontFamily: "Inter, sans-serif" }}>
      <ProgressBar />
      <GlanceCard />

      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden" style={{ background: C.softer }}>
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36">
          <Fade>
            <Link
              to="/"
              hash="work"
              className="group mb-10 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: C.grey }}
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </Fade>
          <Fade>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em]"
              style={{ background: C.beige, color: C.ink, fontFamily: MONO }}
            >
              <FileSearch className="size-3.5" /> Product Investigation
            </span>
          </Fade>
          <Fade delay={0.06}>
            <h1
              className="mt-7 text-[clamp(3.2rem,11vw,8rem)] font-semibold leading-[0.92] tracking-[-0.04em]"
              style={{ color: C.black, fontFamily: DISPLAY }}
            >
              Notion
            </h1>
          </Fade>
          <Fade delay={0.12}>
            <p className="mt-3 text-[clamp(1.1rem,2.4vw,1.6rem)] font-light" style={{ color: C.grey }}>
              A Product Investigation
            </p>
          </Fade>
          <Fade delay={0.18}>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed" style={{ color: C.ink }}>
              Why do thousands of students sign up — but never build anything?
            </p>
          </Fade>

          <Fade delay={0.24} className="mt-12">
            <div
              className="overflow-hidden rounded-3xl border"
              style={{ borderColor: C.line, boxShadow: "0 40px 90px -50px rgba(25,25,24,0.5)" }}
            >
              <img
                src={notionHero.url}
                alt="An almost empty Notion workspace with a single blinking cursor"
                width={1600}
                height={1008}
                className="w-full"
              />
            </div>
          </Fade>

          {/* Evidence cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {EVIDENCE.map((e, i) => (
              <EvidenceStat key={e.label} {...e} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 1 · THE MYSTERY ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
        <SectionHead
          icon={Search}
          step="Question · 01"
          kicker="The Investigation Begins"
          title="Why do users abandon Notion after signing up?"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Fade>
            <div
              className="flex h-full flex-col justify-between rounded-3xl p-8 md:p-10"
              style={{ background: C.black, color: C.white }}
            >
              <span className="text-[0.66rem] font-semibold uppercase tracking-[0.24em]" style={{ color: C.greyLight, fontFamily: MONO }}>
                The mystery
              </span>
              <p className="mt-6 text-[clamp(1.3rem,2.6vw,1.9rem)] font-medium leading-snug" style={{ fontFamily: DISPLAY }}>
                Users don't abandon Notion because it's difficult. They abandon it because they don't see how it helps them grow.
              </p>
              <p className="mt-6 text-sm" style={{ color: C.greyLight }}>
                Curiosity is not the problem. <span style={{ color: C.white }}>Purpose is.</span>
              </p>
            </div>
          </Fade>
          <div className="grid gap-4">
            {[
              { v: "100K", l: "Sign-ups", tone: C.ink },
              { v: "18K", l: "Activated", tone: C.amber },
              { v: "82K", l: "Lost", tone: C.red },
            ].map((s, i) => (
              <Fade key={s.l} delay={i * 0.06}>
                <div
                  className="flex items-center justify-between rounded-2xl border px-7 py-6"
                  style={{ borderColor: C.line, background: C.softer }}
                >
                  <span className="text-3xl font-semibold" style={{ color: s.tone, fontFamily: MONO }}>
                    {s.v}
                  </span>
                  <span className="text-sm font-medium" style={{ color: C.grey }}>
                    {s.l}
                  </span>
                </div>
              </Fade>
            ))}
          </div>
        </div>

        {/* Funnel dashboard */}
        <Fade className="mt-8">
          <div className="rounded-3xl border p-7 md:p-10" style={{ borderColor: C.line, background: C.white }}>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.24em]" style={{ color: C.greyLight, fontFamily: MONO }}>
                  Acquisition → Activation funnel
                </span>
                <h3 className="mt-2 text-xl font-medium" style={{ color: C.black, fontFamily: DISPLAY }}>
                  Where the funnel bleeds
                </h3>
              </div>
              <span className="text-sm" style={{ color: C.grey }}>
                Only 18% reach a useful workspace
              </span>
            </div>
            <div className="mt-8 space-y-3">
              {FUNNEL.map((f, i) => (
                <FunnelRow key={f.stage} {...f} delay={i * 0.05} />
              ))}
            </div>
          </div>
        </Fade>
      </section>

      {/* ---------------- SECTION 2 · EVIDENCE BOARD ---------------- */}
      <section style={{ background: C.soft }}>
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
          <SectionHead
            icon={FileSearch}
            step="Evidence · 02"
            kicker="The Evidence Board"
            title="Following the user, step by step"
            lead="Reconstructing the exact path a student takes — from curiosity to abandonment."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Sticky notes chain */}
            <div className="relative flex flex-col gap-3">
              {JOURNEY.map((j, i) => {
                const turning = i === 3;
                return (
                  <Fade key={j} delay={i * 0.08}>
                    <div className="flex flex-col items-center">
                      <div
                        className="w-full max-w-sm -rotate-1 rounded-xl px-5 py-4 text-sm font-medium shadow-sm"
                        style={{
                          background: turning ? C.black : C.white,
                          color: turning ? C.white : C.ink,
                          border: `1px solid ${turning ? C.black : C.line}`,
                          transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)`,
                        }}
                      >
                        {turning && (
                          <span className="mb-1 block text-[0.6rem] font-semibold uppercase tracking-[0.2em]" style={{ color: C.amber, fontFamily: MONO }}>
                            The turning point
                          </span>
                        )}
                        {j}
                      </div>
                      {i < JOURNEY.length - 1 && <span className="my-1 h-6 w-px" style={{ background: C.line }} />}
                    </div>
                  </Fade>
                );
              })}
            </div>
            {/* Screenshot + annotations */}
            <Fade delay={0.12}>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setZoom(notionBefore.url)}
                  className="block w-full overflow-hidden rounded-2xl border text-left"
                  style={{ borderColor: C.line, boxShadow: "0 30px 70px -50px rgba(25,25,24,0.5)" }}
                >
                  <img
                    src={notionBefore.url}
                    alt="A blank Notion workspace — the blank canvas problem"
                    width={1200}
                    height={1008}
                    loading="lazy"
                    className="w-full"
                  />
                </button>
                <span
                  className="absolute -top-3 left-6 -rotate-2 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm"
                  style={{ background: C.amber, color: C.white, fontFamily: MONO }}
                >
                  "Blank Canvas" → paralysis
                </span>
                <span
                  className="absolute bottom-6 right-6 rotate-1 rounded-lg border px-3 py-1.5 text-xs font-medium shadow-sm"
                  style={{ background: C.white, color: C.grey, borderColor: C.line }}
                >
                  No template. No prompt. No reason to stay.
                </span>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 3 · WHAT THE DATA REVEALS ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
        <SectionHead
          icon={Fingerprint}
          step="Patterns · 03"
          kicker="What the Data Reveals"
          title="Activation is the disease. Retention is the symptom."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {DATA_CARDS.map((d, i) => (
            <Fade key={d.tag} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-2xl border p-7" style={{ borderColor: C.line, background: C.softer }}>
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg" style={{ background: C.beige, color: C.ink }}>
                    <d.icon className="size-[18px]" />
                  </span>
                  <span className="text-[0.66rem] font-semibold uppercase tracking-[0.2em]" style={{ color: C.greyLight, fontFamily: MONO }}>
                    {d.tag}
                  </span>
                </div>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-4xl font-semibold" style={{ color: C.black, fontFamily: MONO }}>
                    {d.headline}
                  </span>
                  <span className="text-sm" style={{ color: C.grey }}>
                    {d.sub}
                  </span>
                </div>
                <p className="mt-5 border-t pt-4 text-sm leading-relaxed" style={{ color: C.ink, borderColor: C.line }}>
                  {d.insight}
                </p>
              </div>
            </Fade>
          ))}
        </div>

        {/* Conversion bar chart */}
        <Fade className="mt-6">
          <div className="rounded-2xl border p-7 md:p-10" style={{ borderColor: C.line }}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium" style={{ color: C.black, fontFamily: DISPLAY }}>
                Conversion by stage
              </h3>
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color: C.greyLight, fontFamily: MONO }}>
                % conversion
              </span>
            </div>
            <div className="mt-8 flex items-end justify-between gap-3" style={{ height: 200 }}>
              {CONVERSION.map((c, i) => (
                <BarCol key={c.k} label={c.k} value={c.v} max={20} delay={i * 0.06} />
              ))}
            </div>
          </div>
        </Fade>
      </section>

      {/* ---------------- SECTION 4 · HYPOTHESES ---------------- */}
      <section style={{ background: C.soft }}>
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
          <SectionHead
            icon={Lightbulb}
            step="Hypothesis · 04"
            kicker="Two Bets, One Root Cause"
            title="If the gap is purpose, these two moves close it"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {HYPOTHESES.map((h, i) => (
              <Fade key={h.tag} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-3xl border bg-white p-8 md:p-10" style={{ borderColor: C.line }}>
                  <span
                    className="inline-flex w-fit items-center rounded-full px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.18em]"
                    style={{ background: `${h.tone}18`, color: h.tone, fontFamily: MONO }}
                  >
                    {h.tag}
                  </span>
                  <h3 className="mt-5 text-2xl font-medium leading-snug" style={{ color: C.black, fontFamily: DISPLAY }}>
                    {h.title}
                  </h3>
                  <dl className="mt-6 space-y-4 text-sm">
                    <div>
                      <dt className="text-[0.64rem] font-semibold uppercase tracking-[0.18em]" style={{ color: C.greyLight, fontFamily: MONO }}>
                        Evidence
                      </dt>
                      <dd className="mt-1" style={{ color: C.ink }}>
                        {h.evidence}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.64rem] font-semibold uppercase tracking-[0.18em]" style={{ color: C.greyLight, fontFamily: MONO }}>
                        Why this matters
                      </dt>
                      <dd className="mt-1" style={{ color: C.ink }}>
                        {h.why}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-auto flex items-center justify-between rounded-2xl px-6 py-5" style={{ background: C.softer }}>
                    <span className="text-[0.64rem] font-semibold uppercase tracking-[0.18em]" style={{ color: C.greyLight, fontFamily: MONO }}>
                      {h.metric}
                    </span>
                    <span className="flex items-center gap-2 text-xl font-semibold" style={{ fontFamily: MONO }}>
                      <span style={{ color: C.grey }}>{h.from}</span>
                      <ArrowRight className="size-4" style={{ color: h.tone }} />
                      <span style={{ color: h.tone }}>{h.to}</span>
                    </span>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 5 · THE BREAKTHROUGH ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
        <SectionHead
          icon={Zap}
          step="Breakthrough · 05"
          kicker="From Blank Canvas to Guided Path"
          title="Same product. A reason to open it."
        />
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
          <Fade>
            <BeforeAfter
              label="Before"
              tone={C.red}
              img={notionBefore.url}
              caption="An empty workspace. Overwhelming, directionless."
              onZoom={() => setZoom(notionBefore.url)}
            />
          </Fade>
          <Fade delay={0.1}>
            <BeforeAfter
              label="After"
              tone={C.green}
              img={notionAfter.url}
              caption="A guided onboarding wizard for career readiness."
              onZoom={() => setZoom(notionAfter.url)}
            />
          </Fade>
        </div>
        <Fade className="mt-6">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl border px-6 py-5" style={{ borderColor: C.line, background: C.softer }}>
            {WIZARD_STEPS.map((s, i) => (
              <span key={s} className="flex items-center gap-3">
                <span className="rounded-lg px-3 py-1.5 text-xs font-medium" style={{ background: C.beige, color: C.ink }}>
                  {s}
                </span>
                {i < WIZARD_STEPS.length - 1 && <ArrowRight className="size-3.5" style={{ color: C.greyLight }} />}
              </span>
            ))}
          </div>
        </Fade>
      </section>

      {/* ---------------- SECTION 6 · WHY THIS SOLUTION ---------------- */}
      <section style={{ background: C.soft }}>
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
          <SectionHead
            icon={FlaskConical}
            step="Experiment · 06"
            kicker="Why This Solution"
            title="Prioritised, sequenced, and testable"
          />
          {/* Tabs */}
          <Fade className="mt-10">
            <div className="flex flex-wrap gap-2">
              {SOLUTION_TABS.map((t) => {
                const on = t.id === tab;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors"
                    style={{
                      background: on ? C.black : C.white,
                      color: on ? C.white : C.grey,
                      border: `1px solid ${on ? C.black : C.line}`,
                    }}
                  >
                    <t.icon className="size-4" />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </Fade>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border bg-white p-7 md:p-10"
                style={{ borderColor: C.line }}
              >
                <h3 className="text-xl font-medium" style={{ color: C.black, fontFamily: DISPLAY }}>
                  {active.heading}
                </h3>
                <p className="mt-2 max-w-2xl text-sm" style={{ color: C.grey }}>
                  {active.note}
                </p>

                {active.quadrants && (
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {active.quadrants.map((q) => (
                      <div key={q.title} className="rounded-2xl border p-6" style={{ borderColor: C.line, background: C.softer }}>
                        <span className="text-[0.64rem] font-semibold uppercase tracking-[0.18em]" style={{ color: q.tone, fontFamily: MONO }}>
                          {q.title}
                        </span>
                        <ul className="mt-3 space-y-2 text-sm" style={{ color: C.ink }}>
                          {q.items.map((it) => (
                            <li key={it} className="flex items-center justify-between gap-3 border-b pb-2 last:border-0" style={{ borderColor: C.line }}>
                              {it}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {active.steps && (
                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {active.steps.map((s, i) => (
                      <div key={s.title} className="flex flex-col rounded-2xl border p-6" style={{ borderColor: C.line, background: C.softer }}>
                        <span className="text-[0.64rem] font-semibold uppercase tracking-[0.18em]" style={{ color: C.greyLight, fontFamily: MONO }}>
                          Step {i + 1} · {s.step}
                        </span>
                        <h4 className="mt-2 text-lg font-medium" style={{ color: C.black, fontFamily: DISPLAY }}>
                          {s.title}
                        </h4>
                        <ul className="mt-4 flex-1 space-y-2 text-sm" style={{ color: C.ink }}>
                          {s.items.map((it) => (
                            <li key={it} className="flex items-start gap-2">
                              <span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: C.grey }} />
                              {it}
                            </li>
                          ))}
                        </ul>
                        <span className="mt-5 rounded-lg px-3 py-2 text-center text-xs font-semibold" style={{ background: C.black, color: C.white, fontFamily: MONO }}>
                          {s.metric}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {active.control && (
                  <div className="mt-8 grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
                    <FlowColumn title="Control" steps={active.control} tone={C.grey} />
                    <span className="justify-self-center rounded-full border px-4 py-2 text-xs font-semibold" style={{ borderColor: C.line, color: C.grey, fontFamily: MONO }}>
                      VS
                    </span>
                    <FlowColumn title="Variant" steps={active.variant!} tone={C.green} highlight />
                    <div className="md:col-span-3">
                      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-6 py-5" style={{ background: C.black, color: C.white }}>
                        <span className="text-[0.64rem] font-semibold uppercase tracking-[0.18em]" style={{ color: C.greyLight, fontFamily: MONO }}>
                          Success metric · 3+ pages in 7 days
                        </span>
                        <span className="text-xl font-semibold" style={{ fontFamily: MONO }}>
                          {active.success}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 7 · THE VERDICT ---------------- */}
      <section className="relative overflow-hidden" style={{ background: C.black, color: C.white }}>
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-32">
          <Fade>
            <StageLabel icon={Gavel} step="Recommendation · 07" label="The Verdict" />
          </Fade>
          <Fade delay={0.06}>
            <p className="mt-10 text-lg" style={{ color: C.greyLight }}>
              Should Notion become easier?
            </p>
          </Fade>
          <Fade delay={0.12}>
            <h2 className="mt-3 text-[clamp(4rem,16vw,11rem)] font-semibold leading-[0.85] tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>
              No.
            </h2>
          </Fade>
          <Fade delay={0.18}>
            <p className="mt-8 max-w-2xl text-[clamp(1.3rem,3vw,2rem)] font-light leading-snug" style={{ fontFamily: DISPLAY }}>
              Don't make Notion easier to use. Make it meaningful — transform it into a{" "}
              <span style={{ color: C.blue }}>Career Growth OS</span> for students.
            </p>
          </Fade>
          <Fade delay={0.22}>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm" style={{ color: C.greyLight, fontFamily: MONO }}>
              {["Campus", "Internship", "Placement", "First Job", "Career Growth"].map((s, i, arr) => (
                <span key={s} className="flex items-center gap-3">
                  <span style={{ color: i === arr.length - 1 ? C.green : i === 0 ? C.white : C.greyLight }}>{s}</span>
                  {i < arr.length - 1 && <ArrowRight className="size-3.5" />}
                </span>
              ))}
            </div>
          </Fade>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {VERDICT_KPIS.map((k, i) => (
              <Fade key={k.label} delay={i * 0.08}>
                <div className="rounded-2xl border p-7" style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.04)" }}>
                  <span className="text-[0.64rem] font-semibold uppercase tracking-[0.2em]" style={{ color: C.blue, fontFamily: MONO }}>
                    {k.label}
                  </span>
                  <div className="mt-4 flex items-center gap-3 text-3xl font-semibold" style={{ fontFamily: MONO }}>
                    <span style={{ color: C.greyLight }}>{k.from}</span>
                    <ArrowRight className="size-5" style={{ color: C.green }} />
                    <span style={{ color: C.green }}>{k.to}</span>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- DOWNLOADS ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-24">
        <SectionHead icon={FileText} step="Appendix" kicker="Explore the full investigation" title="The evidence behind the verdict" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            { icon: Presentation, title: "Investigation Deck", desc: "The full 90-day product growth plan, slide by slide.", cta: "Download presentation" },
            { icon: FileText, title: "Product Investigation Report", desc: "Framing, funnel diagnosis, hypotheses and experiment design.", cta: "Download report" },
          ].map((d, i) => (
            <Fade key={d.title} delay={i * 0.06}>
              <a
                href={deck.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl border p-7 transition-all hover:-translate-y-1"
                style={{ borderColor: C.line, background: C.white, boxShadow: "0 16px 40px -30px rgba(25,25,24,0.35)" }}
              >
                <span className="flex size-12 items-center justify-center rounded-xl" style={{ background: C.beige, color: C.ink }}>
                  <d.icon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold" style={{ color: C.black, fontFamily: DISPLAY }}>
                  {d.title}
                </h3>
                <p className="mt-2 flex-1 text-sm" style={{ color: C.grey }}>
                  {d.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: C.ink }}>
                  {d.cta}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </Fade>
          ))}
        </div>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <section style={{ background: C.soft }}>
        <div className="mx-auto max-w-4xl px-5 py-24 text-center md:px-10 md:py-32">
          <Fade>
            <span className="text-[0.66rem] font-semibold uppercase tracking-[0.24em]" style={{ color: C.greyLight, fontFamily: MONO }}>
              End of the investigation
            </span>
            <h2 className="mx-auto mt-6 max-w-3xl text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em]" style={{ color: C.black, fontFamily: DISPLAY }}>
              Let's build something meaningful together.
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/"
                hash="contact"
                className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-transform hover:translate-x-0.5"
                style={{ background: C.black, color: C.white }}
              >
                Contact
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/"
                hash="work"
                className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                style={{ color: C.grey }}
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                Back to Projects
              </Link>
            </div>
          </Fade>
        </div>
      </section>

      <SiteFooter />

      {/* ---------------- LIGHTBOX ---------------- */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10"
            style={{ background: "rgba(25,25,24,0.82)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(null)}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full"
              style={{ background: "rgba(255,255,255,0.14)", color: C.white }}
            >
              <X className="size-5" />
            </button>
            <motion.img
              src={zoom}
              alt="Enlarged screenshot"
              className="max-h-full max-w-5xl rounded-2xl"
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ----------------------------- Sub-components ----------------------------- */
function EvidenceStat({ value, suffix, label, tone, delay }: { value: number; suffix: string; label: string; tone: string; delay: number }) {
  const { ref, display } = useCountUp(value);
  return (
    <Fade delay={delay}>
      <div className="rounded-2xl border p-7" style={{ borderColor: C.line, background: C.white }}>
        <span ref={ref} className="text-4xl font-semibold md:text-5xl" style={{ color: tone, fontFamily: MONO }}>
          {display}
          {suffix}
        </span>
        <p className="mt-2 text-sm font-medium" style={{ color: C.grey }}>
          {label}
        </p>
      </div>
    </Fade>
  );
}

function FunnelRow({ stage, value, pct, leak, delay }: { stage: string; value: number; pct: number; leak?: boolean; delay: number }) {
  const width = `${Math.max(pct, 4)}%`;
  return (
    <Fade delay={delay}>
      <div className="flex items-center gap-4">
        <span className="w-40 shrink-0 text-sm md:w-52" style={{ color: leak ? C.red : C.ink, fontWeight: leak ? 600 : 400 }}>
          {stage}
        </span>
        <div className="relative h-8 flex-1 overflow-hidden rounded-lg" style={{ background: C.soft }}>
          <motion.div
            className="h-full rounded-lg"
            style={{ background: leak ? C.red : C.ink }}
            initial={{ width: 0 }}
            whileInView={{ width }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <span className="w-16 shrink-0 text-right text-sm font-semibold" style={{ color: leak ? C.red : C.ink, fontFamily: MONO }}>
          {value}K
        </span>
      </div>
    </Fade>
  );
}

function BarCol({ label, value, max, delay }: { label: string; value: number; max: number; delay: number }) {
  const h = `${(value / max) * 100}%`;
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-end gap-3">
      <span className="text-xs font-semibold" style={{ color: C.ink, fontFamily: MONO }}>
        {value}%
      </span>
      <motion.div
        className="w-full max-w-[46px] rounded-t-lg"
        style={{ background: value <= 7 ? C.red : C.ink }}
        initial={{ height: 0 }}
        whileInView={{ height: h }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <span className="text-center text-[0.62rem] leading-tight" style={{ color: C.grey }}>
        {label}
      </span>
    </div>
  );
}

function BeforeAfter({ label, tone, img, caption, onZoom }: { label: string; tone: string; img: string; caption: string; onZoom: () => void }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border" style={{ borderColor: C.line, background: C.softer }}>
      <div className="flex items-center justify-between px-6 pt-5">
        <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.2em]" style={{ background: `${tone}18`, color: tone, fontFamily: MONO }}>
          {label}
        </span>
      </div>
      <button type="button" onClick={onZoom} className="mt-4 block w-full">
        <img src={img} alt={caption} width={1200} height={1008} loading="lazy" className="w-full" />
      </button>
      <p className="px-6 py-5 text-sm" style={{ color: C.grey }}>
        {caption}
      </p>
    </div>
  );
}

function FlowColumn({ title, steps, tone, highlight }: { title: string; steps: string[]; tone: string; highlight?: boolean }) {
  return (
    <div
      className="rounded-2xl border p-6"
      style={{ borderColor: highlight ? tone : C.line, background: highlight ? `${tone}0d` : C.softer }}
    >
      <span className="text-[0.64rem] font-semibold uppercase tracking-[0.18em]" style={{ color: tone, fontFamily: MONO }}>
        {title}
      </span>
      <div className="mt-4 space-y-2">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-col items-start gap-2">
            <span className="rounded-lg px-3 py-2 text-sm" style={{ background: C.white, color: C.ink, border: `1px solid ${C.line}` }}>
              {s}
            </span>
            {i < steps.length - 1 && <span className="ml-4 h-3 w-px" style={{ background: C.line }} />}
          </div>
        ))}
      </div>
    </div>
  );
}
