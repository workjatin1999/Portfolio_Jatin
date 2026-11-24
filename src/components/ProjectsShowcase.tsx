import {useEffect, useState} from 'react';
import {CheckCircle2, Monitor} from 'lucide-react';
import {PROJECTS_LIST} from '../data/portfolioData';

export default function ProjectsShowcase() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const onChange = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isHovered || isFocused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROJECTS_LIST.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, isHovered, isFocused]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="projects" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-[#6C3BFF] uppercase">
            Portfolio
          </p>
          <h2 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-[#15172B] sm:text-4xl [text-wrap:balance]">
            My Creative Work
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#474B6B]">
            Structured campaign planning, responsive landing page layouts, and
            WordPress website management. Live client metrics and project URLs are
            added only as verified deliverables are published.
          </p>
        </div>

        {/* 3 Vertical Rectangle Project Cards Fitting in 1 Page with 3s Slide Spotlight */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Projects showcase"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setIsFocused(true)}
          onBlurCapture={() => setIsFocused(false)}
          className="mt-7"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {PROJECTS_LIST.map((project, index) => {
              const isFailed = failedImages[project.id];
              const isActive = activeIndex === index;

              return (
                <article
                  key={project.id}
                  onClick={() => handleDotClick(index)}
                  className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                    isActive
                      ? '-translate-y-1.5 border-[#6C3BFF] shadow-lg shadow-[#6C3BFF]/15'
                      : 'border-[#15172B]/12 opacity-90 hover:-translate-y-0.5 hover:border-[#2878FF]/55 hover:opacity-100'
                  }`}
                >
                  {/* Animated Top Slide Accent Bar */}
                  <div
                    aria-hidden="true"
                    className={`brand-gradient-bg h-1 w-full origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />

                  {/* Compact Visual Preview Area */}
                  <div className="relative flex h-36 w-full items-center justify-center overflow-hidden border-b border-[#15172B]/10 bg-[#F8F9FC] p-3">
                    {!isFailed ? (
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({
                            ...prev,
                            [project.id]: true,
                          }))
                        }
                        className={`h-28 w-full max-w-[210px] rounded-xl border border-[#15172B]/10 object-cover shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                          isActive ? 'scale-[1.04]' : 'group-hover:scale-[1.03]'
                        }`}
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-[#F8F9FC] p-3 text-center">
                        <Monitor
                          className="h-6 w-6 text-[#6C3BFF]"
                          aria-hidden="true"
                        />
                        <p className="mt-1.5 font-display text-xs font-semibold text-[#15172B]">
                          {project.title}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Vertical Card Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[11px] font-semibold text-[#2878FF]">
                      {project.categoryLabel}
                    </p>

                    <h3 className="mt-1.5 font-display text-lg font-bold text-[#15172B]">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#474B6B]">
                      {project.description}
                    </p>

                    <ul className="mt-3.5 space-y-1.5 border-t border-[#15172B]/10 pt-3">
                      {project.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-[11.5px] font-medium text-[#15172B]/85"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#6C3BFF]"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
