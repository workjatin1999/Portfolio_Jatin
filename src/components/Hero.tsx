import {useState} from 'react';
import {ArrowRight} from 'lucide-react';
import {PROFILE} from '../data/portfolioData';

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[#15172B]/10 bg-[#F8F9FC] pt-8 pb-12 sm:pt-12 sm:pb-16 lg:min-h-[calc(100vh-4rem)] lg:flex lg:items-center"
    >
      {/* Subtle purple-blue ambient depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-0 h-[420px] w-[420px] rounded-full bg-[#6C3BFF]/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 -left-24 h-[360px] w-[360px] rounded-full bg-[#2878FF]/[0.06] blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-8 lg:gap-10">
          {/* Left Column: Introduction & CTAs */}
          <div className="md:col-span-7">
            {/* Prominent Internship Availability Callout */}
            <p className="mb-4 text-xs font-semibold tracking-wider text-[#6C3BFF]">
              {PROFILE.availabilityText}
            </p>

            <p className="font-display text-lg font-semibold text-[#474B6B] sm:text-xl">
              {PROFILE.greeting}
            </p>

            <h1 className="mt-2.5 max-w-2xl font-display text-[clamp(2.1rem,4.2vw,3.65rem)] font-bold leading-[1.08] tracking-tight text-[#15172B] [text-wrap:balance]">
              Turning Digital Strategies Into{' '}
              <span className="brand-gradient-text">Real Growth.</span>
            </h1>

            {/* Role Line: clean unboxed typographic metadata */}
            <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm font-medium text-[#474B6B]">
              <span>Digital Marketing Enthusiast</span>
              <span aria-hidden="true" className="text-[#6C3BFF]">·</span>
              <span>SEO Specialist</span>
              <span aria-hidden="true" className="text-[#2878FF]">·</span>
              <span>Social Media Marketer</span>
            </div>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#474B6B] sm:text-[17px]">
              {PROFILE.bio}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl brand-gradient-bg px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#6C3BFF]/20 transition-all duration-150 hover:-translate-y-0.5 hover:opacity-95 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C3BFF]"
              >
                <span>Explore My Work</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-[#15172B]/15 bg-white px-6 py-3 text-sm font-semibold text-[#15172B] transition-colors duration-150 hover:border-[#6C3BFF] hover:text-[#6C3BFF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C3BFF]"
              >
                Let&apos;s Connect
              </a>
            </div>
          </div>

          {/* Right Column: Portrait with Purple-to-Blue Gradient Ring */}
          <div className="md:col-span-5">
            <div className="relative mx-auto md:ml-auto md:mr-0 flex w-full max-w-[400px] lg:max-w-[440px] flex-col items-center justify-center py-4 sm:py-6">
              <div className="relative flex items-center justify-center p-4">
                {/* Outer Decorative Ring */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-dashed border-[#6C3BFF]/30"
                />

                {/* Portrait Container with Gradient Border */}
                <div className="relative z-10 h-68 w-68 sm:h-76 sm:w-76 md:h-72 md:w-72 lg:h-[360px] lg:w-[360px] rounded-full p-1.5 brand-gradient-bg shadow-xl shadow-[#6C3BFF]/20">
                  <div className="h-full w-full overflow-hidden rounded-full bg-white p-1">
                    {!imgError ? (
                      <img
                        src={PROFILE.portraitUrl}
                        alt="Portrait of Jatin Kumar, Digital Marketing Enthusiast"
                        referrerPolicy="no-referrer"
                        onError={() => setImgError(true)}
                        className="h-full w-full rounded-full object-cover object-[50%_20%]"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#F8F9FC] text-[#15172B]">
                        <span className="font-display text-4xl font-bold brand-gradient-text">
                          JK
                        </span>
                        <span className="mt-1 text-xs font-medium text-[#5B6080]">
                          Jatin Kumar
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Owner Name Caption */}
              <div className="mt-4 rounded-xl border border-[#15172B]/10 bg-white px-6 py-2.5 text-center shadow-sm">
                <p className="text-center font-display text-base font-bold tracking-wide text-[#15172B]">
                  <span className="block">JATIN</span>
                  <span className="mt-0.5 block text-sm font-semibold text-[#6C3BFF]">
                    [Social Media Marketer]
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Core Pillars Strip Below Hero Split */}
        <div className="mt-10 grid grid-cols-1 gap-4 border-t border-[#15172B]/10 pt-7 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[#15172B]/10 bg-white p-4 transition-colors hover:border-[#6C3BFF]/45">
            <p className="text-xs font-medium text-[#5B6080]">Organic Visibility</p>
            <p className="mt-1 font-display text-base font-semibold text-[#15172B]">
              SEO &amp; Keyword Strategy
            </p>
          </div>
          <div className="rounded-xl border border-[#15172B]/10 bg-white p-4 transition-colors hover:border-[#2878FF]/45">
            <p className="text-xs font-medium text-[#5B6080]">Performance Channels</p>
            <p className="mt-1 font-display text-base font-semibold text-[#15172B]">
              Google &amp; Meta Ads
            </p>
          </div>
          <div className="rounded-xl border border-[#15172B]/10 bg-white p-4 transition-colors hover:border-[#6C3BFF]/45">
            <p className="text-xs font-medium text-[#5B6080]">Web &amp; Conversion</p>
            <p className="mt-1 font-display text-base font-semibold text-[#15172B]">
              WordPress &amp; Landing Pages
            </p>
          </div>
          <div className="rounded-xl border border-[#15172B]/10 bg-white p-4 transition-colors hover:border-[#2878FF]/45">
            <p className="text-xs font-medium text-[#5B6080]">Client Background</p>
            <p className="mt-1 font-display text-base font-semibold text-[#15172B] tabular-nums">
              Customer Service Since 2018
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
