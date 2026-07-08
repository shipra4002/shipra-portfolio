import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
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
  X,
  ChevronDown,
  TrendingUp,
  Droplets,
  Gauge,
  ShieldCheck,
  LineChart,
  Building2,
  CalendarDays,
  Rocket,
  Bike,
  Plug,
  Trophy,
  Wallet,
  Boxes,
  Scale,
  Target,
  FileText,
  Presentation,
  Sheet,
  Maximize2,
  CircleHelp,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { AtAGlance } from "@/components/at-a-glance";

import heroImg from "@/assets/ather-hero-scooter.jpg.asset.json";
import revenueImg from "@/assets/ather-revenue.jpg.asset.json";
import unitEconImg from "@/assets/ather-unit-economics.jpg.asset.json";
import healthImg from "@/assets/ather-health-dashboard.jpg.asset.json";
import assumptionsImg from "@/assets/ather-assumptions.jpg.asset.json";
import scenarioImg from "@/assets/ather-scenario.jpg.asset.json";
import recommendationsImg from "@/assets/ather-recommendations.jpg.asset.json";
import valuationImg from "@/assets/ather-valuation.jpg.asset.json";
import presentationPdf from "@/assets/ather-presentation.pdf.asset.json";
import reportDoc from "@/assets/ather-report.docx.asset.json";
import modelXlsx from "@/assets/ather-financial-model.xlsx.asset.json";

/* ----------------------------- Brand palette ----------------------------- */
const C = {
  black: "#111111",
  ink: "#1A1D1B",
  graphite: "#2B2F2C",
  grey: "#6B7280",
  greyLight: "#9AA39A",
  soft: "#F6F7F8",
  white: "#FFFFFF",
  line: "#E7EAE7",
  green: "#5BC236",
  greenDeep: "#3E9E22",
  lime: "#A6E22E",
  amber: "#F5A524",
  red: "#EF4444",
};

const DISPLAY = '"Space Grotesk", "Inter", sans-serif';
const MONO = '"IBM Plex Mono", ui-monospace, monospace';
const BODY = '"Inter", ui-sans-serif, system-ui, sans-serif';

/* ----------------------------- Hooks ------------------------------------- */
function useCountUp(target: number, decimals = 0, duration = 1600) {
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
  return {
    ref,
    display: val.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  };
}

/* ----------------------------- Primitives -------------------------------- */
function Fade({
  children,
  className,
  delay = 0,
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, on = "light" }: { children: ReactNode; on?: "light" | "dark" }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.28em]"
      style={{ color: C.green, fontFamily: MONO }}
    >
      <span className="inline-block size-1.5 rounded-full" style={{ background: C.green }} />
      {children}
    </span>
  );
}

function SectionHeader({
  index,
  kicker,
  title,
  lead,
  dark = false,
}: {
  index: string;
  kicker: string;
  title: string;
  lead?: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <Fade>
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-semibold"
            style={{ color: C.green, fontFamily: MONO }}
          >
            {index}
          </span>
          <Eyebrow>{kicker}</Eyebrow>
        </div>
      </Fade>
      <Fade delay={0.06}>
        <h2
          className="mt-4 text-[clamp(1.9rem,4.4vw,3rem)] font-semibold leading-[1.02] tracking-tight"
          style={{ fontFamily: DISPLAY, color: dark ? C.white : C.black }}
        >
          {title}
        </h2>
      </Fade>
      {lead && (
        <Fade delay={0.12}>
          <p
            className="mt-4 text-base leading-relaxed md:text-lg"
            style={{ color: dark ? C.greyLight : C.grey }}
          >
            {lead}
          </p>
        </Fade>
      )}
    </div>
  );
}

function InsightCard({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        borderColor: dark ? "rgba(91,194,54,0.28)" : "rgba(91,194,54,0.35)",
        background: dark ? "rgba(91,194,54,0.08)" : "rgba(91,194,54,0.06)",
      }}
    >
      <div
        className="mb-1.5 flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.22em]"
        style={{ color: C.greenDeep, fontFamily: MONO }}
      >
        <TrendingUp className="size-3.5" /> Business Insight
      </div>
      <p
        className="text-sm leading-relaxed"
        style={{ color: dark ? "rgba(255,255,255,0.86)" : C.graphite }}
      >
        {children}
      </p>
    </div>
  );
}

/* --------------------------- Screenshot card ----------------------------- */
function Shot({
  src,
  alt,
  caption,
  onZoom,
  className,
}: {
  src: string;
  alt: string;
  caption: string;
  onZoom: (src: string, alt: string) => void;
  className?: string;
}) {
  return (
    <figure
      className={`group overflow-hidden rounded-2xl border ${className ?? ""}`}
      style={{ borderColor: C.line, background: C.white, boxShadow: "0 20px 44px -28px rgba(17,17,17,0.35)" }}
    >
      <button
        type="button"
        onClick={() => onZoom(src, alt)}
        className="relative block w-full overflow-hidden"
        aria-label={`Zoom: ${caption}`}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <span
          className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
          style={{ background: "rgba(17,17,17,0.75)", color: C.white, fontFamily: MONO }}
        >
          <Maximize2 className="size-3" /> Zoom
        </span>
      </button>
      <figcaption
        className="flex items-center gap-2 border-t px-4 py-2.5 text-[0.72rem]"
        style={{ borderColor: C.line, color: C.grey, fontFamily: MONO }}
      >
        <span className="inline-block size-1.5 rounded-full" style={{ background: C.green }} />
        {caption}
      </figcaption>
    </figure>
  );
}

