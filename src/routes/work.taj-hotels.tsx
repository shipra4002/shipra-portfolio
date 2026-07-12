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
  FileText,
  Presentation,
  BookOpen,
  Plus,
  Minus,
  Building2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Users,
  Cpu,
  Cloud,
  Database,
  Network,
  Bot,
  Boxes,
  Leaf,
  Globe2,
  Crown,
  Target,
  Gauge,
  Compass,
  BedDouble,
  Utensils,
  Flower2,
  Plane,
  Smartphone,
  CalendarCheck,
  BadgeIndianRupee,
  ZoomIn,
  X,
  ChevronRight,
  Clock,
} from "lucide-react";
import tajHero from "@/assets/taj-hero.jpg";
const tajArchitecture = { url: "/assets/taj-architecture.jpg" };
const reportPdf = { url: "https://drive.google.com/file/d/1dS0ASJMit3slab0NZ8-hlH1TLuLiCA3e/view?usp=sharing" };
const presentationPdf = { url: "https://drive.google.com/file/d/16t3r3shnuChyTzJI7AXc_FpNqAeqhC5n/view?usp=sharing" };
const ihclAnnualReport = { url: "https://drive.google.com/file/d/1fCWluZBXN5rOdB9zT9-h_6cV2_jkVpMp/view?usp=sharing" };
import { AtAGlance } from "@/components/at-a-glance";

/* ----------------------------- Brand palette ----------------------------- */
const C = {
  navy: "#0E223D",
  navySoft: "#183456",
  gold: "#B68B2D",
  goldSoft: "#C9A24A",
  ivory: "#F7F3EA",
  marble: "#FBF9F4",
  beige: "#E9E0CE",
  emerald: "#1E7A5A",
  ink: "#22303F",
  grey: "#6E7787",
  line: "#E4DCCB",
  white: "#FFFFFF",
};

const SERIF = '"Playfair Display", Georgia, serif';
const MONO = '"IBM Plex Sans", "Inter", sans-serif';

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
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

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
      className="scroll-mt-24 px-5 py-16 md:px-10 md:py-24"
      style={{ background: bg ?? (dark ? C.navy : "transparent"), color: dark ? C.white : C.ink }}
    >
      <div className="mx-auto max-w-6xl">
        {(kicker || title) && (
          <Fade className="mb-10 max-w-3xl md:mb-14">
            {kicker && (
              <span
                className="text-[0.7rem] font-semibold uppercase tracking-[0.34em]"
                style={{ color: C.gold }}
              >
                {kicker}
              </span>
            )}
            {title && (
              <h2
                className="mt-4 text-[clamp(1.9rem,4.4vw,3.1rem)] font-medium leading-[1.06] tracking-[-0.01em]"
                style={{ fontFamily: SERIF }}
              >
                {title}
              </h2>
            )}
            {intro && (
              <p
                className="mt-4 text-base leading-relaxed md:text-lg"
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

function SubHead({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <h3
      className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.26em]"
      style={{ color: dark ? "rgba(255,255,255,0.55)" : C.gold }}
    >
      {children}
    </h3>
  );
}

function Card({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`rounded-3xl border bg-white p-6 shadow-[0_1px_2px_rgba(14,34,61,0.04)] ${className ?? ""}`}
      style={{ borderColor: C.line, ...style }}
    >
      {children}
    </div>
  );
}

function Metric({
  value,
  label,
  sub,
  prefix = "",
  suffix = "",
  decimals = 0,
  accent = C.gold,
  dark = false,
}: {
  value: number;
  label: string;
  sub?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  accent?: string;
  dark?: boolean;
}) {
  const { ref, display } = useCountUp(value, decimals);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border p-5"
      style={{
        borderColor: dark ? "rgba(255,255,255,0.14)" : C.line,
        background: dark ? "rgba(255,255,255,0.04)" : C.white,
      }}
    >
      <div
        className="flex items-baseline gap-0.5 leading-none"
        style={{ color: accent, fontFamily: MONO }}
      >
        <span className="text-sm font-semibold opacity-70">{prefix}</span>
        <span ref={ref} className="text-[clamp(1.9rem,4vw,2.7rem)] font-semibold">
          {display}
        </span>
        <span className="text-lg font-semibold opacity-80">{suffix}</span>
      </div>
      <p className="mt-2.5 text-sm font-semibold" style={{ color: dark ? C.white : C.ink }}>
        {label}
      </p>
      {sub && (
        <p className="mt-0.5 text-xs" style={{ color: dark ? "rgba(255,255,255,0.5)" : C.grey }}>
          {sub}
        </p>
      )}
    </motion.div>
  );
}

function ExpandCard({
  icon: Icon,
  title,
  accent,
  points,
  detail,
}: {
  icon: typeof Target;
  title: string;
  accent: string;
  points: string[];
  detail: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="flex h-full flex-col" style={{ borderColor: `${accent}55` }}>
      <div className="flex items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-xl"
          style={{ background: `${accent}18` }}
        >
          <Icon className="size-5" style={{ color: accent }} />
        </div>
        <h4 className="text-base font-semibold" style={{ color: C.navy }}>
          {title}
        </h4>
      </div>
      <ul className="mt-4 space-y-2">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2 text-sm" style={{ color: C.ink }}>
            <span
              className="mt-1.5 size-1.5 shrink-0 rounded-full"
              style={{ background: accent }}
            />
            {p}
          </li>
        ))}
      </ul>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
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
        {open ? "Hide detail" : "Read analysis"}
      </button>
    </Card>
  );
}

