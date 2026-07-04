import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import portrait from "@/assets/hero-portrait.png";

const EASE = [0.22, 1, 0.36, 1] as const;

const AVATARS = [
  "linear-gradient(135deg, #b06a4c, #d8b36a)",
  "linear-gradient(135deg, #6b7a68, #2b2b2b)",
  "linear-gradient(135deg, #7c7669, #b06a4c)",
  "linear-gradient(135deg, #3f4a43, #6b7a68)",
  "linear-gradient(135deg, #d8b36a, #b06a4c)",
];

export function HeroSection() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: reduce ? 0 : delay, ease: EASE },
  });

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden px-6 pt-28 md:px-10 md:pt-24">
      {/* Warm ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-90"
        style={{
          background:
            "radial-gradient(70% 90% at 85% 55%, color-mix(in oklab, var(--terracotta) 20%, transparent), transparent 70%), radial-gradient(60% 70% at 10% 20%, color-mix(in oklab, var(--sage) 14%, transparent), transparent 70%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-14">
        {/* Left: content */}
        <div className="order-2 md:order-1">
          <motion.p
            {...rise(0.05)}
            className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground"
          >
            Product designer, available globally.
          </motion.p>

          <motion.h1
            {...rise(0.14)}
            className="mt-5 font-serif text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground"
          >
            Creative solutions that{" "}
            <span className="text-terracotta">drive real results.</span>
          </motion.h1>

          <motion.p
            {...rise(0.24)}
            className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground"
          >
            Hi, I'm Shipra — building digital experiences that create value, delight users, and give
            them a reason to return.
          </motion.p>

          <motion.div {...rise(0.34)} className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-lift transition-all duration-300 hover:gap-3 hover:brightness-95"
            >
              Let's Connect
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-sage opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-sage" />
              </span>
              Available for new projects
            </span>
          </motion.div>

          {/* Social proof */}
          <motion.div {...rise(0.44)} className="mt-10">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {AVATARS.map((bg, i) => (
                  <span
                    key={i}
                    className="size-9 rounded-full border-2 border-background shadow-soft"
                    style={{ background: bg }}
                  />
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm font-medium text-foreground">Loved by founders globally</p>
            <div className="mt-1.5 flex gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: editorial portrait */}
        <motion.div
          className="relative order-1 mx-auto w-full max-w-xs md:order-2 md:max-w-md"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(60% 60% at 30% 30%, rgba(107,122,104,0.35), transparent 70%), radial-gradient(55% 55% at 75% 80%, rgba(176,106,76,0.30), transparent 70%)",
            }}
          />
          <motion.div
            className="overflow-hidden rounded-[1.75rem] border border-border shadow-lift"
            animate={reduce ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={portrait}
              alt="Editorial portrait of Shipra Maurya"
              width={1024}
              height={1280}
              className="aspect-[4/5] size-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
