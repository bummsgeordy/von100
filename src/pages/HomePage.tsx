import { ArrowRight, GitCompareArrows, HeartPulse, Library } from 'lucide-react';
import { Link } from 'react-router-dom';
import IconArray from '../components/IconArray';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">
              Let&apos;s talk about risk
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-ink md:text-5xl">
              Risiken so erklären, dass sie im Sprechzimmer nutzbar werden.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              von100 hilft Praxisteams, Nutzen und Nebenwirkungen mit absoluten Zahlen,
              natürlichen Häufigkeiten und klaren Zeiträumen zu besprechen. Baseline und
              Intervention bleiben getrennt, relative Angaben sind nur Zusatzinformation.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link className="btn-primary" to="/risk-builder">
              <HeartPulse size={18} aria-hidden="true" />
              Risiko erklären
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="btn-secondary" to="/compare">
              <GitCompareArrows size={18} aria-hidden="true" />
              Optionen vergleichen
            </Link>
          </div>
        </div>

        <div className="panel panel-pad space-y-4">
          <div className="flex items-start gap-3">
            <span className="rounded-md bg-brand-50 p-2 text-brand-700">
              <Library size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-ink">Demo: absolute Darstellung</h2>
              <p className="text-sm leading-6 text-muted">
                Gleicher Nenner, gleicher Zeitraum, sichtbar getrennte Vergleichsgruppen.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <IconArray label="Ohne Maßnahme" events={12} denominator={100} tone="neutral" />
            <IconArray label="Mit Maßnahme" events={8} denominator={100} tone="benefit" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ['Absolute Zahlen zuerst', 'Zeigt x von y Personen statt isolierter Prozentwerte.'],
          ['Zeit immer nennen', 'Macht klar, ob ein Risiko in Monaten, Jahren oder lebenslang gilt.'],
          ['Weniger Informationslast', 'Fokussiert auf das, was für die Entscheidung wesentlich ist.'],
        ].map(([title, body]) => (
          <article key={title} className="panel panel-pad">
            <h2 className="text-lg font-semibold text-ink">{title}</h2>
            <p className="mt-2 leading-7 text-slate-600">{body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
