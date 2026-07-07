import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
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
  XCircle,
  Users,
  Boxes,
  GitCompareArrows,
  Sparkles,
  ShieldCheck,
  Repeat,
  Quote,
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
const COL_TOTALS = [92, 144, 115, 149];
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
function Section({
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
      className="scroll-mt-24 px-5 py-20 md:px-10 md:py-28"
      style={{ background: bg ?? (dark ? C.navy : "transparent"), color: dark ? C.white : C.ink }}
    >
      <div className="mx-auto max-w-6xl">
        {(kicker || title) && (
          <Fade className="mb-12 max-w-3xl md:mb-16">
            {kicker && (
              <span
                className="text-[0.7rem] font-semibold uppercase tracking-[0.28em]"
                style={{ color: C.red }}
              >
                {kicker}
              </span>
            )}
            {title && (
              <h2
                className="mt-4 font-serif text-[clamp(2rem,5vw,3.4rem)] font-light leading-[1.06] tracking-[-0.02em]"
              >
                {title}
              </h2>
            )}
            {intro && (
              <p
                className="mt-5 text-lg leading-relaxed"
                style={{ color: dark ? "rgba(255,255,255,0.72)" : C.grey }}
              >
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

function Fade({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Card({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`rounded-3xl border bg-white p-7 shadow-[0_1px_2px_rgba(16,27,51,0.04)] ${className ?? ""}`}
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

function KpiGlass({
  value,
  label,
  sub,
  accent = C.red,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  label: string;
  sub?: string;
  accent?: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const { ref, display } = useCountUp(value, decimals);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="rounded-3xl border p-7 backdrop-blur-xl transition-shadow hover:shadow-[0_28px_50px_-24px_rgba(14,27,51,0.35)]"
      style={{
        borderColor: "rgba(255,255,255,0.5)",
        background: "linear-gradient(160deg, rgba(255,255,255,0.9), rgba(255,255,255,0.55))",
      }}
    >
      <div className="flex items-baseline gap-1 font-serif tracking-tight" style={{ color: accent }}>
        <span className="text-sm font-normal opacity-70">{prefix}</span>
        <span ref={ref} className="text-[clamp(2.3rem,5vw,3.4rem)] font-light leading-none">
          {display}
        </span>
        <span className="text-lg font-normal opacity-70">{suffix}</span>
      </div>
      <p className="mt-3 text-sm font-semibold" style={{ color: C.ink }}>
        {label}
      </p>
      {sub && <p className="mt-1 text-xs" style={{ color: C.grey }}>{sub}</p>}
    </motion.div>
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
    // white -> nestle red
    const r = Math.round(255 + (227 - 255) * t);
    const g = Math.round(255 + (30 - 255) * t);
    const b = Math.round(255 + (36 - 255) * t);
    return `rgb(${r},${g},${b})`;
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[440px] border-separate" style={{ borderSpacing: 5 }}>the
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

function ObservedVsExpected() {
  // 46+ row highlight
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

function CramersGauge() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  // value 0..0.5 mapped to angle -90..90
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
        {/* arcs */}
        <path d="M 20 100 A 80 80 0 0 1 79 24" fill="none" stroke="#2E9E5B" strokeWidth="16" strokeLinecap="round" />
        <path d="M 84 22 A 80 80 0 0 1 116 22" fill="none" stroke="#E0A100" strokeWidth="16" strokeLinecap="round" />
        <path d="M 121 24 A 80 80 0 0 1 180 100" fill="none" stroke="#E31E24" strokeWidth="16" strokeLinecap="round" />
        {/* needle */}
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

/* ----------------------------- Flow / timeline --------------------------- */
function FlowArrow() {
  return <ArrowRight className="mx-auto my-2 size-5 rotate-90 md:my-0 md:rotate-0" style={{ color: C.red }} />;
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
  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left"
      style={{ scaleX, background: C.red }}
    />
  );
}

function NestleCaseStudy() {
  return (
    <div style={{ background: C.softer, color: C.ink }}>
      <ProgressBar />

      {/* ---------------- HERO ---------------- */}
      <header className="relative min-h-[92vh] w-full overflow-hidden">
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
        <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-5 py-28 md:px-10">
          <Fade>
            <Link
              to="/"
              hash="work"
              className="group mb-10 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              Back to work
            </Link>
          </Fade>
          <Fade delay={0.05}>
            <span className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: "#FF6B70" }}>
              Nestlé India · Strategy Case Study
            </span>
          </Fade>
          <Fade delay={0.12}>
            <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.4rem,6.5vw,5rem)] font-light leading-[1.03] tracking-[-0.02em] text-white">
              Does Age Really Influence Breakfast Cereal Preference?
            </h1>
          </Fade>
          <Fade delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg text-white/75 md:text-xl">
              Turning statistical evidence into marketing strategy.
            </p>
          </Fade>
          <Fade delay={0.28}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {["Nestlé India", "Marketing Strategy", "Data Analytics", "Chi-Square Analysis", "500 Consumer Dataset", "FMCG"].map(
                (c) => (
                  <Chip key={c}>{c}</Chip>
                ),
              )}
            </div>
          </Fade>
          <Fade delay={0.36}>
            <div className="mt-10 flex flex-wrap gap-3">
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

      {/* ---------------- 1 · THE BUSINESS QUESTION ---------------- */}
      <Section
        id="Question"
        kicker="01 · The Business Question"
        title="Should Nestlé invest in age-specific marketing campaigns?"
      >
        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <Fade>
            <p className="text-lg leading-relaxed" style={{ color: C.grey }}>
              Nestlé India&rsquo;s Breakfast Cereal division is planning a nationwide digital campaign and faces a
              strategic choice: run <strong style={{ color: C.ink }}>age-specific messaging</strong> or a single{" "}
              <strong style={{ color: C.ink }}>unified campaign</strong> for all age groups.
            </p>
            <p className="mt-5 text-lg leading-relaxed" style={{ color: C.grey }}>
              Age-based campaigns may improve relevance — but they raise cost through multiple creatives and executions.
              Management needs data-backed evidence to know whether segmentation delivers enough incremental impact to
              justify the higher investment.
            </p>
          </Fade>
          <Fade delay={0.1}>
            <Card className="flex h-full flex-col justify-center" style={{ background: C.soft }}>
              <div className="flex items-center justify-between gap-4">
                <div className="text-center">
                  <Users className="mx-auto size-9" style={{ color: C.red }} />
                  <p className="mt-2 text-sm font-semibold">Age Segments</p>
                </div>
                <GitCompareArrows className="size-8" style={{ color: C.grey }} />
                <div className="text-center">
                  <Wallet className="mx-auto size-9" style={{ color: C.blue }} />
                  <p className="mt-2 text-sm font-semibold">Campaign Cost</p>
                </div>
              </div>
              <p className="mt-6 text-center text-sm" style={{ color: C.grey }}>
                Relevance vs. cost — the core trade-off management must weigh.
              </p>
            </Card>
          </Fade>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: Wallet, t: "Campaign Cost", d: "Multiple creatives multiply production and media spend." },
            { icon: Layers, t: "Creative Complexity", d: "More variants mean slower, harder execution at scale." },
            { icon: TrendingUp, t: "Marketing ROI", d: "Every extra rupee must earn incremental return." },
          ].map((x, i) => (
            <Fade key={x.t} delay={i * 0.08}>
              <Card className="h-full">
                <x.icon className="size-8" style={{ color: C.red }} />
                <h3 className="mt-4 text-lg font-semibold">{x.t}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: C.grey }}>{x.d}</p>
              </Card>
            </Fade>
          ))}
        </div>

        <Fade delay={0.1}>
          <div
            className="mt-10 rounded-3xl px-8 py-10 text-center"
            style={{ background: C.red, color: C.white }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">The decision at stake</p>
            <p className="mt-3 font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light">
              Is segmentation worth the investment?
            </p>
          </div>
        </Fade>
      </Section>

      {/* ---------------- 2 · WHY THIS MATTERS ---------------- */}
      <Section
        id="Why"
        dark
        kicker="02 · Why This Matters"
        title="The wrong segmentation quietly drains the marketing budget."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Wallet, t: "Budget Efficiency", d: "Direct spend where it actually changes behaviour." },
            { icon: Target, t: "Reduce Wasted Spend", d: "Avoid paying for creative variants that don't move the needle." },
            { icon: TrendingUp, t: "Improve ROI", d: "Higher return on every marketing rupee deployed." },
          ].map((x, i) => (
            <Fade key={x.t} delay={i * 0.08}>
              <div
                className="h-full rounded-3xl border p-7 backdrop-blur-xl"
                style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)" }}
              >
                <div
                  className="flex size-12 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(227,30,36,0.18)" }}
                >
                  <x.icon className="size-6" style={{ color: "#FF6B70" }} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{x.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{x.d}</p>
              </div>
            </Fade>
          ))}
        </div>
        <Fade delay={0.1}>
          <blockquote className="mx-auto mt-14 max-w-3xl text-center">
            <Quote className="mx-auto size-8" style={{ color: C.red }} />
            <p className="mt-5 font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-tight text-white">
              &ldquo;Wrong segmentation leads to poor returns.&rdquo;
            </p>
          </blockquote>
        </Fade>
      </Section>

      {/* ---------------- 3 · BUSINESS CONTEXT ---------------- */}
      <Section
        id="Context"
        kicker="03 · Business Context"
        title="From a business problem to a marketing decision."
        intro="This analysis was driven by a business need — not statistical curiosity. Each step exists to serve the decision at the end."
      >
        <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
          {[
            "Business Problem",
            "Data Collection",
            "Statistical Validation",
            "Business Decision",
            "Marketing Recommendation",
          ].map((step, i, arr) => (
            <div key={step} className="flex flex-col items-stretch md:flex-1 md:flex-row md:items-center">
              <Fade delay={i * 0.08} className="md:flex-1">
                <div
                  className="rounded-2xl border p-5 text-center"
                  style={{
                    borderColor: i === arr.length - 1 ? C.red : C.line,
                    background: i === arr.length - 1 ? C.red : C.white,
                    color: i === arr.length - 1 ? C.white : C.ink,
                  }}
                >
                  <span className="text-xs font-semibold opacity-60">0{i + 1}</span>
                  <p className="mt-1 text-sm font-semibold">{step}</p>
                </div>
              </Fade>
              {i < arr.length - 1 && <FlowArrow />}
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------- 4 · DATASET OVERVIEW ---------------- */}
      <Section
        id="Dataset"
        bg={C.soft}
        kicker="04 · Dataset Overview"
        title="500 consumers. Two categorical variables."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <KpiGlass value={500} label="Consumers surveyed" sub="Nationwide sample" accent={C.red} />
          <KpiGlass value={4} label="Age Groups" sub="18–25 · 26–35 · 36–45 · 46+" accent={C.blue} />
          <KpiGlass value={4} label="Cereal Products" sub="Choco · Corn · Honey · Oats" accent={C.navy} />
          <KpiGlass value={2} label="Variables" sub="Both categorical" accent={C.red} />
        </div>
        <Fade delay={0.1}>
          <Card className="mt-10">
            <div className="flex flex-col items-center justify-center gap-4 py-4 md:flex-row md:gap-8">
              <div className="flex items-center gap-3">
                <Users className="size-7" style={{ color: C.red }} />
                <span className="font-serif text-2xl font-light">Age Group</span>
              </div>
              <ArrowRight className="size-6 rotate-90 md:rotate-0" style={{ color: C.grey }} />
              <div className="flex items-center gap-3">
                <Boxes className="size-7" style={{ color: C.blue }} />
                <span className="font-serif text-2xl font-light">Cereal Preference</span>
              </div>
            </div>
            <p className="mt-2 text-center text-sm" style={{ color: C.grey }}>
              Analysing the relationship between two categorical variables.
            </p>
          </Card>
        </Fade>
      </Section>

      {/* ---------------- 5 · WHY CHI-SQUARE ---------------- */}
      <Section
        id="Method"
        kicker="05 · Method Selection"
        title="Why Chi-Square?"
        intro="The method was chosen to fit the data — and, more importantly, the decision it needed to inform."
      >
        <div className="grid gap-3 md:grid-cols-5">
          {[
            { t: "Question", d: "Does age influence cereal preference?" },
            { t: "Data Type", d: "Two categorical variables." },
            { t: "Best Method", d: "Chi-Square Test of Independence." },
            { t: "Interpretation", d: "Is the relationship real, and how strong?" },
            { t: "Decision", d: "Segment by age — or stay unified?" },
          ].map((x, i, arr) => (
            <div key={x.t} className="flex flex-col md:flex-row md:items-stretch">
              <Fade delay={i * 0.07} className="flex-1">
                <div className="flex h-full flex-col rounded-2xl border p-5" style={{ borderColor: C.line, background: i === arr.length - 1 ? C.navy : C.white, color: i === arr.length - 1 ? C.white : C.ink }}>
                  <span className="text-xs font-semibold" style={{ color: i === arr.length - 1 ? "#FF6B70" : C.red }}>0{i + 1}</span>
                  <p className="mt-1 text-sm font-semibold">{x.t}</p>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: i === arr.length - 1 ? "rgba(255,255,255,0.7)" : C.grey }}>{x.d}</p>
                </div>
              </Fade>
              {i < arr.length - 1 && <ArrowRight className="mx-auto my-1 size-4 rotate-90 self-center md:rotate-0" style={{ color: C.red }} />}
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------- 6 · HYPOTHESIS ---------------- */}
      <Section id="Hypothesis" bg={C.soft} kicker="06 · Hypothesis" title="Two competing statements.">
        <div className="grid items-stretch gap-6 md:grid-cols-[1fr_auto_1fr]">
          <Fade>
            <div className="flex h-full flex-col rounded-3xl border-2 p-8" style={{ borderColor: C.blue, background: C.white }}>
              <span className="font-serif text-4xl font-light" style={{ color: C.blue }}>H₀</span>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider" style={{ color: C.blue }}>Independent</p>
              <p className="mt-4 text-base leading-relaxed" style={{ color: C.ink }}>
                Consumer preference for Nestlé breakfast cereals is <strong>independent</strong> of age group — there is
                no association.
              </p>
            </div>
          </Fade>
          <div className="flex items-center justify-center">
            <span className="font-serif text-2xl font-light" style={{ color: C.grey }}>vs</span>
          </div>
          <Fade delay={0.1}>
            <div className="flex h-full flex-col rounded-3xl border-2 p-8" style={{ borderColor: C.red, background: C.white }}>
              <span className="font-serif text-4xl font-light" style={{ color: C.red }}>H₁</span>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider" style={{ color: C.red }}>Dependent</p>
              <p className="mt-4 text-base leading-relaxed" style={{ color: C.ink }}>
                Consumer preference for Nestlé breakfast cereals <strong>depends</strong> on age group — there is an
                association.
              </p>
            </div>
          </Fade>
        </div>
      </Section>

      {/* ---------------- 7 · EXPLORING THE DATA ---------------- */}
      <Section
        id="Explore"
        kicker="07 · Exploring the Data"
        title="What the 500 responses actually look like."
        intro="Cross-classifying age and preference reveals clear shifts across segments — the visual foundation for the test."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Fade>
            <Card className="h-full">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider" style={{ color: C.grey }}>
                Preference distribution by age
              </h3>
              <StackedBars />
            </Card>
          </Fade>
          <Fade delay={0.08}>
            <Card className="h-full">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider" style={{ color: C.grey }}>
                Observed frequency heatmap
              </h3>
              <Heatmap />
            </Card>
          </Fade>
        </div>
        <Fade delay={0.05}>
          <Card className="mt-6">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: C.grey }}>
              Observed vs. Expected — 46+ segment
            </h3>
            <p className="mb-6 text-sm" style={{ color: C.grey }}>
              Where observed diverges from expected, dependency between age and preference emerges.
            </p>
            <ObservedVsExpected />
          </Card>
        </Fade>
      </Section>

      {/* ---------------- 8 · STATISTICAL RESULTS ---------------- */}
      <Section id="Results" dark kicker="08 · Statistical Results" title="The numbers deliver a verdict.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <KpiGlass value={STATS.chi} decimals={2} label="χ² Statistic" sub="Calculated value" accent={C.red} />
          <KpiGlass value={STATS.df} label="Degrees of Freedom" sub="(4−1)×(4−1)" accent={C.blue} />
          <KpiGlass value={STATS.critical} decimals={2} label="Critical Value" sub="5% significance" accent={C.navy} />
          <KpiGlass value={0.05} decimals={2} prefix="p < " label="P-value" sub="Highly significant" accent={C.red} />
        </div>
        <Fade delay={0.1}>
          <div className="mt-10 flex flex-col items-center gap-5 rounded-3xl border p-10 text-center" style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}>
            <span
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white"
              style={{ background: "#1E9E57" }}
            >
              <CheckCircle2 className="size-4" /> Null Hypothesis Rejected
            </span>
            <p className="max-w-2xl font-serif text-[clamp(1.4rem,3.5vw,2.2rem)] font-light leading-snug text-white">
              There is statistically significant evidence that age and cereal preference are related.
            </p>
            <p className="text-sm text-white/55">
              χ² = 105.094 &gt; 16.919 critical value at the 5% level of significance.
            </p>
          </div>
        </Fade>
      </Section>

      {/* ---------------- 9 · THE MOST IMPORTANT INSIGHT ---------------- */}
      <Section
        id="Insight"
        bg="linear-gradient(160deg,#FFFFFF,#F4F5F7)"
        kicker="09 · The Most Important Insight"
        title="The consulting insight hiding behind the p-value."
      >
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          <Fade>
            <Card className="h-full" style={{ borderColor: C.blue, borderWidth: 2 }}>
              <div className="flex size-11 items-center justify-center rounded-2xl" style={{ background: "rgba(0,87,184,0.1)" }}>
                <CheckCircle2 className="size-6" style={{ color: C.blue }} />
              </div>
              <h3 className="mt-4 text-lg font-semibold" style={{ color: C.blue }}>Statistical Significance</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: C.grey }}>
                The relationship is real and not due to chance. The test proves a pattern <em>exists</em> — a
                dependency between age and preference.
              </p>
            </Card>
          </Fade>
          <Fade delay={0.1}>
            <Card className="h-full" style={{ borderColor: C.red, borderWidth: 2 }}>
              <div className="flex size-11 items-center justify-center rounded-2xl" style={{ background: "rgba(227,30,36,0.1)" }}>
                <Target className="size-6" style={{ color: C.red }} />
              </div>
              <h3 className="mt-4 text-lg font-semibold" style={{ color: C.red }}>Business Significance</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: C.grey }}>
                A real effect may still be too small to <em>matter</em>. Effect size decides whether the pattern is
                worth acting on — and paying for.
              </p>
            </Card>
          </Fade>
        </div>
        <Fade delay={0.1}>
          <blockquote className="mx-auto mt-12 max-w-4xl rounded-3xl px-8 py-12 text-center" style={{ background: C.navy }}>
            <Sparkles className="mx-auto size-8" style={{ color: "#FF6B70" }} />
            <p className="mt-5 font-serif text-[clamp(1.8rem,5vw,3.2rem)] font-light leading-tight text-white">
              &ldquo;Statistically Significant <span style={{ color: "#FF6B70" }}>≠</span> Business Significant.&rdquo;
            </p>
            <p className="mx-auto mt-6 max-w-xl text-base text-white/60">
              Finding significance does not automatically justify business investment. That distinction is the whole
              point of the analysis.
            </p>
          </blockquote>
        </Fade>
      </Section>

      {/* ---------------- 10 · STRENGTH OF ASSOCIATION ---------------- */}
      <Section
        id="Strength"
        kicker="10 · Strength of Association"
        title="How strong is the link, really?"
        intro="Chi-Square tells us whether a relationship exists. Cramér's V tells us how strong it is."
      >
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Fade>
            <Card>
              <CramersGauge />
            </Card>
          </Fade>
          <Fade delay={0.1}>
            <div
              className="rounded-3xl p-8"
              style={{ background: C.red, color: C.white }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">Key insight</p>
              <p className="mt-4 font-serif text-[clamp(1.5rem,3.6vw,2.2rem)] font-light leading-snug">
                Age influences preference — but not enough to justify separate nationwide campaigns.
              </p>
              <p className="mt-5 text-sm text-white/75">
                A Cramér&rsquo;s V of {STATS.cramersV.toFixed(2)} sits firmly in the &ldquo;weak&rdquo; band. Preference
                patterns vary across age, yet age alone is a limited driver of choice.
              </p>
            </div>
          </Fade>
        </div>
      </Section>

      {/* ---------------- 11 · DECISION MATRIX ---------------- */}
      <Section
        id="Matrix"
        bg={C.soft}
        kicker="11 · Decision Matrix"
        title="Weighing both strategies like a consultant."
      >
        <Fade>
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
        </Fade>
        <Fade delay={0.1}>
          <p className="mt-6 text-center text-sm font-semibold" style={{ color: C.red }}>
            Unified Campaign wins on every dimension that drives return.
          </p>
        </Fade>
      </Section>

      {/* ---------------- 12 · FINAL RECOMMENDATION ---------------- */}
      <Section id="Recommendation" kicker="12 · Final Recommendation" title={<span>The executive call.</span>}>
        <Fade>
          <div className="overflow-hidden rounded-[32px]" style={{ background: C.red, color: C.white }}>
            <div className="p-8 md:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">Recommendation</p>
              <h3 className="mt-3 font-serif text-[clamp(2rem,5vw,3.4rem)] font-light">Unified Marketing Strategy</h3>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
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
            <div className="border-t border-white/20 px-8 py-8 md:px-12">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">The business decision</p>
              <p className="mt-3 font-serif text-[clamp(1.4rem,3.6vw,2.2rem)] font-light">
                Age should not be the primary segmentation variable.
              </p>
            </div>
          </div>
        </Fade>
      </Section>

      {/* ---------------- 13 · BUSINESS IMPACT ---------------- */}
      <Section id="Impact" bg={C.soft} kicker="13 · Business Impact" title="What the unified strategy unlocks.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: Wallet, t: "Lower Cost" },
            { icon: TrendingUp, t: "Higher ROI" },
            { icon: Layers, t: "Simpler Execution" },
            { icon: ShieldCheck, t: "Brand Consistency" },
            { icon: Repeat, t: "Scalable Campaigns" },
          ].map((x, i) => (
            <Fade key={x.t} delay={i * 0.06}>
              <Card className="h-full text-center">
                <x.icon className="mx-auto size-8" style={{ color: C.red }} />
                <p className="mt-3 text-sm font-semibold">{x.t}</p>
              </Card>
            </Fade>
          ))}
        </div>
        <Fade delay={0.1}>
          <div className="mt-10">
            <p className="mb-5 text-sm font-semibold uppercase tracking-wider" style={{ color: C.grey }}>
              Future scope — from demographic to behavioural intelligence
            </p>
            <div className="flex flex-wrap gap-3">
              {["Behavioural Data", "Clustering", "Predictive Analytics", "ML Models", "Personalization"].map((f) => (
                <span
                  key={f}
                  className="rounded-full border px-5 py-2 text-sm font-medium"
                  style={{ borderColor: C.blue, color: C.blue, background: "rgba(0,87,184,0.05)" }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </Fade>
      </Section>

      {/* ---------------- 14 · LESSONS LEARNED ---------------- */}
      <Section id="Lessons" dark kicker="14 · Lessons Learned" title="The order that matters.">
        <div className="grid gap-4 md:grid-cols-5">
          {[
            "Business problem first",
            "Data second",
            "Statistics third",
            "Decision fourth",
            "Business value last",
          ].map((l, i) => (
            <Fade key={l} delay={i * 0.07}>
              <div
                className="flex h-full flex-col rounded-2xl border p-5"
                style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
              >
                <span className="font-serif text-3xl font-light" style={{ color: "#FF6B70" }}>0{i + 1}</span>
                <p className="mt-2 text-sm font-semibold text-white">{l}</p>
              </div>
            </Fade>
          ))}
        </div>
        <Fade delay={0.1}>
          <blockquote className="mx-auto mt-14 max-w-3xl text-center">
            <Quote className="mx-auto size-8" style={{ color: C.red }} />
            <p className="mt-5 font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-tight text-white">
              &ldquo;The best analytical models don&rsquo;t end with p-values — they end with better decisions.&rdquo;
            </p>
          </blockquote>
        </Fade>
      </Section>

      {/* ---------------- DOWNLOADS ---------------- */}
      <section className="px-5 py-20 md:px-10 md:py-28" style={{ background: C.navy }}>
        <div className="mx-auto max-w-6xl">
          <Fade>
            <h2 className="font-serif text-[clamp(1.8rem,4.5vw,2.8rem)] font-light text-white">
              Explore the full engagement.
            </h2>
          </Fade>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { icon: FileText, t: "View Report", d: "Full written case study (PDF)", url: reportPdf.url },
              { icon: Presentation, t: "View Presentation", d: "Strategy deck (PDF)", url: presentationPdf.url },
              { icon: Sheet, t: "Download Dataset", d: "500-consumer workbook (Excel)", url: datasetXlsx.url },
            ].map((x, i) => (
              <Fade key={x.t} delay={i * 0.08}>
                <a
                  href={x.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col rounded-3xl border p-7 transition-transform hover:-translate-y-1.5"
                  style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.05)" }}
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl" style={{ background: "rgba(227,30,36,0.2)" }}>
                    <x.icon className="size-6" style={{ color: "#FF6B70" }} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{x.t}</h3>
                  <p className="mt-1 text-sm text-white/60">{x.d}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
                    Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </Fade>
            ))}
          </div>
          <div className="mt-14 border-t border-white/10 pt-8">
            <Link
              to="/"
              hash="work"
              className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              Back to all work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
