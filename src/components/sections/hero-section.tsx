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
    <section className="relative flex min-h-svh items-center px-6 pt-28 md:px-10 md:pt-24">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Left: typography */}
        <div className="order-2 md:order-1">
          <div className="space-y-6 md:space-y-8">
            <h1 className="min-h-[3rem] font-serif text-[clamp(2rem,5vw,3.6rem)] font-light leading-[1.14] tracking-[-0.015em] text-foreground md:min-h-[4rem]">
              <span className={isLastLine ? "text-terracotta" : ""}>{displayText}</span>
              {!showFinal && (
                <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.14em] animate-pulse bg-sage align-middle" />
              )}
            </h1>

            <motion.p
              className="max-w-md text-lg leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 14 }}
              animate={showFinal ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.9, delay: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              Building digital experiences that create value, delight users, and give them a reason to
              return.
            </motion.p>
          </div>


          <motion.div
            className="mt-8"
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

        {/* Right: premium editorial portrait composition */}
        <motion.div
          className="relative order-1 mx-auto w-full max-w-sm md:order-2 md:max-w-md"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Thin abstract curved line extending outside the card */}
          <svg
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 -z-10 h-40 w-40 text-terracotta/40"
            viewBox="0 0 160 160"
            fill="none"
          >
            <path
              d="M6 120 C 40 40, 120 10, 154 44"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Soft shadow beneath the card */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 bottom-0 -z-10 h-16 translate-y-6 rounded-full bg-black/25 opacity-40 blur-2xl"
          />

          <div className="relative overflow-hidden rounded-[30px] bg-[#F6F0EA] shadow-lift">
            {/* Subtle radial gradient backdrop */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 55% at 50% 38%, rgba(107,122,104,0.10), transparent 70%)",
              }}
            />

            {/* Large soft circle behind the head */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[14%] -z-0 aspect-square w-[62%] -translate-x-1/2 rounded-full bg-[#EBE1D6]"
            />

            {/* Dotted grid decoration, bottom-right */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-5 right-5 h-16 w-16 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(currentColor 1px, transparent 1.4px)",
                backgroundSize: "10px 10px",
                color: "rgba(176,106,76,0.6)",
              }}
            />

            {/* Portrait */}
            <motion.img
              src={portrait}
              alt="Editorial portrait of Shipra Maurya"
              width={1024}
              height={1280}
              className="relative z-10 mx-auto block h-[88%] w-[86%] object-contain px-4 pt-6"
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