/* ----------------------------- Progress ---------------------------------- */
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left"
      style={{ scaleX, background: C.green }}
    />
  );
}

/* ----------------------------- At a Glance ------------------------------- */
function GlanceCard() {
  return (
    <AtAGlance
      project="Ather Energy · FY25"
      rows={[
        { k: "Business Context", v: "EV two-wheeler maker turned public company (IPO May 2025)." },
        { k: "Financial Health", v: "Improving but fragile — strong growth, tight liquidity." },
        { k: "Profitability", v: "Gross margin +24%; EBITDA still −22%." },
        { k: "Liquidity", v: "Current ratio 0.92× — below the safe 1.0× line." },
        { k: "Efficiency", v: "96 inventory days; working capital locked in stock." },
        { k: "Forecast", v: "FY26–FY28 driven by scale, margin and cost discipline." },
        { k: "Scenario Analysis", v: "Bear loss ₹927 Cr · Base loss ₹457 Cr · Bull break-even." },
        { k: "DCF", v: "Intrinsic ≈ ₹8.5 at 14% WACC, 5% terminal growth." },
        { k: "Comparable Valuation", v: "Peer multiples imply ₹34–₹79 per share." },
        { k: "Sensitivity", v: "Value swings sharply with growth + operating margin." },
        { k: "Investment Verdict", v: "YES — with execution discipline." },
        { k: "Downloads", v: "Report · Presentation · Excel financial model." },
      ]}
      palette={{
        cardBg: "linear-gradient(180deg, rgba(17,17,17,0.94), rgba(26,29,27,0.94))",
        border: "rgba(91,194,54,0.32)",
        title: C.green,
        label: C.greyLight,
        value: "rgba(255,255,255,0.9)",
        chipBg: "rgba(91,194,54,0.16)",
        chipFg: C.lime,
        btnBg: C.green,
        btnFg: C.black,
        shadow: "0 30px 60px -22px rgba(0,0,0,0.6)",
      }}
    />
  );
}

/* ----------------------------- Data -------------------------------------- */
const HEALTH = [
  {
    icon: LineChart,
    name: "Profitability",
    value: "−22%",
    metric: "EBITDA Margin",
    trend: "Improving fast",
    risk: "Improving",
    riskColor: C.green,
    insight:
      "Gross margin flipped to +24% as BOM costs fell 30% via vertical integration. Fixed costs still outrun gross profit.",
    shot: healthImg.url,
    caption: "Health Dashboard — 5 Vital Signs (Presentation)",
  },
  {
    icon: Droplets,
    name: "Liquidity",
    value: "0.92×",
    metric: "Current Ratio",
    trend: "Below 1.0× threshold",
    risk: "Danger",
    riskColor: C.red,
    insight:
      "Less than ₹1 of liquid assets per ₹1 owed. Inventory is 48% of current assets — one bad quarter from cash stress.",
    shot: unitEconImg.url,
    caption: "Unit Economics & Cash Flow (Presentation)",
  },
  {
    icon: Gauge,
    name: "Efficiency",
    value: "96",
    metric: "Inventory Days",
    trend: "Customers pay fast, stock lingers",
    risk: "Watch",
    riskColor: C.amber,
    insight:
      "₹485 Cr locked in inventory. Cutting to ~70 days would free ₹500–800 Cr of working capital.",
    shot: revenueImg.url,
    caption: "5-Year Revenue vs. Profitability (Presentation)",
  },
  {
    icon: ShieldCheck,
    name: "Solvency",
    value: "0.29×",
    metric: "Debt / Assets",
    trend: "Safe leverage, no profit to cover interest",
    risk: "Watch",
    riskColor: C.amber,
    insight:
      "Leverage is conservative and the business runs on equity capital — but interest coverage stays N/M until EBITDA turns positive.",
    shot: healthImg.url,
    caption: "Health Dashboard — Solvency Signal (Presentation)",
  },
  {
    icon: TrendingUp,
    name: "Market Perception",
    value: "28×",
    metric: "Price-to-Sales",
    trend: "Investors pay a premium",
    risk: "Strong",
    riskColor: C.green,
    insight:
      "Market cap ₹6,384 Cr with P/S compressing from 105× to 28× — pricing an execution premium, not current fundamentals.",
    shot: valuationImg.url,
    caption: "The Valuation Gap (Presentation)",
  },
];

const SNAPSHOT = [
  { icon: CalendarDays, k: "Founded", v: "2013 · Bengaluru" },
  { icon: Rocket, k: "IPO", v: "May 2025 · ₹2,980 Cr raised" },
  { icon: Bike, k: "Industry", v: "Electric two-wheelers (E2W)" },
  { icon: Boxes, k: "Products", v: "Ather 450 · Rizta · AtherStack" },
  { icon: Plug, k: "Charging Network", v: "Ather Grid · 3,611 points, 360+ cities" },
  { icon: Trophy, k: "Market Position", v: "#4 by volume · #1 in South India (22%)" },
];

