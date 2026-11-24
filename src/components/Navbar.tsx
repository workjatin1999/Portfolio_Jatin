import {useState} from 'react';
import {FileText, Menu, X} from 'lucide-react';

const NAV_LINKS = [
  {label: 'About', href: '#about'},
  {label: 'Experience', href: '#experience'},
  {label: 'Skills', href: '#skills'},
  {label: 'Services', href: '#services'},
  {label: 'Projects', href: '#projects'},
];

interface NavbarProps {
  onOpenResume: () => void;
}

export default function Navbar({onOpenResume}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#15172B]/10 glass-surface">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 sm:gap-8 px-5 sm:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-[#15172B] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6C3BFF]"
        >
          JATIN
        </a>

        {/* Zone 2: 5 concise single-line text nav links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#474B6B]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#6C3BFF] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#6C3BFF] after:to-[#2878FF] after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6C3BFF]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Compact Resume Action + Primary CTA + Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenResume}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#15172B]/15 bg-white px-3 py-2 text-xs sm:text-sm font-semibold text-[#15172B] transition-colors duration-150 hover:border-[#6C3BFF] hover:text-[#6C3BFF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C3BFF]"
          >
            <FileText className="h-3.5 w-3.5 text-[#6C3BFF]" aria-hidden="true" />
            <span>Resume</span>
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center rounded-lg brand-gradient-bg px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-[#6C3BFF]/20 transition-all duration-150 hover:-translate-y-0.5 hover:opacity-95 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C3BFF]"
          >
            Let&apos;s Connect
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#15172B]/15 bg-white text-[#15172B] md:hidden focus-visible:outline-2 focus-visible:outline-[#6C3BFF]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#15172B]/10 bg-[#F8F9FC] px-5 py-4 md:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-[#15172B] transition-colors hover:bg-white hover:text-[#6C3BFF]"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenResume();
              }}
              className="mt-1 flex min-h-[44px] items-center gap-2 rounded-lg border border-[#15172B]/15 bg-white px-3 text-base font-medium text-[#15172B] transition-colors hover:border-[#6C3BFF] hover:text-[#6C3BFF]"
            >
              <FileText className="h-4 w-4 text-[#6C3BFF]" aria-hidden="true" />
              <span>View Resume</span>
            </button>
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-lg brand-gradient-bg px-4 py-2.5 text-sm font-semibold text-white"
            >
              Let&apos;s Connect
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
