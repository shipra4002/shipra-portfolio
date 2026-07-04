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

        {/* Right: premium layered editorial portrait composition */}
        <motion.div
          className="relative order-1 mx-auto w-full max-w-md md:order-2 md:max-w-lg"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient warm glow bleeding outside the card */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 -z-20"
            style={{
              background:
                "radial-gradient(50% 45% at 55% 40%, rgba(216,179,106,0.22), transparent 72%)",
            }}
          />

          {/* Oversized soft circle extending beyond the frame */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-8 top-2 -z-10 aspect-square w-[70%] rounded-full bg-[#EBE1D6]/70 blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.2 }}
          />

          {/* Thin abstract curved line extending outside the card */}
          <svg
            aria-hidden
            className="pointer-events-none absolute -left-12 top-8 -z-10 h-48 w-48 text-terracotta/30"
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

          {/* Floating PM card: mini kanban — outside, top-left */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-6 top-16 z-20 hidden w-32 rounded-xl border border-border/60 bg-card/70 p-2.5 shadow-soft backdrop-blur-sm sm:block"
            initial={{ opacity: 0, y: 14 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: [0, -6, 0] }}
            transition={{ opacity: { duration: 0.9, delay: 0.6 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
          >
            <div className="mb-1.5 h-1.5 w-10 rounded-full bg-sage/40" />
            <div className="grid grid-cols-3 gap-1">
              <div className="space-y-1">
                <div className="h-3 rounded bg-muted-foreground/15" />
                <div className="h-3 rounded bg-muted-foreground/10" />
              </div>
              <div className="space-y-1">
                <div className="h-3 rounded bg-terracotta/20" />
              </div>
              <div className="space-y-1">
                <div className="h-3 rounded bg-muted-foreground/10" />
                <div className="h-3 rounded bg-muted-foreground/15" />
              </div>
            </div>
          </motion.div>

          {/* Floating PM card: mini analytics — outside, bottom-right */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-6 bottom-14 z-20 hidden w-32 rounded-xl border border-border/60 bg-card/70 p-2.5 shadow-soft backdrop-blur-sm sm:block"
            initial={{ opacity: 0, y: 14 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: [0, 6, 0] }}
            transition={{ opacity: { duration: 0.9, delay: 0.8 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
          >
            <div className="mb-1.5 h-1.5 w-8 rounded-full bg-terracotta/40" />
            <div className="flex h-10 items-end gap-1">
              <div className="w-full rounded-t bg-sage/25" style={{ height: "40%" }} />
              <div className="w-full rounded-t bg-sage/35" style={{ height: "65%" }} />
              <div className="w-full rounded-t bg-terracotta/30" style={{ height: "50%" }} />
              <div className="w-full rounded-t bg-sage/45" style={{ height: "85%" }} />
              <div className="w-full rounded-t bg-sage/30" style={{ height: "70%" }} />
            </div>
          </motion.div>

          {/* Soft layered shadow beneath the card */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-8 bottom-0 -z-10 h-20 translate-y-7 rounded-full bg-[#8a6a52]/25 opacity-50 blur-2xl"
          />

          <div
            className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-border/50 shadow-lift"
            style={{
              background:
                "linear-gradient(155deg, #F3E7D6 0%, #EAD9C6 42%, #E4CDBE 100%)",
            }}
          >
            {/* Colorful layered gradient backdrop */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 55% at 50% 32%, rgba(216,179,106,0.32), transparent 70%), radial-gradient(55% 50% at 22% 82%, rgba(176,106,76,0.22), transparent 72%), radial-gradient(50% 45% at 82% 78%, rgba(107,122,104,0.20), transparent 74%)",
              }}
            />

            {/* Warm beige glow behind the head */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[10%] z-0 aspect-square w-[68%] -translate-x-1/2 rounded-full bg-[#EBE1D6] blur-[1px]"
            />

            {/* Translucent rounded panel, upper-left inside */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-4 top-5 z-0 h-24 w-20 rounded-2xl bg-white/30 backdrop-blur-[1px]"
            />

            {/* Faint wireframe / user-journey outline, low opacity */}
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 h-full w-full text-terracotta/10"
              viewBox="0 0 320 400"
              fill="none"
            >
              <circle cx="52" cy="300" r="10" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="150" cy="330" r="10" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="255" cy="290" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M62 300 H140" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M160 330 H245" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>

            {/* Dotted grid decoration, bottom-right */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-6 right-6 z-0 h-20 w-20 opacity-30"
              style={{
                backgroundImage: "radial-gradient(currentColor 1px, transparent 1.4px)",
                backgroundSize: "11px 11px",
                color: "rgba(176,106,76,0.6)",
              }}
            />

            {/* Small geometric accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute right-6 top-6 z-0 h-8 w-8 rotate-12 rounded-md border border-terracotta/25"
            />

            {/* Portrait — dominant element */}
            <motion.img
              src={portrait}
              alt="Editorial portrait of Shipra Maurya"
              width={1024}
              height={1280}
              className="absolute inset-x-0 bottom-0 z-10 mx-auto block h-[94%] w-auto max-w-[92%] object-contain object-bottom"
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
                boxShadow: "inset 0 -40px 60px -30px rgba(138,106,82,0.25)",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
