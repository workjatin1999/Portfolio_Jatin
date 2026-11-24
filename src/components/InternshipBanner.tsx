import {ArrowRight, Briefcase} from 'lucide-react';

interface InternshipBannerProps {
  onHireClick: () => void;
}

export default function InternshipBanner({onHireClick}: InternshipBannerProps) {
  return (
    <section aria-labelledby="internship-heading" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="brand-gradient-bg relative overflow-hidden rounded-3xl px-6 py-12 text-white shadow-xl shadow-[#6C3BFF]/20 sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/15 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#15172B]/20 blur-2xl"
          />

          <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
                <Briefcase className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                <span>AVAILABLE FOR DIGITAL MARKETING INTERNSHIP</span>
              </div>

              <h2
                id="internship-heading"
                className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]"
              >
                Looking for a Digital Marketing Internship!
              </h2>

              <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">
                I&apos;m actively looking for an opportunity to learn, contribute, and
                grow in the digital marketing industry. I&apos;m eager to work with a
                dynamic team, gain practical experience, and apply my skills to
                real-world marketing campaigns.
              </p>
            </div>

            <div className="shrink-0">
              <button
                type="button"
                onClick={onHireClick}
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#15172B] shadow-md transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#F8F9FC] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Hire Me / Let&apos;s Work Together</span>
                <ArrowRight className="h-4 w-4 text-[#6C3BFF]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
