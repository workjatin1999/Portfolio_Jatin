import projectAdsImg from '../assets/images/project_ads_campaign_1795287375566.jpg';
import projectLandingImg from '../assets/images/project_landing_desktop_1795287375700.jpg';
import projectWordpressImg from '../assets/images/project_wordpress_cms_1795287376404.jpg';

export interface SkillCategory {
  id: 'digital-marketing' | 'analytics-strategy' | 'creative-technical';
  title: string;
  subtitle: string;
  items: {
    name: string;
    detail: string;
    iconKey:
      | 'search'
      | 'share'
      | 'target'
      | 'megaphone'
      | 'key'
      | 'chart'
      | 'layers'
      | 'sliders'
      | 'pen'
      | 'palette'
      | 'globe'
      | 'layout'
      | 'lightbulb';
  }[];
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  focusLabel: string;
  iconKey: 'share' | 'target' | 'search' | 'layout' | 'globe' | 'pen';
}

export interface ProjectItem {
  id: string;
  category: 'paid-ads' | 'landing-pages' | 'wordpress';
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  placeholderNotice: string;
  deliverables: string[];
  hasDevicePreview?: boolean;
}

export const PROFILE = {
  name: 'Jatin Kumar',
  shortTitle: 'Digital Marketing Enthusiast',
  roles: ['Digital Marketing Enthusiast', 'SEO Specialist', 'Social Media Marketer'],
  availabilityText: 'AVAILABLE FOR DIGITAL MARKETING INTERNSHIP',
  greeting: "Hello, I'm JATIN.",
  heroHeading: 'Turning Digital Strategies Into Real Growth.',
  bio: 'Enthusiastic Digital Marketing professional skilled in SEO, social media management, and content creation. Passionate about optimizing online campaigns and leveraging data to drive results. Eager to contribute to a dynamic team and grow professionally in the digital marketing industry.',
  portraitUrl:
    'https://i.postimg.cc/GtPk3V1t/Whats-App-Image-2026-11-22-at-00-31-53-(1).jpg',
  contact: {
    email: 'jatinkumarkoli0@gmail.com',
    phone: '+91 8130013626',
    phoneHref: 'tel:+918130013626',
    linkedin: 'https://www.linkedin.com/in/jatinkumar1999/',
    github: 'https://github.com/workjatin1999',
    location: 'Mangolpuri, Delhi – 110083, India',
  },
};

export const ABOUT_STRENGTHS = [
  {
    title: 'Creative Thinking',
    description: 'Developing engaging campaign angles, hooks, and content formats tailored to audience intent.',
  },
  {
    title: 'Communication Skills',
    description: 'Translating customer questions and brand positioning into clear, persuasive messaging.',
  },
  {
    title: 'Problem Solving',
    description: 'Identifying friction points in customer journeys and refining touchpoints systematically.',
  },
  {
    title: 'Customer Relationship Management',
    description: 'Building trust, active listening, and consistent service delivery gained through years on the front line.',
  },
  {
    title: 'Analytical Mindset',
    description: 'Using structured search, engagement, and funnel observations to guide campaign refinements.',
  },
];

export const EDUCATION_TIMELINE = [
  {
    degree: 'Bachelor of Arts (Honours) – Political Science',
    institution: 'University of Delhi',
    period: 'Undergraduate Degree',
    detail: 'Built strong foundations in research, structured argumentation, policy analysis, and clear written communication.',
  },
  {
    degree: '12th Standard',
    institution: 'CBSE Board',
    period: '2017',
    detail: 'Completed senior secondary education under the Central Board of Secondary Education.',
  },
];

export const CERTIFICATIONS_LIST = [
  {
    title: 'Digital Marketing Certification',
    course: 'Digital Marketing',
    issuer: 'DigiPerform Digital Career Academy',
    year: 'Nov 2026',
    skillsCovered: [
      'SEO',
      'Social Media Marketing',
      'Google Ads',
      'Meta Ads',
      'Content Marketing',
    ],
  },
];

