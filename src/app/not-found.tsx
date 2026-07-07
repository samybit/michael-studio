import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | Michael Medhat Studio',
  description: 'The page you are looking for does not exist.',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="w-full h-dvh overflow-hidden bg-background text-foreground font-sans flex flex-col items-center justify-center relative px-6">

      {/* Structural grid lines — decorative */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute left-[10%] top-0 bottom-0 w-px bg-border/30" />
        <div className="absolute right-[10%] top-0 bottom-0 w-px bg-border/30" />
        <div className="absolute top-[15%] left-0 right-0 h-px bg-border/30" />
        <div className="absolute bottom-[15%] left-0 right-0 h-px bg-border/30" />
      </div>

      {/* Content block */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-lg">

        {/* Error code */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[20vw] sm:text-[160px] font-black tracking-tighter leading-none text-border select-none">
            404
          </span>
          <div className="w-full h-[3px] bg-accent" />
        </div>

        {/* Label + message */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-accent text-xs font-mono uppercase tracking-widest">
            // SPATIAL REFERENCE NOT FOUND
          </span>
          <p className="text-muted-foreground text-sm font-mono leading-relaxed max-w-sm">
            The page you requested does not exist within this architectural archive.
            It may have been relocated, decommissioned, or never constructed.
          </p>
        </div>

        {/* Action buttons */}
        <nav className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mt-2">
          <Link
            href="/"
            className="px-8 py-3 bg-foreground text-background text-xs font-mono uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-all duration-300 text-center"
          >
            ← Return to Portfolio
          </Link>
          <Link
            href="/studio"
            className="px-8 py-3 border border-foreground text-foreground text-xs font-mono uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300 text-center"
          >
            Open Studio CMS
          </Link>
        </nav>
      </div>

      {/* Bottom stamp */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <span className="text-[10px] font-mono text-muted-foreground/40 tracking-widest uppercase">
          © 2026 Michael Medhat — All Rights Reserved
        </span>
      </div>
    </main>
  );
}
