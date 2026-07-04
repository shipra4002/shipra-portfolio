import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  Presentation,
  Quote,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { Reveal, staggerContainer, staggerItem } from "@/components/reveal";
import heroImg from "@/assets/kalavansh-hero.jpg";
import artisan1 from "@/assets/kalavansh-artisan-1.jpg";
import artisan2 from "@/assets/kalavansh-artisan-2.jpg";

export const Route = createFileRoute("/work/kalavansh")({
  head: () => ({
    meta: [
      { title: "KalaVansh — A Case Study by Shipra Maurya" },
      {
        name: "description",
        content:
          "Making India's artisans visible—not just their products. A product thinking journey from discovering the problem to designing a meaningful solution.",
      },
      { property: "og:title", content: "KalaVansh — A Case Study by Shipra Maurya" },
      {
        property: "og:description",
        content: "Making India's artisans visible—not just their products.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://id-preview--89131a1d-8073-4281-aadd-db49d46b3a3f.lovable.app/kalavansh-og.jpg" },
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
      Back to work
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

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-6 py-24 md:px-10 md:py-36 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

/* ─────────────────────────────────── Hero ─────────────────────────────────── */

function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);

  const meta = [
    { label: "Role", value: "Product Manager · UX Research" },
    { label: "Duration", value: "14 weeks" },
    { label: "Team", value: "Solo → 4 collaborators" },
  ];

  const links = [
    { label: "Prototype", icon: ExternalLink, href: "#" },
    { label: "Presentation Deck", icon: Presentation, href: "#" },
    { label: "GitHub", icon: Github, href: "#" },
  ];

  return (
    <header ref={ref} className="relative px-6 pt-28 md:px-10 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <BackLink />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 items-end gap-10 md:mt-14 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-6">
            <Reveal delay={0.05}>
              <span className="text-xs uppercase tracking-[0.24em] text-terracotta">
                Product Design & Strategy
              </span>
              <h1 className="mt-6 font-serif text-[clamp(3rem,10vw,6.5rem)] font-light leading-[0.95] tracking-[-0.03em]">
                KalaVansh
              </h1>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-muted-foreground md:text-xl">
                Making India's artisans visible—not just their products.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="mt-10 flex flex-wrap gap-3">
              {meta.map((m) => (
                <div
                  key={m.label}
                  className="rounded-full border border-border bg-surface px-4 py-2"
                >
                  <span className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {m.label}
                  </span>
                  <span className="ml-2 text-sm text-foreground">{m.value}</span>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.18} className="mt-8 flex flex-wrap gap-3">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-2.5 text-sm text-foreground transition-all duration-300 hover:border-foreground/40 hover:gap-3"
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
                alt="An artisan weaving handloom textile on a wooden loom"
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

/* ────────────────────────────── The Spark ────────────────────────────── */

function TheSpark() {
  const sparks = [
    {
      k: "The maker is erased",
      d: "A handwoven saree travels through six hands before it reaches a shelf. The name attached to it is never the weaver's.",
    },
    {
      k: "Skill without a story",
      d: "Buyers pay for the object, not the decades of mastery behind it—because they never meet the person who made it.",
    },
    {
      k: "Value leaks upward",
      d: "The further a craft moves from its origin, the more it earns—and the less the artisan sees of it.",
    },
  ];

  return (
    <Section className="bg-surface">
      <ChapterLabel index="01" title="The Spark" />
      <Reveal>
        <p className="max-w-3xl font-serif text-[clamp(1.6rem,3.6vw,2.6rem)] font-light leading-[1.25] tracking-[-0.01em]">
          I met a weaver whose work I&apos;d admired for years—and realised I had
          never once known his name.
        </p>
      </Reveal>

      <motion.div
        className="mt-16 grid gap-6 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {sparks.map((s) => (
          <motion.div
            key={s.k}
            variants={staggerItem}
            className="rounded-[18px] border border-border bg-background p-8 shadow-soft"
          >
            <div className="mb-5 size-1.5 rounded-full bg-terracotta" />
            <h3 className="font-serif text-xl font-normal leading-snug">{s.k}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ─────────────────── What I Wanted To Understand ─────────────────── */

function WantedToUnderstand() {
  const stats = [
    { n: "27", l: "In-depth interviews" },
    { n: "5", l: "States visited" },
    { n: "9", l: "Craft clusters" },
    { n: "40+", l: "Hours of field notes" },
  ];

  const journey = [
    { t: "Immersion", d: "Lived alongside two weaving families to observe daily rhythms, not just workflows." },
    { t: "Conversations", d: "Open interviews with artisans, middlemen, and urban buyers—each side of the chain." },
    { t: "Shadowing", d: "Followed a single saree from loom to storefront to understand where value quietly disappeared." },
    { t: "Synthesis", d: "Mapped emotions, incentives and friction into a single system view." },
  ];

  return (
    <Section>
      <ChapterLabel index="02" title="What I Wanted To Understand" />
      <Reveal className="max-w-2xl">
        <p className="text-lg leading-relaxed text-muted-foreground">
          Not &ldquo;how do we sell more crafts?&rdquo;—but &ldquo;why does the person
          behind the craft stay invisible?&rdquo;
        </p>
      </Reveal>

      <motion.div
        className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {stats.map((s) => (
          <motion.div
            key={s.l}
            variants={staggerItem}
            className="rounded-[18px] border border-border bg-surface p-7 text-center"
          >
            <div className="font-serif text-[clamp(2.4rem,6vw,3.4rem)] font-light text-terracotta">
              {s.n}
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {s.l}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Research journey timeline */}
      <div className="mt-20">
        <Reveal className="mb-10 text-xs uppercase tracking-[0.24em] text-secondary-foreground/60">
          The research journey
        </Reveal>
        <div className="relative border-l border-border pl-8 md:pl-10">
          {journey.map((j, i) => (
            <Reveal key={j.t} delay={i * 0.05} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[41px] top-1 flex size-4 items-center justify-center md:-left-[49px]">
                <span className="size-2.5 rounded-full bg-sage ring-4 ring-background" />
              </span>
              <h3 className="font-serif text-xl font-normal">{j.t}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{j.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────── What Changed My Thinking ─────────────────── */

function ChangedMyThinking() {
  const shifts = [
    {
      before: "I assumed artisans needed a marketplace.",
      after: "They needed recognition. Sales follow trust, not the other way around.",
    },
    {
      before: "I assumed buyers wanted cheaper crafts.",
      after: "Buyers wanted to feel connected to a story they could retell with pride.",
    },
    {
      before: "I assumed the problem was distribution.",
      after: "The real gap was identity—the maker vanished long before the product did.",
    },
  ];

  return (
    <Section className="bg-surface">
      <ChapterLabel index="03" title="What Changed My Thinking" />
      <div className="space-y-8">
        {shifts.map((s, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="grid items-center gap-6 rounded-[22px] border border-border bg-background p-8 shadow-soft md:grid-cols-[1fr_auto_1fr] md:p-12">
              <p className="font-serif text-lg font-light leading-relaxed text-muted-foreground line-through decoration-terracotta/40">
                {s.before}
              </p>
              <ArrowRight className="hidden size-6 text-terracotta md:block" />
              <p className="font-serif text-[clamp(1.3rem,2.4vw,1.8rem)] font-normal leading-snug text-foreground">
                {s.after}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────── Voices From The Field ─────────────────── */

function VoicesFromTheField() {
  const voices = [
    {
      quote:
        "People buy my work. Nobody knows it is mine. I am proud of it, but the pride stays inside my house.",
      name: "Ramesh",
      role: "Handloom weaver, 3rd generation",
      img: artisan2,
    },
    {
      quote:
        "When someone visits and watches me work, they pay more—not for the pot, for the moment.",
      name: "Lakshmi",
      role: "Potter & clay artist",
      img: artisan1,
    },
  ];

  return (
    <Section>
      <ChapterLabel index="04" title="Voices From The Field" />
      <div className="grid gap-6 md:grid-cols-2">
        {voices.map((v, i) => (
          <Reveal key={v.name} delay={i * 0.06}>
            <figure className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-border bg-surface">
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={v.img}
                  alt={`Portrait of ${v.name}`}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="size-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              </div>
              <blockquote className="flex flex-1 flex-col p-8 md:p-10">
                <Quote className="size-6 text-terracotta" />
                <p className="mt-4 font-serif text-[clamp(1.2rem,2.2vw,1.6rem)] font-light leading-snug">
                  {v.quote}
                </p>
                <figcaption className="mt-auto pt-8 text-sm">
                  <span className="text-foreground">{v.name}</span>
                  <span className="text-muted-foreground"> — {v.role}</span>
                </figcaption>
              </blockquote>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────── Patterns I Couldn't Ignore ─────────────────── */

function Patterns() {
  const nodes = [
    "Invisible maker",
    "No direct trust",
    "Value captured by middlemen",
    "Story lost in transit",
    "Buyers crave connection",
  ];

  return (
    <Section className="bg-surface">
      <ChapterLabel index="05" title="Patterns I Couldn't Ignore" />
      <Reveal className="max-w-2xl">
        <p className="text-lg leading-relaxed text-muted-foreground">
          Every problem I heard traced back to the same root—and fed the next.
          It wasn&apos;t a list of issues. It was a loop.
        </p>
      </Reveal>

      <Reveal className="mt-16">
        <div className="rounded-[22px] border border-border bg-background p-8 md:p-14">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6">
            {nodes.map((n, i) => (
              <div key={n} className="flex items-center gap-4">
                <span className="rounded-full border border-border bg-surface px-5 py-3 text-center text-sm font-medium text-foreground">
                  {n}
                </span>
                <ArrowRight
                  className={`size-5 shrink-0 text-terracotta ${
                    i === nodes.length - 1 ? "rotate-90 md:rotate-0" : ""
                  }`}
                />
              </div>
            ))}
            <span className="rounded-full bg-sage px-5 py-3 text-center text-sm font-medium text-primary-foreground">
              Loop repeats
            </span>
          </div>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Break one link—visibility—and the whole loop starts working for the artisan
            instead of against them.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

/* ─────────────────── The Product Opportunity ─────────────────── */

function ProductOpportunity() {
  return (
    <Section>
      <ChapterLabel index="06" title="The Product Opportunity" />
      <Reveal>
        <p className="max-w-4xl font-serif text-[clamp(1.8rem,4.5vw,3rem)] font-light leading-[1.2] tracking-[-0.015em]">
          What if every craft carried its maker with it—so buying became meeting?
        </p>
      </Reveal>

      <Reveal className="mt-16">
        <div className="grid items-stretch gap-4 md:grid-cols-3">
          {[
            {
              t: "A face, not a label",
              d: "Every product opens to the artisan behind it—their name, place, and craft lineage.",
            },
            {
              t: "A scan that tells a story",
              d: "A single QR bridges the physical object and the human story it carries.",
            },
            {
              t: "A relationship, not a receipt",
              d: "Buyers can follow, book workshops, and return—turning a purchase into a bond.",
            },
          ].map((c, i) => (
            <div
              key={c.t}
              className="flex flex-col rounded-[22px] border border-border bg-surface p-8"
            >
              <span className="font-serif text-sm text-gold">{`0${i + 1}`}</span>
              <h3 className="mt-4 font-serif text-xl font-normal leading-snug">{c.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ─────────────────── From Insight To Experience ─────────────────── */

function InsightToExperience() {
  const flows = [
    {
      insight: "The maker vanishes before the product does.",
      decision: "Anchor identity to every object, permanently.",
      experience: "A scannable KalaVansh tag that opens the artisan's living profile.",
    },
    {
      insight: "Buyers pay for moments, not just objects.",
      decision: "Let people experience the craft, not only own it.",
      experience: "In-app workshop booking with the artisan, in person or live.",
    },
    {
      insight: "Trust grows when the story is verifiable.",
      decision: "Make provenance transparent and human.",
      experience: "A craft timeline showing origin, technique, and the hands involved.",
    },
  ];

  return (
    <Section className="bg-surface">
      <ChapterLabel index="07" title="From Insight To Experience" />
      <div className="space-y-6">
        {flows.map((f, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="grid gap-px overflow-hidden rounded-[22px] border border-border bg-border md:grid-cols-3">
              {[
                { k: "Research Insight", v: f.insight, tone: "text-terracotta" },
                { k: "Product Decision", v: f.decision, tone: "text-sage" },
                { k: "Final Experience", v: f.experience, tone: "text-gold" },
              ].map((col) => (
                <div key={col.k} className="bg-background p-8 md:p-9">
                  <span className={`text-[0.65rem] uppercase tracking-[0.18em] ${col.tone}`}>
                    {col.k}
                  </span>
                  <p className="mt-3 text-base leading-relaxed text-foreground">{col.v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────── Measuring Success ─────────────────── */

function MeasuringSuccess() {
  const metrics = [
    { n: "QR Scan Rate", d: "How often a product's story is actually opened." },
    { n: "Workshop Bookings", d: "Moments booked directly with artisans." },
    { n: "Returning Visitors", d: "People who come back to a maker's profile." },
    { n: "Artisan Earnings", d: "Share of value returning to the maker." },
    { n: "Customer Story Views", d: "Reach of each artisan's narrative." },
    { n: "Trust Score", d: "Buyer confidence in provenance." },
    { n: "Repeat Engagement", d: "Ongoing relationships, not one-off sales." },
  ];

  return (
    <Section>
      <ChapterLabel index="08" title="Measuring Success" />
      <Reveal className="max-w-2xl">
        <p className="text-lg leading-relaxed text-muted-foreground">
          Success isn&apos;t revenue alone. It&apos;s whether the artisan became
          more visible, more valued, and more chosen.
        </p>
      </Reveal>

      <motion.div
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {metrics.map((m) => (
          <motion.div
            key={m.n}
            variants={staggerItem}
            className="rounded-[18px] border border-border bg-surface p-7"
          >
            <div className="size-1.5 rounded-full bg-sage" />
            <h3 className="mt-5 font-serif text-lg font-normal">{m.n}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.d}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ─────────────────── Looking Back ─────────────────── */

function LookingBack() {
  const cards = [
    {
      q: "What would I validate earlier?",
      a: "Whether artisans wanted visibility at all—before designing how to give it to them.",
    },
    {
      q: "What assumptions changed?",
      a: "That this was a commerce problem. It was a dignity problem wearing a commerce costume.",
    },
    {
      q: "What would I improve in V2?",
      a: "Lower the tech barrier—many artisans needed the tag to work without a smartphone of their own.",
    },
  ];

  return (
    <Section className="bg-surface">
      <ChapterLabel index="09" title="Looking Back" />
      <motion.div
        className="grid gap-6 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {cards.map((c) => (
          <motion.div
            key={c.q}
            variants={staggerItem}
            className="rounded-[22px] border border-border bg-background p-8 shadow-soft"
          >
            <h3 className="font-serif text-xl font-normal leading-snug text-terracotta">{c.q}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.a}</p>
          </motion.div>
        ))}
      </motion.div>

      <Reveal className="mt-24 text-center">
        <p className="mx-auto max-w-3xl font-serif text-[clamp(1.8rem,4.5vw,3rem)] font-light leading-[1.2] tracking-[-0.015em]">
          Great products don&apos;t just move objects. They make invisible people
          impossible to overlook.
        </p>
      </Reveal>

      <div className="mt-20 flex items-center justify-between border-t border-border pt-12">
        <BackLink />
        <a
          href="/#contact"
          className="group inline-flex items-center gap-1 text-sm text-foreground"
        >
          <span className="link-underline">Get in touch</span>
          <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </Section>
  );
}

/* ─────────────────────────────── Page ─────────────────────────────── */

function KalaVanshCaseStudy() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <TheSpark />
      <WantedToUnderstand />
      <ChangedMyThinking />
      <VoicesFromTheField />
      <Patterns />
      <ProductOpportunity />
      <InsightToExperience />
      <MeasuringSuccess />
      <LookingBack />
      <SiteFooter />
    </div>
  );
}