export const EXPERIENCE_TIMELINE = [
  {
    company: 'Lifestyle International Pvt. Ltd.',
    position: 'Senior Assistant – Customer Service Representative',
    duration: '2018 – Present',
    summary:
      'Managing end-to-end customer interactions, resolving escalated inquiries with empathy, coordinating across store and support teams, and maintaining high service quality benchmarks.',
    transferableSkills: [
      'Customer Relationship Management',
      'Communication',
      'Problem Solving',
      'Team Collaboration',
      'Customer Experience Management',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    subtitle: 'Organic search visibility, social growth & paid acquisition fundamentals',
    items: [
      {
        name: 'Search Engine Optimization (SEO)',
        detail: 'On-page structure, metadata hierarchy, internal linking, and search intent alignment.',
        iconKey: 'search',
      },
      {
        name: 'Social Media Marketing',
        detail: 'Content planning, audience engagement workflows, and platform-native formats.',
        iconKey: 'share',
      },
      {
        name: 'Google Ads',
        detail: 'Search campaign structure, ad group segmentation, and responsive search copy.',
        iconKey: 'target',
      },
      {
        name: 'Meta Ads',
        detail: 'Campaign objectives, audience interest layering, and creative testing setups.',
        iconKey: 'megaphone',
      },
      {
        name: 'Keyword Research',
        detail: 'Discovering high-intent long-tail queries and mapping keywords to landing pages.',
        iconKey: 'key',
      },
    ],
  },
  {
    id: 'analytics-strategy',
    title: 'Analytics & Strategy',
    subtitle: 'Measuring traffic behavior and refining campaign direction',
    items: [
      {
        name: 'Google Analytics',
        detail: 'Tracking acquisition channels, user engagement paths, and conversion events.',
        iconKey: 'chart',
      },
      {
        name: 'Content Strategy',
        detail: 'Structuring editorial calendars aligned with awareness and consideration stages.',
        iconKey: 'layers',
      },
      {
        name: 'Campaign Optimization',
        detail: 'Iterating ad copy, landing page clarity, and audience targeting using performance signals.',
        iconKey: 'sliders',
      },
    ],
  },
  {
    id: 'creative-technical',
    title: 'Creative & Technical',
    subtitle: 'Hands-on web execution, visual assets & conversion design',
    items: [
      {
        name: 'Content Creation',
        detail: 'Writing clear social captions, ad variations, and structured web copy.',
        iconKey: 'pen',
      },
      {
        name: 'Canva / Graphic Design',
        detail: 'Designing clean social carousels, ad creatives, and branded promotional visuals.',
        iconKey: 'palette',
      },
      {
        name: 'WordPress Management',
        detail: 'Publishing pages, managing plugins, updating layouts, and maintaining site hygiene.',
        iconKey: 'globe',
      },
      {
        name: 'Landing Page Design',
        detail: 'Crafting responsive, distraction-free layouts built around clear calls to action.',
        iconKey: 'layout',
      },
      {
        name: 'Creative Thinking',
        detail: 'Connecting customer pain points to fresh campaign ideas and clear visual storytelling.',
        iconKey: 'lightbulb',
      },
    ],
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    number: '01',
    title: 'Social Media Management',
    description: 'Managing social media accounts, engagement, and content calendars.',
    focusLabel: 'Content Calendars & Community',
    iconKey: 'share',
  },
  {
    number: '02',
    title: 'Paid Advertising Campaigns',
    description: 'Google Ads and Meta Ads campaign setup and optimization.',
    focusLabel: 'Google & Meta Campaign Setup',
    iconKey: 'target',
  },
  {
    number: '03',
    title: 'SEO Optimization',
    description: 'Keyword research, on-page SEO, and website optimization.',
    focusLabel: 'Search Intent & On-Page Audits',
    iconKey: 'search',
  },
  {
    number: '04',
    title: 'Landing Page Creation',
    description: 'Designing attractive and conversion-focused landing pages.',
    focusLabel: 'Responsive Conversion Layouts',
    iconKey: 'layout',
  },
  {
    number: '05',
    title: 'Website Management',
    description: 'WordPress website management and updates.',
    focusLabel: 'WordPress Updates & Hygiene',
    iconKey: 'globe',
  },
  {
    number: '06',
    title: 'Content Strategy & Creation',
    description: 'Planning and creating engaging digital content.',
    focusLabel: 'Editorial & Visual Storytelling',
    iconKey: 'pen',
  },
];

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: 'paid-campaigns',
    category: 'paid-ads',
    categoryLabel: 'Paid Advertising · Campaign Planning',
    title: 'Google Ads & Meta Ads Campaigns',
    subtitle: 'Structured campaign architecture, audience funnels & creative planning',
    description:
      'Comprehensive campaign setup blueprints covering search keyword grouping, Meta ad funnel stages (awareness to conversion), ad copy variations, and tracking alignment.',
    image: projectAdsImg,
    imageAlt: 'Paid advertising campaign planner and audience funnel workspace',
    placeholderNotice:
      'Portfolio Slot · Live campaign screenshots and verified performance metrics will be added here as client engagements are documented.',
    deliverables: [
      'Campaign objective & funnel stage mapping',
      'Keyword match-type & negative keyword structure',
      'Ad copy variants & Canva visual creative briefs',
      'Conversion event & UTM parameter tracking plan',
    ],
  },
  {
    id: 'landing-page-design',
    category: 'landing-pages',
    categoryLabel: 'Conversion Design · Responsive Layouts',
    title: 'Landing Page Design',
    subtitle: 'Desktop & mobile conversion-focused wireframe and UI architecture',
    description:
      'Clean, structured landing page layouts focused on immediate value clarity, readable typographic hierarchy, trust alignment, and friction-free lead capture across desktop and mobile viewports.',
    image: projectLandingImg,
    imageAlt: 'Desktop and mobile responsive landing page layout showcase',
    placeholderNotice:
      'Concept Showcase · Real project URLs and live deployment screenshots are reserved for upcoming client and internship deliverables.',
    deliverables: [
      'Above-the-fold headline & primary CTA hierarchy',
      'Responsive desktop & mobile viewport adaptation',
      'Lead capture form flow with clear validation',
      'Page speed & visual scannability optimization',
    ],
    hasDevicePreview: true,
  },
  {
    id: 'wordpress-management',
    category: 'wordpress',
    categoryLabel: 'CMS & SEO · Website Optimization',
    title: 'WordPress Website Management',
    subtitle: 'Structured site updates, content publishing & on-page SEO readiness',
    description:
      'End-to-end WordPress administration encompassing modular page structuring, heading & meta tag optimization, media compression, and consistent content publishing workflows.',
    image: projectWordpressImg,
    imageAlt: 'WordPress content management interface and website layout on studio display',
    placeholderNotice:
      'CMS Showcase Slot · Live website screenshots, URLs, and before/after audit notes will be populated once published.',
    deliverables: [
      'Page layout updates & responsive block formatting',
      'On-page SEO titles, meta descriptions & H1–H3 structure',
      'Image optimization & clean navigation hygiene',
      'Regular content updates & plugin maintenance',
    ],
  },
];
