import {Linkedin, Mail} from 'lucide-react';
import {PROFILE} from '../data/portfolioData';

const QUICK_LINKS = [
  {label: 'About', href: '#about'},
  {label: 'Experience', href: '#experience'},
  {label: 'Skills', href: '#skills'},
  {label: 'Services', href: '#services'},
  {label: 'Projects', href: '#projects'},
  {label: 'Contact', href: '#contact'},
];

export default function Footer() {
  return (
    <footer className="border-t border-[#15172B]/15 bg-[#15172B] text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-display text-xl font-bold tracking-tight text-white">
              {PROFILE.name}
            </p>
            <p className="mt-1 text-sm text-white/75">{PROFILE.shortTitle}</p>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap gap-x-6 gap-y-2">
            {QUICK_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-[#A78BFA]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={PROFILE.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Jatin Kumar LinkedIn profile"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white transition-colors hover:border-[#6C3BFF] hover:bg-[#6C3BFF] hover:text-white"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${PROFILE.contact.email}`}
              aria-label="Email Jatin Kumar"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white transition-colors hover:border-[#2878FF] hover:bg-[#2878FF] hover:text-white"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/65 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} Jatin Kumar. All rights reserved.</p>
          <p>Designed with passion by Jatin Kumar.</p>
        </div>
      </div>
    </footer>
  );
}
