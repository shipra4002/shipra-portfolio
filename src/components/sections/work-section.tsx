import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { workCategories, type Project } from "@/lib/portfolio-data";
import { Reveal, staggerContainer, staggerItem } from "@/components/reveal";

function ProjectCard({ project }: { project: Project }) {
  const { theme } = project;
  return (
    <motion.article variants={staggerItem} className="h-full">
      <Link
        to="/work/$slug"
        params={{ slug: project.slug }}
        style={{ ["--pc-accent" as string]: theme.accent }}
        className="group flex h-full flex-col overflow-hidden rounded-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.06] transition-all duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_28px_50px_-24px_rgba(0,0,0,0.45)]"
      >
        {/* Cover image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <div
            className="absolute inset-0 scale-100 bg-cover bg-center transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            style={{ backgroundImage: project.cover }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,rgba(255,255,255,0.14),transparent_55%)]" />
        </div>

        {/* Content — themed per project */}
        <div
          className="flex flex-1 flex-col p-7 md:p-8"
          style={{ backgroundColor: theme.bgColor, backgroundImage: theme.bgImage }}
        >
          <span
            className="text-[0.68rem] uppercase tracking-[0.2em]"
            style={{ color: theme.kicker }}
          >
            {project.kicker}
          </span>
          <h4
            className="mt-3 font-serif text-2xl font-normal leading-tight tracking-tight"
            style={{ color: theme.fg }}
          >
            {project.title}
          </h4>
          <span
            className="mt-auto inline-flex items-center gap-1.5 pt-10 text-sm transition-colors duration-300 group-hover:[color:var(--pc-accent)]"
            style={{ color: theme.muted }}
          >
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
    <section id="work" className="scroll-mt-24 px-3 md:px-6">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[36px] bg-[#4A5B4E] text-[#F3F0E8] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] md:rounded-[48px]">
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-14 md:py-32">
        <Reveal className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.28em] text-gold">Selected Work</span>
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
                {(category.id === "investigations" || category.id === "strategy-breakdowns") && (
                  <motion.article variants={staggerItem} className="h-full">
                    <div className="group flex h-full min-h-[240px] flex-col items-center justify-center overflow-hidden rounded-[18px] border border-dashed border-gold/40 bg-white/[0.03] p-8 text-center transition-colors duration-500 hover:border-gold/70">
                      <span className="font-serif text-3xl leading-none text-gold/80">✦</span>
                      <h4 className="mt-4 font-serif text-2xl font-normal leading-tight tracking-tight text-[#F3F0E8]">
                        More coming soon
                      </h4>
                      <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-white/55">
                        New teardowns in the making — pieces I'm currently pulling apart.
                      </p>
                    </div>
                  </motion.article>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
