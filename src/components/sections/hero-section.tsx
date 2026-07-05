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
            className="mt-8 flex items-center gap-6"
            initial={{ opacity: 0, y: 14 }}
            animate={showFinal ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.9, delay: reduce ? 0.1 : 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3.5 text-sm text-background shadow-soft transition-all duration-300 hover:gap-3 hover:bg-sage"
            >
              See How I Think
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <span className="hidden h-[2px] w-24 bg-gold md:block" />
          </motion.div>


        </div>

        {/* Right: minimal premium portrait composition */}
        <motion.div
          className="relative isolate order-1 mx-auto w-full max-w-sm md:order-2 md:max-w-md"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Structural color block: sage, offset up-right */}
          <div
            aria-hidden
            className="absolute -right-8 -top-8 z-0 h-[72%] w-[78%] rounded-2xl bg-sage/90 shadow-soft"
          />

          {/* Structural color block: terracotta, offset down-left */}
          <div
            aria-hidden
            className="absolute -bottom-10 -left-10 z-0 h-[68%] w-[78%] rounded-2xl bg-terracotta/90 shadow-soft"
          />

          {/* Subtle gold ring outline */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-6 -left-10 z-20 hidden aspect-square w-24 rounded-full border-[3px] border-gold/60 sm:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          />

          {/* Portrait card — frosted glass over color blocks */}
          <div className="relative z-10 rounded-2xl border-[6px] border-gold/80 bg-white/20 p-2 shadow-lift backdrop-blur-xl">
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-xl"
              style={{
                background:
                  "linear-gradient(155deg, #F3E7D6 0%, #EAD9C6 45%, #E4CDBE 100%)",
              }}
            >
              {/* Soft warm backdrop wash */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(50% 48% at 50% 28%, rgba(216,179,106,0.32), transparent 72%), radial-gradient(50% 44% at 22% 86%, rgba(176,106,76,0.26), transparent 74%), radial-gradient(50% 42% at 84% 82%, rgba(107,122,104,0.26), transparent 76%)",
                }}
              />

              {/* Warm glow behind the head */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[9%] z-0 aspect-square w-[66%] -translate-x-1/2 rounded-full bg-[#EBE1D6] blur-[1px]"
              />

              {/* Portrait — dominant element */}
              <motion.img
                src={portrait}
                alt="Editorial portrait of Shipra Maurya"
                width={1024}
                height={1280}
                className="absolute inset-x-0 bottom-0 z-10 mx-auto block h-[93%] w-auto max-w-[94%] object-contain object-bottom md:h-[94%]"
                initial={{ opacity: 0, y: 24 }}
                animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -8, 0] }}
                transition={{
                  opacity: { duration: 1, delay: 0.3 },
                  y: reduce ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" },
                }}
              />

              {/* Soft vignette for depth */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[15]"
                style={{
                  boxShadow: "inset 0 -36px 56px -28px rgba(138,106,82,0.30)",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
