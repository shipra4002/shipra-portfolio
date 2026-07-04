import { Reveal } from "@/components/reveal";

const EDUCATION = [
  {
    degree: "Technology MBA",
    institution: "Institute of Product Leadership × CMR University",
  },
  {
    degree: "Bachelor of Science in Information Technology",
    institution: "",
  },
];

export function EducationSection() {
  return (
    <section id="education" className="scroll-mt-24 px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-sage">Education</span>
          <h2 className="mt-5 font-serif text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.15] tracking-[-0.01em]">
            Where it began.
          </h2>
        </Reveal>

        <div className="mt-16">
          <ol className="relative border-l border-border">
            {EDUCATION.map((item, i) => (
              <Reveal as="li" key={item.degree} delay={i * 0.08} className="relative pb-12 pl-8 last:pb-0">
                <span className="absolute -left-[5px] top-2 size-[9px] rounded-full bg-sage" />
                <h3 className="font-serif text-xl font-normal tracking-tight md:text-2xl">
                  {item.degree}
                </h3>
                {item.institution && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.institution}
                  </p>
                )}
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
