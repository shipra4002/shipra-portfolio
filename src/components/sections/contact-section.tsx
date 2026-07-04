import { Reveal } from "@/components/reveal";
import { ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Email", href: "mailto:hello@shipramaurya.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Resume", href: "/resume.pdf" },
];

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-surface px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-4xl">
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
                className="group inline-flex items-center gap-1 text-lg text-foreground"
              >
                <span className="link-underline">{link.label}</span>
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
