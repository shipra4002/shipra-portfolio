import { ArrowLeft } from "lucide-react";

/**
 * Consistent "Back to Projects" navigation link used across every case study
 * page (Projects, Strategy Breakdown, Investigation). Always returns to the
 * Projects section on the homepage. On hover the arrow slides slightly left.
 */
export function BackToProjects({ className = "" }: { className?: string }) {
  return (
    <a
      href="/#work"
      className={`group inline-flex items-center gap-2 text-sm font-medium tracking-tight text-current/70 transition-colors hover:text-current ${className}`}
    >
      <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
      <span>Back to Projects</span>
    </a>
  );
}
