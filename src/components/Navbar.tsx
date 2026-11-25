import {useEffect, useState} from 'react';
import {ArrowUpRight, FileText, Menu, X} from 'lucide-react';

const NAV_LINKS = [
  {label: 'About', href: '#about'},
  {label: 'Experience', href: '#experience'},
  {label: 'Skills', href: '#skills'},
  {label: 'Services', href: '#services'},
  {label: 'Projects', href: '#projects'},
  {label: 'Contact', href: '#contact'},
];

interface NavbarProps {
  onOpenResume: () => void;
}

export default function Navbar({onOpenResume}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const scrollToSection = (href: string) => {
    setMenuOpen(false);
    const id = href.replace(/^#/, '');
    const target = document.getElementById(id);
    if (target) {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#15172B]/10 glass-surface">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 sm:gap-8 px-5 sm:px-8">
          {/* Zone 1: Top-left Hamburger Menu Trigger + Single-line Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="slide-navigation-panel"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#15172B]/15 bg-white text-[#15172B] transition-colors duration-150 hover:border-[#6C3BFF] hover:text-[#6C3BFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C3BFF]"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>

            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#top');
              }}
              className="font-display text-lg font-bold tracking-tight text-[#15172B] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6C3BFF]"
            >
              JATIN
            </a>
          </div>

          {/* Zone 2: Top-right Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onOpenResume}
              className="hidden sm:inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#15172B]/15 bg-white px-3 py-2 text-xs sm:text-sm font-semibold text-[#15172B] transition-colors duration-150 hover:border-[#6C3BFF] hover:text-[#6C3BFF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C3BFF]"
            >
              <FileText className="h-3.5 w-3.5 text-[#6C3BFF]" aria-hidden="true" />
              <span>Resume</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="hidden sm:inline-flex items-center justify-center rounded-lg brand-gradient-bg px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-[#6C3BFF]/20 transition-all duration-150 hover:-translate-y-0.5 hover:opacity-95 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C3BFF]"
            >
              Let&apos;s Connect
            </a>
          </div>
        </div>
      </header>

      {/* Right-Side Slide-Over Navigation Panel (outside <header> so fixed positioning covers full viewport) */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-50 transition-[visibility] duration-300 ${
          menuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
      >
        {/* Backdrop Overlay (click outside to close) */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`fixed inset-0 bg-[#15172B]/45 backdrop-blur-[2px] transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Slide-Out Drawer Panel */}
        <aside
          id="slide-navigation-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className={`fixed top-0 right-0 flex h-full w-full max-w-[320px] sm:max-w-[360px] flex-col justify-between border-l border-[#15172B]/10 bg-[#F8F9FC] p-6 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            {/* Panel Header with Brand & Close (✕) Button */}
            <div className="flex items-center justify-between border-b border-[#15172B]/10 pb-4">
              <div>
                <p className="font-display text-lg font-bold tracking-tight text-[#15172B]">
                  JATIN
                </p>
                <p className="text-xs font-medium text-[#5B6080]">Navigation</p>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#15172B]/15 bg-white text-[#15172B] transition-colors duration-150 hover:border-[#6C3BFF] hover:text-[#6C3BFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C3BFF]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Vertical Navigation Links */}
            <nav
              aria-label="Primary Navigation"
              className="mt-6 flex flex-col gap-1.5"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="group flex min-h-[46px] items-center justify-between rounded-xl px-4 py-2.5 font-display text-base font-semibold text-[#15172B] transition-all duration-150 hover:bg-white hover:text-[#6C3BFF] hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C3BFF]"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight
                    className="h-4 w-4 text-[#5B6080] opacity-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#6C3BFF] group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </nav>
          </div>

          {/* Drawer Footer Actions */}
          <div className="space-y-2.5 border-t border-[#15172B]/10 pt-5">
            <button
              type="button"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => {
                setMenuOpen(false);
                onOpenResume();
              }}
              className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-[#15172B]/15 bg-white px-4 py-2.5 text-sm font-semibold text-[#15172B] transition-colors hover:border-[#6C3BFF] hover:text-[#6C3BFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C3BFF]"
            >
              <FileText className="h-4 w-4 text-[#6C3BFF]" aria-hidden="true" />
              <span>View Resume</span>
            </button>

            <a
              href="#contact"
              tabIndex={menuOpen ? 0 : -1}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="flex min-h-[44px] w-full items-center justify-center rounded-xl brand-gradient-bg px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#6C3BFF]/20 transition-opacity hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C3BFF]"
            >
              Let&apos;s Connect
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
