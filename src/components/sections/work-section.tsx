import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { workCategories, type Project } from "@/lib/portfolio-data";
import { Reveal, staggerContainer, staggerItem } from "@/components/reveal";

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article variants={staggerItem}>
      <Link
        to="/work/$slug"
        params={{ slug: project.slug }}
        className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-lift"
      >
        <div>
          <span className="text-xs uppercase tracking-[0.18em] text-sage">{project.kicker}</span>
          <h4 className="mt-4 font-serif text-2xl font-normal leading-tight tracking-tight text-foreground">
            {project.title}
          </h4>
        </div>
        <span className="mt-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-terracotta">
          Read More
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.article>
  );
}

export function WorkSection() {
  return (
    <section id="work" className="scroll-mt-24 px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-sage">Work</span>
          <h2 className="mt-5 font-serif text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.15] tracking-[-0.01em]">
            How I think about products.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Three ways of working through a product problem — building, investigating, and reading
            the strategy beneath the surface.
          </p>
        </Reveal>

        <div className="mt-20 space-y-24">
          {workCategories.map((category) => (
            <div key={category.id}>
              <Reveal className="mb-9 flex flex-col gap-2 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
                <h3 className="font-serif text-2xl font-normal tracking-tight md:text-3xl">
                  {category.label}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
              </Reveal>

              <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
