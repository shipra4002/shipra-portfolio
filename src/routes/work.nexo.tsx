import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Github,
  FileText,
  X,
  Users,
  BookOpen,
  Compass,
  Award,
  MessageCircle,
  Bell,
  Star,
  UserCircle,
  Sparkles,
  Layers,
  Smartphone,
  Server,
  Database,
  Radio,
  Network,
} from "lucide-react";

/* ─── App screens & artifacts ─── */
import loginShot from "@/assets/nexo-login.jpg";
import signupShot from "@/assets/nexo-signup.jpg";
import feedShot from "@/assets/nexo-feed.jpg";
import buddyShot from "@/assets/nexo-buddy.jpg";
import journalShot from "@/assets/nexo-journal.jpg";
import chatShot from "@/assets/nexo-chat.jpg";
import profileShot from "@/assets/nexo-profile.jpg";
import rewardsShot from "@/assets/nexo-rewards.jpg";
import newJournalShot from "@/assets/nexo-new-journal.jpg";
import architectureShot from "@/assets/nexo-architecture.jpg";
import caseStudyDoc from "@/assets/nexo-case-study.docx?url";
import { AtAGlance } from "@/components/at-a-glance";

const GITHUB_URL = "https://github.com/mahekk-shahh/Nexo";
const DOC_URL = caseStudyDoc;

export const Route = createFileRoute("/work/nexo")({
  head: () => ({
    meta: [
      { title: "Nexo — A Social Network for Travelers | Shipra Maurya" },
      {
        name: "description",
        content:
          "Nexo is a mobile social network built for travelers, not tourists. A product & engineering case study on discovery, community, memories and real-time connection.",
      },
      { property: "og:title", content: "Nexo — A Social Network for Travelers" },
      {
        property: "og:description",
        content:
          "Product strategy, UX design and full-stack engineering behind Nexo — a community-driven travel app.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: `https://shipra-maurya-portfolio.lovable.app${feedShot}` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NexoCaseStudy,
});

/* ─────────────── Scoped theme ─────────────── */
const theme = {
  "--bg": "#071B2E",
  "--surface": "#10263D",
  "--surface2": "#183552",
  "--accent": "#3BA7FF",
  "--accent2": "#6ED8FF",
  "--highlight": "#7EE081",
  "--text": "#FFFFFF",
  "--muted": "#B8C8D6",
} as CSSProperties;

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────── Small primitives ─────────────── */
function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
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
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.28em] text-[var(--accent2)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--highlight)]" />
      {children}
    </span>
  );
}

function GlassCard({
  children,
  className = "",
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-[var(--surface)]/70 backdrop-blur-xl shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] transition-all duration-500 ${
        hover
          ? "hover:-translate-y-1.5 hover:border-[var(--accent)]/40 hover:shadow-[0_40px_80px_-30px_rgba(59,167,255,0.35)]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* Phone mockup frame */
function Phone({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2.2rem] border-[6px] border-[#0b2237] bg-[#0b2237] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.85)] ${className}`}
    >
      <div className="absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/25" />
      <img src={src} alt={alt} className="block h-full w-full object-cover object-top" loading="lazy" />
    </div>
  );
}

/* ─────────────── Navigation ─────────────── */
function TopNav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[var(--bg)]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link
          to="/"
          hash="work"
          className="group inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Projects</span>
        </Link>
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-white/70">Project</span>
        <Link
          to="/work/$slug"
          params={{ slug: "nestle" }}
          className="group inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-white"
        >
          <span className="hidden sm:inline">Next: Strategy — Nestlé</span>
          <span className="sm:hidden">Next</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </nav>
  );
}

