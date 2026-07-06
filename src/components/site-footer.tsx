export function SiteFooter() {
  return (
    <footer className="px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 text-sm text-white/50 sm:flex-row sm:items-center">
        <span className="font-serif text-base text-white/80">Shipra Maurya</span>
        <span>© {new Date().getFullYear()} — Crafted with intention.</span>
      </div>
    </footer>
  );
}