const SCENARIOS = [
  {
    key: "bear",
    label: "Bear",
    color: C.red,
    conditions: "Macro slowdown · subsidy removal · intense competition",
    revenue: "₹2,593 Cr",
    ebitda: "−20%",
    net: "Loss ₹927 Cr",
  },
  {
    key: "base",
    label: "Base",
    color: C.amber,
    conditions: "Steady EV adoption · PLI benefits · moderate competition",
    revenue: "₹2,886 Cr",
    ebitda: "−4%",
    net: "Loss ₹457 Cr",
  },
  {
    key: "bull",
    label: "Bull",
    color: C.green,
    conditions: "Rapid adoption · battery cost drop · export entry",
    revenue: "₹3,157 Cr",
    ebitda: "+6%",
    net: "Break-even (₹0)",
  },
];

const ASSUMPTIONS = [
  { k: "Sales Growth", v: "28% → 18%", note: "FY26 → FY28" },
  { k: "Gross Margin", v: "18% → 24%", note: "Scale-led expansion" },
  { k: "People + Marketing", v: "36% → 28%", note: "% of sales" },
  { k: "Factory & Equipment", v: "8% → 6%", note: "CapEx % of sales" },
  { k: "Tax Rate", v: "0%", note: "Loss carryforward" },
  { k: "Working Capital", v: "96 → 70 days", note: "Inventory target" },
];

const DCF_ASSUMPTIONS = [
  { k: "Revenue Growth", v: "28% → 18%" },
  { k: "Gross Margin", v: "→ 24% by FY28" },
  { k: "CapEx", v: "6–8% of sales" },
  { k: "WACC", v: "14%" },
  { k: "Terminal Growth", v: "5%" },
];

const ARCH = [
  { step: "Assumptions", note: "Drivers & inputs" },
  { step: "Historical Data", note: "FY21–FY25 financials" },
  { step: "Ratio Analysis", note: "5 vital signs" },
  { step: "Forecasting", note: "FY26–FY28 build" },
  { step: "Scenario Analysis", note: "Bear · Base · Bull" },
  { step: "Sensitivity", note: "Growth × margin grid" },
  { step: "DCF", note: "FCF @ 14% WACC" },
  { step: "Dashboard", note: "Health scorecard" },
  { step: "Investment Decision", note: "The verdict" },
];

const RECS = [
  {
    icon: Wallet,
    title: "Improve Liquidity",
    priority: "Critical",
    priorityColor: C.red,
    impact: "High",
    timeline: "By FY26",
    outcome: "Current ratio > 1.2× · keep 6 months of costs in reserve.",
  },
  {
    icon: TrendingUp,
    title: "Expand Margins",
    priority: "High",
    priorityColor: C.amber,
    impact: "High",
    timeline: "FY26–FY28",
    outcome: "Gross margin → 24%; OpEx below 28% of sales via scale.",
  },
  {
    icon: Boxes,
    title: "Optimize Working Capital",
    priority: "High",
    priorityColor: C.amber,
    impact: "Medium-High",
    timeline: "FY26",
    outcome: "Inventory 96 → 70 days, freeing ₹500–800 Cr of cash.",
  },
  {
    icon: Rocket,
    title: "Scale Profitably",
    priority: "Strategic",
    priorityColor: C.green,
    impact: "Very High",
    timeline: "24 months",
    outcome: "Launch EL platform, fill capacity without burning cash.",
  },
];

const DOWNLOADS = [
  {
    icon: FileText,
    title: "Financial Modelling Report",
    desc: "27-page corporate health assessment, ratios, valuation & recommendations.",
    href: reportDoc.url,
    cta: "Download report",
  },
  {
    icon: Presentation,
    title: "Presentation",
    desc: "Executive deck — dashboards, scenarios and the investment verdict.",
    href: presentationPdf.url,
    cta: "Download deck",
  },
  {
    icon: Sheet,
    title: "Excel Financial Model",
    desc: "Full model: assumptions, forecast, scenarios, sensitivity & DCF.",
    href: modelXlsx.url,
    cta: "Download model",
  },
];

