import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

const LINES = [
  "People don't remember products.",
  "They remember how products made them feel.",
  "That's the kind of experience I want to create.",
  "Hi, I'm Shipra.",
];

export function HeroSection() {
  const reduce = useReducedMotion();
  // Timing: each line ~0.9s apart, supporting copy + CTA after the lines.
  const lineGap = 0.9;
  const afterLines = LINES.length * lineGap + 0.4;

  return (
    <section className="relative flex min-h-svh items-center px-6 pt-24 md:px-10">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="font-serif text-[clamp(2rem,6vw,4.25rem)] font-light leading-[1.12] tracking-[-0.015em] text-foreground">
          {LINES.map((line, i) => {
            const isLast = i === LINES.length - 1;
            return (
              <motion.span
                key={line}
                className={`block ${isLast ? "mt-6 text-terracotta" : ""}`}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: reduce ? 0 : 0.3 + i * lineGap,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line}
              </motion.span>
            );
          })}
        </h1>

        <motion.p
          className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: reduce ? 0.2 : afterLines, ease: [0.22, 1, 0.36, 1] }}
        >
          Building digital experiences that create value, delight users, and give them a reason to
          return.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: reduce ? 0.35 : afterLines + 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#work"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm text-background transition-all duration-300 hover:gap-3"
          >
            See How I Think
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: reduce ? 0.5 : afterLines + 1 }}
      >
        <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
      </motion.div>
    </section>
  );
}
