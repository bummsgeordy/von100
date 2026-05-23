import { Clipboard, Download, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import FormField from '../components/FormField';
import IconArray from '../components/IconArray';
import { demoScenario } from '../data/demo';
import {
  buildMarkdownExport,
  buildPlainLanguageText,
  buildTeachBackQuestion,
  calculateRiskMetrics,
  validateScenario,
} from '../lib/riskMath';
import type { RiskDenominator, RiskScenario } from '../types/risk';

export default function RiskBuilderPage() {
  const [scenario, setScenario] = useState<RiskScenario>(demoScenario);
  const validation = useMemo(() => validateScenario(scenario), [scenario]);
  const metrics = useMemo(
    () =>
      calculateRiskMetrics(
        scenario.baselineEvents,
        scenario.interventionEvents,
        scenario.denominator,
      ),
    [scenario.baselineEvents, scenario.denominator, scenario.interventionEvents],
  );
  const plainText = useMemo(() => buildPlainLanguageText(scenario), [scenario]);
  const markdown = useMemo(() => buildMarkdownExport(scenario), [scenario]);

  function update<K extends keyof RiskScenario>(key: K, value: RiskScenario[K]) {
    setScenario((current) => ({ ...current, [key]: value }));
  }

  function updateNumber(key: 'baselineEvents' | 'interventionEvents', value: string) {
    update(key, Number(value));
  }

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[420px_1fr]">
      <section className="panel panel-pad h-fit overflow-hidden">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h1 className="section-title">Risiko erklären</h1>
            <p className="mt-2 text-sm leading-6 text-muted">
              Tragen Sie absolute Ereigniszahlen ein. Relative Risiken werden nur berechnet, wenn
              die absoluten Zahlen vorhanden sind.
            </p>
          </div>
          <button className="btn-secondary px-3" type="button" onClick={() => setScenario(demoScenario)}>
            <RotateCcw size={18} aria-hidden="true" />
            <span className="sr-only">Demo zurücksetzen</span>
          </button>
        </div>

        <form className="space-y-4">
          <FormField label="Ereignis">
            <input
              className="input"
              value={scenario.event}
              onChange={(event) => update('event', event.target.value)}
            />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-3">
            <FormField label="Baseline">
              <input
                className="input"
                min={0}
                max={scenario.denominator}
                type="number"
                value={scenario.baselineEvents}
                onChange={(event) => updateNumber('baselineEvents', event.target.value)}
              />
            </FormField>
            <FormField label="Intervention">
              <input
                className="input"
                min={0}
                max={scenario.denominator}
                type="number"
                value={scenario.interventionEvents}
                onChange={(event) => updateNumber('interventionEvents', event.target.value)}
              />
            </FormField>
            <FormField label="pro">
              <select
                className="input"
                value={scenario.denominator}
                onChange={(event) => update('denominator', Number(event.target.value) as RiskDenominator)}
              >
                <option value={100}>100</option>
                <option value={1000}>1000</option>
                <option value={10000}>10000</option>
              </select>
            </FormField>
          </div>

          <FormField label="Zeitraum">
            <input
              className="input"
              value={scenario.timeframe}
              onChange={(event) => update('timeframe', event.target.value)}
              placeholder="zum Beispiel: in 5 Jahren"
            />
          </FormField>

          <FormField label="Zielgruppe">
            <input
              className="input"
              value={scenario.targetGroup}
              onChange={(event) => update('targetGroup', event.target.value)}
            />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Tonalität">
              <select
                className="input"
                value={scenario.tone}
                onChange={(event) => update('tone', event.target.value as RiskScenario['tone'])}
              >
                <option value="neutral">Neutral</option>
                <option value="beruhigend">Beruhigend</option>
                <option value="direkt">Direkt</option>
              </select>
            </FormField>
            <FormField label="Quelle">
              <input
                className="input"
                value={scenario.source.title}
                onChange={(event) =>
                  update('source', {
                    ...scenario.source,
                    title: event.target.value,
                  })
                }
              />
            </FormField>
          </div>

          <label className="flex items-start gap-3 rounded-md border border-slate-200 p-3 text-sm text-slate-700">
            <input
              className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-100"
              type="checkbox"
              checked={scenario.showRelativeRisk}
              onChange={(event) => update('showRelativeRisk', event.target.checked)}
            />
            Relative Zusatzangabe anzeigen, aber nicht als Hauptbotschaft nutzen.
          </label>
        </form>
      </section>

      <section className="min-w-0 space-y-5">
        {!validation.valid ? (
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <h2 className="font-semibold">Bitte prüfen</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {validation.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="panel panel-pad">
          <h2 className="text-xl font-semibold text-ink">Einfache Erklärung</h2>
          <p className="mt-3 text-lg leading-8 text-slate-700">{plainText}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <MetricCard label="Absolute Differenz" value={metrics.absoluteDifferenceLabel} />
            <MetricCard
              label="Relatives Risiko"
              value={
                scenario.showRelativeRisk && metrics.relativeRisk !== null
                  ? `${(metrics.relativeRisk * 100).toFixed(0)} % des Ausgangsrisikos`
                  : 'Ausgeblendet'
              }
            />
            <MetricCard label="Für Ärzt:innen" value={metrics.nntOrNnhLabel ?? 'Keine Differenz'} />
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <IconArray
            label="Baseline: ohne Maßnahme"
            events={scenario.baselineEvents}
            denominator={scenario.denominator}
          />
          <IconArray
            label="Intervention: mit Maßnahme"
            events={scenario.interventionEvents}
            denominator={scenario.denominator}
            tone={metrics.absoluteDifference > 0 ? 'harm' : 'benefit'}
          />
        </div>

        <div className="panel panel-pad">
          <h2 className="text-xl font-semibold text-ink">Teach-Back-Frage</h2>
          <p className="mt-3 rounded-lg bg-brand-50 p-4 text-lg leading-8 text-brand-700">
            {buildTeachBackQuestion(scenario)}
          </p>
        </div>

        <div className="panel panel-pad">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-ink">Markdown-Export</h2>
            <button
              className="btn-secondary"
              type="button"
              onClick={() => void navigator.clipboard?.writeText(markdown)}
            >
              <Clipboard size={18} aria-hidden="true" />
              Kopieren
            </button>
          </div>
          <textarea className="input min-h-72 font-mono text-sm" readOnly value={markdown} />
          <p className="mt-3 flex items-center gap-2 text-sm text-muted">
            <Download size={16} aria-hidden="true" />
            Der Export ist bewusst schlicht und kann in Praxisnotizen oder Patientenmaterial
            übernommen werden.
          </p>
        </div>
      </section>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-600">{label}</p>
      <p className="mt-2 text-base font-semibold leading-6 text-ink">{value}</p>
    </div>
  );
}
