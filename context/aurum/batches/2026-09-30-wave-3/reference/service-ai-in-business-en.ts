import type { ServicePageProps } from '@/types/service';
import { discoveryCallBookingsHref } from '@/lib/bookings';

const bookingHref = discoveryCallBookingsHref('/contact', 'service-ai-in-business-hero');

export const aiInBusiness: ServicePageProps = {
  slug: 'ai-in-business',
  eyebrow: 'AI Workshop',
  title: 'AI in Business Workshop',
  subtitle: 'We show which AI tools earn their keep for which jobs, how to chain them into agentic workflows, and how to get results you can actually trust. Hands-on, with real examples from your industry, no demos that fall apart in daily use.',
  heroCtaPrimary: { label: 'Book a discovery call', href: bookingHref },
  audience: [
    {
      title: 'CEOs & COOs asking "so what do we actually do about AI?"',
      desc: 'You want a clear answer to a question your board has been asking for months, not another consultancy deck.',
    },
    {
      title: 'Innovation & Digitalisation leads',
      desc: 'You\'re on the hook to deliver. You need a sparring partner who can frame the market and back up your recommendations.',
    },
    {
      title: 'Cross-functional teams',
      desc: 'Ops, sales, finance, customer success: every function uses AI differently. We pull it onto one shared baseline.',
    },
  ],
  outcomes: [
    'Tool map: which AI tools actually take work off your hands in each function (sales, marketing, support, ops, finance)',
    'Agentic workflows: how to chain several tools and hand work between them, instead of running each one in isolation',
    'Prompt and context patterns that hold up at work, not just in demos',
    'Concrete use cases per function: e.g. proposals and follow-ups in sales, customer replies in support, copy and social posts in marketing, expenses and recurring reports in finance',
    'Recording, example library, and reference guide your team uses the week after the workshop',
  ],
  process: [
    {
      title: 'Pre-workshop audit',
      desc: 'One-hour prep call on your current tools, team structure, and biggest operational bottlenecks, usually scheduled the day before the workshop.',
      duration: '1 hr',
    },
    {
      title: 'Materials review & sync',
      desc: 'Final decks, numbers, or process notes from your side; we review async, then a short alignment call right before the workshop.',
      duration: '30 min',
    },
    {
      title: 'Tools, flows, and hands-on practice',
      desc: 'What AI does well and where it breaks, with the right tools per function. We build agentic workflows together on real tasks from your team.',
      duration: 'Half or full day',
    },
    {
      title: 'Wrap-up and take-aways',
      desc: 'We summarise which tools, flows, and patterns make sense for your team and agree a short plan for the first weeks after the workshop.',
      duration: '1 hr',
    },
  ],
  pricing: [
    {
      name: 'Half-day workshop',
      price: 'CHF 3\'960',
      includes: [
        'Up to 20 participants',
        'Pre-workshop audit plus materials review and a short sync before the day',
        'Half-day live block: tool map per function, agentic workflows, prompt and context patterns',
        'Example library of flows and prompts proven in the workshop',
        'Closing call and written take-aways for the first weeks',
        'Delivered in Switzerland, on-site or hybrid; travel within Switzerland included',
      ],
      ctaLabel: 'Book a discovery call',
    },
    {
      name: 'Full-day workshop',
      price: 'CHF 7\'480',
      includes: [
        'Up to 20 participants',
        'Pre-workshop audit plus materials review and a short sync before the day',
        'Full-day live block with more time to build agentic workflows on your team\'s real tasks',
        'Example library of flows and prompts proven in the workshop',
        'Closing call and written take-aways for the first weeks',
        'Delivered in Switzerland, on-site or hybrid; travel within Switzerland included',
      ],
      highlighted: true,
      ctaLabel: 'Book a discovery call',
    },
  ],
  pricingFootnote:
    'Model API usage is billed on actual consumption if your organisation does not supply its own API keys.',
  faq: [
    {
      q: 'Do participants need a technical background?',
      a: 'No. This workshop is designed for mixed audiences. We translate technical concepts into business terms throughout.',
    },
    {
      q: 'Which business functions do you cover?',
      a: 'Customer support, sales, finance, HR, operations, marketing: we cover whatever is most relevant for your team.',
    },
    {
      q: 'Which tools do you cover?',
      a: 'We walk through the tools that actually take work off people\'s hands in each function and place them next to your existing stack. Vendor-agnostic, no partnerships, no commissions.',
    },
    {
      q: 'Do participants need their own AI tool accounts?',
      a: 'Ideally your organisation supplies API keys or company accounts for the models we use. If you cannot provide keys, we arrange access; model API costs are then billed on actual consumption.',
    },
  ],
  relatedSlugs: ['agentic-coding', 'ai-implementation-consulting', 'mvp-validation'],
  seo: {
    title: 'AI in Business Workshop · Aurum Avis Labs',
    description: 'AI workshop for business teams: which tools per function actually deliver, how to build agentic flows, and how to get results you can trust. In Switzerland, on-site or hybrid.',
    keywords: 'AI business workshop Switzerland, AI tool selection, agentic workflows, AI in business',
  },
};
