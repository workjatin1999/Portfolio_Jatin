import {useEffect} from 'react';
import {
  Download,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Printer,
  X,
} from 'lucide-react';
import {
  ABOUT_STRENGTHS,
  CERTIFICATIONS_LIST,
  EDUCATION_TIMELINE,
  EXPERIENCE_TIMELINE,
  PROFILE,
  SERVICES_LIST,
  SKILL_CATEGORIES,
} from '../data/portfolioData';
import {downloadStandaloneResume} from '../utils/resumeDownload';

interface ResumeModalProps {
  open: boolean;
  autoPrint?: boolean;
  onAutoPrintHandled?: () => void;
  onClose: () => void;
}

export default function ResumeModal({
  open,
  autoPrint = false,
  onAutoPrintHandled,
  onClose,
}: ResumeModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !autoPrint) return;
    const timer = window.setTimeout(() => {
      window.print();
      onAutoPrintHandled?.();
    }, 150);
    return () => window.clearTimeout(timer);
  }, [open, autoPrint, onAutoPrintHandled]);

  if (!open) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    downloadStandaloneResume();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="resume-modal-backdrop fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#15172B]/70 p-3 sm:p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="resume-modal-container relative my-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Toolbar (hidden when printing) */}
        <div className="print:hidden flex flex-wrap items-center justify-between gap-3 border-b border-[#15172B]/10 bg-[#F8F9FC] px-5 py-3.5 sm:px-7">
          <div>
            <h2
              id="resume-modal-title"
              className="font-display text-base font-bold text-[#15172B]"
            >
              Resume — {PROFILE.name}
            </h2>
            <p className="text-xs text-[#5B6080]">
              Structured CV built from portfolio profile details
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-[#15172B]/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#15172B] transition-colors hover:border-[#6C3BFF] hover:text-[#6C3BFF] whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5 text-[#6C3BFF]" aria-hidden="true" />
              <span>Download</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="brand-gradient-bg inline-flex min-h-[38px] items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm shadow-[#6C3BFF]/20 hover:opacity-95 whitespace-nowrap shrink-0"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume preview"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#15172B]/15 bg-white text-[#15172B] hover:border-[#6C3BFF] hover:text-[#6C3BFF]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <article
          id="printable-resume"
          className="bg-white p-6 text-[#15172B] sm:p-10"
        >
          {/* Resume Header */}
          <header className="border-b-2 border-[#6C3BFF] pb-5">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h1 className="font-display text-3xl font-bold tracking-tight text-[#15172B]">
                  {PROFILE.name}
                </h1>
                <p className="mt-1 text-sm font-semibold text-[#474B6B]">
                  {PROFILE.roles.join(' | ')}
                </p>
              </div>
              <p className="text-xs font-semibold tracking-wide text-[#6C3BFF]">
                {PROFILE.availabilityText}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#474B6B]">
              <a
                href={`mailto:${PROFILE.contact.email}`}
                className="inline-flex items-center gap-1.5 hover:text-[#6C3BFF]"
              >
                <Mail className="h-3.5 w-3.5 text-[#6C3BFF]" aria-hidden="true" />
                <span>{PROFILE.contact.email}</span>
              </a>
              <a
                href={PROFILE.contact.phoneHref}
                className="inline-flex items-center gap-1.5 font-mono tabular-nums hover:text-[#2878FF]"
              >
                <Phone className="h-3.5 w-3.5 text-[#2878FF]" aria-hidden="true" />
                <span>{PROFILE.contact.phone}</span>
              </a>
              <a
                href={PROFILE.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#6C3BFF]"
              >
                <Linkedin className="h-3.5 w-3.5 text-[#6C3BFF]" aria-hidden="true" />
                <span>linkedin.com/in/jatinkumar1999</span>
              </a>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#2878FF]" aria-hidden="true" />
                <span>{PROFILE.contact.location}</span>
              </span>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="mt-6">
            <h3 className="border-b border-[#15172B]/15 pb-1.5 font-display text-xs font-bold tracking-wider text-[#6C3BFF] uppercase">
              Professional Summary
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[#474B6B]">
              {PROFILE.bio}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#474B6B]">
              With a background in Political Science and hands-on customer service
              experience, I bring strong communication, problem-solving, and customer
              relationship skills while building my career across SEO, paid advertising,
              social media management, and website optimization.
            </p>
          </section>

          {/* Work Experience */}
          <section className="mt-6">
            <h3 className="border-b border-[#15172B]/15 pb-1.5 font-display text-xs font-bold tracking-wider text-[#6C3BFF] uppercase">
              Work Experience
            </h3>
            {EXPERIENCE_TIMELINE.map((exp) => (
              <div key={exp.company} className="mt-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-base font-bold text-[#15172B]">
                    {exp.position} <span className="font-medium text-[#474B6B]">— {exp.company}</span>
                  </p>
                  <span className="font-mono text-xs font-medium tabular-nums text-[#2878FF]">
                    {exp.duration}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-[#474B6B]">
                  {exp.summary}
                </p>
                <p className="mt-2 text-xs text-[#474B6B]">
                  <strong className="text-[#15172B]">Transferable Skills:</strong>{' '}
                  {exp.transferableSkills.join(' · ')}
                </p>
              </div>
            ))}
          </section>

          {/* Education */}
          <section className="mt-6">
            <h3 className="border-b border-[#15172B]/15 pb-1.5 font-display text-xs font-bold tracking-wider text-[#6C3BFF] uppercase">
              Education
            </h3>
            <div className="mt-3 space-y-2.5">
              {EDUCATION_TIMELINE.map((edu) => (
                <div
                  key={edu.degree}
                  className="flex flex-wrap items-baseline justify-between gap-2"
                >
                  <div>
                    <p className="text-sm font-bold text-[#15172B]">{edu.degree}</p>
                    <p className="text-xs text-[#474B6B]">{edu.institution}</p>
                  </div>
                  <span className="font-mono text-xs font-medium tabular-nums text-[#5B6080]">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="mt-6">
            <h3 className="border-b border-[#15172B]/15 pb-1.5 font-display text-xs font-bold tracking-wider text-[#6C3BFF] uppercase">
              Certifications
            </h3>
            <div className="mt-3 space-y-2.5">
              {CERTIFICATIONS_LIST.map((cert) => (
                <div key={cert.title}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-[#15172B]">{cert.title}</p>
                      <p className="text-xs text-[#474B6B]">
                        {cert.issuer} · Course: {cert.course}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-medium tabular-nums text-[#2878FF]">
                      {cert.year}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#474B6B]">
                    <strong className="text-[#15172B]">Skills Covered:</strong>{' '}
                    {cert.skillsCovered.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills & Core Strengths */}
          <section className="mt-6">
            <h3 className="border-b border-[#15172B]/15 pb-1.5 font-display text-xs font-bold tracking-wider text-[#6C3BFF] uppercase">
              Skills &amp; Expertise
            </h3>
            <div className="mt-3 space-y-2 text-sm text-[#474B6B]">
              {SKILL_CATEGORIES.map((category) => (
                <p key={category.id}>
                  <strong className="text-[#15172B]">{category.title}:</strong>{' '}
                  {category.items.map((item) => item.name).join(' · ')}
                </p>
              ))}
              <p>
                <strong className="text-[#15172B]">Core Strengths:</strong>{' '}
                {ABOUT_STRENGTHS.map((s) => s.title).join(' · ')}
              </p>
            </div>
          </section>

          {/* Focus Areas / Services */}
          <section className="mt-6">
            <h3 className="border-b border-[#15172B]/15 pb-1.5 font-display text-xs font-bold tracking-wider text-[#6C3BFF] uppercase">
              Digital Marketing Services &amp; Capabilities
            </h3>
            <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-sm text-[#474B6B] sm:grid-cols-2">
              {SERVICES_LIST.map((service) => (
                <li key={service.number} className="leading-snug">
                  <strong className="text-[#15172B]">{service.title}:</strong>{' '}
                  {service.description}
                </li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}
