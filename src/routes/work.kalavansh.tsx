import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Code,
  Compass,
  ExternalLink,
  Eye,
  FlaskConical,
  Github,
  LayoutTemplate,
  Lightbulb,
  Play,
  Presentation,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { Reveal, staggerContainer, staggerItem } from "@/components/reveal";
import kalavanshLogo from "@/assets/kalavansh-logo.png.asset.json";
import videoPoster from "@/assets/kala-video-poster.jpg";
// Large video (83MB) is hosted on the Lovable CDN via an absolute URL so it
// loads on any deploy host (Vercel/Netlify/Cloudflare) without living in the repo.
const kalaVideoUrl =
  "https://editorial-product-mind.lovable.app/__l5e/assets-v1/e7dac8b6-ed63-4287-9d45-7b41d7051367/kalavansh.mp4";
import storyImg from "@/assets/kala-batik-woman.jpg";
import workshopImg from "@/assets/kala-designer.png";
import profileImg from "@/assets/kala-basket-smile.png";
import qrPoster from "@/assets/kala-qr-poster.png";


export const Route = createFileRoute("/work/kalavansh")({
  head: () => ({
    meta: [
      { title: "KalaVansh — A Case Study by Shipra Maurya" },
      {
        name: "description",
        content:
          "Making India's artisans visible—not just their products. A product manager's thinking journey: the observations, insights and decisions behind KalaVansh.",
      },
      { property: "og:title", content: "KalaVansh — A Case Study by Shipra Maurya" },
      {
        property: "og:description",
        content: "Making India's artisans visible—not just their products.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KalaVanshCaseStudy,
});

/* ─────────────────────────── Shared building blocks ─────────────────────────── */

function BackLink() {
  return (
    <Link
      to="/"
      hash="work"
      className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
      Back to Work
    </Link>
  );
}

function ChapterLabel({ index, title }: { index: string; title: string }) {
  return (
    <Reveal className="mb-12 flex items-baseline gap-4 md:mb-16">
      <span className="font-serif text-sm text-gold">{index}</span>
      <h2 className="font-serif text-[clamp(1.9rem,4.5vw,3.2rem)] font-light leading-[1.08] tracking-[-0.015em]">
        {title}
      </h2>
    </Reveal>
  );
}

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`px-6 py-24 md:px-10 md:py-36 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}


/* ────────────────────────────── Page Navigation ────────────────────────────── */

function PageNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center px-6 py-4 md:px-10">
        <div className="flex-1">
          <BackLink />
        </div>

        <span className="hidden md:inline-block text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
          Project
        </span>

        <div className="flex flex-1 justify-end">
          <Link
            to="/work/$slug"
            params={{ slug: "nexo" }}
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
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



function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);

  const meta = [
    { label: "Role", value: "Product Manager" },
    { label: "Team", value: "CauseCrew \u2022 Team of 3" },
  ];

  const contributions = [
    {
      title: "Product Discovery & User Research",
      description: "Found the gap between artisan identity and buyer trust.",
      icon: Compass,
    },
    {
      title: "Product Strategy",
      description: "Turned field conversations into decisions we could build around.",
      icon: Lightbulb,
    },
    {
      title: "Designed the MVP Experience",
      description: "Shaped the flows, features and feel of the first working product.",
      icon: LayoutTemplate,
    },
    {
      title: "Built the Functional MVP Website",
      description: "Shipped a real, clickable product that artisans could actually use.",
      icon: Code,
    },
  ];

  const links = [
    { label: "Live Prototype", icon: ExternalLink, href: "https://kalavansh.vercel.app/" },
    { label: "GitHub Repository", icon: Github, href: "https://github.com/shipra4002/Kalavansh" },
    {
      label: "Case Study Deck",
      icon: Presentation,
      href: "https://drive.google.com/file/d/1V_gGsx5h82ICskS8iFDktf72HLOdNFQV/view?usp=drive_link",
    },
  ];

  return (
    <header ref={ref} className="relative px-6 pt-20 pb-16 md:px-10 md:pt-24 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-14">

          <div className="md:col-span-6">
            <Reveal delay={0.05}>
              <span className="text-xs uppercase tracking-[0.24em] text-terracotta">Product Design & Strategy</span>
              <h1 className="mt-6 font-serif text-[clamp(3rem,10vw,6.5rem)] font-light leading-[0.95] tracking-[-0.03em]">
                KalaVansh
              </h1>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-muted-foreground md:text-xl">
                Making India&apos;s artisans visible—not just their products.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="mt-10 flex flex-wrap gap-3">
              {meta.map((m) => (
                <div key={m.label} className="rounded-full border border-border bg-surface px-4 py-2">
                  <span className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">{m.label}</span>
                  <span className="ml-2 text-sm text-foreground">{m.value}</span>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.15} className="mt-8">
              <div className="mb-3 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                My Contribution
              </div>
              <div className="flex flex-wrap gap-2">
                {contributions.map((c) => (
                  <span
                    key={c.title}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-sm text-foreground"
                  >
                    <c.icon className="size-3.5 text-terracotta" />
                    {c.title}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.18} className="mt-8 flex flex-wrap gap-3">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-2.5 text-sm text-foreground transition-all duration-300 hover:translate-y-[-2px] hover:border-terracotta hover:bg-terracotta hover:text-primary-foreground hover:shadow-md hover:gap-3"
                >
                  <l.icon className="size-4" />
                  {l.label}
                </a>
              ))}
            </Reveal>
          </div>

          <motion.div
            className="relative md:col-span-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="overflow-hidden rounded-[1.75rem] border border-border shadow-lift">
              <motion.img
                src={heroImg}
                alt="A silk-saree weaver at her loom, surrounded by threads of colour"
                width={1600}
                height={1200}
                style={{ y, scale }}
                className="aspect-[4/3] size-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}


/* ────────────────────────────── Watch The Story ────────────────────────────── */

function WatchTheStory() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  // Autoplay muted when ~40% of the section enters the viewport
  useEffect(() => {
    const el = wrapRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            video.play().catch(() => {});
          } else if (!entry.isIntersecting) {
            video.pause();
          }
        }
      },
      { threshold: [0, 0.4, 0.6] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const replay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };

  return (
    <Section id="watch" className="bg-surface">
      <ChapterLabel index="01" title="Watch The Story" />

      <Reveal>
        <div
          ref={wrapRef}
          className="group relative overflow-hidden rounded-[1.75rem] border border-border bg-black shadow-lift"
        >
          <video
            ref={videoRef}
            src={kalaVideoUrl}
            poster={videoPoster}
            muted={muted}
            playsInline
            preload="metadata"
            onPlay={() => {
              setPlaying(true);
              setStarted(true);
            }}
            onPause={() => setPlaying(false)}
            className="aspect-video size-full object-cover"
          />

          {/* Big centre play affordance before first playback */}
          {!started && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Play the KalaVansh story"
              className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
            >
              <span className="flex size-20 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lift transition-transform duration-300 group-hover:scale-105">
                <Play className="ml-1 size-7" />
              </span>
            </button>
          )}

          {/* Controls */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-end gap-2 bg-gradient-to-t from-black/50 to-transparent p-4">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause video" : "Play video"}
              className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground transition-transform hover:scale-105"
            >
              {playing ? (
                <span className="block h-4 w-3.5 border-x-[4px] border-foreground" />
              ) : (
                <Play className="ml-0.5 size-4" />
              )}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute video" : "Mute video"}
              className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground transition-transform hover:scale-105"
            >
              {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </button>
            <button
              type="button"
              onClick={replay}
              aria-label="Replay from the beginning"
              className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground transition-transform hover:scale-105"
            >
              <RotateCcw className="size-4" />
            </button>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mx-auto mt-10 max-w-xl text-center font-serif text-[clamp(1.2rem,2.6vw,1.7rem)] font-light leading-snug text-foreground">
          Everything below explains how this story became a product.
        </p>
      </Reveal>
    </Section>
  );
}

/* ────────────────────────────── Behind The Thinking ────────────────────────────── */

function BehindTheThinking() {
  const cards = [
    {
      observation: "Customers admired handmade products but rarely knew the people behind them.",
      insight: "Recognition creates emotional value.",
      decision: "Every handcrafted product should introduce its maker.",
    },
    {
      observation: "Artisans described themselves as labourers, not creators of what they made.",
      insight: "Identity has to be given back before pride can return.",
      decision: "Build profiles that name the maker and tell their journey.",
    },
    {
      observation: "The next generation was walking away from crafts they saw as a dead end.",
      insight: "A craft survives only when it feels aspirational.",
      decision: "Frame makers as artists worth following, not workers to pity.",
    },
    {
      observation: "Buyers wanted to support artisans but had no trustworthy way to reach them.",
      insight: "Trust is built through a face and a story, not a marketplace.",
      decision: "Put a direct, human connection one scan away.",
    },
  ];

  return (
    <Section id="thinking">
      <ChapterLabel index="02" title="Behind The Thinking" />
      <Reveal className="max-w-2xl">
        <p className="text-lg leading-relaxed text-muted-foreground">
          Not what the product is—how each decision was made. Every card traces one observation to the insight it
          revealed, and the choice it forced.
        </p>
      </Reveal>

      <motion.div
        className="mt-14 grid gap-6 md:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {cards.map((c, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="flex flex-col rounded-[22px] border border-border bg-surface p-8 shadow-soft transition-shadow duration-300 hover:shadow-lift md:p-10"
          >
            <div className="mb-2 flex items-center gap-2">
              <Eye className="size-4 text-sage" />
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Observation</span>
            </div>
            <p className="font-serif text-lg font-light leading-snug text-foreground">{c.observation}</p>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <ArrowRight className="size-4 rotate-90 text-gold" />
              <span className="h-px flex-1 bg-border" />
            </div>

            <div className="mb-2 flex items-center gap-2">
              <Lightbulb className="size-4 text-terracotta" />
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Product Insight</span>
            </div>
            <p className="text-base leading-relaxed text-foreground">{c.insight}</p>

            <div className="mt-auto">
              <div className="my-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <ArrowRight className="size-4 rotate-90 text-gold" />
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="size-4 text-sage" />
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Decision</span>
              </div>
              <p className="font-serif text-lg font-normal leading-snug text-foreground">{c.decision}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ────────────────────────── From Insight To Experience ────────────────────────── */

function InsightToExperience() {
  const rows = [
    {
      insight: "People trust people more than products.",
      experience: "30-second artisan stories",
      detail: "A short film plays before the price—so buyers meet the maker before they meet the object.",
      img: storyImg,
      alt: "A young artisan working batik by hand in warm light",
    },
    {
      insight: "Artisans need more than one-off product sales.",
      experience: "Workshop bookings",
      detail: "Makers earn by teaching their craft directly—turning skill into a second, steadier income.",
      img: workshopImg,
      alt: "An artisan holding a hand-painted craft in her studio",
    },
    {
      insight: "Identity creates perceived value.",
      experience: "Artisan profile pages",
      detail: "Each maker gets a name, a face and a journey—so the craft carries a person, not a label.",
      img: profileImg,
      alt: "A smiling basket weaver beside handcrafted products",
    },
  ];

  return (
    <Section id="experience" className="bg-surface">
      <ChapterLabel index="03" title="From Insight To Experience" />
      <Reveal className="max-w-2xl">
        <p className="text-lg leading-relaxed text-muted-foreground">
          Every feature exists because research asked for it. Left is what we learned. Right is what we built.
        </p>
      </Reveal>

      {/* It starts with a scan */}
      <Reveal delay={0.05} className="mt-14">
        <div className="grid items-center gap-8 overflow-hidden rounded-[22px] border border-border bg-background p-8 md:grid-cols-[1.1fr_1fr] md:p-10">
          <div>
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-terracotta">The moment it begins</span>
            <p className="mt-4 font-serif text-[clamp(1.4rem,3vw,2rem)] font-light leading-snug">
              One QR tag turns buying into meeting.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              A single scan on the product opens the maker&apos;s story—so the relationship starts before the purchase
              does.
            </p>
          </div>
          <div className="overflow-hidden rounded-[16px] border border-border">
            <img
              src={qrPoster}
              alt="Scan-to-watch poster inviting buyers to experience the artisan's story"
              loading="lazy"
              className="aspect-[16/9] size-full object-cover"
            />
          </div>
        </div>
      </Reveal>

      <div className="mt-8 space-y-8">
        {rows.map((r, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div
              className={`grid items-stretch gap-6 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              {/* Left — Research insight */}
              <div className="flex flex-col justify-center rounded-[22px] border border-border bg-background p-8 shadow-soft md:p-12">
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Research Insight
                </span>
                <p className="mt-4 font-serif text-[clamp(1.5rem,3vw,2.2rem)] font-light leading-[1.15] text-foreground">
                  {r.insight}
                </p>
              </div>

              {/* Right — Experience */}
              <div className="overflow-hidden rounded-[22px] border border-border shadow-soft">
                <div className="relative">
                  <img src={r.img} alt={r.alt} loading="lazy" className="aspect-[16/10] size-full object-cover" />
                  <span className="absolute left-5 top-5 rounded-full bg-background/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-terracotta">
                    Experience
                  </span>
                </div>
                <div className="bg-surface p-7">
                  <h3 className="font-serif text-xl font-normal">{r.experience}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.detail}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ────────────────────────────── Validation ────────────────────────────── */

function Validation() {
  const cards = [
    {
      icon: Eye,
      assumption: "People will stop and scan a QR tag out of curiosity.",
      how: "Placed scan-to-watch tags beside products and watched who paused.",
      learned: "Curiosity reliably triggered the scan—the story hooked them.",
    },
    {
      icon: Lightbulb,
      assumption: "A maker's story creates a real emotional connection.",
      how: "Showed the 30-second films to buyers and listened to their reactions.",
      learned: "People connected with the person—not just the craft.",
    },
    {
      icon: FlaskConical,
      assumption: "That connection converts into workshops and repeat support.",
      how: "Tracked intent to book and revisit after watching a story.",
      learned: "Still open—conversion and repeat engagement need a longer pilot.",
    },
  ];

  return (
    <Section id="validation">
      <ChapterLabel index="04" title="Validation" />
      <Reveal className="max-w-2xl">
        <p className="text-lg leading-relaxed text-muted-foreground">
          Every product rests on assumptions. These are the ones KalaVansh had to test—and what testing them taught us.
        </p>
      </Reveal>

      <motion.div
        className="mt-14 grid gap-6 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {cards.map((c, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="flex flex-col rounded-[22px] border border-border bg-surface p-8 shadow-soft"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-background text-terracotta">
              <c.icon className="size-5" />
            </span>

            <span className="mt-6 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Assumption</span>
            <p className="mt-2 font-serif text-lg font-light leading-snug text-foreground">{c.assumption}</p>

            <span className="mt-6 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              How we validated it
            </span>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.how}</p>

            <span className="mt-6 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              What we learned
            </span>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{c.learned}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ────────────────────────────── Looking Back ────────────────────────────── */

function LookingBack() {
  const lessons = [
    {
      n: "01",
      t: "Validate Before You Build",
      d: "Test the riskiest assumptions first. Users return when the need is real, not when the deck is polished.",
    },
    {
      n: "02",
      t: "Simplicity Scales Faster",
      d: "Every feature adds friction. The moments that mattered most came from removing what was unnecessary.",
    },
    {
      n: "03",
      t: "Great Products Start With Trust",
      d: "For artisans, trust lived in small details—clear provenance, honest language, and promises kept.",
    },
  ];

  return (
    <Section id="looking-back" className="bg-surface">
      <Reveal className="mb-16 md:mb-24">
        <h2 className="font-serif text-[clamp(2.2rem,6vw,4.5rem)] font-light leading-[1.02] tracking-[-0.02em]">
          What KalaVansh Taught Me
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Beyond features and flows, the project shaped how I think about building products—rooted in curiosity, restraint, and respect for the people behind the screen.
        </p>
      </Reveal>

      <motion.div
        className="grid gap-6 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {lessons.map((l) => (
          <motion.div
            key={l.n}
            variants={staggerItem}
            className="rounded-[22px] border border-border bg-background p-8 shadow-soft md:p-10"
          >
            <span className="font-serif text-sm text-gold">{l.n}</span>
            <h3 className="mt-4 font-serif text-2xl font-light leading-snug">{l.t}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{l.d}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}


/* ────────────────────────────── Next Project ────────────────────────────── */

function NextProject() {
  return (
    <section className="px-6 pb-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="h-px bg-border" />
        <Reveal>
          <nav className="flex items-center justify-between gap-6 py-10">
            <Link
              to="/"
              hash="work"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Work
            </Link>
            <Link
              to="/work/$slug"
              params={{ slug: "nexo" }}
              className="group inline-flex items-center gap-3 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              <span className="flex flex-col items-end">
                <span className="text-[0.65rem] uppercase tracking-[0.22em]">Next Project</span>
                <span className="font-serif text-lg font-light">Nexo</span>
              </span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}


/* ────────────────────────────── Page ────────────────────────────── */

function KalaVanshCaseStudy() {
  return (
    <div className="kala-theme min-h-screen bg-background">
      <PageNav />
      <Hero />
      <WatchTheStory />
      <BehindTheThinking />
      <InsightToExperience />
      <Validation />
      <LookingBack />
      <NextProject />
      <SiteFooter />
    </div>
  );
}
