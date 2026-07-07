import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Presentation,
  Sheet,
  Wallet,
  Layers,
  TrendingUp,
  Target,
  CheckCircle2,
  Users,
  Boxes,
  GitCompareArrows,
  Sparkles,
  ShieldCheck,
  Repeat,
  Quote,
  Clock,
  Plus,
  Minus,
  X,
  ListChecks,
} from "lucide-react";
import nestleHero from "@/assets/nestle-hero.jpg";
import reportPdf from "@/assets/nestle-report.pdf.asset.json";
import presentationPdf from "@/assets/nestle-presentation.pdf.asset.json";
import datasetXlsx from "@/assets/nestle-dataset.xlsx.asset.json";

/* ----------------------------- Brand palette ----------------------------- */
const C = {
  red: "#E31E24",
  redDark: "#B4141A",
  blue: "#0057B8",
  navy: "#0E1B33",
  navySoft: "#1B2A4A",
  ink: "#161616",
  grey: "#6B7280",
  soft: "#F4F5F7",
  softer: "#FAFAFB",
  line: "#E7E9EE",
  white: "#FFFFFF",
};

/* ----------------------------- Real data --------------------------------- */
const AGE = ["18–25", "26–35", "36–45", "46+"];
const PROD = ["Choco Fills", "Cornflakes", "Honey Almond", "Oats"];
const PROD_COLORS = ["#7A3B10", "#E31E24", "#E0A100", "#C9A227"];
const OBSERVED = [
  [55, 17, 21, 29],
  [19, 25, 22, 46],
  [15, 38, 29, 36],
  [3, 64, 43, 38],
];
const EXPECTED = [
  [22.448, 35.136, 28.06, 36.356],
  [20.608, 32.256, 25.76, 33.376],
  [21.712, 33.984, 27.14, 35.164],
  [27.232, 42.624, 34.04, 44.104],
];
const ROW_TOTALS = [122, 112, 118, 148];
const GRAND = 500;

const STATS = {
  chi: 105.094,
  df: 9,
  critical: 16.919,
  cramersV: 0.27,
};


/* ----------------------------- Hooks ------------------------------------- */
function useCountUp(target: number, decimals = 0, duration = 1400) {
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
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduce]);
  return { ref, display: val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) };
}




/* ----------------------------- Primitives -------------------------------- */
function Block({
  id,
  kicker,
  title,
  intro,
  children,
  dark = false,
  bg,
}: {
  id: string;
  kicker?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  dark?: boolean;
  bg?: string;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 px-5 py-14 md:px-10 md:py-20"
      style={{ background: bg ?? (dark ? C.navy : "transparent"), color: dark ? C.white : C.ink }}
    >
      <div className="mx-auto max-w-6xl">
        {(kicker || title) && (
          <Fade className="mb-9 max-w-3xl md:mb-12">
            {kicker && (
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em]" style={{ color: C.red }}>
                {kicker}
              </span>
            )}
            {title && (
              <h2 className="mt-3 font-serif text-[clamp(1.8rem,4.2vw,2.9rem)] font-light leading-[1.08] tracking-[-0.02em]">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-4 text-base leading-relaxed md:text-lg" style={{ color: dark ? "rgba(255,255,255,0.72)" : C.grey }}>
                {intro}
              </p>
            )}
          </Fade>
        )}
        {children}
      </div>
    </section>
  );
}

function SubHead({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: dark ? "rgba(255,255,255,0.55)" : C.grey }}>
      {children}
    </h3>
  );
}

