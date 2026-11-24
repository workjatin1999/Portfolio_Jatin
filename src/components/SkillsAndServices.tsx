import {useState} from 'react';
import {
  ArrowUpRight,
  BarChart3,
  Globe,
  KeyRound,
  Layers,
  Layout,
  Lightbulb,
  Megaphone,
  Palette,
  PenTool,
  Search,
  Share2,
  SlidersHorizontal,
  Target,
} from 'lucide-react';
import {SERVICES_LIST, SKILL_CATEGORIES} from '../data/portfolioData';

function renderSkillIcon(
  iconKey: SKILL_CATEGORIES_ICON_KEY,
  className = 'h-5 w-5'
) {
  switch (iconKey) {
    case 'search':
      return <Search className={className} aria-hidden="true" />;
    case 'share':
      return <Share2 className={className} aria-hidden="true" />;
    case 'target':
      return <Target className={className} aria-hidden="true" />;
    case 'megaphone':
      return <Megaphone className={className} aria-hidden="true" />;
    case 'key':
      return <KeyRound className={className} aria-hidden="true" />;
    case 'chart':
      return <BarChart3 className={className} aria-hidden="true" />;
    case 'layers':
      return <Layers className={className} aria-hidden="true" />;
    case 'sliders':
      return <SlidersHorizontal className={className} aria-hidden="true" />;
    case 'pen':
      return <PenTool className={className} aria-hidden="true" />;
    case 'palette':
      return <Palette className={className} aria-hidden="true" />;
    case 'globe':
      return <Globe className={className} aria-hidden="true" />;
    case 'layout':
      return <Layout className={className} aria-hidden="true" />;
    case 'lightbulb':
      return <Lightbulb className={className} aria-hidden="true" />;
  }
}

type SKILL_CATEGORIES_ICON_KEY =
  (typeof SKILL_CATEGORIES)[number]['items'][number]['iconKey'];

interface SkillsAndServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export default function SkillsAndServices({
  onSelectService,
}: SkillsAndServicesProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const visibleCategories =
    activeCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === activeCategory);

  return (
    <>
      {/* Section 5: Skills & Expertise */}
      <section id="skills" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wider text-[#6C3BFF] uppercase">
                Capabilities
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#15172B] sm:text-4xl [text-wrap:balance]">
                Skills &amp; Expertise
              </h2>
              <p className="mt-3 text-base text-[#474B6B]">
                Focused hands-on competencies across organic search, paid campaigns,
                analytics, and creative web execution.
              </p>
            </div>

            {/* Interactive Category Filter Control */}
            <div
              role="tablist"
              aria-label="Filter skills by category"
              className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-[#15172B]/10 bg-[#F8F9FC] p-1"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === 'all'}
                onClick={() => setActiveCategory('all')}
                className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === 'all'
                    ? 'brand-gradient-bg text-white shadow-sm shadow-[#6C3BFF]/20'
                    : 'text-[#474B6B] hover:text-[#15172B]'
                }`}
              >
                All Categories
              </button>
              {SKILL_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                    activeCategory === category.id
                      ? 'brand-gradient-bg text-white shadow-sm shadow-[#6C3BFF]/20'
                      : 'text-[#474B6B] hover:text-[#15172B]'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 space-y-10">
            {visibleCategories.map((category) => (
              <div key={category.id}>
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-[#15172B]/10 pb-3">
                  <h3 className="font-display text-xl font-bold text-[#15172B]">
                    {category.title}
                  </h3>
                  <span className="text-xs font-medium text-[#5B6080]">
                    {category.subtitle}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.items.map((skill) => (
                    <div
                      key={skill.name}
                      className="group rounded-2xl border border-[#15172B]/10 bg-[#F8F9FC] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#6C3BFF]/45 hover:bg-white hover:shadow-md hover:shadow-[#6C3BFF]/8"
                    >
                      <div className="flex items-start gap-3.5">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#6C3BFF]/10 text-[#6C3BFF] transition-all duration-200 group-hover:scale-105 group-hover:bg-[#6C3BFF] group-hover:text-white">
                          {renderSkillIcon(skill.iconKey)}
                        </span>
                        <div>
                          <h4 className="font-display text-base font-semibold text-[#15172B]">
                            {skill.name}
                          </h4>
                          <p className="mt-1 text-sm leading-relaxed text-[#474B6B]">
                            {skill.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Services ("What I Can Do For You") */}
      <section
        id="services"
        className="border-y border-[#15172B]/10 bg-[#F8F9FC] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#2878FF] uppercase">
              Services
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#15172B] sm:text-4xl [text-wrap:balance]">
              What I Can Do For You
            </h2>
            <p className="mt-3 text-base text-[#474B6B]">
              Practical digital marketing execution designed to strengthen visibility,
              campaign relevance, and audience conversion.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_LIST.map((service) => (
              <div
                key={service.number}
                className="group flex flex-col justify-between rounded-2xl border border-[#15172B]/10 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#6C3BFF]/45 hover:shadow-lg hover:shadow-[#6C3BFF]/10"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="brand-gradient-bg flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm shadow-[#6C3BFF]/20 transition-transform duration-200 group-hover:scale-105">
                      {renderSkillIcon(service.iconKey, 'h-5 w-5')}
                    </span>
                    <span className="font-mono text-sm font-semibold tabular-nums text-[#6C3BFF]/70">
                      {service.number}
                    </span>
                  </div>

                  <p className="mt-5 text-xs font-semibold text-[#2878FF]">
                    {service.focusLabel}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold text-[#15172B]">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#474B6B]">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#15172B]/10 pt-4">
                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6C3BFF] transition-colors hover:text-[#2878FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C3BFF]"
                  >
                    <span>Discuss this service</span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
