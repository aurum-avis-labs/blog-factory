import type { ServicePageProps } from '@/types/service';
import { discoveryCallBookingsHref } from '@/lib/bookings';

const bookingHref = discoveryCallBookingsHref('/de/contact', 'service-ai-consulting-hero-de');

export const aiImplementationConsulting: ServicePageProps = {
  slug: 'ai-implementation-consulting',
  eyebrow: 'Beratung & Umsetzung',
  title: 'KI-Integration',
  subtitle:
    'Manche Teams wollen KI in ihr Produkt einbauen. Andere wollen interne Abläufe automatisieren. Wir machen beides: von der ersten Strategieentscheidung bis zum System, das bei Ihnen produktiv läuft. Anbieterunabhängig. Datenschutz und Wartbarkeit denken wir mit, nicht hinterher.',
  heroCtaPrimary: { label: 'Discovery-Call vereinbaren', href: bookingHref },
  audience: [
    {
      title: 'KMU mit manuellen Abläufen',
      desc: 'Unternehmen mit 10 bis 500 Mitarbeitenden, die wissen, dass KI in Vertrieb, Support oder Finanzen viel Tipparbeit ersparen würde. Was fehlt, ist nicht das Interesse. Es fehlt jemand, der sagt, womit man anfängt und welchen Anbietern man trauen kann.',
    },
    {
      title: 'Produkt- und Engineering-Teams',
      desc: 'CTOs, Product Owner und Engineering Leads, die KI-Features in ihr Produkt einbauen wollen und für Architektur, Anbieterwahl oder das Eval-Setup ein erfahrenes Gegenüber suchen.',
    },
    {
      title: 'Innovationsteams',
      desc: 'Innovationsabteilungen in grösseren Organisationen, die einen Prototyp schnell sehen wollen und eine Aussensicht brauchen, die einen Use Case auch absagen darf.',
    },
  ],
  tracks: [
    {
      eyebrow: 'Track 1 · Produkt',
      title: 'KI in Ihr Produkt',
      bestFor:
        'Für SaaS- oder B2B-Teams, die KI ins eigene Produkt einbauen.',
      description:
        'Wir bauen KI-Features direkt in Ihre Anwendung. Vom ersten Spike bis zu einer Version, die mit echten Nutzern hält. Mit Evaluationen, die Risse zeigen, bevor Nutzer es tun, und mit Token- und Latenzkosten, die Sie nicht überraschen.',
      examples: [
        'RAG-basierte Suche und Q&A auf Ihren Daten',
        'Voice- oder Chat-Agenten mit Tool- und API-Zugriff',
        'Dokumentverarbeitung: Klassifizierung, Extraktion, Redaction',
        'Onboarding-Flows, die sich an den Nutzer anpassen',
        'Eval-Pipelines, Cost- und Latency-Monitoring',
      ],
    },
    {
      eyebrow: 'Track 2 · Workflow',
      title: 'KI in Ihre Abläufe',
      bestFor:
        'Für KMU und Operations-Teams, die KI nicht verkaufen, sondern damit ihre eigene Arbeit erledigen wollen.',
      description:
        'Wir bringen KI in Vertrieb, Support oder Finanzen. Als Mitarbeiter-Copiloten, automatisierte Workflows oder interne Tools, sauber angebunden an Ihre Datenquellen.',
      examples: [
        'Mitarbeiter-Copiloten auf Ihren Daten (Confluence, SharePoint, CRM, Wiki)',
        'Ticket-Triagierung im Support, mit Antwortvorschlag',
        'Angebots- und Vertragsentwürfe im Vertrieb',
        'Reporting und Spesenerfassung, ohne dass jemand jeden Monat dasselbe tippt',
        'Wissenssuche und Onboarding-Assistenten für neue Mitarbeitende',
      ],
    },
  ],
  outcomes: [
    'Eine Empfehlung: was sich bei Ihnen lohnt und was nicht.',
    'Eine Lösungsarchitektur, die zu Ihrem Stack passt. Keine von der Stange.',
    'Eine Modell- und Anbieterauswahl. Ohne dass wir an Ihrer Wahl mitverdienen.',
    'Einen Proof of Concept in Ihrem Stack, mit Ihren Daten.',
    'Die Implementierung, mit Ihrem Team oder mit Übergabe am Ende. Inklusive Roadmap und Eval-Setup.',
  ],
  process: [
    {
      title: 'Discovery',
      desc: 'Wir hören uns Ihre Use Cases an, schauen kurz auf die Datenlage und klären, wer im Haus mitreden muss. Danach wissen wir beide, ob ein nächster Schritt sinnvoll ist.',
      duration: '1 Std.',
    },
    {
      title: 'Assessment & Optionen',
      desc: 'Wir vergleichen Architekturen und Anbieter, gehen die Datenflüsse durch und prüfen, was unter DSGVO und Schweizer DSG funktioniert. Am Ende liegen 2 bis 3 Optionen auf dem Tisch, mit Trade-offs, Aufwand und realistischen Folgekosten.',
      duration: '1–2 Wochen',
    },
    {
      title: 'Proof-of-Concept',
      desc: 'Wir bauen einen Prototyp in Ihrem Stack, mit Ihren Daten, und stellen ein Eval-Setup dazu. So sehen Sie vor dem Ausrollen, ob die Lösung bei Ihnen tatsächlich funktioniert.',
      duration: '3–6 Wochen',
    },
    {
      title: 'Umsetzung oder Übergabe',
      desc: 'Wir bleiben für die Skalierung dabei, übergeben sauber an Ihr Team oder begleiten den Rollout im Hintergrund. Was davon für Sie passt, entscheiden Sie.',
      duration: 'Nach Bedarf',
    },
  ],
  faq: [
    {
      q: 'Setzen Sie auch um, oder beraten Sie nur?',
      a: 'Beides. Manche Mandate sind reine Beratung mit einem Bericht am Ende. Andere haben uns Wochen oder Monate eingebettet im Team. Was passt, hängt davon ab, wie viel Senior-Kapazität bei Ihnen selbst da ist.',
    },
    {
      q: 'Was kostet das?',
      a: 'Wir scopen jedes Mandat einzeln. Nach dem Discovery-Gespräch wissen wir genug, um Ihnen ein konkretes Angebot zu schicken: Tageshonorar, Sprintdauer und eine ehrliche Schätzung der laufenden API-Kosten. Reisekosten innerhalb der Schweiz sind drin.',
    },
    {
      q: 'Was ist der Unterschied zum „KI im Unternehmen"-Workshop?',
      a: 'Der Workshop ist ein Tag Wissensvermittlung: welche Tools wofür taugen, wie Ihr Team sie selbst nutzt. Diese Beratung läuft über Wochen und endet damit, dass ein konkreter Use Case bei Ihnen tatsächlich produktiv ist, mit der Datenanbindung und Compliance-Arbeit, die dazugehört.',
    },
    {
      q: 'Sind Sie anbieterunabhängig?',
      a: 'Ja. Keine Partnerschaften, keine Provisionen. Wenn das richtige Modell für Sie ein günstigeres oder ein selbst gehostetes ist, sagen wir das, auch wenn die Marketing-Folien des grossen Anbieters schöner aussehen.',
    },
    {
      q: 'Wie gehen Sie mit Datenschutz und DSGVO um?',
      a: 'Datenschutz wird mitgedacht, nicht hinten drangeklebt. Für jede Empfehlung gehen wir DSGVO, EU AI Act und das revidierte Schweizer DSG durch. Sollen Daten die Schweiz oder die EU nicht verlassen, prüfen wir Self-Hosting-Optionen mit Ihnen.',
    },
    {
      q: 'Wir haben noch keine konkrete Use-Case-Idee. Sind wir trotzdem richtig?',
      a: 'Ja, dann besonders. Wir gehen im Discovery-Gespräch mit Ihnen durch den Alltag und sortieren, wo KI heute schon einen Unterschied macht und wo es ehrlicherweise noch nicht so weit ist.',
    },
  ],
  relatedSlugs: ['agentic-coding', 'ai-in-business', 'mvp-validation'],
  seo: {
    title: 'KI-Integration · Aurum Avis Labs',
    description:
      'KI in Ihr Produkt oder in Ihre internen Abläufe einbauen. Strategie, Architektur und Umsetzung aus einem Schweizer Studio in Zug. Anbieterunabhängig und DSGVO-konform.',
    keywords:
      'KI Integration Schweiz, KI Beratung Schweiz, AI Implementierung DACH, KI Strategie Beratung, KI Berater Zug, KI in Geschäftsprozesse, KI Workflow Automation',
  },
};
