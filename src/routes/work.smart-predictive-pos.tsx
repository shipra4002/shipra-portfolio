import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Database,
  ExternalLink,
  FileText,
  LineChart,
  Maximize2,
  X,
} from "lucide-react";
import { AtAGlance } from "@/components/at-a-glance";

/* Case-study artifacts */
import loginShot from "@/assets/spos-login-page.png";
import cashierShot from "@/assets/spos-cashier-screen.png";
import kitchenShot from "@/assets/spos-kitchen-order-management.png";
import managerShot from "@/assets/spos-manager-review-order.png";
import purchaseShot from "@/assets/spos-auto-order.png";
import customerFlow from "@/assets/spos-customer-flow-chart-drawio-1.png";
import kitchenFlow from "@/assets/spos-kitchen-flow-chart-drawio.png";
import managerFlow from "@/assets/spos-manager-flow-chart-drawio-1.png";
import asIsFlow from "@/assets/spos-as-is-flow.jpg";
import toBeFlow from "@/assets/spos-to-be-flow.jpg";
import contextDiagram from "@/assets/spos-context-diagram.jpg";
import excelAnalysis from "@/assets/spos-excel-analysis.png";
import powerbiDashboard from "@/assets/spos-powerbi-dashboard.png";
import heroDashboard from "@/assets/spos-hero-dashboard.png";
// BRD now opens via Google Drive link (see BRD_PDF_URL)

/* Real artifacts now wired in. */
const DASHBOARD_IMG = powerbiDashboard;
const HERO_DASHBOARD_IMG = heroDashboard;
const EXCEL_IMG = excelAnalysis;
const CONTEXT_DIAGRAM_IMG = contextDiagram;
const ARCHITECTURE_IMG = toBeFlow;
const AS_IS_IMG = asIsFlow;
const TO_BE_IMG = toBeFlow;
const BRD_PDF_URL = "https://drive.google.com/file/d/1JHDf1F0SMreVakBc37fH3QYqA8V6-w6W/view?usp=sharing";
const PROTOTYPE_URL = "https://predicta-dine.lovable.app/";

export const Route = createFileRoute("/work/smart-predictive-pos")({
  head: () => ({
    meta: [
      { title: "Smart Predictive POS — A Case Study by Shipra Maurya" },
      {
        name: "description",
        content:
          "A decision-support POS that helps restaurants reduce waste, optimise operations and act on predictive insights exactly when decisions are made.",
      },
      { property: "og:title", content: "Smart Predictive POS — A Case Study by Shipra Maurya" },
      {
        property: "og:description",
        content: "Turning everyday restaurant data into better decisions through predictive analytics.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SmartPosCaseStudy,
});

/* ─────────────────────────── Scoped theme ─────────────────────────── */

const theme = {
  "--bg": "#111315",
  "--surface": "#1A1D21",
  "--surface2": "#24282D",
  "--accent": "#18C37E",
  "--accent2": "#2F7C8F",
  "--highlight": "#D8B36A",
  "--text": "#F8F8F8",
  "--muted": "#A5A7AB",
} as CSSProperties;

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────── Building blocks ─────────────────────────── */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <span className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--accent)]">{index}</span>
      <h2 className="mt-4 text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--text)]">
        {title}
      </h2>
    </Reveal>
  );
}

