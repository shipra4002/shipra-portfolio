import { Reveal } from "@/components/reveal";
import { Mail, Linkedin, Github, Phone } from "lucide-react";

const LINKS = [
  { label: "Email", href: "mailto:shipra.maurya@alumni.ipl.university", icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shipra-maurya11", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/shipra4002", icon: Github },
  { label: "Phone", href: "tel:9867086507", icon: Phone },
];

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 px-3 md:px-6">
      <div
        className="mx-auto max-w-[1400px] overflow-hidden rounded-[36px] text-[#F3F0E8] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] md:rounded-[48px]"
        style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #241d16 60%, #2c2118 100%)" }}
      >
        <div className="mx-auto max-w-4xl px-6 py-24 text-center md:px-14 md:py-36">
          <Reveal>
            <h2 className="mx-auto font-serif text-[clamp(1.6rem,3.6vw,2.75rem)] font-light leading-[1.1] tracking-[-0.015em] whitespace-nowrap">
              Let's build products people remember.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={link.label}
                  className="group flex size-12 items-center justify-center rounded-full border border-white/15 text-[#F3F0E8] transition-all duration-300 hover:border-white/40 hover:bg-white/5"
                >
                  <link.icon className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