/* ----------------------------- Data -------------------------------------- */
const JOURNEY_STAGES = [
  {
    stage: "Discover",
    icon: Compass,
    pain: "Generic discovery, no personalization",
    fix: "AI-curated experiences & contextual recommendations",
  },
  {
    stage: "Book",
    icon: CalendarCheck,
    pain: "65–70% OTA dependency, commission leakage",
    fix: "Direct booking with best rates & personalized offers",
  },
  {
    stage: "Arrival",
    icon: BedDouble,
    pain: "Disconnected recognition at check-in",
    fix: "Seamless recognition, room auto-set to preferences",
  },
  {
    stage: "Stay",
    icon: Sparkles,
    pain: "Reactive, one-size personalization",
    fix: "Predictive service & real-time experiences",
  },
  {
    stage: "Checkout",
    icon: BadgeIndianRupee,
    pain: "Operational friction, manual billing",
    fix: "One-click digital checkout & billing",
  },
  {
    stage: "Return",
    icon: Crown,
    pain: "Transactional loyalty, low repeat value",
    fix: "Connected loyalty, higher CLV & repeat stays",
  },
];

const ECOSYSTEM = [
  { label: "NuePass", icon: Crown },
  { label: "Dining", icon: Utensils },
  { label: "Spa & Wellness", icon: Flower2 },
  { label: "Booking", icon: CalendarCheck },
  { label: "Air India Travel", icon: Plane },
  { label: "App Behaviour", icon: Smartphone },
  { label: "Room Preferences", icon: BedDouble },
  { label: "Operations", icon: Building2 },
];

const TECH = [
  { name: "AWS", icon: Cloud, purpose: "Cloud backbone — EKS, S3 Lakehouse, DPDP-compliant regions" },
  { name: "Kafka", icon: Network, purpose: "Real-time event bus replacing batch ETL" },
  { name: "Oracle Opera", icon: Building2, purpose: "Cloud PMS — core property management system" },
  { name: "SAP", icon: Boxes, purpose: "Enterprise finance & back-office operations" },
  { name: "Salesforce", icon: Users, purpose: "CRM & marketing orchestration layer" },
  { name: "Customer Data Platform", icon: Database, purpose: "Single source of truth — unified Customer 360" },
  { name: "QuickSight", icon: Gauge, purpose: "Executive BI & operational analytics dashboards" },
  { name: "API Gateway", icon: Network, purpose: "API-first orchestration across all systems" },
  { name: "Gen AI", icon: Bot, purpose: "AI concierge, personalization & predictive models" },
  { name: "Tata Neu", icon: Globe2, purpose: "160M+ user ecosystem & loyalty flywheel" },
];

const KPIS = [
  { value: 50, suffix: "%", label: "Direct Bookings", sub: "30% → 45–50%", accent: C.emerald, up: true },
  { value: 200, prefix: "₹", suffix: "Cr", label: "OTA Leakage Cut", sub: "Reduced commission", accent: C.emerald, up: true },
  { value: 7, prefix: "+", suffix: "%", label: "RevPAR Uplift", sub: "AI dynamic pricing", accent: C.emerald, up: true },
  { value: 82, suffix: "+", label: "NPS Target", sub: "74 → 82+", accent: C.emerald, up: true },
  { value: 90, prefix: "₹", suffix: "Cr", label: "OpEx Savings", sub: "Annual, smart ops", accent: C.emerald, up: true },
  { value: 500, prefix: "₹", suffix: "Cr+", label: "Annual Value", sub: "Year 3 run-rate", accent: C.gold, up: true },
  { value: 40, suffix: "%", label: "5-Yr IRR", sub: "vs 12–15% benchmark", accent: C.gold, up: true },
  { value: 30, suffix: " mo", label: "Payback", sub: "28–32 months", accent: C.navy, up: false },
];

