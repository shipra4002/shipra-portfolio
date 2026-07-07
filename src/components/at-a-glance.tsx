import { useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ListChecks, X } from "lucide-react";

export type GlanceRow = { k: string; v: string };

export type GlancePalette = {
  /** Card background (supports gradients / glass). */
  cardBg: string;
  /** Card border color. */
  border: string;
  /** "At a Glance" title color (accent). */
  title: string;
  /** Row label color. */
  label: string;
  /** Row value color. */
  value: string;
  /** Chip background + text (project name badge). */
  chipBg: string;
  chipFg: string;
  /** Trigger button background + text. */
  btnBg: string;
  btnFg: string;
  /** Card box-shadow. */
  shadow: string;
};

/**
 * Portfolio-wide floating "At a Glance" summary card.
 * Desktop: floating card bottom-right. Mobile: collapsed chip that expands on tap.
 * Adapts to each page's palette while keeping one visual language.
 */
export function AtAGlance({
  project,
  rows,
  palette,
}: {
  project: string;
  rows: GlanceRow[];
  palette: GlancePalette;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-4 z-40 md:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 w-[min(22rem,calc(100vw-2rem))] rounded-3xl border p-6 backdrop-blur-xl"
            style={
              {
                borderColor: palette.border,
                background: palette.cardBg,
                boxShadow: palette.shadow,
              } as CSSProperties
            }
          >
            <div className="flex items-center justify-between">
              <span
                className="text-[0.68rem] font-semibold uppercase tracking-[0.24em]"
                style={{ color: palette.title }}
              >
                At a Glance
              </span>
              <span
                className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                style={{ background: palette.chipBg, color: palette.chipFg }}
              >
                {project}
              </span>
            </div>
            <dl className="mt-4 space-y-3">
              {rows.map((r) => (
                <div key={r.k}>
                  <dt
                    className="text-[0.65rem] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: palette.label }}
                  >
                    {r.k}
                  </dt>
                  <dd className="mt-0.5 text-sm leading-snug" style={{ color: palette.value }}>
                    {r.v}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close At a Glance summary" : "Open At a Glance summary"}
        className="ml-auto flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
        style={{ background: palette.btnBg, color: palette.btnFg }}
      >
        {open ? <X className="size-4" /> : <ListChecks className="size-4" />}
        {open ? "Close" : "At a Glance"}
      </button>
    </div>
  );
}
