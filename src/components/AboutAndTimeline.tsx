import {Award, Briefcase, GraduationCap, Check} from 'lucide-react';
import {
  ABOUT_STRENGTHS,
  CERTIFICATIONS_LIST,
  EDUCATION_TIMELINE,
  EXPERIENCE_TIMELINE,
} from '../data/portfolioData';

export default function AboutAndTimeline() {
  return (
    <>
      {/* Section 2: About Me */}
      <section id="about" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-wider text-[#6C3BFF] uppercase">
                About Me
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#15172B] sm:text-4xl [text-wrap:balance]">
                A Little About Me
              </h2>
              <div className="mt-4 h-1 w-14 rounded-full brand-gradient-bg" />

              <div className="mt-6 space-y-4 text-base leading-relaxed text-[#474B6B]">
                <p>
                  I&apos;m a passionate{' '}
                  <span className="rounded bg-[#6C3BFF]/10 px-1.5 py-0.5 font-semibold text-[#6C3BFF]">
                    digital marketing enthusiast
                  </span>{' '}
                  with a background in{' '}
                  <span className="rounded bg-[#6C3BFF]/10 px-1.5 py-0.5 font-semibold text-[#6C3BFF]">
                    Political Science
                  </span>{' '}
                  and professional experience in{' '}
                  <span className="rounded bg-[#6C3BFF]/10 px-1.5 py-0.5 font-semibold text-[#6C3BFF]">
                    customer service
                  </span>
                  . My journey has helped me develop strong communication,
                  problem-solving, and customer relationship skills.
                </p>
                <p>
                  I&apos;m now focused on building my career in digital marketing,
                  exploring{' '}
                  <span className="rounded bg-[#2878FF]/10 px-1.5 py-0.5 font-semibold text-[#2878FF]">
                    SEO
                  </span>
                  ,{' '}
                  <span className="rounded bg-[#2878FF]/10 px-1.5 py-0.5 font-semibold text-[#2878FF]">
                    paid advertising
                  </span>
                  ,{' '}
                  <span className="rounded bg-[#2878FF]/10 px-1.5 py-0.5 font-semibold text-[#2878FF]">
                    social media management
                  </span>
                  , and{' '}
                  <span className="rounded bg-[#2878FF]/10 px-1.5 py-0.5 font-semibold text-[#2878FF]">
                    website optimization
                  </span>
                  .
                </p>
              </div>
            </div>

            {/* Highlighted Strengths Grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {ABOUT_STRENGTHS.map((strength, idx) => (
                  <div
                    key={strength.title}
                    className={`rounded-2xl border border-[#15172B]/10 bg-[#F8F9FC] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#6C3BFF]/40 hover:bg-white ${
                      idx === ABOUT_STRENGTHS.length - 1 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg brand-gradient-bg text-white">
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-base font-semibold text-[#15172B]">
                          {strength.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#474B6B]">
                          {strength.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections 3 & 4: Education, Certifications & Work Experience Timelines */}
      <section
        id="experience"
        className="border-y border-[#15172B]/10 bg-[#F8F9FC] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#6C3BFF] uppercase">
              Background &amp; Credentials
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#15172B] sm:text-4xl [text-wrap:balance]">
              Education &amp; Professional Experience
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Section 3: Education Timeline */}
            <div className="lg:col-span-5">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6C3BFF] text-white shadow-sm shadow-[#6C3BFF]/20">
                  <GraduationCap className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-bold text-[#15172B]">
                  Education
                </h3>
              </div>

              <div className="relative space-y-6 pl-6 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-[2px] before:bg-[#6C3BFF]/25">
                {EDUCATION_TIMELINE.map((edu) => (
                  <div
                    key={edu.degree}
                    className="relative rounded-2xl border border-[#15172B]/10 bg-white p-5 transition-colors hover:border-[#6C3BFF]/45"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -left-[23px] top-6 h-3 w-3 rounded-full border-2 border-white bg-[#6C3BFF] ring-4 ring-[#6C3BFF]/15"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-[#5B6080]">
                      <span>{edu.institution}</span>
                      <span className="font-mono tabular-nums text-[#6C3BFF]">
                        {edu.period}
                      </span>
                    </div>
                    <h4 className="mt-1.5 font-display text-lg font-semibold text-[#15172B]">
                      {edu.degree}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#474B6B]">
                      {edu.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Work Experience Card / Timeline */}
            <div className="lg:col-span-7">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2878FF] text-white shadow-sm shadow-[#2878FF]/20">
                  <Briefcase className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-bold text-[#15172B]">
                  Work Experience
                </h3>
              </div>

              <div className="relative space-y-6 pl-6 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-[2px] before:bg-[#2878FF]/25">
                {EXPERIENCE_TIMELINE.map((exp) => (
                  <article
                    key={exp.company}
                    className="relative rounded-2xl border border-[#15172B]/10 bg-white p-6 sm:p-7 transition-colors hover:border-[#2878FF]/45"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -left-[23px] top-7 h-3 w-3 rounded-full border-2 border-white bg-[#2878FF] ring-4 ring-[#2878FF]/15"
                    />

                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-display text-xl font-bold text-[#15172B]">
                        {exp.company}
                      </h4>
                      <span className="font-mono text-xs font-semibold tabular-nums text-[#2878FF]">
                        {exp.duration}
                      </span>
                    </div>

                    <p className="mt-1 text-base font-semibold text-[#474B6B]">
                      {exp.position}
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-[#474B6B] sm:text-base">
                      {exp.summary}
                    </p>

                    <div className="mt-6 border-t border-[#15172B]/10 pt-5">
                      <p className="text-xs font-semibold tracking-wider text-[#5B6080] uppercase">
                        Transferable Skills Applied in Marketing
                      </p>
                      <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {exp.transferableSkills.map((skill) => (
                          <li
                            key={skill}
                            className="flex items-center gap-2.5 text-sm font-medium text-[#15172B]"
                          >
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2878FF]"
                            />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Education & Certifications Highlight */}
            <div className="lg:col-span-12 border-t border-[#15172B]/10 pt-10">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl brand-gradient-bg text-white shadow-sm shadow-[#6C3BFF]/20">
                  <Award className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-bold text-[#15172B]">
                  Education &amp; Certifications
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {CERTIFICATIONS_LIST.map((cert) => (
                  <article
                    key={cert.title}
                    className="rounded-2xl border border-[#6C3BFF]/20 bg-white p-6 sm:p-8 transition-colors hover:border-[#6C3BFF]/45"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold tracking-wider text-[#6C3BFF] uppercase">
                          Professional Certification
                        </p>
                        <h4 className="mt-1 font-display text-xl font-bold text-[#15172B] sm:text-2xl">
                          {cert.title}
                        </h4>
                      </div>
                      <span className="font-mono text-xs font-semibold tabular-nums text-[#6C3BFF]">
                        {cert.year}
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 border-y border-[#15172B]/10 py-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs font-medium text-[#5B6080]">Course</p>
                        <p className="mt-1 text-sm font-semibold text-[#15172B]">
                          {cert.course}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#5B6080]">
                          Certification
                        </p>
                        <p className="mt-1 text-sm font-normal text-[#15172B]">
                          {cert.issuer.startsWith('DigiPerform') ? (
                            <>
                              <strong className="font-display text-base font-bold">
                                DigiPerform
                              </strong>
                              {cert.issuer.slice('DigiPerform'.length)}
                            </>
                          ) : (
                            cert.issuer
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#5B6080]">Year</p>
                        <p className="mt-1 font-mono text-sm font-semibold tabular-nums text-[#15172B]">
                          {cert.year}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className="text-xs font-semibold tracking-wider text-[#5B6080] uppercase">
                        Skills Covered
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2.5">
                        {cert.skillsCovered.map((skill) => (
                          <li
                            key={skill}
                            className="flex items-center gap-2 text-sm font-semibold text-[#15172B]"
                          >
                            <Check
                              className="h-4 w-4 shrink-0 text-[#6C3BFF]"
                              aria-hidden="true"
                            />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
