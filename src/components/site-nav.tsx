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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/70 bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-10">
        <Link
          to="/"
          className="font-serif text-lg tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          Shipra Maurya
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-underline text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            className="rounded-full border border-border px-4 py-2 text-sm text-foreground transition-all duration-300 hover:border-sage hover:bg-surface"
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="text-foreground md:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border/70 bg-background/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
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