/* ----------------------------- Health card ------------------------------- */
function HealthCard({
  item,
  onZoom,
}: {
  item: (typeof HEALTH)[number];
  onZoom: (src: string, alt: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;
  return (
    <div
      className="overflow-hidden rounded-2xl border transition-shadow"
      style={{
        borderColor: open ? "rgba(91,194,54,0.5)" : C.line,
        background: C.white,
        boxShadow: open ? "0 24px 50px -30px rgba(17,17,17,0.4)" : "none",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 p-5 text-left"
      >
        <span
          className="flex size-11 shrink-0 items-center justify-center rounded-xl"
          style={{ background: "rgba(91,194,54,0.12)", color: C.greenDeep }}
        >
          <Icon className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className="text-[0.62rem] font-semibold uppercase tracking-[0.18em]"
              style={{ color: C.grey, fontFamily: MONO }}
            >
              {item.name}
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-wide"
              style={{ background: `${item.riskColor}1a`, color: item.riskColor, fontFamily: MONO }}
            >
              {item.risk}
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span
              className="text-2xl font-semibold tracking-tight"
              style={{ fontFamily: DISPLAY, color: C.black }}
            >
              {item.value}
            </span>
            <span className="text-xs" style={{ color: C.grey }}>
              {item.metric}
            </span>
          </div>
          <p className="mt-0.5 text-xs" style={{ color: C.greyLight }}>
            {item.trend}
          </p>
        </div>
        <ChevronDown
          className="size-5 shrink-0 transition-transform"
          style={{ color: C.grey, transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t px-5 pb-5 pt-4" style={{ borderColor: C.line }}>
              <p className="mb-4 text-sm leading-relaxed" style={{ color: C.graphite }}>
                {item.insight}
              </p>
              <Shot src={item.shot} alt={item.name + " supporting chart"} caption={item.caption} onZoom={onZoom} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ----------------------------- Route ------------------------------------- */
export const Route = createFileRoute("/work/ather")({
  head: () => ({
    meta: [
      { title: "Ather Energy — Business Health Intelligence | Shipra Maurya" },
      {
        name: "description",
        content:
          "An interactive business health intelligence dashboard for Ather Energy: financial modelling, forecasting, scenario planning, DCF & comparable valuation — answering whether Ather is healthy enough to justify long-term investment.",
      },
      { property: "og:title", content: "Ather Energy — Business Health Intelligence" },
      {
        property: "og:description",
        content:
          "Financial modelling, forecasting and valuation for Ather Energy, presented as an executive financial intelligence dashboard.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://shipra-maurya-portfolio.lovable.app" + heroImg.url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AtherCaseStudy,
});

function AtherCaseStudy() {
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);
  const [scenario, setScenario] = useState("base");
  const active = SCENARIOS.find((s) => s.key === scenario) ?? SCENARIOS[1];

  const openZoom = (src: string, alt: string) => setZoom({ src, alt });

  return (
    <div style={{ background: C.white, color: C.ink, fontFamily: BODY }}>
      <ProgressBar />
      <GlanceCard />

      {/* ---------------- HERO ---------------- */}
      <header className="relative w-full overflow-hidden" style={{ background: C.black }}>
        {/* animated grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(91,194,54,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(91,194,54,0.10) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
            maskImage: "radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 80%)",
          }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${C.green}, transparent)` }}
          animate={{ y: [0, 520, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-24 md:px-10 md:pb-20 md:pt-28">
          <Fade>
            <Link
              to="/"
              hash="work"
              className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </Fade>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Fade delay={0.08}>
                <span
                  className="text-[0.7rem] font-semibold uppercase tracking-[0.32em]"
                  style={{ color: C.green, fontFamily: MONO }}
                >
                  Strategy Breakdown · Business Health
                </span>
              </Fade>
              <Fade delay={0.16}>
                <h1
                  className="mt-4 text-[clamp(2.8rem,8vw,5.6rem)] font-bold uppercase leading-[0.92] tracking-tight text-white"
                  style={{ fontFamily: DISPLAY }}
                >
                  Ather Energy
                </h1>
              </Fade>
              <Fade delay={0.24}>
                <p className="mt-4 max-w-lg text-lg text-white/80 md:text-2xl">
                  Business Health Assessment &amp; Strategic Outlook
                </p>
              </Fade>
              <Fade delay={0.3}>
                <p
                  className="mt-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/45"
                  style={{ fontFamily: MONO }}
                >
                  Financial Modelling · Forecasting · Valuation · Corporate Strategy
                </p>
              </Fade>
            </div>

            <Fade delay={0.24}>
              <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                <motion.img
                  src={heroImg.url}
                  alt="Ather Rizta electric scooter on a highway with a city skyline"
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 6, ease: "easeOut" }}
                />
              </div>
            </Fade>
          </div>

          {/* KPI cards */}
          <Fade delay={0.36}>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { v: 2255, dec: 0, pre: "₹", suf: " Cr", l: "Revenue FY25" },
                { v: 28, dec: 0, pre: "", suf: "×", l: "Revenue Growth" },
                { v: 24, dec: 0, pre: "", suf: "%", l: "Gross Margin" },
                { v: 734, dec: 0, pre: "₹", suf: " Cr", l: "Net Loss" },
                { v: 0.92, dec: 2, pre: "", suf: "×", l: "Current Ratio" },
                { v: 321, dec: 0, pre: "₹", suf: "", l: "IPO Price" },
              ].map((k) => (
                <Kpi key={k.l} {...k} />
              ))}
            </div>
          </Fade>
        </div>
      </header>

      {/* ---------------- SECTION 1 · BUSINESS QUESTION ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
        <SectionHeader
          index="01"
          kicker="The Business Question"
          title="Can Ather transition from a high-growth startup into a financially sustainable public company?"
          lead="One executive decision frames the entire assessment — is Ather healthy enough to justify long-term investment?"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-4">
            {[
              { icon: TrendingUp, q: "When will profitability arrive?", a: "EBITDA break-even by FY28 in the Bull case; steady progress in Base." },
              { icon: Droplets, q: "Is liquidity sufficient?", a: "Current ratio 0.92× — IPO proceeds buffer, but discipline is essential." },
              { icon: Scale, q: "Does the IPO valuation reflect fundamentals?", a: "₹321 vs DCF ≈ ₹8.5 — the market prices future execution." },
            ].map((x, i) => (
              <Fade key={x.q} delay={i * 0.06}>
                <div
                  className="flex gap-4 rounded-2xl border p-5"
                  style={{ borderColor: C.line, background: C.soft }}
                >
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: C.white, color: C.greenDeep, border: `1px solid ${C.line}` }}
                  >
                    <x.icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold" style={{ color: C.black, fontFamily: DISPLAY }}>
                      {x.q}
                    </p>
                    <p className="mt-1 text-sm" style={{ color: C.grey }}>
                      {x.a}
                    </p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>

          <Fade delay={0.1}>
            <div
              className="rounded-2xl border p-6"
              style={{ borderColor: C.line, background: C.black }}
            >
              <div
                className="mb-5 flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.22em]"
                style={{ color: C.green, fontFamily: MONO }}
              >
                <Building2 className="size-4" /> Company Snapshot
              </div>
              <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                {SNAPSHOT.map((s) => (
                  <div key={s.k} className="flex gap-3">
                    <s.icon className="mt-0.5 size-4 shrink-0" style={{ color: C.lime }} />
                    <div>
                      <p
                        className="text-[0.58rem] font-semibold uppercase tracking-[0.16em]"
                        style={{ color: C.greyLight, fontFamily: MONO }}
                      >
                        {s.k}
                      </p>
                      <p className="mt-0.5 text-sm text-white/90">{s.v}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ---------------- SECTION 2 · HEALTH DASHBOARD ---------------- */}
      <section style={{ background: C.soft }}>
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
          <SectionHeader
            index="02"
            kicker="Financial Health Dashboard"
            title="Five vital signs of business health"
            lead="Each card reads like a diagnostic: current value, trend and risk level. Click any card to expand its supporting chart."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-3">
              {HEALTH.map((h) => (
                <HealthCard key={h.name} item={h} onZoom={openZoom} />
              ))}
            </div>
            <div className="grid content-start gap-5">
              <Shot
                src={healthImg.url}
                alt="Ather health dashboard — five vital signs"
                caption="Health Dashboard — 5 Vital Signs (Presentation)"
                onZoom={openZoom}
              />
              <InsightCard>
                Ather is improving but fragile. Growth and unit economics are strong, yet liquidity and
                profitability remain the decisive execution risks over the next 24 months.
              </InsightCard>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 3 · GROWTH ENGINE ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
        <SectionHeader
          index="03"
          kicker="The Growth Engine"
          title="How the money flows — and why profit hasn't arrived yet"
          lead="Revenue, margins, unit economics and cash flow, told as one horizontal story."
        />

        <Fade>
          <div className="mt-10 flex flex-wrap items-stretch gap-3">
            {[
              { l: "Revenue", v: "₹2,255 Cr", c: C.green },
              { l: "Gross Profit", v: "+24% margin", c: C.greenDeep },
              { l: "Operating Costs", v: "People · R&D · Retail", c: C.amber },
              { l: "Net Loss", v: "₹734 Cr", c: C.red },
              { l: "Future Break-even", v: "FY28 (Bull)", c: C.black },
            ].map((s, i, arr) => (
              <div key={s.l} className="flex items-center gap-3">
                <div
                  className="rounded-xl border px-4 py-3"
                  style={{ borderColor: C.line, background: C.soft, minWidth: 150 }}
                >
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.14em]" style={{ color: C.grey, fontFamily: MONO }}>
                    {s.l}
                  </p>
                  <p className="mt-1 font-semibold" style={{ color: s.c, fontFamily: DISPLAY }}>
                    {s.v}
                  </p>
                </div>
                {i < arr.length - 1 && <ArrowRight className="size-4 shrink-0" style={{ color: C.greyLight }} />}
              </div>
            ))}
          </div>
        </Fade>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Shot
            src={revenueImg.url}
            alt="5-year revenue growth vs profitability chart"
            caption="5-Year Journey: Revenue vs. Profitability (Presentation)"
            onZoom={openZoom}
          />
          <div className="grid content-start gap-3">
            {[
              { v: "28×", l: "Revenue growth", d: "₹80 Cr → ₹2,255 Cr over 5 years" },
              { v: "₹2.74 → ₹0.33", l: "Loss per ₹1 of sale", d: "Unit economics improving steadily" },
              { v: "−22% → +24%", l: "Gross margin swing", d: "BOM cost down 30% via integration" },
            ].map((x) => (
              <Fade key={x.l}>
                <div className="rounded-2xl border p-5" style={{ borderColor: C.line, background: C.white }}>
                  <p className="text-2xl font-semibold tracking-tight" style={{ color: C.greenDeep, fontFamily: DISPLAY }}>
                    {x.v}
                  </p>
                  <p className="mt-1 text-sm font-medium" style={{ color: C.black }}>
                    {x.l}
                  </p>
                  <p className="text-xs" style={{ color: C.grey }}>
                    {x.d}
                  </p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <InsightCard>
            Ather makes money on each scooter, but company-wide fixed costs still exceed gross profit.
            Profitability depends on operating leverage — not simply selling more units.
          </InsightCard>
          <Shot
            src={unitEconImg.url}
            alt="Unit economics story — how Ather makes money"
            caption="Unit Economics — How Money Flows (Presentation)"
            onZoom={openZoom}
          />
        </div>
      </section>

      {/* ---------------- SECTION 4 · FORECAST & SCENARIOS ---------------- */}
      <section style={{ background: C.black }}>
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
          <SectionHeader
            index="04"
            kicker="Forecasting & Scenario Planning"
            title="Three futures for FY28"
            dark
            lead="Hover or tap a scenario to switch the outlook. Each reflects different market conditions."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {SCENARIOS.map((s) => {
                const on = s.key === scenario;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onMouseEnter={() => setScenario(s.key)}
                    onFocus={() => setScenario(s.key)}
                    onClick={() => setScenario(s.key)}
                    className="rounded-2xl border p-5 text-left transition-all"
                    style={{
                      borderColor: on ? s.color : "rgba(255,255,255,0.12)",
                      background: on ? `${s.color}14` : "rgba(255,255,255,0.03)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm font-bold uppercase tracking-wide"
                        style={{ color: s.color, fontFamily: MONO }}
                      >
                        {s.label}
                      </span>
                      <span className="text-[0.6rem] uppercase tracking-wide" style={{ color: C.greyLight, fontFamily: MONO }}>
                        FY28
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-white/55">{s.conditions}</p>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {[
                        ["Revenue", s.revenue],
                        ["EBITDA", s.ebitda],
                        ["Net", s.net],
                      ].map(([l, v]) => (
                        <div key={l}>
                          <p className="text-[0.52rem] uppercase tracking-wide" style={{ color: C.greyLight, fontFamily: MONO }}>
                            {l}
                          </p>
                          <p className="mt-0.5 text-sm font-semibold text-white">{v}</p>
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="grid content-start gap-5">
              <div
                className="rounded-2xl border p-6"
                style={{ borderColor: `${active.color}55`, background: `${active.color}12` }}
              >
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ background: active.color }} />
                  <span className="text-sm font-bold uppercase tracking-wide" style={{ color: active.color, fontFamily: MONO }}>
                    {active.label} Case · FY28
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-4">
                  {[
                    ["Revenue", active.revenue],
                    ["EBITDA Margin", active.ebitda],
                    ["Net Result", active.net],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <p className="text-[0.55rem] uppercase tracking-wide" style={{ color: C.greyLight, fontFamily: MONO }}>
                        {l}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white" style={{ fontFamily: DISPLAY }}>
                        {v}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-white/55">{active.conditions}</p>
              </div>
              <Shot
                src={scenarioImg.url}
                alt="FY28 scenario analysis — bear, base, bull"
                caption="Three Futures: FY28 Scenario Analysis (Presentation)"
                onZoom={openZoom}
              />
            </div>
          </div>

          {/* Assumptions dashboard */}
          <div className="mt-14">
            <Fade>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em]" style={{ color: C.green, fontFamily: MONO }}>
                FY26–FY28 Assumptions Dashboard
              </p>
            </Fade>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ASSUMPTIONS.map((a, i) => (
                <Fade key={a.k} delay={i * 0.04}>
                  <div
                    className="rounded-xl border p-4"
                    style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
                  >
                    <p className="text-[0.55rem] uppercase tracking-wide" style={{ color: C.greyLight, fontFamily: MONO }}>
                      {a.k}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white" style={{ fontFamily: DISPLAY }}>
                      {a.v}
                    </p>
                    <p className="text-xs text-white/45">{a.note}</p>
                  </div>
                </Fade>
              ))}
            </div>
            <div className="mt-6">
              <Shot
                src={assumptionsImg.url}
                alt="FY26–FY28 roadmap key assumptions"
                caption="FY26–FY28 Roadmap: Key Assumptions (Presentation)"
                onZoom={openZoom}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 5 · VALUATION LAB ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
        <SectionHeader
          index="05"
          kicker="Valuation Lab"
          title="What is Ather actually worth?"
          lead="Two lenses — intrinsic (DCF) and relative (comparables) — measured against the ₹321 IPO price."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Fade>
            <div className="h-full rounded-2xl border p-6" style={{ borderColor: C.line, background: C.soft }}>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em]" style={{ color: C.greenDeep, fontFamily: MONO }}>
                DCF · Discounted Cash Flow
              </p>
              <p className="mt-3 text-4xl font-semibold tracking-tight" style={{ color: C.black, fontFamily: DISPLAY }}>
                ≈ ₹8.5
              </p>
              <p className="text-sm" style={{ color: C.grey }}>
                Intrinsic share price · FCF discounted at 14% WACC, 5% terminal growth.
              </p>
              {/* football field */}
              <div className="mt-6 space-y-3">
                {[
                  { l: "DCF (Base)", v: 8.5, c: C.red },
                  { l: "Comparable Bear", v: 34, c: C.amber },
                  { l: "Comparable Base", v: 49, c: C.amber },
                  { l: "Comparable Bull", v: 79, c: C.green },
                  { l: "IPO Price", v: 321, c: C.black },
                ].map((b) => (
                  <div key={b.l}>
                    <div className="flex justify-between text-xs" style={{ color: C.grey }}>
                      <span>{b.l}</span>
                      <span className="font-semibold" style={{ color: C.black, fontFamily: MONO }}>₹{b.v}</span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full" style={{ background: C.line }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: b.c }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(b.v / 321) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[0.7rem]" style={{ color: C.greyLight, fontFamily: MONO }}>
                Valuation football field · share price (INR)
              </p>
            </div>
          </Fade>

          <Fade delay={0.08}>
            <div className="h-full rounded-2xl border p-6" style={{ borderColor: C.line, background: C.white }}>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em]" style={{ color: C.greenDeep, fontFamily: MONO }}>
                Comparable Company Analysis
              </p>
              <div className="mt-4 divide-y" style={{ borderColor: C.line }}>
                {[
                  ["DCF (Base Case)", "₹8.53", "−97%"],
                  ["Comparable Bear · 2.5× sales", "₹34.42", "−89%"],
                  ["Comparable Base · 3.5× sales", "₹49.26", "−85%"],
                  ["Comparable Bull · 5.5× sales", "₹78.93", "−75%"],
                ].map((r) => (
                  <div key={r[0]} className="flex items-center justify-between py-3">
                    <span className="text-sm" style={{ color: C.graphite }}>{r[0]}</span>
                    <span className="flex items-center gap-3">
                      <span className="text-sm font-semibold" style={{ color: C.black, fontFamily: MONO }}>{r[1]}</span>
                      <span className="w-14 text-right text-xs font-semibold" style={{ color: C.red, fontFamily: MONO }}>{r[2]}</span>
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Shot
                  src={valuationImg.url}
                  alt="The valuation gap table"
                  caption="The Valuation Gap (Presentation)"
                  onZoom={openZoom}
                />
              </div>
            </div>
          </Fade>
        </div>

        {/* Decision card */}
        <Fade>
          <div
            className="mt-6 overflow-hidden rounded-2xl border"
            style={{ borderColor: "rgba(91,194,54,0.35)", background: C.black }}
          >
            <div className="grid gap-6 p-7 md:grid-cols-[auto_1fr] md:items-center md:p-9">
              <div className="grid grid-cols-3 gap-6 md:gap-8">
                {[
                  ["IPO Price", "₹321", C.white],
                  ["DCF", "≈ ₹8.5", C.red],
                  ["Comparable Range", "₹34–₹79", C.lime],
                ].map(([l, v, c]) => (
                  <div key={l}>
                    <p className="text-[0.55rem] uppercase tracking-wide" style={{ color: C.greyLight, fontFamily: MONO }}>
                      {l}
                    </p>
                    <p className="mt-1 text-2xl font-semibold" style={{ color: c as string, fontFamily: DISPLAY }}>
                      {v}
                    </p>
                  </div>
                ))}
              </div>
              <div className="md:border-l md:pl-8" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                <p className="text-xl font-semibold leading-snug text-white md:text-2xl" style={{ fontFamily: DISPLAY }}>
                  The market prices future execution — not current fundamentals.
                </p>
                <p className="mt-3 text-sm text-white/60">
                  High-growth companies routinely trade above intrinsic value because investors capitalise a
                  long runway of future cash flows and optionality that a conservative DCF deliberately excludes.
                  The ₹321 price is an execution premium — realised only if targets are met.
                </p>
              </div>
            </div>
          </div>
        </Fade>
      </section>

      {/* ---------------- SECTION 6 · MODEL ARCHITECTURE ---------------- */}
      <section style={{ background: C.soft }}>
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
          <SectionHeader
            index="06"
            kicker="Model Architecture"
            title="How the financial model was built"
            lead="A transparent pipeline from raw assumptions to the final investment decision."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-2.5">
              {ARCH.map((a, i) => (
                <Fade key={a.step} delay={i * 0.04}>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex flex-1 items-center gap-4 rounded-xl border px-4 py-3"
                      style={{
                        borderColor: i === ARCH.length - 1 ? C.green : C.line,
                        background: i === ARCH.length - 1 ? "rgba(91,194,54,0.08)" : C.white,
                      }}
                    >
                      <span
                        className="flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                        style={{ background: C.black, color: C.lime, fontFamily: MONO }}
                      >
                        {i + 1}
                      </span>
                      <div className="flex flex-1 items-baseline justify-between gap-3">
                        <span className="font-semibold" style={{ color: C.black, fontFamily: DISPLAY }}>
                          {a.step}
                        </span>
                        <span className="text-xs" style={{ color: C.grey, fontFamily: MONO }}>
                          {a.note}
                        </span>
                      </div>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>

            <div className="grid content-start gap-4">
              <Fade>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em]" style={{ color: C.greenDeep, fontFamily: MONO }}>
                  Key DCF Assumptions
                </p>
              </Fade>
              <div className="grid grid-cols-2 gap-3">
                {DCF_ASSUMPTIONS.map((d, i) => (
                  <Fade key={d.k} delay={i * 0.04}>
                    <div className="rounded-xl border p-4" style={{ borderColor: C.line, background: C.white }}>
                      <p className="text-[0.55rem] uppercase tracking-wide" style={{ color: C.grey, fontFamily: MONO }}>
                        {d.k}
                      </p>
                      <p className="mt-1 text-lg font-semibold" style={{ color: C.black, fontFamily: DISPLAY }}>
                        {d.v}
                      </p>
                    </div>
                  </Fade>
                ))}
              </div>
              <InsightCard>
                A conservative 14% WACC and 5% terminal growth keep the DCF anchored to fundamentals — which is
                precisely why it lands far below a market pricing years of flawless execution.
              </InsightCard>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 7 · RECOMMENDATIONS ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
        <SectionHeader
          index="07"
          kicker="Executive Recommendation"
          title="Four priorities for management"
          lead="Actionable, quantified and sequenced — not theoretical."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {RECS.map((r, i) => (
            <Fade key={r.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border p-6" style={{ borderColor: C.line, background: C.white }}>
                <div className="flex items-center justify-between">
                  <span
                    className="flex size-11 items-center justify-center rounded-xl"
                    style={{ background: "rgba(91,194,54,0.12)", color: C.greenDeep }}
                  >
                    <r.icon className="size-5" />
                  </span>
                  <span
                    className="rounded-full px-2.5 py-1 text-[0.55rem] font-bold uppercase tracking-wide"
                    style={{ background: `${r.priorityColor}1a`, color: r.priorityColor, fontFamily: MONO }}
                  >
                    {r.priority}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold" style={{ color: C.black, fontFamily: DISPLAY }}>
                  {r.title}
                </h3>
                <div className="mt-3 flex gap-6 text-xs">
                  <div>
                    <p className="uppercase tracking-wide" style={{ color: C.greyLight, fontFamily: MONO }}>Impact</p>
                    <p className="mt-0.5 font-semibold" style={{ color: C.graphite }}>{r.impact}</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-wide" style={{ color: C.greyLight, fontFamily: MONO }}>Timeline</p>
                    <p className="mt-0.5 font-semibold" style={{ color: C.graphite }}>{r.timeline}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm" style={{ color: C.grey }}>{r.outcome}</p>
              </div>
            </Fade>
          ))}
        </div>
        <div className="mt-6">
          <Shot
            src={recommendationsImg.url}
            alt="Four strategic priorities for management"
            caption="4 Strategic Priorities for Management (Presentation)"
            onZoom={openZoom}
          />
        </div>
      </section>

      {/* ---------------- FINAL DECISION PANEL ---------------- */}
      <section style={{ background: C.black }}>
        <div className="mx-auto max-w-5xl px-5 py-24 text-center md:px-10 md:py-32">
          <Fade>
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.3em]" style={{ color: C.green, fontFamily: MONO }}>
              The Investment Verdict
            </span>
          </Fade>
          <Fade delay={0.08}>
            <h2 className="mt-5 text-[clamp(1.9rem,4.6vw,3.2rem)] font-semibold text-white" style={{ fontFamily: DISPLAY }}>
              Should investors believe in Ather?
            </h2>
          </Fade>
          <Fade delay={0.16}>
            <p
              className="mt-6 text-[clamp(2rem,6vw,4rem)] font-bold uppercase leading-none tracking-tight"
              style={{ fontFamily: DISPLAY, color: C.green }}
            >
              Yes — with execution discipline.
            </p>
          </Fade>
          <Fade delay={0.24}>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Ather has built strong technology, rapidly improving unit economics and meaningful market traction.
              But long-term success depends on disciplined execution, liquidity management and achieving operating
              leverage — rather than relying solely on future market optimism.
            </p>
          </Fade>
          <Fade delay={0.3}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              {[
                ["Growth", "Strong Momentum"],
                ["Profitability", "Improving"],
                ["Liquidity", "Critical Watch"],
                ["Future Potential", "Very High"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="rounded-xl border px-4 py-3"
                  style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)" }}
                >
                  <p className="text-[0.55rem] uppercase tracking-wide" style={{ color: C.greyLight, fontFamily: MONO }}>{k}</p>
                  <p className="mt-0.5 text-sm font-semibold text-white">{v}</p>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* ---------------- DOWNLOADS ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-24">
        <SectionHeader
          index="08"
          kicker="Downloads"
          title="Explore the full analysis"
          lead="The report, presentation and Excel model behind this assessment."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {DOWNLOADS.map((d, i) => (
            <Fade key={d.title} delay={i * 0.06}>
              <a
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1"
                style={{ borderColor: C.line, background: C.white, boxShadow: "0 16px 40px -30px rgba(17,17,17,0.4)" }}
              >
                <span
                  className="flex size-12 items-center justify-center rounded-xl transition-colors"
                  style={{ background: "rgba(91,194,54,0.12)", color: C.greenDeep }}
                >
                  <d.icon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold" style={{ color: C.black, fontFamily: DISPLAY }}>
                  {d.title}
                </h3>
                <p className="mt-2 flex-1 text-sm" style={{ color: C.grey }}>
                  {d.desc}
                </p>
                <span
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                  style={{ color: C.greenDeep }}
                >
                  {d.cta}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </Fade>
          ))}
        </div>
      </section>

      {/* ---------------- BOTTOM NAV ---------------- */}
      <section style={{ background: C.soft }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-12 md:px-10 md:py-16">
          <Fade>
            <Link
              to="/"
              hash="work"
              className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: C.grey }}
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </Fade>
          <Fade>
            <Link
              to="/work/$slug"
              params={{ slug: "notion" }}
              className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:translate-x-1"
              style={{ background: C.black, color: C.white }}
            >
              Next: Investigation · Notion
              <ArrowRight className="size-4" />
            </Link>
          </Fade>
        </div>
      </section>


      <SiteFooter />

      {/* ---------------- LIGHTBOX ---------------- */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10"
            style={{ background: "rgba(10,10,10,0.9)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(null)}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
              onClick={() => setZoom(null)}
            >
              <X className="size-6" />
            </button>
            <motion.img
              src={zoom.src}
              alt={zoom.alt}
              className="max-h-[90vh] max-w-full rounded-xl object-contain"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ----------------------------- KPI ---------------------------------------- */
function Kpi({
  v,
  dec,
  pre,
  suf,
  l,
}: {
  v: number;
  dec: number;
  pre: string;
  suf: string;
  l: string;
}) {
  const { ref, display } = useCountUp(v, dec);
  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
    >
      <p className="text-xl font-semibold tracking-tight text-white md:text-2xl" style={{ fontFamily: DISPLAY }}>
        <span ref={ref}>
          {pre}
          {display}
          {suf}
        </span>
      </p>
      <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em]" style={{ color: C.greyLight, fontFamily: MONO }}>
        {l}
      </p>
    </div>
  );
}