const ROADMAP = [
  {
    year: "Year 1",
    phase: "Foundation",
    period: "2025–2026",
    items: ["Cloud & API backbone", "Customer 360 (top 50)", "500 Digital Champions", "DPDP compliance"],
    accent: C.gold,
  },
  {
    year: "Year 2",
    phase: "Scale",
    period: "2026–2027",
    items: ["AI dynamic pricing (60%)", "Automation & personalization", "80% digital literacy", "45%+ direct bookings"],
    accent: C.navySoft,
  },
  {
    year: "Year 3",
    phase: "Leadership",
    period: "2027–2029",
    items: ["Predictive hospitality", "Enterprise intelligence", "92% profile completeness", "NPS 82+ · 15+ AI models"],
    accent: C.emerald,
  },
];

const RESEARCH = [
  {
    icon: TrendingUp,
    stat: "₹15,000 Cr+",
    tag: "Accelerate 2030",
    insight: "IHCL's flagship growth strategy targeting aggressive portfolio and revenue expansion this decade.",
  },
  {
    icon: Building2,
    stat: "300+ hotels",
    tag: "Asset-Light Expansion",
    insight: "Management-contract-led growth expands the footprint with lower capital intensity and higher ROCE.",
  },
  {
    icon: Boxes,
    stat: "12+ brands",
    tag: "Portfolio Expansion",
    insight: "Ginger, Vivanta, SeleQtions, ama & Qmin broaden reach from luxury to lean-luxe and F&B delivery.",
  },
  {
    icon: Globe2,
    stat: "160M+ users",
    tag: "Hospitality Ecosystem",
    insight: "Deep Tata Neu integration turns Taj into the anchor luxury experience of the Tata lifestyle.",
  },
  {
    icon: Leaf,
    stat: "Net-zero 2030",
    tag: "Sustainability",
    insight: "Paathya ESG framework and a 'Green Stay Score' create a credential no Indian rival yet offers.",
  },
  {
    icon: BadgeIndianRupee,
    stat: "Record EBITDA",
    tag: "Digital Growth",
    insight: "Rising direct-channel share and loyalty engagement lift margins across the enterprise.",
  },
];

/* ----------------------------- At a Glance ------------------------------- */
function GlanceCard() {
  return (
    <AtAGlance
      project="Taj Hotels · IHCL"
      rows={[
        { k: "Role", v: "Digital Strategy & Enterprise Architecture" },
        { k: "Timeline", v: "3-year transformation (2025–2029)" },
        { k: "Team", v: "Shipra, Komal, Prashant, Shristy" },
        { k: "Frameworks", v: "SWOT · Porter's Five · Customer Journey · Customer 360 · Enterprise Architecture" },
        { k: "AI Strategy", v: "Gen AI concierge, predictive pricing, 15+ models" },
        { k: "Roadmap", v: "Foundation → Scale → Leadership" },
        { k: "ROI", v: "₹650 Cr in · ₹500 Cr+ annual value · 35–45% IRR" },
        { k: "Outcome", v: "Intelligent Emotional luxury brand" },
        { k: "Recommendation", v: "Approve ₹650 Cr · Establish a TMO led by a CDO" },
      ]}
      palette={{
        cardBg: "linear-gradient(180deg, rgba(251,249,244,0.97), rgba(247,243,234,0.95))",
        border: "rgba(182,139,45,0.32)",
        title: C.gold,
        label: C.grey,
        value: C.navy,
        chipBg: "rgba(14,34,61,0.08)",
        chipFg: C.navy,
        btnBg: C.navy,
        btnFg: C.ivory,
        shadow: "0 30px 60px -24px rgba(14,34,61,0.45)",
      }}
    />
  );
}

/* ----------------------------- Progress ---------------------------------- */
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left"
      style={{ scaleX, background: C.gold }}
    />
  );
}

