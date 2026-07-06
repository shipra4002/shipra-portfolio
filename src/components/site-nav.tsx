import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Events & Competitions", href: "/#events" },
  { label: "Contact", href: "/#contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 md:top-5">
      <nav
        className={`flex w-full max-w-3xl items-center justify-between rounded-full border px-5 py-2.5 transition-all duration-500 md:px-6 md:py-3 ${
          scrolled
            ? "border-white/50 bg-white/70 shadow-soft backdrop-blur-md"
            : "border-white/40 bg-white/40 shadow-sm backdrop-blur-md"
        }`}
      >
        <Link
          to="/"
          className="font-serif text-lg tracking-tight text-[#2b1a08]"
          onClick={() => setOpen(false)}
        >
          Shipra Maurya
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-underline text-sm text-[#2b1a08]/80 transition-colors hover:text-[#2b1a08]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            className="rounded-full border border-[#2b1a08]/30 px-4 py-2 text-sm text-[#2b1a08] transition-all duration-300 hover:border-[#2b1a08]/60 hover:bg-white/40"
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="text-[#2b1a08] md:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-4 right-4 top-full mt-2 overflow-hidden rounded-2xl border border-border/70 bg-background/95 shadow-lift backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base text-foreground/90"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                onClick={() => setOpen(false)}
                className="mt-2 w-fit rounded-full border border-border px-4 py-2 text-sm"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
