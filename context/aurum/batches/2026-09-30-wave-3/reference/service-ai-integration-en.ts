import type { ServicePageProps } from '@/types/service';
import { discoveryCallBookingsHref } from '@/lib/bookings';

const bookingHref = discoveryCallBookingsHref('/contact', 'service-ai-consulting-hero');

export const aiImplementationConsulting: ServicePageProps = {
  slug: 'ai-implementation-consulting',
  eyebrow: 'Consulting & Build',
  title: 'AI Integration',
  subtitle:
    'Some teams want AI inside their product. Others want to automate their internal workflows. We do both: from the first strategy decision to a system actually running in your business. Vendor-agnostic. We design for privacy and maintainability up front, not after launch.',
  heroCtaPrimary: { label: 'Book a discovery call', href: bookingHref },
  audience: [
    {
      title: 'SMEs with manual workflows',
      desc: 'Companies of 10 to 500 people who can already see where AI would save their team typing in sales, support or finance. What\'s missing isn\'t the interest. It\'s someone who can tell them where to start and which vendors to trust.',
    },
    {
      title: 'Product & engineering teams',
      desc: 'CTOs, product owners and engineering leads who want to ship AI features in their product and need an experienced sounding board on architecture, vendor choice or eval setup.',
    },
    {
      title: 'Innovation teams',
      desc: 'Innovation labs in larger organisations that want to see a prototype quickly and need an outside view that\'s allowed to say no to a use case.',
    },
  ],
  tracks: [
    {
      eyebrow: 'Track 1 · Product',
      title: 'AI inside your product',
      bestFor:
        'For SaaS or B2B teams shipping AI features inside their own product.',
      description:
        'We build AI features directly into your application. From a first spike to a version that holds up with real users. With evals that surface cracks before users do, and with token and latency costs that don\'t surprise you.',
      examples: [
        'RAG-based search and Q&A on your data',
        'Voice or chat agents with tool and API access',
        'Document processing: classification, extraction, redaction',
        'Onboarding flows that adapt to the user',
        'Eval pipelines, cost and latency monitoring',
      ],
    },
    {
      eyebrow: 'Track 2 · Workflow',
      title: 'AI inside your workflows',
      bestFor:
        'For SMEs and operations teams who don\'t sell AI but want to use it to get their own work done.',
      description:
        'We bring AI into sales, support or finance. As employee copilots, automated workflows or internal tools, properly connected to your existing data.',
      examples: [
        'Employee copilots on your data (Confluence, SharePoint, CRM, wiki)',
        'Ticket triage in support, with reply drafts',
        'Quote and contract drafts in sales',
        'Reporting and expense work, so nobody types the same thing every month',
        'Knowledge search and onboarding assistants for new hires',
      ],
    },
  ],
  outcomes: [
    'A recommendation: which use cases pay off for you and which don\'t.',
    'A solution architecture that fits your stack. Not a template.',
    'A model and vendor shortlist. We don\'t earn anything on what you pick.',
    'A proof of concept in your stack, with your data.',
    'The implementation, with your team or with a clean hand-off. Including roadmap and eval setup.',
  ],
  process: [
    {
      title: 'Discovery',
      desc: 'We listen to your use cases, take a quick look at the data situation and find out who else needs to be in the room. After that we both know whether a next step makes sense.',
      duration: '1 hr',
    },
    {
      title: 'Assessment & options',
      desc: 'We compare architectures and vendors, walk through the data flows, and check what holds up under GDPR and Swiss DSG. By the end you have 2 to 3 options on the table, with trade-offs, effort and realistic ongoing cost.',
      duration: '1–2 weeks',
    },
    {
      title: 'Proof-of-Concept',
      desc: 'We build a prototype in your stack, with your data, and put an eval setup around it. So before you roll out, you can see whether the solution actually works for you.',
      duration: '3–6 weeks',
    },
    {
      title: 'Implementation or hand-off',
      desc: 'We stay on for the scale-up, hand off cleanly to your team, or run the rollout in the background. You decide which of those fits.',
      duration: 'As needed',
    },
  ],
  faq: [
    {
      q: 'Do you implement, or only advise?',
      a: 'Both. Some engagements are pure advisory with a written report at the end. Others have us embedded in a team for weeks or months. What fits depends on how much senior capacity you already have in-house.',
    },
    {
      q: 'What does this cost?',
      a: 'We scope every engagement individually. After the discovery conversation we know enough to send you a concrete proposal: day rate, sprint length, and an honest estimate of the ongoing API costs that come with it. Travel inside Switzerland is included.',
    },
    {
      q: 'How is this different from the "AI in Business" workshop?',
      a: 'The workshop is one day of knowledge transfer: which tools fit which job, how your team uses them themselves. This consulting work runs over weeks and ends with one concrete use case actually running in your business, with the data integration and compliance work that goes with it.',
    },
    {
      q: 'Are you vendor-agnostic?',
      a: 'Yes. No partnerships, no commissions. If the right model for you is a cheaper one or a self-hosted one, we\'ll say so, even when the bigger vendor\'s marketing slides look prettier.',
    },
    {
      q: 'How do you handle data privacy and GDPR?',
      a: 'Privacy gets thought through, not bolted on at the end. For every recommendation we work through GDPR, the EU AI Act and Switzerland\'s revised DSG. If your data shouldn\'t leave Switzerland or the EU, we look at self-hosting options with you.',
    },
    {
      q: 'We don\'t have a clear use case yet. Is this still for us?',
      a: 'Yes, especially then. In the discovery conversation we walk through your day-to-day and sort out where AI already makes a difference and where it honestly doesn\'t.',
    },
  ],
  relatedSlugs: ['agentic-coding', 'ai-in-business', 'mvp-validation'],
  seo: {
    title: 'AI Integration · Aurum Avis Labs',
    description:
      'Bring AI into your product or your internal workflows. Strategy, architecture and implementation from a Swiss studio in Zug. Vendor-agnostic and GDPR-aware.',
    keywords:
      'AI integration Switzerland, AI consulting Switzerland, AI implementation DACH, AI strategy consulting, AI consultant Zug, AI in business processes, AI workflow automation',
  },
};
