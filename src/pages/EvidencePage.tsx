import { ExternalLink } from 'lucide-react';

const rules = [
  {
    title: 'Absolute Risiken zuerst',
    body: 'Beschreiben Sie die Ausgangszahl und die Zahl mit Intervention. Relative Angaben koennen ergaenzen, sollen aber nicht allein stehen.',
  },
  {
    title: 'Natuerliche Haeufigkeiten',
    body: 'Formate wie "3 von 100" sind im Gespraech leichter anschlussfaehig als Prozentwerte oder wechselnde Nenner.',
  },
  {
    title: 'Icon-Arrays nutzen',
    body: 'Piktogramme machen sichtbar, wie viele Personen betroffen sind und wie viele nicht betroffen sind.',
  },
  {
    title: 'Zeit und Zielgruppe nennen',
    body: 'Ein Risiko braucht einen Zeitraum und eine passende Population, sonst ist die Zahl kaum interpretierbar.',
  },
  {
    title: 'Baseline und Intervention trennen',
    body: 'Erst das Ausgangsrisiko zeigen, dann die Veraenderung durch die Massnahme. So bleibt die absolute Differenz erkennbar.',
  },
  {
    title: 'Kurz und plain language',
    body: 'Wenige Endpunkte, kurze Saetze, konkrete Woerter. Fachbegriffe wie ARR, RRR, NNT oder NNH nur fuer Fachansichten.',
  },
];

const sources = [
  {
    label: 'NICE NG197: Shared decision making, Empfehlungen 1.4.5 bis 1.4.11',
    href: 'https://www.nice.org.uk/guidance/ng197/chapter/Recommendations',
    note: 'Absolute Risiken, natuerliche Haeufigkeiten, gleiche Nenner, definierte Zeitraeume, positive und negative Rahmung.',
  },
  {
    label: 'NCBI Bookshelf: NICE Evidence review D, risk communication',
    href: 'https://www.ncbi.nlm.nih.gov/books/NBK572436/',
    note: 'Evidenzuebersicht zu Formaten fuer Risiko- und Nutzenkommunikation.',
  },
  {
    label: 'AAFP/FPM: Five Ways to Communicate Risks So That Patients Understand',
    href: 'https://www.aafp.org/fpm/2018/1100/p28.html',
    note: 'Primaeraerztliche Strategien: absolute Risiken, passende Zahlenformate, visuelle Hilfen, plain language.',
  },
  {
    label: 'AAFP/FPM: Understanding the Risks of Medical Interventions',
    href: 'https://www.aafp.org/fpm/2000/0500/p59',
    note: 'Klinische Einordnung von absolutem Risiko, relativer Risikoreduktion und NNT.',
  },
  {
    label: 'AHRQ: Principles for Comparing Medical Interventions',
    href: 'https://effectivehealthcare.ahrq.gov/products/methods-guidance-principles/methods',
    note: 'Comparative Effectiveness Reviews sollen Nutzen, Schaden und Trade-offs konsistent darstellen; absolute Angaben helfen Entscheidungen.',
  },
  {
    label: 'AHRQ: Assessing Harms when Comparing Medical Interventions',
    href: 'https://effectivehealthcare.ahrq.gov/products/methods-guidance-harms/methods',
    note: 'Schadensendpunkte sollen aktiv identifiziert, priorisiert und klar berichtet werden.',
  },
  {
    label: 'BJGP Open / PMC: Cardiovascular disease risk communication in NHS Health Checks',
    href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8596312/',
    note: 'Studie zur praktischen Schwierigkeit von CVD-Risikokommunikation in primaeraerztlichen Health Checks.',
  },
  {
    label: 'NCBI Bookshelf: RICO study scientific summary',
    href: 'https://www.ncbi.nlm.nih.gov/books/NBK573191/',
    note: 'Visualisierung und interaktive Risikodarstellung koennen die Verstaendlichkeit von CVD-Risiko unterstuetzen.',
  },
];

const guidelineLinks = [
  ['AWMF Leitlinienregister', 'https://register.awmf.org/de/leitlinien'],
  ['AWMF Patienteninformationen', 'https://register.awmf.org/de/patienteninformationen'],
  ['NICE Guidance', 'https://www.nice.org.uk/guidance'],
  ['KDIGO Guidelines', 'https://kdigo.org/guidelines/'],
  ['ESC Guidelines', 'https://www.escardio.org/guidelines'],
  ['DDG Leitlinien und Praxisempfehlungen', 'https://www.ddg.info/behandlung-leitlinien/leitlinien-praxisempfehlungen'],
];

export default function EvidencePage() {
  return (
    <div className="space-y-6">
      <section className="max-w-4xl">
        <h1 className="section-title">Evidenz und Regeln</h1>
        <p className="mt-3 text-lg leading-8 text-slate-600">
          von100 uebersetzt keine Leitlinieninhalte. Die App nutzt bekannte Prinzipien der
          Risikokommunikation, damit vorhandene Studiendaten und Leitlinienzahlen verstaendlicher
          besprochen werden koennen.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rules.map((rule) => (
          <article key={rule.title} className="panel panel-pad">
            <h2 className="text-lg font-semibold text-ink">{rule.title}</h2>
            <p className="mt-2 leading-7 text-slate-600">{rule.body}</p>
          </article>
        ))}
      </section>

      <section className="panel panel-pad">
        <h2 className="text-xl font-semibold text-ink">Genutzte frei zugaengliche Quellen</h2>
        <div className="mt-4 grid gap-3">
          {sources.map((source) => (
            <a
              key={source.href}
              className="block rounded-lg border border-slate-200 p-4 transition hover:border-brand-600 hover:bg-brand-50"
              href={source.href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="flex items-start justify-between gap-3 font-semibold text-brand-700">
                {source.label}
                <ExternalLink className="mt-0.5 shrink-0" size={17} aria-hidden="true" />
              </span>
              <span className="mt-2 block text-sm leading-6 text-slate-600">{source.note}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="panel panel-pad">
        <h2 className="text-xl font-semibold text-ink">Leitlinienportale fuer Inhalte</h2>
        <p className="mt-2 leading-7 text-slate-600">
          Fuer echte Szenarien sollten absolute Zahlen aus aktuellen Leitlinien, Evidenzberichten
          oder Primaerstudien uebernommen und mit Quelle, Population und Zeitraum dokumentiert
          werden.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {guidelineLinks.map(([label, href]) => (
            <a key={href} className="btn-secondary" href={href} target="_blank" rel="noreferrer">
              {label}
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