function BottomNav() {
  return (
    <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-10 md:px-8">
      <Link
        to="/"
        hash="work"
        className="group inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-white"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        Back to Projects
      </Link>
      <Link
        to="/work/$slug"
        params={{ slug: "nestle" }}
        className="group inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-white"
      >
        Next: Strategy Breakdown — Nestlé
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

/* ─────────────── Hero ─────────────── */
const CONTRIBUTIONS = [
  "Product Strategy",
  "User Research",
  "UX Design",
  "Mobile Development",
  "Backend Development",
  "Database Design",
  "API Development",
  "Real-time Chat Integration",
];

function Hero() {
  const reduce = useReducedMotion();
  const float = (delay: number, dist: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -dist, 0] },
          transition: {
            duration: 6 + delay,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay,
          },
        };

  return (
    <section className="relative overflow-hidden px-5 pt-28 pb-16 md:px-8 md:pt-36">
      {/* floating gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-[26rem] w-[26rem] rounded-full opacity-40 blur-[110px]"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-40 h-[22rem] w-[22rem] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--highlight), transparent 70%)" }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
        {/* Left */}
        <div>
          <Reveal>
            <Eyebrow>Consumer Mobile · Social Travel</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-serif text-[clamp(3.2rem,9vw,6rem)] font-light leading-[0.95] tracking-[-0.03em]">
              Nexo
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--muted)]">
              Building a social network designed for travelers—not tourists.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-6 sm:max-w-md">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent2)]">Role</p>
                <p className="mt-2 text-sm leading-relaxed text-white/90">
                  Product Manager
                  <br />
                  Product Engineer
                  <br />
                  Full Stack Developer
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent2)]">Team</p>
                <p className="mt-2 text-sm text-white/90">2 Members</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-7 sm:max-w-md">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent2)]">Contribution</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {CONTRIBUTIONS.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/10 bg-[var(--surface2)]/60 px-3 py-1.5 text-xs text-white/85"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#071B2E] transition-all hover:gap-3"
              >
                <Github className="size-4" />
                GitHub
              </a>
              <a
                href={DOC_URL}
                download
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/50 bg-[var(--accent)]/10 px-6 py-3 text-sm font-medium text-white transition-all hover:gap-3 hover:bg-[var(--accent)]/20"
              >
                <FileText className="size-4" />
                Project Document
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right — floating phone composition */}
        <div className="relative mx-auto h-[30rem] w-full max-w-md md:h-[34rem]">
          <motion.div
            className="absolute left-1/2 top-2 z-20 w-[46%] -translate-x-1/2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <motion.div {...float(0.2, 14)}>
              <Phone src={feedShot} alt="Nexo home feed" />
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute left-0 top-24 z-10 w-[42%] -rotate-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: EASE }}
          >
            <motion.div {...float(0.8, 18)}>
              <Phone src={journalShot} alt="Nexo travel journal" />
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute right-0 top-32 z-10 w-[42%] rotate-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: EASE }}
          >
            <motion.div {...float(1.3, 16)}>
              <Phone src={profileShot} alt="Nexo profile" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Section wrapper ─────────────── */
function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-5 py-20 md:px-8 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-3xl font-serif text-[clamp(2rem,4.6vw,3.4rem)] font-light leading-[1.08] tracking-[-0.02em]">
            {title}
          </h2>
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

/* ─────────────── Section 1 · Opportunity ─────────────── */
const OLD_APPS = ["Instagram", "TripAdvisor", "WhatsApp", "Gallery", "Notes", "Maps"];

