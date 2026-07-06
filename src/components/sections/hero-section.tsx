import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Target, Bot, Heart, Lightbulb, Rocket } from "lucide-react";
import portrait from "@/assets/hero-portrait.png";

const LINES = [
  "People don't remember products.",
  "They remember how products made them feel.",
  "That's the kind of experience I want to create.",
  "Hi, I'm Shipra.",
];

const TYPE_SPEED = 55;
const DELETE_SPEED = 28;
const HOLD = 1400;
const HOLD_LAST = 100000;

function useTypewriter(lines: string[], enabled: boolean) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const isLast = index === lines.length - 1;
    const full = lines[index];

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




// Identity circles on the right
const CIRCLES = [
  { icon: Target, label: "Product Thinking", className: "right-[2%] top-[6%]", float: 10, delay: 0.6 },
  { icon: Bot, label: "AI Product Management", className: "right-[30%] top-[2%]", float: 8, delay: 0.8 },
  { icon: Heart, label: "User Empathy", className: "right-[1%] top-[42%]", float: 12, delay: 1 },
  { icon: Lightbulb, label: "Curiosity", className: "right-[6%] bottom-[20%]", float: 9, delay: 1.15 },
  { icon: Rocket, label: "Builder", className: "right-[34%] bottom-[10%]", float: 11, delay: 1.3 },
];

function IdentityCircle({
  icon: Icon,
  label,
  className,
  float,
  delay,
  reduce,
}: {
  icon: typeof Target;
  label: string;
  className: string;
  float: number;
  delay: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      className={`group pointer-events-auto absolute z-30 flex items-center gap-2 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        reduce
          ? { opacity: 1, scale: 1 }
          : { opacity: 1, scale: 1, y: [0, -float, 0] }
      }
      transition={{
        opacity: { duration: 0.7, delay },
        scale: { duration: 0.7, delay },
        y: { duration: 6 + float * 0.2, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <div className="flex size-12 items-center justify-center rounded-full border border-[#2b2b2b]/15 bg-white/45 backdrop-blur-sm shadow-[0_8px_24px_-12px_rgba(43,30,10,0.5)] transition-colors duration-300 group-hover:bg-white/75 md:size-14">
        <Icon className="size-5 text-[#7a4a1c] md:size-6" strokeWidth={1.6} />
      </div>
      <span className="pointer-events-none max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-[#2b1a08]/85 px-0 py-1 text-xs text-[#f8ead2] opacity-0 transition-all duration-300 group-hover:max-w-[180px] group-hover:px-3 group-hover:opacity-100">
        {label}
      </span>
    </motion.div>
  );
}

export function HeroSection() {
  const reduce = useReducedMotion();
  const { text, index, done } = useTypewriter(LINES, !reduce);

  const showFinal = reduce || done;
  const displayText = reduce ? LINES[LINES.length - 1] : text;
  const isLastLine = reduce || index === LINES.length - 1;


  return (
    <section className="px-3 pt-20 md:px-6 md:pt-24">
      <div
        className="relative mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-[1400px] items-center overflow-hidden rounded-[36px] border border-gold/12 px-6 py-16 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] md:rounded-[48px] md:px-14 md:py-20"
        style={{
          background:
            "radial-gradient(120% 120% at 80% 10%, rgba(246,185,78,0.14) 0%, rgba(242,169,59,0.07) 50%, rgba(232,155,44,0.03) 100%)",
        }}
      >
        {/* Soft ambient light */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 20% 20%, rgba(255,255,255,0.14), transparent 70%)",
          }}
        />
        {/* Dotted grid accents */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-8 top-8 h-24 w-24 opacity-30"
          style={{
            backgroundImage: "radial-gradient(rgba(248,234,210,0.25) 1px, transparent 1.4px)",
            backgroundSize: "12px 12px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-10 right-1/2 h-24 w-24 opacity-25"
          style={{
            backgroundImage: "radial-gradient(rgba(248,234,210,0.25) 1px, transparent 1.4px)",
            backgroundSize: "12px 12px",
          }}
        />

        <div className="relative z-10 grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-6">
          {/* Left: typography */}
          <div className="relative order-2 md:order-1 md:pl-12">

            <div className="relative z-10 space-y-6 md:space-y-8">
              <h1 className="min-h-[3.5rem] font-serif text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-[1.14] tracking-[-0.015em] text-[#f8ead2] md:min-h-[4.5rem]">
                <span className={isLastLine ? "text-[#d8b36a]" : ""}>{displayText}</span>
                {!showFinal && (
                  <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.14em] animate-pulse bg-gold align-middle" />
                )}
              </h1>

              <motion.p
                className="max-w-md text-lg leading-relaxed text-[#d9c6a8]"
                initial={{ opacity: 0, y: 14 }}
                animate={showFinal ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.9, delay: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                Building digital experiences that create value, delight users, and give them a reason
                to return.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={showFinal ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.9, delay: reduce ? 0.1 : 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#f8ead2] px-6 py-3.5 text-sm text-[#2b1a08] transition-all duration-300 hover:gap-3 hover:bg-white"
                >
                  See How I Think
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Right: portrait overlapping bottom + identity circles */}
          <motion.div
            className="relative order-1 mx-auto h-[70vh] max-h-[720px] w-full max-w-lg md:order-2 md:h-[86vh]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Warm halo behind head */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[8%] -z-0 aspect-square w-[78%] -translate-x-1/2 rounded-full bg-[#FCE0A8]/60 blur-[2px]"
            />

            {/* Identity circles */}
            {CIRCLES.map((c) => (
              <IdentityCircle key={c.label} {...c} reduce={!!reduce} />
            ))}

            {/* Portrait — static, larger, raised toward the identity circles */}
            <motion.img
              src={portrait}
              alt="Portrait of Shipra Maurya"
              width={1024}
              height={1280}
              className="absolute inset-x-0 bottom-0 z-10 mx-auto block h-full w-auto max-w-[100%] object-contain object-top"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                opacity: { duration: 1, delay: 0.3 },
                y: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
