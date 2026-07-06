import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Reveal, staggerContainer, staggerItem } from "@/components/reveal";
import awsSummit from "@/assets/event-aws-summit.jpg";
import skillathon from "@/assets/event-skillathon.jpg";
import competition from "@/assets/event-competition.jpg";

const EVENTS = [
  {
    image: awsSummit,
    title: "AWS Summit",
    subtitle: "Learning the cloud from the people who build it.",
  },
  {
    image: skillathon,
    title: "Skillathon",
    subtitle: "Building fast, together, under pressure.",
  },
  {
    image: competition,
    title: "Competition",
    subtitle: "Testing ideas against the very best.",
  },
];

export function EventsSection() {
  return (
    <section id="events" className="scroll-mt-24 px-3 md:px-6">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[36px] bg-[#A9604A] text-[#F7EDE6] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] md:rounded-[48px]">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-14 md:py-32">
        <Reveal className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-[#F5D9C9]">Events &amp; Competitions</span>
          <h2 className="mt-5 font-serif text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.15] tracking-[-0.01em]">
            Beyond The Classroom.
          </h2>
        </Reveal>

        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {EVENTS.map((event) => (
            <motion.article key={event.title} variants={staggerItem} className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow duration-500 group-hover:shadow-lift">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="px-1 pt-6">
                <h3 className="font-serif text-2xl font-normal tracking-tight">{event.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{event.subtitle}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-foreground transition-colors duration-300 group-hover:text-terracotta">
                  Learn More
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