function Opportunity() {
  return (
    <Section eyebrow="The Opportunity" title="Travel shouldn't require five different apps.">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
        {/* fragmented stack */}
        <Reveal className="space-y-2.5">
          {OLD_APPS.map((a, i) => (
            <div
              key={a}
              className="flex items-center justify-between rounded-2xl border border-white/8 bg-[var(--surface)]/50 px-5 py-3 text-sm text-[var(--muted)]"
              style={{ opacity: 1 - i * 0.05 }}
            >
              <span>{a}</span>
              <span className="text-white/20">↓</span>
            </div>
          ))}
          <p className="pt-2 text-center text-xs uppercase tracking-[0.2em] text-white/40">
            One fragmented traveler
          </p>
        </Reveal>

        {/* arrow */}
        <Reveal delay={0.1} className="flex justify-center">
          <div className="flex flex-col items-center gap-2 text-[var(--accent2)]">
            <ArrowRight className="hidden size-8 md:block" />
            <span className="text-xs uppercase tracking-[0.25em] md:rotate-0">unifies into</span>
            <ArrowRight className="size-8 rotate-90 md:hidden" />
          </div>
        </Reveal>

        {/* NEXO */}
        <Reveal delay={0.15}>
          <GlassCard hover={false} className="p-10 text-center">
            <div
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl text-2xl font-light tracking-tight"
              style={{
                background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                color: "#071B2E",
              }}
            >
              N
            </div>
            <p className="mt-6 font-serif text-2xl font-light">NEXO</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {["Discovery", "Community", "Journals", "Maps", "Chat", "Memories"].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-[var(--accent)]/12 px-3 py-1 text-xs text-[var(--accent2)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <p className="mx-auto mt-14 max-w-2xl text-center text-lg leading-relaxed text-[var(--muted)]">
          Travel is fragmented across multiple apps. Nexo brings discovery, community and memories
          into one ecosystem.
        </p>
      </Reveal>
    </Section>
  );
}

/* ─────────────── Section 2 · Product Thinking ─────────────── */
const THINKING = [
  {
    icon: Users,
    title: "Community First",
    body: "Travel becomes more meaningful when people connect with people, not just places.",
  },
  {
    icon: BookOpen,
    title: "Memory Driven",
    body: "Journeys deserve stories, not just photo galleries.",
  },
  {
    icon: Compass,
    title: "Discovery Powered",
    body: "Help users discover both destinations and like-minded travellers.",
  },
  {
    icon: Award,
    title: "Reward Contribution",
    body: "Encourage valuable community participation through incentives.",
  },
];

function ProductThinking() {
  return (
    <Section eyebrow="Product Thinking" title="Four principles that shaped every decision.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {THINKING.map((t, i) => (
          <Reveal key={t.title} delay={i * 0.06}>
            <GlassCard className="h-full p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)]/12 text-[var(--accent2)]">
                <t.icon className="size-6" strokeWidth={1.6} />
              </div>
              <h3 className="mt-5 text-lg font-medium text-white">{t.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{t.body}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────── Section 3 · Product Experience ─────────────── */
const SCREENS = [
  {
    src: loginShot,
    name: "Login",
    purpose: "A calm, secure entry into the community.",
    user: "Fast, familiar access with social sign-in.",
    business: "Verified members build a trustworthy network.",
  },
  {
    src: signupShot,
    name: "Preference Selection",
    purpose: "Capture travel interests up front.",
    user: "A feed and matches tuned to them from day one.",
    business: "Interest data powers better discovery.",
  },
  {
    src: feedShot,
    name: "Home Feed",
    purpose: "Discovery through authentic community content.",
    user: "Real inspiration from real travelers.",
    business: "Content depth drives daily engagement.",
  },
  {
    src: buddyShot,
    name: "Travel Buddy Discovery",
    purpose: "Find compatible companions by shared interests.",
    user: "Meet like-minded people, travel less alone.",
    business: "Companion-matching creates network effects.",
  },
  {
    src: journalShot,
    name: "Travel Journal",
    purpose: "Document journeys as structured stories.",
    user: "Memories preserved in context, not a camera roll.",
    business: "User-generated journals become discovery content.",
  },
  {
    src: chatShot,
    name: "Chat",
    purpose: "Real-time messaging before, during and after trips.",
    user: "Plans come together without app-switching.",
    business: "Conversations drive retention and stickiness.",
  },
  {
    src: profileShot,
    name: "Profile",
    purpose: "A traveler's identity, journals and connections.",
    user: "Build reputation and showcase journeys.",
    business: "Rich profiles increase trust and matching quality.",
  },
];

function ProductExperience() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const go = (dir: number) => setI((p) => (p + dir + SCREENS.length) % SCREENS.length);
  const s = SCREENS[i];

  return (
    <Section
      id="experience"
      eyebrow="Product Experience"
      title="One product, the whole journey."
      className="bg-[var(--surface)]/30"
    >
      <div className="grid items-center gap-10 md:grid-cols-[0.85fr_1fr]">
        {/* phone */}
        <div className="relative flex justify-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mx-auto h-64 w-64 self-center rounded-full opacity-40 blur-[90px]"
            style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              className="relative w-[62%] max-w-[16rem]"
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <Phone src={s.src} alt={`Nexo ${s.name} screen`} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* copy */}
        <div>
          <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
            <span className="font-serif text-2xl text-[var(--accent2)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 bg-white/10" />
            <span>{String(SCREENS.length).padStart(2, "0")}</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <h3 className="mt-4 font-serif text-3xl font-light">{s.name}</h3>
              <dl className="mt-7 space-y-5">
                {[
                  ["Purpose", s.purpose],
                  ["User Value", s.user],
                  ["Business Value", s.business],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs uppercase tracking-[0.2em] text-[var(--accent2)]">{k}</dt>
                    <dd className="mt-1.5 text-[15px] leading-relaxed text-white/90">{v}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </AnimatePresence>

          <div className="mt-9 flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              aria-label="Previous screen"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-[var(--accent)] hover:text-[var(--accent2)]"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next screen"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-[var(--accent)] hover:text-[var(--accent2)]"
            >
              <ChevronRight className="size-5" />
            </button>
            <div className="ml-3 flex gap-1.5">
              {SCREENS.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to screen ${idx + 1}`}
                  onClick={() => setI(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i ? "w-6 bg-[var(--accent)]" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────── Section 4 · How I Built It ─────────────── */
type Stage = {
  step: string;
  summary: string;
  detail: string;
  image?: string;
};
const STAGES: Stage[] = [
  {
    step: "Research",
    summary: "Understanding the fragmented traveler.",
    detail:
      "Interviews and journey mapping revealed travel scattered across 5–7 apps. The solo traveler (20–35) emerged as the core persona: independent, but craving connection, trust and memory.",
  },
  {
    step: "Requirements",
    summary: "From insights to a focused scope.",
    detail:
      "A single how-might-we anchored the build: enable travelers to discover, connect, remember and belong — without booking flows. Ruthless prioritization fit a 4-month timeline.",
  },
  {
    step: "Wireframes",
    summary: "Designing the core flows.",
    detail:
      "Low-friction onboarding, a discovery-first feed, and structured journals over a flat photo feed. Every screen mapped to a job in the journey.",
    image: signupShot,
  },
  {
    step: "Database Design",
    summary: "Modeling users, journals & connections.",
    detail:
      "A document model in MongoDB captured flexible journal structures, user preferences and social graph relationships without rigid schemas.",
    image: architectureShot,
  },
  {
    step: "Backend APIs",
    summary: "REST services on Node & Express.",
    detail:
      "Express REST APIs handled auth, feed, matching, journals and rewards — with Socket.io layered in for real-time chat and notifications.",
    image: architectureShot,
  },
  {
    step: "Frontend Development",
    summary: "A single React Native codebase.",
    detail:
      "One codebase shipping to iOS and Android, with reusable components for feed cards, journals and chat — keeping the experience consistent and fast to iterate.",
    image: feedShot,
  },
  {
    step: "Testing",
    summary: "Validating the real journey.",
    detail:
      "Flow-based testing across onboarding, discovery, matching, journaling and chat ensured the end-to-end experience held together, not just isolated screens.",
    image: rewardsShot,
  },
  {
    step: "Final Product",
    summary: "A working mobile application.",
    detail:
      "Nexo shipped as a functioning app: discover destinations, find companions, journal journeys, chat in real time and earn rewards — the full travel layer in one place.",
    image: profileShot,
  },
];

function HowIBuiltIt() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Section eyebrow="How I Built It" title="From a rough idea to a shipped app.">
      <div className="-mx-5 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0">
        <div className="flex min-w-max gap-4 md:grid md:min-w-0 md:grid-cols-4">
          {STAGES.map((st, i) => (
            <Reveal key={st.step} delay={(i % 4) * 0.05}>
              <button
                onClick={() => setOpen(i)}
                className="group flex h-full w-56 flex-col rounded-2xl border border-white/10 bg-[var(--surface)]/60 p-6 text-left transition-all hover:-translate-y-1 hover:border-[var(--accent)]/50 md:w-full"
              >
                <span className="font-serif text-sm text-[var(--accent2)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-3 text-lg font-medium text-white">{st.step}</span>
                <span className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{st.summary}</span>
                <span className="mt-5 inline-flex items-center gap-1 text-xs text-[var(--accent2)] opacity-0 transition-opacity group-hover:opacity-100">
                  View details <ArrowRight className="size-3" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <Modal onClose={() => setOpen(null)}>
            <span className="font-serif text-sm text-[var(--accent2)]">
              Step {String(open + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 font-serif text-3xl font-light">{STAGES[open].step}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted)]">
              {STAGES[open].detail}
            </p>
            {STAGES[open].image && (
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[var(--bg)]">
                <img
                  src={STAGES[open].image}
                  alt={`${STAGES[open].step} artifact`}
                  className="max-h-[52vh] w-full object-contain"
                />
              </div>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </Section>
  );
}

function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
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
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative z-10 max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/12 bg-[var(--surface)] p-8 shadow-2xl"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:text-white"
        >
          <X className="size-4" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────── Section 5 · Engineering ─────────────── */
const STACK = [
  { icon: Smartphone, label: "React Native" },
  { icon: Network, label: "REST APIs" },
  { icon: Server, label: "Express" },
  { icon: Layers, label: "Node.js" },
  { icon: Database, label: "MongoDB" },
  { icon: Radio, label: "Socket.io" },
];
const WHY = [
  ["Why React Native", "One codebase ships a native experience to both iOS and Android."],
  ["Why MongoDB", "Flexible documents fit evolving journals and social data."],
  ["Why Socket.io", "Real-time chat and notifications with low-latency events."],
  ["Why Express", "Lightweight, fast REST layer that's simple to scale."],
];

function Engineering() {
  return (
    <Section eyebrow="Engineering the Product" title="An architecture built for community at scale.">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        {/* animated flow */}
        <div className="flex flex-col gap-3">
          {STACK.map((n, i) => (
            <Reveal key={n.label} delay={i * 0.08}>
              <div className="relative">
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[var(--surface)]/60 px-5 py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)]/12 text-[var(--accent2)]">
                    <n.icon className="size-5" strokeWidth={1.6} />
                  </div>
                  <span className="text-base font-medium text-white">{n.label}</span>
                </div>
                {i < STACK.length - 1 && (
                  <motion.div
                    className="ml-9 h-4 w-px bg-gradient-to-b from-[var(--accent)] to-transparent"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    style={{ transformOrigin: "top" }}
                  />
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* why */}
        <div className="grid content-start gap-4 sm:grid-cols-2">
          {WHY.map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.06}>
              <GlassCard className="h-full p-6">
                <h3 className="text-sm font-semibold text-[var(--accent2)]">{k}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{v}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────── Section 6 · Feature Ecosystem ─────────────── */
const FEATURES = [
  { icon: BookOpen, title: "Travel Journals", problem: "Memories scattered in camera rolls.", value: "Structured stories tied to places." , span: "md:col-span-2" },
  { icon: Users, title: "Travel Buddy Matching", problem: "No trustworthy way to find companions.", value: "Match by shared interests." },
  { icon: MessageCircle, title: "Real-time Chat", problem: "Coordination scattered across apps.", value: "Plan together, in context." },
  { icon: Compass, title: "Community Feed", problem: "Generic, ad-driven inspiration.", value: "Authentic, traveler-made discovery.", span: "md:col-span-2" },
  { icon: Award, title: "Rewards", problem: "No incentive to contribute.", value: "Earn for meaningful participation." },
  { icon: Bell, title: "Notifications", problem: "Missed connections and updates.", value: "Timely, relevant nudges." },
  { icon: Star, title: "Reviews", problem: "Star ratings lack context.", value: "Narrative, trustworthy reviews." },
  { icon: UserCircle, title: "Profile Management", problem: "No portable travel identity.", value: "Reputation that follows you." },
];

function FeatureEcosystem() {
  return (
    <Section eyebrow="Feature Ecosystem" title="Everything a traveler needs, in one place.">
      <div className="grid gap-4 md:grid-cols-4">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={(i % 4) * 0.05} className={f.span ?? ""}>
            <div className="group relative h-full min-h-[10rem] overflow-hidden rounded-3xl border border-white/10 bg-[var(--surface)]/60 p-6 transition-all hover:-translate-y-1 hover:border-[var(--accent)]/50">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)]/12 text-[var(--accent2)]">
                <f.icon className="size-5" strokeWidth={1.6} />
              </div>
              <h3 className="mt-4 text-base font-medium text-white">{f.title}</h3>
              {/* hover reveal */}
              <div className="mt-3 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                <p className="text-xs text-[var(--muted)]">
                  <span className="text-[var(--accent2)]">Problem · </span>
                  {f.problem}
                </p>
                <p className="mt-1.5 text-xs text-[var(--muted)]">
                  <span className="text-[var(--highlight)]">Value · </span>
                  {f.value}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────── Section 7 · Product Decisions ─────────────── */
const DECISIONS = [
  {
    decision: "Travel journals instead of only photo uploads.",
    why: "Stories create stronger emotional engagement than standalone images.",
  },
  {
    decision: "Preference-based traveller discovery.",
    why: "Shared interests improve match quality.",
  },
  {
    decision: "Reward meaningful contributions.",
    why: "Encourages long-term engagement and community growth.",
  },
  {
    decision: "Real-time messaging.",
    why: "Reduces friction while planning trips.",
  },
];

function ProductDecisions() {
  return (
    <Section
      eyebrow="Product Decisions"
      title="Choices that shaped the product, not just features."
      className="bg-[var(--surface)]/30"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {DECISIONS.map((d, i) => (
          <Reveal key={d.decision} delay={(i % 2) * 0.06}>
            <GlassCard className="h-full p-8">
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--accent2)]">Decision</span>
              <p className="mt-3 font-serif text-xl font-light leading-snug text-white">
                {d.decision}
              </p>
              <div className="my-5 h-px w-full bg-white/10" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--highlight)]">Why</span>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{d.why}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────── Section 8 · What I Learned ─────────────── */
const LEARNINGS = [
  {
    icon: Sparkles,
    title: "Product Thinking",
    body: "Great products create communities, not just features.",
  },
  {
    icon: Server,
    title: "Engineering",
    body: "Scalable architecture matters as much as beautiful interfaces.",
  },
  {
    icon: Users,
    title: "User Experience",
    body: "People remember how connected they felt, not how many buttons existed.",
  },
];

function Learnings() {
  return (
    <Section eyebrow="What I Learned" title="Building Nexo changed how I think about products.">
      <div className="grid gap-5 md:grid-cols-3">
        {LEARNINGS.map((l, i) => (
          <Reveal key={l.title} delay={i * 0.07}>
            <GlassCard className="h-full p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--highlight)]/12 text-[var(--highlight)]">
                <l.icon className="size-6" strokeWidth={1.6} />
              </div>
              <h3 className="mt-5 text-lg font-medium text-white">{l.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{l.body}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────── Page ─────────────── */
function NexoCaseStudy() {
  return (
    <div
      style={theme}
      className="min-h-screen bg-[var(--bg)] font-sans text-[var(--text)] antialiased"
    >
      <TopNav />
      <Hero />
      <Opportunity />
      <ProductThinking />
      <ProductExperience />
      <HowIBuiltIt />
      <Engineering />
      <FeatureEcosystem />
      <ProductDecisions />
      <Learnings />
      <div className="border-t border-white/8">
        <BottomNav />
      </div>
      <AtAGlance
        project="NEXO"
        rows={[
          { k: "Vision", v: "A companion app that keeps solo travelers connected and grounded." },
          { k: "Target Users", v: "Independent and first-time travelers navigating new places alone." },
          { k: "Core Features", v: "Travel buddy matching, journaling, chat and rewards." },
          { k: "Tech Stack", v: "React Native, Node & Express REST services, single codebase." },
          { k: "My Contribution", v: "Product strategy, research, UX and full-stack build." },
        ]}
        palette={{
          cardBg: "linear-gradient(180deg, rgba(18,36,61,0.85), rgba(12,24,41,0.9))",
          border: "rgba(127,179,255,0.24)",
          title: "#7fb3ff",
          label: "#9db6c9",
          value: "#eef4f8",
          chipBg: "rgba(143,211,166,0.16)",
          chipFg: "#8fd3a6",
          btnBg: "#7fb3ff",
          btnFg: "#0a1728",
          shadow: "0 30px 60px -24px rgba(6,18,36,0.8)",
        }}
      />
    </div>
  );
}