function Fade({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Card({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`rounded-3xl border bg-white p-6 shadow-[0_1px_2px_rgba(16,27,51,0.04)] ${className ?? ""}`}
      style={{ borderColor: C.line, ...style }}
    >
      {children}
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span
      className="rounded-full border px-4 py-1.5 text-xs font-medium backdrop-blur-md"
      style={{ borderColor: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.14)", color: C.white }}
    >
      {children}
    </span>
  );
}

function Kpi({
  value,
  label,
  sub,
  accent = C.red,
  decimals = 0,
  prefix = "",
  dark = false,
}: {
  value: number;
  label: string;
  sub?: string;
  accent?: string;
  decimals?: number;
  prefix?: string;
  dark?: boolean;
}) {
  const { ref, display } = useCountUp(value, decimals);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border p-5 transition-shadow"
      style={{
        borderColor: dark ? "rgba(255,255,255,0.14)" : C.line,
        background: dark ? "rgba(255,255,255,0.05)" : C.white,
      }}
    >
      <div className="flex items-baseline gap-1 font-serif tracking-tight" style={{ color: accent }}>
        <span className="text-sm font-normal opacity-70">{prefix}</span>
        <span ref={ref} className="text-[clamp(1.9rem,4vw,2.7rem)] font-light leading-none">
          {display}
        </span>
      </div>
      <p className="mt-2.5 text-sm font-semibold" style={{ color: dark ? C.white : C.ink }}>
        {label}
      </p>
      {sub && <p className="mt-0.5 text-xs" style={{ color: dark ? "rgba(255,255,255,0.55)" : C.grey }}>{sub}</p>}
    </motion.div>
  );
}

/* ----------------------------- Tabs -------------------------------------- */
function Tabs({ tabs }: { tabs: { label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border p-1.5" style={{ borderColor: C.line, background: C.white }}>
        {tabs.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActive(i)}
            className="relative rounded-xl px-4 py-2 text-sm font-semibold transition-colors"
            style={{ color: active === i ? C.white : C.grey }}
          >
            {active === i && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-xl"
                style={{ background: C.navy }}
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative z-10">{t.label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
        >
          {tabs[active].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ----------------------------- Expandable card --------------------------- */
function ExpandCard({ icon: Icon, title, accent, summary, detail }: { icon: typeof Target; title: string; accent: string; summary: string; detail: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="flex h-full flex-col" style={{ borderColor: accent, borderWidth: 2 }}>
      <div className="flex size-11 items-center justify-center rounded-2xl" style={{ background: `${accent}1a` }}>
        <Icon className="size-6" style={{ color: accent }} />
      </div>
      <h3 className="mt-4 text-lg font-semibold" style={{ color: accent }}>{title}</h3>
      <p className="mt-3 text-sm leading-relaxed" style={{ color: C.grey }}>{summary}</p>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden text-sm leading-relaxed"
            style={{ color: C.grey }}
          >
            <span className="mt-3 block">{detail}</span>
          </motion.p>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((o) => !o)}
        className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold"
        style={{ color: accent }}
      >
        {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
        {open ? "Hide analysis" : "Read analysis"}
      </button>
    </Card>
  );
}

/* ----------------------------- Charts ------------------------------------ */
function StackedBars() {
  const max = Math.max(...ROW_TOTALS);
  return (
    <div className="space-y-5">
      {OBSERVED.map((row, i) => {
        const total = ROW_TOTALS[i];
        return (
          <div key={AGE[i]}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-semibold" style={{ color: C.ink }}>{AGE[i]}</span>
              <span style={{ color: C.grey }}>{total} consumers</span>
            </div>
            <div className="flex h-9 w-full overflow-hidden rounded-full" style={{ background: C.soft }}>
              {row.map((v, j) => (
                <motion.div
                  key={j}
                  className="group relative h-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(v / max) * 100}%` }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.9, delay: 0.05 * j, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: PROD_COLORS[j] }}
                  title={`${PROD[j]}: ${v}`}
                >
                  <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[11px] font-semibold text-white/90">
                    {v >= 15 ? v : ""}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
      <div className="flex flex-wrap gap-4 pt-2">
        {PROD.map((p, j) => (
          <span key={p} className="flex items-center gap-2 text-xs" style={{ color: C.grey }}>
            <span className="h-3 w-3 rounded-sm" style={{ background: PROD_COLORS[j] }} />
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

function Heatmap() {
  const all = OBSERVED.flat();
  const min = Math.min(...all);
  const max = Math.max(...all);
  const shade = (v: number) => {
    const t = (v - min) / (max - min);
    const r = Math.round(255 + (227 - 255) * t);
    const g = Math.round(255 + (30 - 255) * t);
    const b = Math.round(255 + (36 - 255) * t);
    return `rgb(${r},${g},${b})`;
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[440px] border-separate" style={{ borderSpacing: 5 }}>
        <thead>
          <tr>
            <th className="text-left text-xs font-semibold" style={{ color: C.grey }}></th>
            {PROD.map((p) => (
              <th key={p} className="pb-2 text-xs font-semibold" style={{ color: C.ink }}>
                {p}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {OBSERVED.map((row, i) => (
            <tr key={AGE[i]}>
              <td className="pr-3 text-sm font-semibold" style={{ color: C.ink }}>{AGE[i]}</td>
              {row.map((v, j) => {
                const light = (v - min) / (max - min) > 0.55;
                return (
                  <td key={j}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (i * 4 + j) * 0.03 }}
                      className="flex h-14 items-center justify-center rounded-xl text-base font-semibold"
                      style={{ background: shade(v), color: light ? C.white : C.navy, border: `1px solid ${C.line}` }}
                    >
                      {v}
                    </motion.div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Bar({ value, max, color, label, dashed }: { value: number; max: number; color: string; label: string; dashed?: boolean }) {
  return (
    <div className="flex w-8 flex-col items-center">
      <span className="mb-1 text-[11px] font-semibold" style={{ color: C.navy }}>{label}</span>
      <motion.div
        className="w-full rounded-t-md"
        initial={{ height: 0 }}
        whileInView={{ height: `${(value / max) * 180}px` }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: color, border: dashed ? `1px dashed rgba(255,255,255,0.4)` : "none" }}
      />
    </div>
  );
}

function ObservedVsExpected() {
  const idx = 3;
  const obs = OBSERVED[idx];
  const exp = EXPECTED[idx];
  const max = Math.max(...obs, ...exp);
  return (
    <div>
      <div className="grid grid-cols-4 gap-4 md:gap-8">
        {PROD.map((p, j) => (
          <div key={p} className="flex flex-col items-center">
            <div className="flex h-52 items-end gap-2">
              <Bar value={obs[j]} max={max} color={C.blue} label={obs[j].toString()} />
              <Bar value={exp[j]} max={max} color={C.navySoft} label={exp[j].toFixed(0)} dashed />
            </div>
            <span className="mt-3 text-center text-xs font-medium" style={{ color: C.grey }}>{p}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-5">
        <span className="flex items-center gap-2 text-xs" style={{ color: C.grey }}>
          <span className="h-3 w-3 rounded-sm" style={{ background: C.blue }} /> Observed
        </span>
        <span className="flex items-center gap-2 text-xs" style={{ color: C.grey }}>
          <span className="h-3 w-3 rounded-sm" style={{ background: C.navySoft }} /> Expected
        </span>
      </div>
    </div>
  );
}

function CramersGauge() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const v = STATS.cramersV;
  const angle = -90 + (Math.min(v, 0.5) / 0.5) * 180;
  const bands = [
    { label: "Negligible", color: "#2E9E5B", range: "0.00–0.10" },
    { label: "Weak", color: "#E0A100", range: "0.10–0.30" },
    { label: "Moderate", color: "#E31E24", range: "0.30–0.50" },
  ];
  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-full max-w-md">
        <path d="M 20 100 A 80 80 0 0 1 79 24" fill="none" stroke="#2E9E5B" strokeWidth="16" strokeLinecap="round" />
        <path d="M 84 22 A 80 80 0 0 1 116 22" fill="none" stroke="#E0A100" strokeWidth="16" strokeLinecap="round" />
        <path d="M 121 24 A 80 80 0 0 1 180 100" fill="none" stroke="#E31E24" strokeWidth="16" strokeLinecap="round" />
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="34"
          stroke={C.navy}
          strokeWidth="4"
          strokeLinecap="round"
          style={{ originX: "100px", originY: "100px" }}
          initial={{ rotate: -90 }}
          animate={inView ? { rotate: reduce ? angle : angle } : { rotate: -90 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
        <circle cx="100" cy="100" r="7" fill={C.navy} />
      </svg>
      <div className="-mt-2 text-center">
        <div className="font-serif text-5xl font-light" style={{ color: C.red }}>
          {v.toFixed(2)}
        </div>
        <p className="mt-1 text-sm font-semibold" style={{ color: C.ink }}>
          Weak Association
        </p>
      </div>
      <div className="mt-6 grid w-full grid-cols-3 gap-3">
        {bands.map((b) => (
          <div key={b.label} className="rounded-xl border p-3 text-center" style={{ borderColor: C.line }}>
            <span className="mx-auto mb-1 block h-2 w-2 rounded-full" style={{ background: b.color }} />
            <p className="text-xs font-semibold" style={{ color: C.ink }}>{b.label}</p>
            <p className="text-[10px]" style={{ color: C.grey }}>{b.range}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- Navigation -------------------------------- */
function ExecSummary() {
  return (
    <AtAGlance
      project="Nestlé India"
      rows={[
        { k: "Business question", v: "Should Nestlé segment cereal marketing by age?" },
        { k: "Dataset", v: "500 consumers · 4 age groups · 4 products" },
        { k: "Method", v: "Chi-Square test of independence + Cramér's V" },
        { k: "Key finding", v: "χ² = 105.09, p < 0.05 · Cramér's V = 0.27 (weak)" },
        { k: "Recommendation", v: "Run a unified national campaign, not age-specific." },
      ]}
      palette={{
        cardBg: "rgba(255,255,255,0.94)",
        border: C.line,
        title: C.red,
        label: C.grey,
        value: C.ink,
        chipBg: C.soft,
        chipFg: C.grey,
        btnBg: C.navy,
        btnFg: "#FFFFFF",
        shadow: "0 30px 60px -24px rgba(14,27,51,0.5)",
      }}
    />
  );
}

/* ----------------------------- Page -------------------------------------- */
export const Route = createFileRoute("/work/nestle")({
  head: () => ({
    meta: [
      { title: "Nestlé India — Does Age Influence Cereal Preference? | Shipra Maurya" },
      {
        name: "description",
        content:
          "A strategy case study for Nestlé India: turning a Chi-Square analysis of 500 consumers into an executive marketing decision on age-based segmentation.",
      },
      { property: "og:title", content: "Nestlé India — Data to Marketing Strategy" },
      {
        property: "og:description",
        content: "Statistical evidence translated into a unified marketing recommendation for Nestlé India.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://shipra-maurya-portfolio.lovable.app" + nestleHero },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NestleCaseStudy,
});

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div className="fixed left-0 top-0 z-50 h-1 w-full origin-left" style={{ scaleX, background: C.red }} />;
}

function NestleCaseStudy() {
  return (
    <div style={{ background: C.softer, color: C.ink }}>
      <ProgressBar />
      <ExecSummary />


      {/* ---------------- BLOCK 1 · HERO ---------------- */}
      <header id="overview" className="relative min-h-[90vh] w-full overflow-hidden scroll-mt-24">
        <img
          src={nestleHero}
          alt="Assorted Nestlé breakfast cereals with milk being poured"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(14,27,51,0.92) 0%, rgba(14,27,51,0.78) 40%, rgba(14,27,51,0.35) 100%)",
          }}
        />
        <div className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col justify-center px-5 py-24 md:px-10">
          <Fade>
            <Link
              to="/work/$slug"
              params={{ slug: "nexo" }}
              className="group mb-8 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              NEXO
            </Link>
          </Fade>
          <Fade delay={0.04}>
            <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              <span className="inline-flex items-center gap-2"><Clock className="size-3.5" style={{ color: "#FF6B70" }} /> 8 min read</span>
              <span className="inline-flex items-center gap-2"><Users className="size-3.5" style={{ color: "#FF6B70" }} /> 500 consumers</span>
              <span className="inline-flex items-center gap-2"><Target className="size-3.5" style={{ color: "#FF6B70" }} /> 1 strategic recommendation</span>
            </div>
          </Fade>
          <Fade delay={0.08}>
            <span className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: "#FF6B70" }}>
              Nestlé India · Strategy Case Study
            </span>
          </Fade>
          <Fade delay={0.14}>
            <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.4rem,6.5vw,5rem)] font-light leading-[1.03] tracking-[-0.02em] text-white">
              Does Age Really Influence Breakfast Cereal Preference?
            </h1>
          </Fade>
          <Fade delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg text-white/75 md:text-xl">
              Turning statistical evidence into marketing strategy.
            </p>
          </Fade>
          <Fade delay={0.26}>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {["Nestlé India", "Marketing Strategy", "Data Analytics", "Chi-Square Analysis", "500 Consumer Dataset", "FMCG"].map(
                (c) => (
                  <Chip key={c}>{c}</Chip>
                ),
              )}
            </div>
          </Fade>
          <Fade delay={0.32}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={reportPdf.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{ background: C.red }}
              >
                <FileText className="size-4" /> View Report
              </a>
              <a
                href={presentationPdf.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-transform hover:-translate-y-0.5"
              >
                <Presentation className="size-4" /> View Presentation
              </a>
            </div>
          </Fade>
        </div>
      </header>

      {/* ---------------- BLOCK 2 · BUSINESS CONTEXT ---------------- */}
      <Block id="context">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — the business question */}
          <Fade>
            <div>
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em]" style={{ color: C.red }}>
                01 · Business Context
              </span>
              <h2 className="mt-4 font-serif text-[clamp(2rem,4.6vw,3.2rem)] font-light leading-[1.05] tracking-[-0.02em]">
                The Business Question
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed md:text-lg" style={{ color: C.grey }}>
                Nestlé India&rsquo;s Breakfast Cereal division is planning a nationwide digital campaign and must choose
                between <strong style={{ color: C.ink }}>age-specific messaging</strong> or a single{" "}
                <strong style={{ color: C.ink }}>unified campaign</strong>. Segmentation may lift relevance — but it
                multiplies creative cost and execution complexity.
              </p>
              <div className="mt-8 rounded-3xl px-7 py-8" style={{ background: C.red, color: C.white }}>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/70">The decision at stake</p>
                <p className="mt-3 font-serif text-[clamp(1.5rem,3.6vw,2.3rem)] font-light leading-tight">
                  Is age-based segmentation worth the investment?
                </p>
              </div>
            </div>
          </Fade>

          {/* Right — supporting illustration + three insight cards */}
          <Fade delay={0.1}>
            <div className="space-y-5">
              <div className="relative overflow-hidden rounded-3xl border" style={{ borderColor: C.line }}>
                <img
                  src={nestleHero}
                  alt="Nestlé breakfast cereals — the category behind the segmentation decision"
                  className="h-56 w-full object-cover md:h-64"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(14,27,51,0) 45%, rgba(14,27,51,0.82) 100%)" }} />
                <p className="absolute bottom-4 left-5 right-5 text-sm font-medium text-white/90">
                  Relevance vs. cost — the core trade-off management must weigh.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Wallet, t: "Campaign Cost", d: "Multiple creatives multiply spend." },
                  { icon: Layers, t: "Marketing Complexity", d: "More variants, harder execution." },
                  { icon: TrendingUp, t: "Business Impact", d: "Every rupee must earn its return." },
                ].map((x) => (
                  <Card key={x.t} className="h-full p-5">
                    <x.icon className="size-7" style={{ color: C.red }} />
                    <h4 className="mt-3 text-sm font-semibold">{x.t}</h4>
                    <p className="mt-1 text-xs leading-relaxed" style={{ color: C.grey }}>{x.d}</p>
                  </Card>
                ))}
              </div>
            </div>
          </Fade>
        </div>
      </Block>



      {/* ---------------- BLOCK 3 · RESEARCH & METHOD ---------------- */}
      <Block
        id="research"
        bg={C.soft}
        kicker="02 · Research & Method"
        title="500 consumers, the right test, a clear hypothesis."
      >
        {/* Top KPI row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi value={500} label="Consumers surveyed" sub="Nationwide sample" accent={C.red} />
          <Kpi value={4} label="Age Groups" sub="18–25 · 26–35 · 36–45 · 46+" accent={C.blue} />
          <Kpi value={4} label="Cereal Products" sub="Choco · Corn · Honey · Oats" accent={C.navy} />
          <Kpi value={9} label="Chi-Square df" sub="Test of Independence" accent={C.red} />
        </div>

        {/* Bottom — Dataset → Method → Hypothesis */}
        <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {/* Dataset */}
          <Fade>
            <Card className="flex h-full flex-col">
              <SubHead>Dataset</SubHead>
              <p className="text-sm leading-relaxed" style={{ color: C.grey }}>
                500 consumers classified on <strong style={{ color: C.ink }}>two categorical variables</strong> — age group
                and cereal preference.
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
                <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: C.soft, color: C.ink }}>
                  <Users className="size-4" style={{ color: C.red }} /> Age Group
                </span>
                <ArrowRight className="size-4" style={{ color: C.grey }} />
                <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: C.soft, color: C.ink }}>
                  <Boxes className="size-4" style={{ color: C.blue }} /> Preference
                </span>
              </div>
            </Card>
          </Fade>
          <div className="flex items-center justify-center">
            <ArrowRight className="size-6 rotate-90 lg:rotate-0" style={{ color: C.red }} />
          </div>
          {/* Method */}
          <Fade delay={0.06}>
            <Card className="flex h-full flex-col">
              <SubHead>Method — why Chi-Square?</SubHead>
              <p className="text-sm leading-relaxed" style={{ color: C.grey }}>
                Two categorical variables call for a <strong style={{ color: C.ink }}>Chi-Square Test of Independence</strong>.
                It reveals whether the relationship is real — and Cramér&rsquo;s V shows how strong.
              </p>
              <ul className="mt-auto space-y-1.5 pt-5 text-xs" style={{ color: C.grey }}>
                {["Question: does age influence preference?", "Interpretation: is the link real, and strong?", "Decision: segment by age — or stay unified?"].map((li) => (
                  <li key={li} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0" style={{ color: C.red }} /> {li}
                  </li>
                ))}
              </ul>
            </Card>
          </Fade>
          <div className="flex items-center justify-center">
            <ArrowRight className="size-6 rotate-90 lg:rotate-0" style={{ color: C.red }} />
          </div>
          {/* Hypothesis */}
          <Fade delay={0.12}>
            <Card className="flex h-full flex-col gap-3">
              <SubHead>Hypothesis</SubHead>
              <div className="rounded-2xl border-2 p-4" style={{ borderColor: C.blue }}>
                <span className="font-serif text-2xl font-light" style={{ color: C.blue }}>H₀</span>
                <span className="ml-2 text-xs font-semibold uppercase tracking-wider" style={{ color: C.blue }}>Independent</span>
                <p className="mt-1.5 text-xs leading-relaxed" style={{ color: C.grey }}>
                  Preference is <strong>independent</strong> of age — no association.
                </p>
              </div>
              <div className="rounded-2xl border-2 p-4" style={{ borderColor: C.red }}>
                <span className="font-serif text-2xl font-light" style={{ color: C.red }}>H₁</span>
                <span className="ml-2 text-xs font-semibold uppercase tracking-wider" style={{ color: C.red }}>Dependent</span>
                <p className="mt-1.5 text-xs leading-relaxed" style={{ color: C.grey }}>
                  Preference <strong>depends</strong> on age — there is an association.
                </p>
              </div>
            </Card>
          </Fade>
        </div>
      </Block>

      {/* ---------------- BLOCK 4 · DATA ANALYSIS DASHBOARD ---------------- */}
      <Block
        id="dashboard"
        kicker="03 · Data Analysis Dashboard"
        title="What the 500 responses actually look like."
        intro="Cross-classifying age and preference reveals clear shifts across segments — the visual foundation for the test."
      >
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Left — tabbed chart centerpiece */}
          <Fade>
            <Card>
              <Tabs
                tabs={[
                  {
                    label: "Distribution",
                    content: (
                      <div>
                        <SubHead>Preference distribution by age</SubHead>
                        <StackedBars />
                      </div>
                    ),
                  },
                  {
                    label: "Heatmap",
                    content: (
                      <div>
                        <SubHead>Observed frequency heatmap</SubHead>
                        <Heatmap />
                      </div>
                    ),
                  },
                  {
                    label: "Observed vs Expected",
                    content: (
                      <div>
                        <SubHead>Observed vs. Expected — 46+ segment</SubHead>
                        <p className="mb-5 text-sm" style={{ color: C.grey }}>
                          Where observed diverges from expected, dependency between age and preference emerges.
                        </p>
                        <ObservedVsExpected />
                      </div>
                    ),
                  },
                ]}
              />
            </Card>
          </Fade>

          {/* Right — summary insight stack */}
          <Fade delay={0.08}>
            <div className="flex h-full flex-col gap-4">
              <div className="rounded-3xl p-6" style={{ background: C.navy, color: C.white }}>
                <Sparkles className="size-7" style={{ color: "#FF6B70" }} />
                <h3 className="mt-4 text-lg font-semibold">What the data shows</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Younger consumers skew toward Choco Fills, while older segments concentrate on Cornflakes and Oats —
                  clear, non-random shifts across {GRAND} responses.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Kpi value={GRAND} label="Total responses" accent={C.red} />
                <Kpi value={16} label="Age × product cells" accent={C.blue} />
              </div>
              <Card className="flex-1">
                <SubHead>Read it fast</SubHead>
                <ul className="space-y-2 text-sm" style={{ color: C.grey }}>
                  {[
                    "Choco Fills peaks in 18–25 (55 vs 22 expected).",
                    "Cornflakes dominates the 46+ segment (64).",
                    "Every segment deviates from the expected baseline.",
                  ].map((li) => (
                    <li key={li} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: C.red }} /> {li}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </Fade>
        </div>
      </Block>

      {/* ---------------- BLOCK 5 · STATISTICAL FINDINGS ---------------- */}
      <Block id="findings" dark kicker="04 · Statistical Findings" title="The numbers deliver a verdict.">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left — KPI cards */}
          <Fade>
            <div className="grid gap-4 sm:grid-cols-2">
              <Kpi dark value={STATS.chi} decimals={2} label="χ² Statistic" sub="Calculated value" accent="#FF6B70" />
              <Kpi dark value={0.05} decimals={2} prefix="p < " label="P-value" sub="Highly significant" accent="#FF6B70" />
              <Kpi dark value={STATS.df} label="Degrees of Freedom" sub="(4−1)×(4−1)" accent="#7FB0FF" />
              <Kpi dark value={STATS.critical} decimals={2} label="Critical Value" sub="5% significance" accent="#7FB0FF" />
              <div className="sm:col-span-2 flex items-center gap-3 rounded-2xl border p-5" style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(30,158,87,0.14)" }}>
                <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: "#1E9E57" }}>
                  <CheckCircle2 className="size-4" /> Null Hypothesis Rejected
                </span>
                <span className="text-sm text-white/70">χ² = 105.094 &gt; 16.919 critical</span>
              </div>
            </div>
          </Fade>

          {/* Right — Cramér's V gauge */}
          <Fade delay={0.1}>
            <Card className="h-full">
              <SubHead>Strength of association — Cramér&rsquo;s V</SubHead>
              <CramersGauge />
            </Card>
          </Fade>
        </div>

        {/* Wide insight panel — significant → weak → recommendation */}
        <Fade delay={0.1}>
          <div className="mt-6 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <div className="rounded-3xl border p-6" style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.04)" }}>
              <CheckCircle2 className="size-6" style={{ color: "#1E9E57" }} />
              <h3 className="mt-3 text-base font-semibold text-white">Statistically significant</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Age and cereal preference are related — the pattern is real and not due to chance.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <ArrowRight className="size-6 rotate-90 lg:rotate-0" style={{ color: "#FF6B70" }} />
            </div>
            <div className="rounded-3xl border p-6" style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.04)" }}>
              <Target className="size-6" style={{ color: "#E0A100" }} />
              <h3 className="mt-3 text-base font-semibold text-white">Weak association</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Cramér&rsquo;s V of {STATS.cramersV.toFixed(2)} sits firmly in the weak band — age alone is a limited driver.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <ArrowRight className="size-6 rotate-90 lg:rotate-0" style={{ color: "#FF6B70" }} />
            </div>
            <div className="rounded-3xl p-6" style={{ background: C.red }}>
              <Sparkles className="size-6 text-white" />
              <h3 className="mt-3 text-base font-semibold text-white">Business recommendation</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                Not enough to justify separate nationwide campaigns — favour a unified strategy.
              </p>
            </div>
          </div>
        </Fade>

        {/* Significance vs business — expandable insight cards */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Fade>
            <ExpandCard
              icon={CheckCircle2}
              title="Statistical Significance"
              accent={C.blue}
              summary="The relationship is real and not due to chance — the test proves a dependency between age and preference exists."
              detail="With χ² = 105.094 far exceeding the 16.919 critical value at the 5% level, we reject H₀ with high confidence. The observed frequencies diverge from the expected values well beyond what random sampling variation would produce."
            />
          </Fade>
          <Fade delay={0.1}>
            <ExpandCard
              icon={Target}
              title="Business Significance"
              accent={C.red}
              summary="A real effect may still be too small to matter. Effect size decides whether the pattern is worth acting on — and paying for."
              detail="Cramér's V of 0.27 quantifies the strength as weak. Preference patterns vary across age, yet age explains only a modest share of choice. Investing in multiple age-specific creatives would not return proportionate incremental impact."
            />
          </Fade>
        </div>

        <Fade delay={0.1}>
          <blockquote className="mx-auto mt-8 max-w-4xl rounded-3xl px-8 py-10 text-center" style={{ background: "rgba(255,255,255,0.05)" }}>
            <Sparkles className="mx-auto size-7" style={{ color: "#FF6B70" }} />
            <p className="mt-4 font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-tight text-white">
              &ldquo;Statistically Significant <span style={{ color: "#FF6B70" }}>≠</span> Business Significant.&rdquo;
            </p>
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/60">
              Finding significance does not automatically justify business investment. That distinction is the whole point
              of the analysis.
            </p>
          </blockquote>
        </Fade>
      </Block>

      {/* ---------------- BLOCK 6 · EXECUTIVE RECOMMENDATION ---------------- */}
      <Block
        id="recommendation"
        bg={C.soft}
        kicker="05 · Executive Recommendation"
        title="The executive call."
      >
        {/* Decision matrix */}
        <Fade>
          <Card>
            <SubHead>Decision matrix — weighing both strategies like a consultant</SubHead>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-separate" style={{ borderSpacing: 0 }}>
                <thead>
                  <tr>
                    {["Strategy", "Cost", "Complexity", "ROI", "Scalability", "Consistency"].map((h) => (
                      <th key={h} className="border-b p-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ borderColor: C.line, color: C.grey }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { s: "Segment by Age", vals: ["High", "High", "Marginal", "Low", "Fragmented"], win: false },
                    { s: "Unified Campaign", vals: ["Low", "Low", "Strong", "High", "Consistent"], win: true },
                  ].map((row) => (
                    <tr key={row.s} style={{ background: row.win ? "rgba(227,30,36,0.06)" : C.white }}>
                      <td className="border-b p-4 text-sm font-semibold" style={{ borderColor: C.line, color: row.win ? C.red : C.ink }}>
                        <span className="flex items-center gap-2">
                          {row.win && <CheckCircle2 className="size-4" style={{ color: C.red }} />}
                          {row.s}
                        </span>
                      </td>
                      {row.vals.map((v, i) => (
                        <td key={i} className="border-b p-4 text-sm" style={{ borderColor: C.line, color: row.win ? C.ink : C.grey }}>
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-sm font-semibold" style={{ color: C.red }}>
              Unified Campaign wins on every dimension that drives return.
            </p>
          </Card>
        </Fade>

        {/* Recommendation + impact */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Fade>
            <div className="overflow-hidden rounded-[28px]" style={{ background: C.red, color: C.white }}>
              <div className="p-7 md:p-9">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/70">Recommendation</p>
                <h3 className="mt-2 font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-light">Unified Marketing Strategy</h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Run one core campaign nationwide",
                    "Allow minor creative variations only",
                    "Reserve behavioural segmentation for later",
                    "Focus spend on product messaging",
                  ].map((b) => (
                    <div key={b} className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-md">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-white" />
                      <span className="text-sm text-white/90">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/20 px-7 py-6 md:px-9">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/70">The business decision</p>
                <p className="mt-2 font-serif text-[clamp(1.3rem,3.2vw,2rem)] font-light">
                  Age should not be the primary segmentation variable.
                </p>
              </div>
            </div>
          </Fade>

          <Fade delay={0.1}>
            <Card className="h-full">
              <SubHead>Business impact — what the unified strategy unlocks</SubHead>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Wallet, t: "Lower Cost" },
                  { icon: TrendingUp, t: "Higher ROI" },
                  { icon: Layers, t: "Simpler Execution" },
                  { icon: ShieldCheck, t: "Brand Consistency" },
                  { icon: Repeat, t: "Scalable Campaigns" },
                ].map((x) => (
                  <div key={x.t} className="flex items-center gap-3 rounded-2xl border p-3.5" style={{ borderColor: C.line }}>
                    <x.icon className="size-6 shrink-0" style={{ color: C.red }} />
                    <p className="text-sm font-semibold leading-tight">{x.t}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Fade>
        </div>

        {/* Accordions — future scope & lessons learned */}
        <div className="mt-6" style={{ color: C.white }}>
          <div className="grid gap-4 md:grid-cols-2" style={{ background: "transparent" }}>
            <div className="rounded-2xl border p-6" style={{ borderColor: C.line, background: C.navy }}>
              <SubHead dark>Future scope — from demographic to behavioural intelligence</SubHead>
              <div className="flex flex-wrap gap-2.5">
                {["Behavioural Data", "Clustering", "Predictive Analytics", "ML Models", "Personalization"].map((f) => (
                  <span
                    key={f}
                    className="rounded-full border px-4 py-1.5 text-sm font-medium"
                    style={{ borderColor: "rgba(127,176,255,0.5)", color: "#7FB0FF", background: "rgba(0,87,184,0.15)" }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border p-6" style={{ borderColor: C.line, background: C.navy }}>
              <SubHead dark>Lessons learned — the order that matters</SubHead>
              <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  "Business problem first",
                  "Data second",
                  "Statistics third",
                  "Decision fourth",
                  "Business value last",
                ].map((l, i) => (
                  <li key={l} className="flex items-center gap-3 rounded-xl border p-3" style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}>
                    <span className="font-serif text-xl font-light" style={{ color: "#FF6B70" }}>0{i + 1}</span>
                    <span className="text-sm font-semibold text-white">{l}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <blockquote className="mx-auto mt-8 max-w-3xl text-center">
            <Quote className="mx-auto size-7" style={{ color: C.red }} />
            <p className="mt-4 font-serif text-[clamp(1.5rem,3.6vw,2.4rem)] font-light leading-tight" style={{ color: C.ink }}>
              &ldquo;The best analytical models don&rsquo;t end with p-values — they end with better decisions.&rdquo;
            </p>
          </blockquote>
        </div>
      </Block>

      {/* ---------------- DOWNLOADS ---------------- */}
      <section id="downloads" className="scroll-mt-24 px-5 py-16 md:px-10 md:py-24" style={{ background: C.navy }}>
        <div className="mx-auto max-w-6xl">
          <Fade>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em]" style={{ color: "#FF6B70" }}>
              Explore the full engagement
            </span>
            <h2 className="mt-3 font-serif text-[clamp(1.8rem,4.5vw,2.8rem)] font-light text-white">
              The complete report, deck, and dataset.
            </h2>
          </Fade>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {[
              { icon: FileText, t: "Full Report", d: "Business report with methodology, interpretation, and recommendations.", meta: "PDF document", url: reportPdf.url },
              { icon: Presentation, t: "Presentation Deck", d: "Executive presentation summarizing the analysis.", meta: "PDF slides", url: presentationPdf.url },
              { icon: Sheet, t: "Dataset", d: "Excel workbook used for statistical analysis and dashboard creation.", meta: "XLSX workbook", url: datasetXlsx.url },
            ].map((x, i) => (
              <Fade key={x.t} delay={i * 0.08}>
                <a
                  href={x.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col rounded-3xl border p-7 transition-transform hover:-translate-y-1.5"
                  style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.05)" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-2xl" style={{ background: "rgba(227,30,36,0.2)" }}>
                      <x.icon className="size-6" style={{ color: "#FF6B70" }} />
                    </div>
                    <span className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/60" style={{ borderColor: "rgba(255,255,255,0.18)" }}>
                      {x.meta}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{x.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">{x.d}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
                    Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </Fade>
            ))}
          </div>
          <div className="mt-12 flex items-center justify-between gap-6 border-t border-white/10 pt-8">
            <Link
              to="/work/$slug"
              params={{ slug: "nexo" }}
              className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              NEXO
            </Link>
            <Link
              to="/work/$slug"
              params={{ slug: "taj-hotels" }}
              className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              Next Strategy: Taj Hotels
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
