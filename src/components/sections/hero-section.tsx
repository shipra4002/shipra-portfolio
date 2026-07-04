import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import portrait from "@/assets/hero-portrait.png";

const LINES = [
  "People don't remember products.",
  "They remember how products made them feel.",
  "That's the kind of experience I want to create.",
  "Hi, I'm Shipra.",
];

const TYPE_SPEED = 55;
const DELETE_SPEED = 28;
const HOLD = 1500;
const HOLD_LAST = 100000; // effectively keep the last line forever

/**
 * Cinematic typewriter: types one line, holds, deletes, then the next.
 * The final line ("Hi, I'm Shipra.") types once and stays.
 */
function useTypewriter(lines: string[], enabled: boolean) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const isLast = index === lines.length - 1;
    const full = lines[index];

    // Finished the last line: stop entirely.
    if (isLast && text === full && !deleting) {
      setDone(true);
      return;
    }

    let delay: number;
    if (!deleting && text === full) {
      delay = isLast ? HOLD_LAST : HOLD;
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % lines.length);
      return;
    } else {
      delay = deleting ? DELETE_SPEED : TYPE_SPEED;
    }

    const t = setTimeout(() => {
      if (!deleting && text === full) {
        if (!isLast) setDeleting(true);
      } else if (deleting) {
        setText(full.slice(0, text.length - 1));
      } else {
        setText(full.slice(0, text.length + 1));
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, index, enabled, lines]);

  return { text, index, done };
}

export function HeroSection() {
  const reduce = useReducedMotion();
  const { text, index, done } = useTypewriter(LINES, !reduce);

  // With reduced motion, show the final line immediately and reveal everything.
  const showFinal = reduce || done;
  const displayText = reduce ? LINES[LINES.length - 1] : text;
  const isLastLine = reduce || index === LINES.length - 1;

  return (
    <section className="relative flex min-h-svh items-end overflow-hidden px-6 pt-28 md:items-center md:px-10 md:pt-24">
      {/* Full-bleed editorial portrait with warm blend */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute bottom-0 right-0 top-0 w-full md:w-[48%]">
          <img
            src={portrait}
            alt="Editorial portrait of Shipra Maurya"
            width={1024}
            height={1280}
            className="h-full w-full object-cover object-top"
          />
          {/* Left fade: strong on mobile where text overlaps; invisible on desktop */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/55 to-transparent md:from-transparent md:via-transparent md:to-transparent" />
          {/* Bottom fade: picture melts into the page */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent md:via-background/8" />
          {/* Warm bottom glow like the reference */}
          <div className="absolute inset-0 bg-gradient-to-t from-terracotta/10 via-transparent to-transparent opacity-90" />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 pb-20 md:grid-cols-2 md:gap-16 md:pb-0">
        {/* Left: typography */}
        <div className="order-2 md:order-1">
          <div className="space-y-6 md:space-y-8">
            <h1 className="min-h-[6rem] font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground md:min-h-[8.5rem]">
              <span className={isLastLine ? "text-terracotta" : ""}>{displayText}</span>
              {!showFinal && (
                <span className="ml-1 inline-block h-[1.05em] w-[3px] translate-y-[0.12em] animate-pulse bg-sage align-middle" />
              )}
            </h1>

            <motion.p
              className="max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl"
              initial={{ opacity: 0, y: 14 }}
              animate={showFinal ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.9, delay: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              Building digital experiences that create value, delight users, and give them a reason to
              return.
            </motion.p>
          </div>

          <motion.div
            className="mt-8 md:mt-10"
            initial={{ opacity: 0, y: 14 }}
            animate={showFinal ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.9, delay: reduce ? 0.1 : 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm text-background transition-all duration-300 hover:gap-3"
            >
              See How I Think
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>

        {/* Right: empty visual column reserved for the portrait */}
        <div className="order-1 md:order-2" />
      </div>
    </section>
  );
}
