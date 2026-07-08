import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { AtAGlance, type GlanceRow, type GlancePalette } from "@/components/at-a-glance";
import { findProject, caseStudySections } from "@/lib/portfolio-data";

/* ----------------------------------------------------------------------------
 * Journey configuration — keeps the portfolio feeling like one continuous story.
 * Prev/next follow the guided sequence, the center label reflects the section,
 * and each page carries a palette-matched "At a Glance" summary card.
 * -------------------------------------------------------------------------- */
type NavTarget = { home: true; label: string } | { home?: false; slug: string; label: string };

type JourneyEntry = {
  centerLabel: string;
  prev: NavTarget;
  next: NavTarget;
  glance: GlanceRow[];
  palette: GlancePalette;
};

const JOURNEY: Record<string, JourneyEntry> = {
  "taj-hotels": {
    centerLabel: "Strategy Breakdown",
    prev: { slug: "nestle", label: "Nestlé" },
    next: { slug: "ather", label: "Ather Energy" },
    glance: [
      { k: "Challenge", v: "Sustaining iconic luxury positioning in a fast-shifting hospitality market." },
      { k: "Strategy", v: "Lean into heritage, service excellence and experience-led differentiation." },
      { k: "Recommendation", v: "Deepen loyalty, premiumize experiences and expand selectively." },
      { k: "Business Impact", v: "Stronger brand equity and resilient, high-margin guest relationships." },
    ],
    palette: {
      cardBg: "linear-gradient(180deg, rgba(250,246,236,0.95), rgba(246,239,226,0.92))",
      border: "rgba(184,147,85,0.3)",
      title: "#b89355",
      label: "#8a7355",
      value: "#3a2c1f",
      chipBg: "rgba(58,44,31,0.08)",
      chipFg: "#8a7355",
      btnBg: "#3a2c1f",
      btnFg: "#f6efe2",
      shadow: "0 30px 60px -24px rgba(58,44,31,0.45)",
    },
  },
  ather: {
    centerLabel: "Strategy Breakdown",
    prev: { slug: "taj-hotels", label: "Taj Hotels" },
    next: { slug: "notion", label: "Investigation — Notion" },
    glance: [
      { k: "Challenge", v: "Winning mindshare in India's crowded, price-sensitive EV two-wheeler market." },
      { k: "Research", v: "Mapped adoption barriers, charging anxiety and buyer motivations." },
      { k: "Strategy", v: "Own the premium, tech-forward mobility narrative and ecosystem." },
      { k: "Recommendation", v: "Scale charging infrastructure and double down on product experience." },
    ],
    palette: {
      cardBg: "linear-gradient(180deg, rgba(27,30,28,0.9), rgba(20,23,21,0.92))",
      border: "rgba(94,240,138,0.24)",
      title: "#5ef08a",
      label: "#9aa39a",
      value: "#f4f6f2",
      chipBg: "rgba(94,240,138,0.14)",
      chipFg: "#5ef08a",
      btnBg: "#5ef08a",
      btnFg: "#12211a",
      shadow: "0 30px 60px -24px rgba(0,0,0,0.7)",
    },
  },
  notion: {
    centerLabel: "Investigation",
    prev: { slug: "ather", label: "Ather Energy" },
    next: { home: true, label: "Explore Projects" },
    glance: [
      { k: "Investigation", v: "How Notion turns a blank canvas into a habit-forming workspace." },
      { k: "Framework", v: "Teardown across onboarding, flexibility and network effects." },
      { k: "Insights", v: "Composability and templates lower the cost of starting anything." },
      { k: "Key Takeaways", v: "Flexibility drives retention when guided by strong defaults." },
    ],
    palette: {
      cardBg: "rgba(255,255,255,0.95)",
      border: "rgba(17,17,17,0.12)",
      title: "#111111",
      label: "#9a9a9a",
      value: "#111111",
      chipBg: "rgba(17,17,17,0.06)",
      chipFg: "#6b6b6b",
      btnBg: "#111111",
      btnFg: "#ffffff",
      shadow: "0 30px 60px -24px rgba(0,0,0,0.35)",
    },
  },
};

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = findProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found — Shipra Maurya" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.title} — Shipra Maurya` },
        { name: "description", content: `${project.title}: a ${project.category.toLowerCase()} by Shipra Maurya.` },
        { property: "og:title", content: `${project.title} — Shipra Maurya` },
        { property: "og:description", content: `${project.title}: a ${project.category.toLowerCase()} by Shipra Maurya.` },
      ],
    };
  },
  notFoundComponent: NotFound,
  component: CaseStudy,
});

function HomeBackLink({ label }: { label: string }) {
  return (
    <Link
      to="/"
      hash="work"
      className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
      {label}
    </Link>
  );
}

function PrevLink({ target }: { target: NavTarget }) {
  if (target.home) return <HomeBackLink label={target.label} />;
  return (
    <Link
      to="/work/$slug"
      params={{ slug: target.slug }}
      className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
      {target.label}
    </Link>
  );
}

function NextLink({ target }: { target: NavTarget }) {
  if (target.home) {
    return (
      <Link
        to="/"
        hash="work"
        className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {target.label}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    );
  }
  return (
    <Link
      to="/work/$slug"
      params={{ slug: target.slug }}
      className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {target.label}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <h1 className="font-serif text-3xl font-light">This project isn't here.</h1>
      <HomeBackLink label="Back to work" />
    </div>
  );
}

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const journey = JOURNEY[project.slug];

  const prevTarget: NavTarget = journey?.prev ?? { home: true, label: "Back to work" };
  const nextTarget: NavTarget | null = journey?.next ?? null;
  const centerLabel = journey?.centerLabel ?? project.category;

  return (
    <div className="min-h-screen bg-background">
      {/* Top journey nav */}
      <header className="sticky top-0 z-30 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center px-6 py-4 md:px-10">
          <div className="flex-1"><HomeBackLink label="Back to Projects" /></div>
          <span className="hidden text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground md:inline-block">
            {centerLabel}
          </span>
          <div className="flex flex-1 justify-end">
            {nextTarget && <NextLink target={nextTarget} />}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 pt-16 md:px-10">
        {/* Hero */}
        <Reveal className="mt-4 border-b border-border pb-16" delay={0.05}>
          <span className="text-xs uppercase tracking-[0.2em] text-sage">{project.category}</span>
          <h1 className="mt-6 font-serif text-[clamp(2.4rem,7vw,4.5rem)] font-light leading-[1.08] tracking-[-0.015em]">
            {project.title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">{project.kicker}</p>
        </Reveal>

        {/* Storytelling sections — layout placeholders only */}
        <div className="divide-y divide-border">
          {caseStudySections.map((section, i) => (
            <Reveal key={section} as="section" className="py-16" delay={0.03}>
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-sm text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.5rem)] font-light leading-tight tracking-[-0.01em]">
                  {section}
                </h2>
              </div>
              <div className="mt-8 space-y-4">
                <div className="h-px w-full bg-border/60" />
                <div className="h-px w-11/12 bg-border/40" />
                <div className="h-px w-4/5 bg-border/30" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom journey nav */}
        <div className="flex items-center justify-between gap-6 border-t border-border py-16">
          <HomeBackLink label="Back to Projects" />
          {nextTarget ? (
            <NextLink target={nextTarget} />
          ) : (
            <a
              href="/#contact"
              className="group inline-flex items-center gap-1 text-sm text-foreground"
            >
              <span className="link-underline">Get in touch</span>
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
      <SiteFooter />

      {journey && (
        <AtAGlance project={project.title} rows={journey.glance} palette={journey.palette} />
      )}
    </div>
  );
}
