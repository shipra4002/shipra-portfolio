export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <span className="font-serif text-base text-foreground">Shipra Maurya</span>
        <span>© {new Date().getFullYear()} — Crafted with intention.</span>
      </div>
    </footer>
  );
}
