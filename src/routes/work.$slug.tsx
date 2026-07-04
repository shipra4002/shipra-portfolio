import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { findProject, caseStudySections } from "@/lib/portfolio-data";

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

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <h1 className="font-serif text-3xl font-light">This project isn't here.</h1>
      <BackLink />
    </div>
  );
}

function CaseStudy() {
  const { project } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 pt-28 md:px-10">
        <Reveal>
          <BackLink />
        </Reveal>

        {/* Hero */}
        <Reveal className="mt-10 border-b border-border pb-16" delay={0.05}>
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

        <div className="flex items-center justify-between border-t border-border py-16">
          <BackLink />
          <a
            href="/#contact"
            className="group inline-flex items-center gap-1 text-sm text-foreground"
          >
            <span className="link-underline">Get in touch</span>
            <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