function Section({
  children,
  id,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`flex min-h-screen flex-col justify-center border-b border-white/[0.06] px-6 py-24 md:px-10 md:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

/** Graceful placeholder used until the real artifact image is supplied. */
function ArtifactImage({
  src,
  alt,
  label,
  className = "",
  onZoom,
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
  onZoom?: () => void;
}) {
  if (!src) {
    return (
      <div
        className={`flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 bg-[var(--surface2)] p-8 text-center ${className}`}
      >
        <span className="text-3xl text-white/20">◈</span>
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{label}</span>
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={onZoom}
      className={`group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface2)] ${className}`}
    >
      <img src={src} alt={alt} className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
      {onZoom && (
        <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
          <Maximize2 className="size-4" />
        </span>
      )}
    </button>
  );
}

/**
 * Premium titled figure: framed artifact with a professional title, one-line
 * caption and click-to-zoom. Uses `contain` so diagrams stay fully readable.
 */
function Figure({
  src,
  alt,
  title,
  caption,
  onZoom,
  tint = "var(--accent)",
  bg = "#ffffff",
  className = "",
  imgClassName = "aspect-[4/3]",
}: {
  src: string;
  alt: string;
  title: string;
  caption: string;
  onZoom?: () => void;
  tint?: string;
  bg?: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <figure className={`group overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface)] shadow-[0_30px_60px_-40px_rgba(0,0,0,0.9)] ${className}`}>
      <button
        type="button"
        onClick={onZoom}
        className="relative block w-full overflow-hidden"
        style={{ background: bg }}
        aria-label={`Expand ${title}`}
      >
        <img
          src={src}
          alt={alt}
          className={`w-full object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.02] ${imgClassName}`}
        />
        {onZoom && (
          <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
            <Maximize2 className="size-4" />
          </span>
        )}
      </button>
      <figcaption className="border-t border-white/[0.06] p-5">
        <div className="flex items-center gap-2">
          <span className="h-3.5 w-1 rounded-full" style={{ background: tint }} />
          <span className="text-sm font-semibold text-[var(--text)]">{title}</span>
        </div>
        <p className="mt-1.5 pl-3 text-xs leading-relaxed text-[var(--muted)]">{caption}</p>
      </figcaption>
    </figure>
  );
}

/* ─────────────────────────── Lightbox / Zoom ─────────────────────────── */

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-10"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="size-5" />
      </button>
      <motion.img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      />
    </motion.div>
  );
}

/* ─────────────────────────── Navigation ─────────────────────────── */

function PageNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[var(--bg)]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center px-6 py-4 md:px-10">
        <div className="flex-1">
          <Link
            to="/"
            hash="work"
            className="group inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)]"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Projects
          </Link>
        </div>
        <span className="hidden text-[0.65rem] uppercase tracking-[0.28em] text-[var(--muted)] md:inline-block">
          Project
        </span>
        <div className="flex flex-1 justify-end">
          <Link
            to="/work/$slug"
            params={{ slug: "nexo" }}
            className="group inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)]"
          >
            <span className="hidden sm:inline">Next Project</span>
            <span className="sm:hidden">Next</span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────── S1 · Hero ─────────────────────────── */

function MiniBars({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  return (
    <div className="flex h-14 items-end gap-1.5">
      {values.map((v, i) => (
        <motion.span
          key={i}
          className="flex-1 rounded-sm"
          style={{ background: color }}
          initial={{ height: 0 }}
          whileInView={{ height: `${(v / max) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
        />
      ))}
    </div>
  );
}

