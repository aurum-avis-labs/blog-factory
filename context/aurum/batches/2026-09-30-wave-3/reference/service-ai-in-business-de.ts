import type { ServicePageProps } from '@/types/service';
import { discoveryCallBookingsHref } from '@/lib/bookings';

const bookingHref = discoveryCallBookingsHref('/de/contact', 'service-ai-business-hero-de');

export const aiInBusiness: ServicePageProps = {
  slug: 'ai-in-business',
  eyebrow: 'KI Workshop',
  title: 'KI im Unternehmen Workshop',
  subtitle: 'Wir zeigen, welche KI-Tools für welche Aufgaben taugen, wie Sie mehrere Tools zu Agentic Workflows verbinden und wie Sie verlässliche Ergebnisse bekommen. Praxisnah, mit echten Beispielen aus Ihrer Branche, ohne Demos, die im Alltag auseinanderfallen.',
  heroCtaPrimary: { label: 'Discovery-Call vereinbaren', href: bookingHref },
  audience: [
    {
      title: 'CEOs und COOs, die fragen: „Was machen wir eigentlich mit KI?“',
      desc: 'Sie wollen eine klare Antwort auf eine Frage, die der Verwaltungsrat seit Monaten stellt. Nicht noch eine weitere Berater-Präsentation.',
    },
    {
      title: 'Verantwortliche für Innovation und Digitalisierung',
      desc: 'Sie sollen liefern und brauchen ein erfahrenes Gegenüber, das den Markt einordnet und Ihre Empfehlungen mitträgt.',
    },
    {
      title: 'Funktionsübergreifende Teams',
      desc: 'Betrieb, Vertrieb, Finanzen, Kundenservice: Jeder Bereich nutzt KI anders. Wir bringen alle auf einen gemeinsamen Stand.',
    },
  ],
  outcomes: [
    'Tool-Landkarte: welche KI-Tools in welcher Funktion (Vertrieb, Marketing, Support, Operations, Finanzen) tatsächlich Arbeit abnehmen',
    'Agentic Workflows: wie Sie mehrere Tools verketten und Aufgaben zwischen ihnen übergeben, statt jedes Tool für sich zu bedienen',
    'Prompt- und Kontextmuster, die im Arbeitsalltag standhalten und nicht nur in der Demo gut aussehen',
    'Konkrete Anwendungsfälle pro Funktion: z. B. Angebote und Follow-ups im Vertrieb, Kundenanfragen im Support, Texte und Social-Posts im Marketing, Spesen und wiederkehrende Reports in Finanzen',
    'Aufzeichnung, Beispielbibliothek und Referenzleitfaden, mit denen Ihr Team direkt nach dem Workshop weiterarbeitet',
  ],
  process: [
    {
      title: 'Vorbereitungsgespräch',
      desc: 'Einstündiges Gespräch: Überblick über Ihre aktuellen Tools, die Teamstruktur und die grössten operativen Engpässe, üblicherweise am Vortag des Workshops.',
      duration: '1 Std.',
    },
    {
      title: 'Unterlagen-Review und Abgleich',
      desc: 'Letzte Unterlagen und Zahlen von Ihrer Seite; wir prüfen Decks oder Prozessbeschreibungen asynchron und halten einen kurzen Abstimmungs-Call direkt vor dem Workshop.',
      duration: '30 Min.',
    },
    {
      title: 'Tool-Landschaft, Flows und Praxis',
      desc: 'Was KI heute zuverlässig kann und was nicht, mit den passenden Tools pro Funktion. Wir bauen gemeinsam Agentic Workflows an echten Aufgaben aus Ihrem Alltag.',
      duration: '½ oder 1 ganzer Tag',
    },
    {
      title: 'Abschluss und Take-aways',
      desc: 'Wir fassen zusammen, welche Tools, Flows und Muster für Ihr Team Sinn machen, und legen einen kurzen Plan für die ersten Wochen nach dem Workshop fest.',
      duration: '1 Std.',
    },
  ],
  pricing: [
    {
      name: 'Halbtags-Workshop',
      price: 'CHF 3\'960',
      includes: [
        'Bis zu 20 Teilnehmende',
        'Vorbereitungsgespräch und Unterlagen-Review inkl. kurzem Abgleich vor dem Workshop',
        'Halbtags Live-Teil: Tool-Landkarte pro Funktion, Agentic Workflows, Prompt- und Kontextmuster',
        'Beispielbibliothek mit Flows und Prompts, die sich am Workshop bewährt haben',
        'Abschlussgespräch und schriftliche Take-aways für die ersten Wochen',
        'Durchführung in der Schweiz, vor Ort oder hybrid; Reisekosten in der Schweiz inklusive',
      ],
      ctaLabel: 'Discovery-Call vereinbaren',
    },
    {
      name: 'Ganztags-Workshop',
      price: 'CHF 7\'480',
      includes: [
        'Bis zu 20 Teilnehmende',
        'Vorbereitungsgespräch und Unterlagen-Review inkl. kurzem Abgleich vor dem Workshop',
        'Ganztags Live-Teil mit mehr Zeit zum Bauen von Agentic Workflows an echten Aufgaben Ihres Teams',
        'Beispielbibliothek mit Flows und Prompts, die sich am Workshop bewährt haben',
        'Abschlussgespräch und schriftliche Take-aways für die ersten Wochen',
        'Durchführung in der Schweiz, vor Ort oder hybrid; Reisekosten in der Schweiz inklusive',
      ],
      highlighted: true,
      ctaLabel: 'Discovery-Call vereinbaren',
    },
  ],
  pricingFootnote:
    'API-Kosten für Modellnutzung nach tatsächlichem Verbrauch, falls Ihre Organisation keine eigenen API-Keys bereitstellt.',
  faq: [
    {
      q: 'Brauchen die Teilnehmenden technisches Vorwissen?',
      a: 'Nein. Der Workshop ist für gemischte Zielgruppen konzipiert. Technische Konzepte übersetzen wir durchgängig in die Sprache Ihres Geschäfts.',
    },
    {
      q: 'Welche Unternehmensbereiche werden abgedeckt?',
      a: 'Kundenservice, Vertrieb, Finanzen, HR, Betrieb, Marketing. Wir setzen den Fokus dort, wo es für Ihr Team am meisten bringt.',
    },
    {
      q: 'Welche Tools werden behandelt?',
      a: 'Wir gehen die Tools durch, die in den jeweiligen Funktionen aktuell wirklich Arbeit abnehmen, und ordnen sie zu Ihrem bestehenden Stack ein. Anbieterunabhängig, ohne Partnerschaften, ohne Provisionsmodell.',
    },
    {
      q: 'Brauchen die Teilnehmenden eigene KI-Tool-Accounts?',
      a: 'Idealerweise bringt Ihre Organisation eigene API-Keys oder Firmenkonten für die genutzten Modelle mit. Stellen Sie keine Keys bereit, organisieren wir den Zugang; die entstehenden Modell-API-Kosten werden nach tatsächlichem Verbrauch weiterverrechnet.',
    },
  ],
  relatedSlugs: ['agentic-coding', 'ai-implementation-consulting', 'mvp-validation'],
  seo: {
    title: 'KI im Unternehmen Workshop · Aurum Avis Labs',
    description: 'KI-Workshop für Unternehmen: welche Tools pro Funktion taugen, wie Sie Agentic Workflows bauen und verlässliche Ergebnisse bekommen. In der Schweiz vor Ort oder hybrid.',
    keywords: 'KI Business Workshop Schweiz, KI Tools Auswahl, Agentic Workflows, KI im Unternehmen',
  },
};
