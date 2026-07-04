import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { workCategories, type Project } from "@/lib/portfolio-data";
import { Reveal, staggerContainer, staggerItem } from "@/components/reveal";

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article variants={staggerItem} className="h-full">
      <Link
        to="/work/$slug"
        params={{ slug: project.slug }}
        className="group flex h-full flex-col overflow-hidden rounded-[18px] bg-card shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04] transition-all duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_28px_50px_-24px_rgba(0,0,0,0.45)]"
      >
        {/* Cover image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <div
            className="absolute inset-0 scale-100 bg-cover bg-center transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            style={{ backgroundImage: project.cover }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,rgba(255,255,255,0.14),transparent_55%)]" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-7 md:p-8">
          <span className="text-[0.68rem] uppercase tracking-[0.2em] text-terracotta">{project.kicker}</span>
          <h4 className="mt-3 font-serif text-2xl font-normal leading-tight tracking-tight text-card-foreground">
            {project.title}
          </h4>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-10 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-terracotta">
            Read More
            <ArrowRight className="size-4 transition-transform duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export function WorkSection() {
  return (
    <section id="work" className="relative scroll-mt-24 bg-[#3F4A43] text-[#F8F6F2]">
      {/* Top fade: cream Hero → deep editorial */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent"
      />
      {/* Bottom fade: deep editorial → cream */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-32 md:px-10 md:py-44">
        <Reveal className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.28em] text-terracotta">Selected Work</span>
          <h2 className="mt-7 whitespace-nowrap font-serif text-[clamp(2.6rem,7vw,5rem)] font-light leading-[1.05] tracking-[-0.02em]">
            Building. Investigating. Strategizing.
          </h2>
        </Reveal>

        <div className="mt-24 space-y-24 md:mt-32">
          {workCategories.map((category) => (
            <div key={category.id}>
              <Reveal className="mb-10 flex flex-col gap-2 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
                <h3 className="font-serif text-2xl font-normal tracking-tight md:text-3xl">{category.label}</h3>
                <p className="max-w-md text-sm leading-relaxed text-white/60">{category.description}</p>
              </Reveal>

              <motion.div
                className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
              >
                {category.projects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