function MiniLine({ points, color }: { points: number[]; color: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 100 - ((p - min) / (max - min || 1)) * 100;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-14 w-full">
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function DashboardHero({ onZoom }: { onZoom?: () => void }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[var(--surface)] shadow-[0_50px_100px_-45px_rgba(0,0,0,0.9)]">
      {/* browser-style chrome */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-[var(--surface2)]/60 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <div className="flex items-center gap-2">
          <span className="flex size-5 items-center justify-center rounded-md bg-[var(--accent)]/15 text-[var(--accent)]">
            <LineChart className="size-3" />
          </span>
          <span className="text-xs font-medium text-[var(--muted)]">Restaurant Operations · Daily Snapshot</span>
        </div>
        <span className="ml-auto rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-[0.6rem] uppercase tracking-[0.15em] text-[var(--accent)]">
          Live
        </span>
      </div>
      <button
        type="button"
        onClick={onZoom}
        className="group relative block w-full overflow-hidden bg-[#0a0d12]"
        aria-label="Expand operations dashboard"
      >
        <img
          src={HERO_DASHBOARD_IMG}
          alt="Smart Predictive POS operations dashboard"
          className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        {onZoom && (
          <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
            <Maximize2 className="size-4" />
          </span>
        )}
      </button>
    </div>
  );
}


function Hero({ onZoom }: { onZoom: (src: string, alt: string) => void }) {
  const meta = [
    { label: "Role", value: "Product Manager & Business Analyst" },
    { label: "Team", value: "Individual Project" },
  ];
  const contributions = [
    "Product Strategy",
    "Business Analysis",
    "Requirement Engineering",
    "Wireframing",
    "Dashboard Design",
  ];

  return (
    <header className="px-6 pt-16 pb-20 md:px-10 md:pt-20 md:pb-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <Reveal delay={0.05}>
            <span className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
              Product Strategy · AI Product
            </span>
            <h1 className="mt-6 text-[clamp(2.6rem,7vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-[var(--text)]">
              Smart Predictive POS
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--muted)]">
              Helping restaurants reduce waste, optimise operations and make smarter decisions through
              predictive analytics.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-9 flex flex-wrap gap-3">
            {meta.map((m) => (
              <div key={m.label} className="rounded-xl border border-white/10 bg-[var(--surface)] px-4 py-2.5">
                <span className="text-[0.6rem] uppercase tracking-[0.18em] text-[var(--muted)]">{m.label}</span>
                <div className="text-sm text-[var(--text)]">{m.value}</div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.16} className="mt-6">
            <div className="mb-3 text-[0.6rem] uppercase tracking-[0.2em] text-[var(--muted)]">Contribution</div>
            <div className="flex flex-wrap gap-2">
              {contributions.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/10 bg-[var(--surface)] px-3.5 py-1.5 text-sm text-[var(--text)]"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
            <a
              href={PROTOTYPE_URL || "#"}
              target={PROTOTYPE_URL ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-[#0b0e0c] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(24,195,126,0.5)]"
            >
              <ExternalLink className="size-4" />
              Prototype
            </a>
            <a
              href={BRD_PDF_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-[var(--text)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--highlight)] hover:text-[var(--highlight)]"
            >
              <FileText className="size-4" />
              BRD Report
            </a>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
        >
          <DashboardHero onZoom={() => onZoom(HERO_DASHBOARD_IMG, "Smart Predictive POS operations dashboard")} />
        </motion.div>
      </div>
    </header>
  );
}

/* ─────────────────────────── S2 · Opportunity ─────────────────────────── */

function Opportunity() {
  const kpis = [
    { metric: "Food Waste", detail: "Spoilage from over-prep and poor forecasting", tint: "var(--accent)" },
    { metric: "Table Turnover", detail: "Slow seating cycles during peak hours", tint: "var(--accent2)" },
    { metric: "Labour Utilisation", detail: "Staff over- or under-scheduled vs demand", tint: "var(--highlight)" },
    { metric: "Rush Hour Efficiency", detail: "Kitchens overwhelmed at unpredictable peaks", tint: "var(--accent)" },
  ];
  return (
    <Section id="opportunity">
      <SectionLabel index="02" title="The Opportunity" />
      <Reveal className="mb-12 max-w-3xl">
        <p className="text-lg leading-relaxed text-[var(--muted)]">
          Traditional POS systems handle billing and order entry, but leave managers planning on intuition. Industry
          data shows restaurants lose an estimated{" "}
          <span className="font-semibold text-[var(--accent)]">15% of revenue</span> to overstocking, food waste and
          labour inefficiency—problems that surface only after the money is already gone.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k, i) => (
          <Reveal key={k.metric} delay={i * 0.08}>
            <div className="group h-full rounded-2xl border border-white/[0.07] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/15">
              <span className="block h-1 w-10 rounded-full" style={{ background: k.tint }} />
              <h3 className="mt-5 text-xl font-semibold text-[var(--text)]">{k.metric}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{k.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}>
        <p className="mx-auto mt-16 max-w-3xl text-center text-[clamp(1.4rem,3vw,2rem)] font-light leading-snug text-[var(--text)]">
          Restaurants already collect operational data every day. The challenge isn&apos;t collecting more data—
          <span className="text-[var(--accent)]"> it&apos;s helping managers make better decisions with it.</span>
        </p>
      </Reveal>
    </Section>
  );
}

/* ─────────────────────────── S3 · Approach ─────────────────────────── */

type StepFigure = { src: string; alt: string; title: string; caption: string; bg?: string };

type ProcessStep = {
  key: string;
  title: string;
  blurb: string;
  figures?: StepFigure[];
  requirements?: { name: string; desc: string }[];
  note?: string;
  wide?: boolean;
};

function Approach({ onZoom }: { onZoom: (src: string, alt: string) => void }) {
  const steps: ProcessStep[] = [
    {
      key: "research",
      title: "Research",
      blurb: "Restaurant operations data pulled apart to locate where revenue actually leaks.",
      note: "Industry data pointed to ~15% revenue loss from waste, overstocking and mis-staffing.",
      figures: [
        {
          src: EXCEL_IMG,
          alt: "Excel analysis of restaurant operations data",
          title: "Excel Analysis",
          caption:
            "Data exploration across turnover, waste % and staffing used to identify inefficiencies and validate the opportunity.",
          bg: "#ffffff",
        },
      ],
    },
    {
      key: "process",
      title: "Business Process Mapping",
      blurb: "Mapping the current restaurant workflow against the future predictive one.",
      wide: true,
      figures: [
        {
          src: AS_IS_IMG,
          alt: "As-Is process flow",
          title: "As-Is Process Flow",
          caption: "Current restaurant workflow before introducing the Smart Predictive POS.",
          bg: "#f7f7f5",
        },
        {
          src: TO_BE_IMG,
          alt: "To-Be process flow",
          title: "To-Be Process Flow",
          caption: "Future workflow after introducing predictive automation and operational intelligence.",
          bg: "#f7f7f5",
        },
      ],
    },
    {
      key: "requirements",
      title: "Requirements",
      blurb: "Business needs from the BRD translated into scoped, prioritised requirements.",
      note: "Extracted from the Business Requirements Document — the project's source of truth.",
      requirements: [
        { name: "Rush-Hour Prediction", desc: "Forecast peak & low periods from sales data." },
        { name: "Real-Time Inventory Tracking", desc: "Auto-deduct stock on every order." },
        { name: "Dynamic Thresholds", desc: "Min / max / reorder levels that adapt to demand." },
        { name: "Automated Ordering", desc: "Generate supplier POs on threshold breach." },
        { name: "Management Dashboard", desc: "Live KPIs on sales, waste & turnover." },
        { name: "Manual Override & Audit", desc: "Manager control over automation, fully logged." },
      ],
    },
    {
      key: "wireframes",
      title: "Wireframes",
      blurb: "The key screens sketched before a single pixel of polish.",
      wide: true,
      figures: [
        { src: loginShot, alt: "Login wireframe", title: "Login Wireframe", caption: "Authentication experience for restaurant staff.", bg: "#ffffff" },
        { src: cashierShot, alt: "Cashier screen", title: "Cashier Screen", caption: "Fast order entry interface for front-of-house staff.", bg: "#ffffff" },
        { src: kitchenShot, alt: "Kitchen screen", title: "Kitchen Screen", caption: "Real-time order management interface for kitchen operations.", bg: "#ffffff" },
        { src: managerShot, alt: "Manager dashboard wireframe", title: "Manager Dashboard", caption: "Operational insights and decision support for managers.", bg: "#ffffff" },
        { src: purchaseShot, alt: "Auto purchase order screen", title: "Auto Purchase Order", caption: "Automated inventory replenishment based on predictive demand.", bg: "#ffffff" },
      ],
    },
    {
      key: "architecture",
      title: "Architecture",
      blurb: "How stakeholders and operational data flow through the system.",
      wide: true,
      figures: [
        {
          src: CONTEXT_DIAGRAM_IMG,
          alt: "Context diagram",
          title: "Context Diagram",
          caption: "High-level interactions between stakeholders and the Smart Predictive POS.",
          bg: "#f1f4fb",
        },
        {
          src: ARCHITECTURE_IMG,
          alt: "System architecture / operational data flow",
          title: "System Architecture",
          caption: "High-level architecture showing how operational data flows through the system.",
          bg: "#f7f7f5",
        },
      ],
    },
    {
      key: "dashboard",
      title: "Dashboard",
      blurb: "Where predictions surface as decisions a manager can act on.",
      figures: [
        {
          src: DASHBOARD_IMG,
          alt: "Power BI operational dashboard",
          title: "Power BI Dashboard",
          caption: "Operational dashboard designed to support data-driven decision-making.",
          bg: "#ffffff",
        },
      ],
    },
  ];

  const [active, setActive] = useState<ProcessStep | null>(null);

  return (
    <Section id="approach">
      <SectionLabel index="03" title="How I Approached the Problem" />
      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center gap-3 lg:flex-1 lg:flex-col">
            <Reveal delay={i * 0.06} className="w-full flex-1">
              <button
                type="button"
                onClick={() => setActive(s)}
                className="group flex h-full w-full flex-col rounded-2xl border border-white/[0.07] bg-[var(--surface)] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/50"
              >
                <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--accent)]">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-2 text-base font-semibold text-[var(--text)]">{s.title}</span>
                <span className="mt-2 text-xs leading-relaxed text-[var(--muted)]">{s.blurb}</span>
                <span className="mt-4 inline-flex items-center gap-1 text-xs text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]">
                  View artifact <ArrowUpRight className="size-3.5" />
                </span>
              </button>
            </Reveal>
            {i < steps.length - 1 && (
              <ArrowRight className="hidden size-4 shrink-0 rotate-90 text-white/20 lg:block" />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <Modal title={active.title} onClose={() => setActive(null)} wide={active.wide}>
            <p className="text-sm text-[var(--muted)]">{active.blurb}</p>
            {active.note && <p className="mt-1 text-xs text-[var(--muted)]/70">{active.note}</p>}

            {active.requirements && (
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {active.requirements.map((r) => (
                  <div key={r.name} className="rounded-xl border border-white/[0.07] bg-[var(--surface2)] p-4">
                    <div className="flex items-center gap-2">
                      <span className="h-3.5 w-1 rounded-full bg-[var(--accent)]" />
                      <span className="text-sm font-semibold text-[var(--text)]">{r.name}</span>
                    </div>
                    <p className="mt-1.5 pl-3 text-xs leading-relaxed text-[var(--muted)]">{r.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {active.figures && (
              <div className={`mt-6 grid grid-cols-1 gap-4 ${active.figures.length > 1 ? "sm:grid-cols-2" : ""}`}>
                {active.figures.map((f) => (
                  <Figure
                    key={f.title}
                    src={f.src}
                    alt={f.alt}
                    title={f.title}
                    caption={f.caption}
                    bg={f.bg}
                    imgClassName="max-h-[46vh]"
                    onZoom={() => onZoom(f.src, f.alt)}
                  />
                ))}
              </div>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </Section>
  );
}

function Modal({ title, children, onClose, wide = false }: { title: string; children: ReactNode; onClose: () => void; wide?: boolean }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm md:p-8"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        style={theme}
        className={`max-h-[88vh] w-full overflow-y-auto rounded-2xl border border-white/10 bg-[var(--surface)] p-6 md:p-8 ${wide ? "max-w-5xl" : "max-w-3xl"}`}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-9 items-center justify-center rounded-full bg-[var(--surface2)] text-[var(--muted)] transition-colors hover:text-[var(--text)]"
          >
            <X className="size-4" />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────── S4 · Understanding the system ─────────────────────────── */

function Understanding({ onZoom }: { onZoom: (src: string, alt: string) => void }) {
  return (
    <Section id="system">
      <SectionLabel index="04" title="Understanding the System" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Reveal>
          <Figure
            src={CONTEXT_DIAGRAM_IMG}
            alt="Context diagram"
            title="Context Diagram"
            caption="Illustrates how customers, kitchen, inventory, suppliers and managers interact with the Smart Predictive POS."
            tint="var(--accent2)"
            bg="#f1f4fb"
            imgClassName="aspect-[4/3]"
            onZoom={() => onZoom(CONTEXT_DIAGRAM_IMG, "Context diagram")}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Figure
            src={ARCHITECTURE_IMG}
            alt="System architecture"
            title="System Architecture"
            caption="High-level architecture showing how operational data flows through the system."
            tint="var(--highlight)"
            bg="#f7f7f5"
            imgClassName="aspect-[4/3]"
            onZoom={() => onZoom(ARCHITECTURE_IMG, "System architecture")}
          />
        </Reveal>
      </div>
      <Reveal delay={0.15}>
        <p className="mx-auto mt-12 max-w-3xl text-center text-lg leading-relaxed text-[var(--muted)]">
          Before designing interfaces, I mapped how information flows across customers, staff, inventory, suppliers
          and managers—to understand where predictive intelligence could create the most value.
        </p>
      </Reveal>
    </Section>
  );
}

/* ─────────────────────────── S5 · Product experience carousel ─────────────────────────── */

function ProductExperience({ onZoom }: { onZoom: (src: string, alt: string) => void }) {
  const screens = [
    {
      title: "Login",
      img: loginShot,
      why: "Role-based entry that routes each staff member to the tools they need.",
      problem: "Cashiers, kitchen and managers need different views, not one crowded screen.",
      objective: "Faster onboarding and cleaner access control.",
    },
    {
      title: "Cashier",
      img: cashierShot,
      why: "Fast, tactile order entry with live totals and availability checks.",
      problem: "Order mistakes and slow entry hurt table turnover at peak times.",
      objective: "Higher accuracy and quicker seating cycles.",
    },
    {
      title: "Kitchen",
      img: kitchenShot,
      why: "A live order board with rush prioritisation and prep timers.",
      problem: "Kitchens lose track of priority during unpredictable rushes.",
      objective: "Rush-hour efficiency and on-time tickets.",
    },
    {
      title: "Manager",
      img: managerShot,
      why: "Alerts surfaced by severity so managers act before problems escalate.",
      problem: "Critical inventory and supplier issues get buried in noise.",
      objective: "Reduced waste and fewer stockouts.",
    },
    {
      title: "Purchase Order",
      img: purchaseShot,
      why: "Auto-generated POs from reorder points, editable before finalising.",
      problem: "Manual reordering is slow and error-prone.",
      objective: "Optimised inventory and controlled cost.",
    },
  ];

  const [i, setI] = useState(0);
  const go = (dir: number) => setI((prev) => (prev + dir + screens.length) % screens.length);
  const s = screens[i];

  return (
    <Section id="experience">
      <SectionLabel index="05" title="Product Experience" />
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.button
              key={s.title}
              type="button"
              onClick={() => onZoom(s.img, s.title)}
              className="group block w-full overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface2)]"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <img src={s.img} alt={s.title} className="w-full object-cover" />
              <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                <Maximize2 className="size-4" />
              </span>
            </motion.button>
          </AnimatePresence>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              {String(i + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <h3 className="mt-5 text-3xl font-semibold text-[var(--text)]">{s.title}</h3>
              <dl className="mt-6 space-y-4">
                {[
                  { k: "Why it exists", v: s.why },
                  { k: "Problem it solves", v: s.problem },
                  { k: "Business objective", v: s.objective },
                ].map((row) => (
                  <div key={row.k}>
                    <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--muted)]">{row.k}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-[var(--text)]">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous screen"
              className="flex size-11 items-center justify-center rounded-full border border-white/15 text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next screen"
              className="flex size-11 items-center justify-center rounded-full border border-white/15 text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <ChevronRight className="size-5" />
            </button>
            <div className="ml-2 flex gap-1.5">
              {screens.map((sc, idx) => (
                <button
                  key={sc.title}
                  type="button"
                  aria-label={sc.title}
                  onClick={() => setI(idx)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: idx === i ? 24 : 8,
                    background: idx === i ? "var(--accent)" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────── S6 · Intelligence layer ─────────────────────────── */

function IntelligenceLayer({ onZoom }: { onZoom: (src: string, alt: string) => void }) {
  const flow = [
    { label: "Sales Data", icon: Database },
    { label: "Inventory Data", icon: Database },
    { label: "Rush Hour Detection", icon: LineChart },
    { label: "Prediction Engine", icon: LineChart },
    { label: "Recommendations", icon: LineChart },
    { label: "Manager Dashboard", icon: LineChart },
  ];
  return (
    <Section id="intelligence" className="bg-[var(--surface)]/40">
      <SectionLabel index="06" title="The Intelligence Layer" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
        {flow.map((f, i) => (
          <Reveal key={f.label} delay={i * 0.1}>
            <div className="relative flex h-full flex-col items-center gap-2 rounded-2xl border border-white/[0.07] bg-[var(--surface)] p-5 text-center">
              <span
                className="flex size-9 items-center justify-center rounded-lg"
                style={{
                  background: i >= 3 ? "var(--accent)" : "var(--surface2)",
                  color: i >= 3 ? "#0b0e0c" : "var(--accent2)",
                }}
              >
                <f.icon className="size-4" />
              </span>
              <span className="text-xs font-medium text-[var(--text)]">{f.label}</span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="mx-auto mt-14 max-w-2xl text-center text-[clamp(1.3rem,2.6vw,1.8rem)] font-light leading-snug text-[var(--text)]">
          This isn&apos;t just another POS.{" "}
          <span className="text-[var(--accent)]">It&apos;s a decision-support system.</span>
        </p>
      </Reveal>

      <Reveal delay={0.25} className="mt-12">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[24px] border border-white/10 bg-[var(--surface)] shadow-[0_50px_100px_-45px_rgba(0,0,0,0.95)]">
          {/* executive header */}
          <div className="flex flex-wrap items-center gap-4 border-b border-white/[0.06] bg-[var(--surface2)]/50 px-5 py-4 md:px-7">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-[var(--accent)]/15 text-[var(--accent)]">
                <LineChart className="size-4" />
              </span>
              <div>
                <div className="text-sm font-semibold text-[var(--text)]">Operational Analytics</div>
                <div className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--muted)]">Power BI · Daily Snapshot</div>
              </div>
            </div>
            <div className="ml-auto flex flex-wrap gap-2.5">
              {[
                { label: "Avg Turnover", value: "74.78%", tint: "var(--accent)" },
                { label: "Waste · Lunch", value: "16.7%", tint: "var(--highlight)" },
                { label: "Rush Signal", value: "Mapped", tint: "var(--accent2)" },
              ].map((k) => (
                <div key={k.label} className="rounded-xl border border-white/[0.06] bg-[var(--surface)] px-3.5 py-2">
                  <div className="text-[0.55rem] uppercase tracking-[0.15em] text-[var(--muted)]">{k.label}</div>
                  <div className="text-sm font-semibold" style={{ color: k.tint }}>{k.value}</div>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onZoom(DASHBOARD_IMG, "Power BI operational dashboard")}
            className="group relative block w-full overflow-hidden bg-white"
            aria-label="Expand Power BI dashboard to full screen"
          >
            <img
              src={DASHBOARD_IMG}
              alt="Power BI operational dashboard"
              className="w-full object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.01]"
            />
            <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
              <Maximize2 className="size-3.5" /> Full screen
            </span>
          </button>
          <div className="border-t border-white/[0.06] px-5 py-4 md:px-7">
            <p className="text-xs leading-relaxed text-[var(--muted)]">
              <span className="font-semibold text-[var(--text)]">Power BI Dashboard</span> — operational dashboard designed to
              support data-driven decision-making across turnover, inventory burn, waste and rush-hour performance.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ─────────────────────────── S7 · Key learnings ─────────────────────────── */

function KeyLearnings() {
  const cards = [
    {
      tag: "Product Thinking",
      body: "I realised dashboards don't create value. Better decisions do.",
      tint: "var(--accent)",
    },
    {
      tag: "Requirements",
      body: "Mapping business workflows before designing interfaces reduced unnecessary features.",
      tint: "var(--accent2)",
    },
    {
      tag: "AI Products",
      body: "Predictive insights become valuable only when they're delivered exactly when decisions are made.",
      tint: "var(--highlight)",
    },
  ];
  return (
    <Section id="learnings">
      <SectionLabel index="07" title="What This Project Changed" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.tag} delay={i * 0.1}>
            <div className="group h-full rounded-2xl border border-white/[0.07] bg-[var(--surface)] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/15">
              <span className="block h-1 w-10 rounded-full" style={{ background: c.tint }} />
              <h3 className="mt-5 text-lg font-semibold text-[var(--text)]">{c.tag}</h3>
              <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-20 flex items-center justify-between border-t border-white/[0.06] pt-10">
        <Link
          to="/"
          hash="work"
          className="group inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)]"
        >
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Projects
        </Link>
        <Link
          to="/work/$slug"
          params={{ slug: "nexo" }}
          className="group inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)]"
        >
          Next Project
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </Section>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

function SmartPosCaseStudy() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const onZoom = (src: string, alt: string) => setLightbox({ src, alt });

  return (
    <div style={theme} className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased">
      <PageNav />
      <Hero onZoom={onZoom} />
      <Opportunity />
      <Approach onZoom={onZoom} />
      <Understanding onZoom={onZoom} />
      <ProductExperience onZoom={onZoom} />
      <IntelligenceLayer onZoom={onZoom} />
      <KeyLearnings />

      <AnimatePresence>
        {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
      </AnimatePresence>

      <AtAGlance
        project="Smart Predictive POS"
        rows={[
          { k: "Challenge", v: "Restaurants run on guesswork — stockouts, waste and slow manual ordering." },
          { k: "Users", v: "Cashiers, kitchen staff and managers across the service flow." },
          { k: "Solution", v: "A predictive POS that forecasts demand and automates reordering." },
          { k: "AI Features", v: "Demand forecasting, auto-purchase orders and a Power BI intelligence layer." },
          { k: "Business Impact", v: "Less waste, fewer stockouts and faster, data-driven operations." },
        ]}
        palette={{
          cardBg: "linear-gradient(180deg, rgba(20,24,33,0.92), rgba(15,18,26,0.92))",
          border: "rgba(230,201,135,0.22)",
          title: "#e6c987",
          label: "#9aa3b5",
          value: "#f4f1e8",
          chipBg: "rgba(94,240,138,0.14)",
          chipFg: "#7ef0a2",
          btnBg: "#e6c987",
          btnFg: "#141821",
          shadow: "0 30px 60px -24px rgba(0,0,0,0.7)",
        }}
      />
    </div>
  );
}
