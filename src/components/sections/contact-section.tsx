import { Reveal } from "@/components/reveal";
import { ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Email", href: "mailto:hello@shipramaurya.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Resume", href: "/resume.pdf" },
];

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 px-3 md:px-6">
      <div
        className="mx-auto max-w-[1400px] overflow-hidden rounded-[36px] text-[#F3F0E8] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] md:rounded-[48px]"
        style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #241d16 60%, #2c2118 100%)" }}
      >
      <div className="mx-auto max-w-4xl px-6 py-24 md:px-14 md:py-36">
        <Reveal>
          <h2 className="max-w-3xl font-serif text-[clamp(2.2rem,6vw,4.5rem)] font-light leading-[1.1] tracking-[-0.015em]">
            Let's build products people remember.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="group inline-flex items-center gap-1 text-lg text-[#F3F0E8]"
              >
                <span className="link-underline">{link.label}</span>
                <ArrowUpRight className="size-4 text-white/50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
      </div>
    </section>
  );
}