/* ----------------------------- Route ------------------------------------- */
export const Route = createFileRoute("/work/taj-hotels")({
  head: () => ({
    meta: [
      { title: "Taj Hotels — Reimagining Tajness for the Digital Era | Shipra Maurya" },
      {
        name: "description",
        content:
          "A digital transformation strategy for Taj Hotels (IHCL): enterprise architecture, Customer 360, AI strategy and a 3-year roadmap turning heritage luxury into digitally intelligent hospitality.",
      },
      { property: "og:title", content: "Taj Hotels — Reimagining Tajness for the Digital Era" },
      {
        property: "og:description",
        content:
          "Executive strategy briefing: enterprise architecture, AI, Customer 360 and ROI for Taj Hotels' digital transformation.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://shipra-maurya-portfolio.lovable.app" + tajHero },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TajCaseStudy,
});

function TajCaseStudy() {
  const [zoom, setZoom] = useState(false);

  return (
    <div style={{ background: C.marble, color: C.ink, fontFamily: '"Inter", sans-serif' }}>
      <ProgressBar />
      <GlanceCard />

      {/* ---------------- HERO ---------------- */}
      <header className="relative min-h-[94vh] w-full overflow-hidden">
        <motion.img
          src={tajHero}
          alt="The Taj Mahal Palace Hotel, Mumbai, at golden-hour sunset"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(14,34,61,0.55) 0%, rgba(14,34,61,0.35) 40%, rgba(14,34,61,0.82) 100%)",
          }}
        />
        <div className="relative mx-auto flex min-h-[94vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-24 md:px-10 md:pb-20">
          <Fade>
            <Link
              to="/"
              hash="work"
              className="group mb-auto inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </Fade>

          <Fade delay={0.1}>
            <span
              className="text-[0.72rem] font-semibold uppercase tracking-[0.36em]"
              style={{ color: C.goldSoft }}
            >
              Strategy Breakdown · Digital Transformation
            </span>
          </Fade>
          <Fade delay={0.18}>
            <h1
              className="mt-4 text-[clamp(2.8rem,8vw,6rem)] font-medium uppercase leading-[0.98] tracking-[0.01em] text-white"
              style={{ fontFamily: SERIF }}
            >
              Reimagining Tajness
            </h1>
          </Fade>
          <Fade delay={0.26}>
            <p className="mt-5 max-w-2xl text-lg text-white/80 md:text-2xl">
              Designing the digital future of luxury hospitality.
            </p>
          </Fade>
          <Fade delay={0.34}>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/60">
              {["Digital Strategy", "Enterprise Architecture", "Customer Experience", "AI", "Hospitality"].map(
                (t, i) => (
                  <span key={t} className="flex items-center gap-3">
                    {i > 0 && <span style={{ color: C.goldSoft }}>·</span>}
                    {t}
                  </span>
                ),
              )}
            </div>
          </Fade>

          {/* Metric cards */}
          <Fade delay={0.42}>
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {[
                { v: 120, suffix: "+", l: "Years Heritage" },
                { v: 565, suffix: "+", l: "Hotels" },
                { v: 160, suffix: "M+", l: "Tata Neu Ecosystem" },
                { v: 500, prefix: "₹", suffix: "Cr+", l: "Potential Annual Value" },
              ].map((m) => (
                <HeroMetric key={m.l} {...m} />
              ))}
            </div>
          </Fade>

          <Fade delay={0.5}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={reportPdf.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                style={{ background: C.gold, color: C.navy }}
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

      {/* ---------------- WHY TRANSFORMATION NOW ---------------- */}
      <Block
        id="why-now"
        kicker="01 · Why Transformation Now"
        title="Taj has the brand. The window to act is now."
        intro="Luxury hospitality is bifurcating between brands that master AI-driven personalization and those displaced by it. Digital maturity sits at 2.4/5 — an estimated ₹500 Cr+ annual value gap."
      >
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Left — problem + decision */}
          <div className="space-y-6">
            <Fade>
              <Card style={{ borderColor: `${C.gold}55` }}>
                <SubHead>The Business Problem</SubHead>
                <div className="space-y-4">
                  {[
                    { icon: TrendingDown, t: "65–70% OTA dependency", d: "₹200 Cr+ annual commission leakage." },
                    { icon: Database, t: "No Customer 360", d: "Guest data fragmented across PMS, loyalty & POS." },
                    { icon: Gauge, t: "Digital maturity 2.4/5", d: "Well below the 3.8+ luxury benchmark." },
                  ].map((x) => (
                    <div key={x.t} className="flex items-start gap-3">
                      <div
                        className="flex size-9 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: `${C.navy}0d` }}
                      >
                        <x.icon className="size-5" style={{ color: C.navy }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: C.navy }}>
                          {x.t}
                        </p>
                        <p className="text-sm" style={{ color: C.grey }}>
                          {x.d}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Fade>
            <Fade delay={0.08}>
              <div
                className="rounded-3xl px-7 py-8"
                style={{ background: C.navy, color: C.white }}
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/60">
                  Key decision question
                </p>
                <p
                  className="mt-3 text-[clamp(1.4rem,3.2vw,2rem)] font-medium leading-tight"
                  style={{ fontFamily: SERIF }}
                >
                  Should Taj modernize through a unified digital ecosystem — without losing its soul?
                </p>
                <p className="mt-4 text-sm text-white/70">
                  Transformation need: automate the invisible (operations, data, intelligence) while
                  protecting the visible (human warmth, personalized service, &lsquo;Tajness&rsquo;).
                </p>
              </div>
            </Fade>
          </div>

          {/* Right — SWOT + Porter */}
          <div className="space-y-6">
            <Fade delay={0.06}>
              <Card>
                <SubHead>SWOT Analysis</SubHead>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { h: "Strengths", c: C.emerald, items: ["120-yr brand trust", "Tata Neu: 160M+ users", "565+ properties"] },
                    { h: "Weaknesses", c: "#B4141A", items: ["Digital maturity 2.4/5", "65–70% OTA dependency", "No Customer 360"] },
                    { h: "Opportunities", c: C.gold, items: ["India luxury +12% YoY", "Gen AI personalization", "ESG: Green Stay Score"] },
                    { h: "Threats", c: C.navySoft, items: ["Marriott Bonvoy 180M+", "Airbnb Luxe rising", "DPDP fines ₹50–250 Cr"] },
                  ].map((q) => (
                    <div
                      key={q.h}
                      className="rounded-2xl border p-4"
                      style={{ borderColor: C.line, background: C.marble }}
                    >
                      <p
                        className="text-[0.65rem] font-bold uppercase tracking-[0.16em]"
                        style={{ color: q.c }}
                      >
                        {q.h}
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {q.items.map((it) => (
                          <li
                            key={it}
                            className="flex items-start gap-1.5 text-xs leading-snug"
                            style={{ color: C.ink }}
                          >
                            <span className="mt-1 size-1 shrink-0 rounded-full" style={{ background: q.c }} />
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            </Fade>
            <Fade delay={0.12}>
              <Card>
                <SubHead>Porter&rsquo;s Five Forces</SubHead>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    { f: "Buyer Power", lvl: "HIGH", c: "#B4141A", d: "Guests benchmark Taj app vs Bonvoy" },
                    { f: "Rivalry", lvl: "HIGH", c: "#B4141A", d: "Marriott, Hyatt investing in AI" },
                    { f: "Substitutes", lvl: "RISING", c: C.gold, d: "Airbnb Luxe capturing experientials" },
                    { f: "Supplier Power", lvl: "MEDIUM", c: C.navySoft, d: "OTAs reducible as direct grows" },
                    { f: "New Entrants", lvl: "MEDIUM", c: C.navySoft, d: "Platform-native luxury upstarts" },
                  ].map((x) => (
                    <div key={x.f} className="rounded-2xl border p-3.5" style={{ borderColor: C.line }}>
                      <p className="text-xs font-semibold" style={{ color: C.navy }}>
                        {x.f}
                      </p>
                      <p
                        className="mt-1 text-[0.68rem] font-bold uppercase tracking-wider"
                        style={{ color: x.c }}
                      >
                        {x.lvl}
                      </p>
                      <p className="mt-1.5 text-[0.7rem] leading-snug" style={{ color: C.grey }}>
                        {x.d}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </Fade>
          </div>
        </div>
      </Block>

      {/* ---------------- CURRENT → FUTURE STATE ---------------- */}
      <Block
        id="journey"
        dark
        kicker="02 · Current State → Future State"
        title="One guest. One view. One seamless experience."
        intro="Today the luxury journey runs on fragmented intelligence. The transformation repairs every stage — from generic discovery to predictive, connected loyalty."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {JOURNEY_STAGES.map((s, i) => (
            <Fade key={s.stage} delay={i * 0.05}>
              <div
                className="flex h-full flex-col rounded-3xl border p-6"
                style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: C.goldSoft, fontFamily: MONO }}
                  >
                    0{i + 1}
                  </span>
                  <div
                    className="flex size-9 items-center justify-center rounded-xl"
                    style={{ background: "rgba(182,139,45,0.16)" }}
                  >
                    <s.icon className="size-5" style={{ color: C.goldSoft }} />
                  </div>
                  <h4 className="text-base font-semibold text-white">{s.stage}</h4>
                </div>
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/10 p-3.5">
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/40">
                    As-is pain point
                  </p>
                  <p className="mt-1 text-sm text-white/70">{s.pain}</p>
                </div>
                <div className="mt-3 flex items-start gap-2 rounded-2xl p-3.5" style={{ background: "rgba(30,122,90,0.16)" }}>
                  <ChevronRight className="mt-0.5 size-4 shrink-0" style={{ color: "#5FD3A6" }} />
                  <div>
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em]" style={{ color: "#5FD3A6" }}>
                      To-be improvement
                    </p>
                    <p className="mt-1 text-sm text-white/90">{s.fix}</p>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
        <Fade delay={0.1}>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { v: 40000, suffix: "+", l: "Employees" },
              { v: 10, suffix: "M+", l: "NuePass members" },
              { v: 78, suffix: "+", l: "Target NPS" },
            ].map((m) => (
              <Metric key={m.l} value={m.v} suffix={m.suffix} label={m.l} accent={C.goldSoft} dark />
            ))}
          </div>
        </Fade>
      </Block>

      {/* ---------------- STRATEGY BLUEPRINT ---------------- */}
      <Block
        id="blueprint"
        kicker="03 · Strategy Blueprint"
        title="Turning fragmented data into predictive luxury."
        intro="Taj already has the data — it is just scattered. The blueprint unifies every signal into a Customer 360, drives it through an AI engine, and returns it as anticipatory hospitality."
      >
        {/* Ecosystem → flow */}
        <Fade>
          <Card className="overflow-hidden">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              {/* Guest ecosystem */}
              <div>
                <SubHead>Data flows into one guest</SubHead>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2">
                  {ECOSYSTEM.map((e) => (
                    <div
                      key={e.label}
                      className="flex items-center gap-2 rounded-xl border p-2.5"
                      style={{ borderColor: C.line, background: C.marble }}
                    >
                      <e.icon className="size-4 shrink-0" style={{ color: C.gold }} />
                      <span className="text-xs font-medium leading-tight" style={{ color: C.navy }}>
                        {e.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Flow */}
              <div className="space-y-2.5">
                {[
                  { t: "Customer 360", d: "Unified guest profile across all touchpoints", icon: Users, c: C.navy },
                  { t: "AI Engine", d: "Real-time personalization · predictive models · continuous learning", icon: Cpu, c: C.gold },
                  { t: "Personalized Experiences", d: "Anticipatory service tailored to each guest", icon: Sparkles, c: C.emerald },
                  { t: "Predictive Hospitality", d: "Care that anticipates. Service that delights.", icon: Crown, c: C.emerald },
                ].map((step, i) => (
                  <div key={step.t}>
                    <div
                      className="flex items-center gap-3 rounded-2xl border p-4"
                      style={{ borderColor: `${step.c}44`, background: `${step.c}0a` }}
                    >
                      <div
                        className="flex size-9 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: `${step.c}18` }}
                      >
                        <step.icon className="size-5" style={{ color: step.c }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: C.navy }}>
                          {step.t}
                        </p>
                        <p className="text-xs" style={{ color: C.grey }}>
                          {step.d}
                        </p>
                      </div>
                    </div>
                    {i < 3 && (
                      <div className="flex justify-center py-0.5">
                        <ChevronRight className="size-4 rotate-90" style={{ color: C.gold }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Fade>

        {/* Enterprise Architecture — actual diagram */}
        <Fade delay={0.06}>
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <SubHead>Enterprise Architecture — the invisible infrastructure of Tajness</SubHead>
              <button
                onClick={() => setZoom(true)}
                className="inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold"
                style={{ borderColor: C.line, color: C.navy }}
              >
                <ZoomIn className="size-3.5" /> Zoom diagram
              </button>
            </div>
            <button
              onClick={() => setZoom(true)}
              className="group block w-full overflow-hidden rounded-3xl border"
              style={{ borderColor: C.line }}
            >
              <img
                src={tajArchitecture.url}
                alt="Taj enterprise architecture: guest channels, API & orchestration, intelligence & experience, core systems, AWS cloud infrastructure"
                loading="lazy"
                className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </button>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { t: "API-First", d: "Opera, SAP, I-LEAP & Tata Neu — one unified layer, zero silos" },
                { t: "Kafka Replaces Batch ETL", d: "Check-in updates the profile before the guest reaches the elevator" },
                { t: "Zero-Trust Security", d: "DPDP-compliant from Day 1, not Day 365" },
              ].map((x) => (
                <div key={x.t} className="rounded-2xl border p-4" style={{ borderColor: C.line }}>
                  <p className="text-sm font-semibold" style={{ color: C.gold }}>
                    {x.t}
                  </p>
                  <p className="mt-1 text-xs leading-snug" style={{ color: C.grey }}>
                    {x.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Fade>

        {/* Technology ecosystem cards */}
        <Fade delay={0.1}>
          <div className="mt-6">
            <SubHead>Technology ecosystem — composable, best-in-class</SubHead>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {TECH.map((t) => (
                <TechCard key={t.name} {...t} />
              ))}
            </div>
          </div>
        </Fade>
      </Block>

      {/* ---------------- BUSINESS IMPACT ---------------- */}
      <Block
        id="impact"
        kicker="04 · Business Impact"
        title="₹650 Cr in. Value of 3–4 hotels. Every year."
        intro="Same metrics leadership trusts — now powered by data. The investment case pays back within the horizon and compounds into durable competitive advantage."
      >
        <Fade>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {KPIS.map((k) => (
              <Metric
                key={k.label}
                value={k.value}
                prefix={k.prefix}
                suffix={k.suffix}
                label={k.label}
                sub={k.sub}
                accent={k.accent}
              />
            ))}
          </div>
        </Fade>

        {/* Roadmap */}
        <Fade delay={0.08}>
          <div className="mt-8">
            <SubHead>Three-year transformation roadmap</SubHead>
            <div className="grid gap-4 md:grid-cols-3">
              {ROADMAP.map((r, i) => (
                <div
                  key={r.year}
                  className="relative overflow-hidden rounded-3xl border p-6"
                  style={{ borderColor: `${r.accent}55`, background: C.white }}
                >
                  <span
                    className="absolute right-4 top-4 text-4xl font-semibold opacity-10"
                    style={{ color: r.accent, fontFamily: SERIF }}
                  >
                    0{i + 1}
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: r.accent }}>
                    {r.year} · {r.period}
                  </p>
                  <h4 className="mt-1 text-xl font-medium" style={{ color: C.navy, fontFamily: SERIF }}>
                    {r.phase}
                  </h4>
                  <ul className="mt-4 space-y-2">
                    {r.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-sm" style={{ color: C.ink }}>
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: r.accent }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Fade>

        {/* Key decision panel */}
        <Fade delay={0.12}>
          <div
            className="mt-8 overflow-hidden rounded-[32px] px-7 py-12 text-center md:px-14 md:py-16"
            style={{ background: C.navy, color: C.white }}
          >
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em]" style={{ color: C.goldSoft }}>
              Key Strategic Decision
            </p>
            <h3
              className="mx-auto mt-4 max-w-2xl text-[clamp(1.4rem,3.4vw,2.2rem)] font-medium leading-tight"
              style={{ fontFamily: SERIF }}
            >
              Should Taj Hotels modernize through a unified digital ecosystem?
            </h3>
            <p
              className="mt-6 text-[clamp(3.5rem,10vw,7rem)] font-bold leading-none"
              style={{ color: C.gold, fontFamily: SERIF }}
            >
              YES
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              Digital transformation should preserve the emotional luxury of the Taj experience while
              modernizing every operational layer through AI, enterprise architecture and customer
              intelligence. Approve ₹650 Cr, establish a TMO led by a Chief Digital Officer, and begin
              execution within 30 days.
            </p>
          </div>
        </Fade>
      </Block>

      {/* ---------------- BEYOND THE CLASSROOM ---------------- */}
      <Block
        id="beyond"
        bg={C.ivory}
        kicker="05 · Beyond the Classroom"
        title="Independent research — the IHCL Annual Report."
        intro="Reading beyond the coursework: how IHCL's public strategy corroborates the case for accelerated digital transformation."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESEARCH.map((r, i) => (
            <Fade key={r.tag} delay={i * 0.05}>
              <Card className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <div
                    className="flex size-10 items-center justify-center rounded-xl"
                    style={{ background: `${C.gold}18` }}
                  >
                    <r.icon className="size-5" style={{ color: C.gold }} />
                  </div>
                  <span
                    className="text-lg font-semibold"
                    style={{ color: C.emerald, fontFamily: MONO }}
                  >
                    {r.stat}
                  </span>
                </div>
                <h4 className="mt-4 text-base font-semibold" style={{ color: C.navy }}>
                  {r.tag}
                </h4>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: C.grey }}>
                  {r.insight}
                </p>
              </Card>
            </Fade>
          ))}
        </div>
      </Block>

      {/* ---------------- DOWNLOADS + NEXT ---------------- */}
      <section
        id="downloads"
        className="scroll-mt-24 px-5 py-16 md:px-10 md:py-24"
        style={{ background: C.navy }}
      >
        <div className="mx-auto max-w-6xl">
          <Fade>
            <span
              className="text-[0.7rem] font-semibold uppercase tracking-[0.3em]"
              style={{ color: C.goldSoft }}
            >
              Explore the full engagement
            </span>
            <h2
              className="mt-3 text-[clamp(1.8rem,4.5vw,2.8rem)] font-medium text-white"
              style={{ fontFamily: SERIF }}
            >
              The complete report, deck & reference.
            </h2>
          </Fade>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: FileText,
                t: "Digital Transformation Report",
                d: "Full strategy report — architecture, AI roadmap, financial model & governance.",
                meta: "PDF document",
                url: reportPdf.url,
              },
              {
                icon: Presentation,
                t: "Presentation",
                d: "Executive story deck: Reimagining Tajness for the digital era.",
                meta: "PDF slides",
                url: presentationPdf.url,
              },
              {
                icon: BookOpen,
                t: "IHCL Annual Report",
                d: "Reference material for the independent 'Beyond the Classroom' research.",
                meta: "Reference",
                url: reportPdf.url,
              },
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
                    <div
                      className="flex size-12 items-center justify-center rounded-2xl"
                      style={{ background: "rgba(182,139,45,0.2)" }}
                    >
                      <x.icon className="size-6" style={{ color: C.goldSoft }} />
                    </div>
                    <span
                      className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/60"
                      style={{ borderColor: "rgba(255,255,255,0.18)" }}
                    >
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
              to="/"
              hash="work"
              className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
            <Link
              to="/work/$slug"
              params={{ slug: "ather" }}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-white"
            >
              <span className="flex flex-col items-end">
                <span className="text-[0.62rem] font-normal uppercase tracking-[0.2em] text-white/50">
                  Next Strategy
                </span>
                <span>Ather Energy · Continue Journey</span>
              </span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" style={{ color: C.goldSoft }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- Zoom modal ---------------- */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10"
            style={{ background: "rgba(14,34,61,0.92)" }}
            onClick={() => setZoom(false)}
          >
            <button
              onClick={() => setZoom(false)}
              aria-label="Close diagram"
              className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full text-white"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <X className="size-5" />
            </button>
            <motion.img
              src={tajArchitecture.url}
              alt="Taj enterprise architecture diagram, enlarged"
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ----------------------------- Hero metric ------------------------------- */
function HeroMetric({
  v,
  prefix = "",
  suffix = "",
  l,
}: {
  v: number;
  prefix?: string;
  suffix?: string;
  l: string;
}) {
  const { ref, display } = useCountUp(v, 0, 1800);
  return (
    <div
      className="rounded-2xl border p-4 backdrop-blur-md"
      style={{ borderColor: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)" }}
    >
      <div
        className="flex items-baseline gap-0.5 leading-none text-white"
        style={{ fontFamily: MONO }}
      >
        <span className="text-sm font-semibold" style={{ color: C.goldSoft }}>
          {prefix}
        </span>
        <span ref={ref} className="text-[clamp(1.6rem,4vw,2.4rem)] font-semibold">
          {display}
        </span>
        <span className="text-base font-semibold" style={{ color: C.goldSoft }}>
          {suffix}
        </span>
      </div>
      <p className="mt-1.5 text-[0.72rem] font-medium uppercase tracking-wider text-white/70">{l}</p>
    </div>
  );
}

/* ----------------------------- Tech card --------------------------------- */
function TechCard({ name, icon: Icon, purpose }: { name: string; icon: typeof Cloud; purpose: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen((o) => !o)}
      className="flex flex-col items-start rounded-2xl border p-4 text-left transition-colors"
      style={{ borderColor: open ? C.gold : C.line, background: open ? `${C.gold}0d` : C.white }}
    >
      <Icon className="size-6" style={{ color: C.gold }} />
      <span className="mt-3 text-sm font-semibold" style={{ color: C.navy }}>
        {name}
      </span>
      <AnimatePresence initial={false}>
        {open && (
          <motion.span
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden text-xs leading-snug"
            style={{ color: C.grey }}
          >
            <span className="mt-2 block">{purpose}</span>
          </motion.span>
        )}
      </AnimatePresence>
      {!open && (
        <span className="mt-2 text-[0.68rem] font-medium" style={{ color: C.gold }}>
          Tap to learn
        </span>
      )}
    </button>
  );
}
