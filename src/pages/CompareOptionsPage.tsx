import { Plus, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import IconArray from '../components/IconArray';
import { comparisonOptions } from '../data/demo';
import { calculateRiskMetrics } from '../lib/riskMath';
import type { RiskComparisonOption, RiskOutcome } from '../types/risk';

export default function CompareOptionsPage() {
  const [options, setOptions] = useState<RiskComparisonOption[]>(comparisonOptions);
  const flattened = useMemo(
    () =>
      options.flatMap((option) =>
        option.outcomes.map((outcome) => ({
          option,
          outcome,
          metrics: calculateRiskMetrics(
            outcome.baselineEvents,
            outcome.interventionEvents,
            outcome.denominator,
            outcome.kind,
          ),
        })),
      ),
    [options],
  );

  function updateOutcome(
    optionId: string,
    outcomeId: string,
    key: 'baselineEvents' | 'interventionEvents',
    value: string,
  ) {
    setOptions((current) =>
      current.map((option) =>
        option.id !== optionId
          ? option
          : {
              ...option,
              outcomes: option.outcomes.map((outcome) =>
                outcome.id !== outcomeId ? outcome : { ...outcome, [key]: Number(value) },
              ),
            },
      ),
    );
  }

  function addOption() {
    const id = `option-${options.length + 1}`;
    setOptions((current) => [
      ...current,
      {
        id,
        name: `Option ${String.fromCharCode(65 + current.length)}`,
        description: 'Neue Demo-Option',
        outcomes: [
          {
            id: 'benefit',
            label: 'gewünschtes Ereignis verhindern',
            kind: 'benefit',
            baselineEvents: 12,
            interventionEvents: 9,
            denominator: 100,
            timeframe: 'in 5 Jahren',
          },
          {
            id: 'harm',
            label: 'zusätzliche Nebenwirkung',
            kind: 'harm',
            baselineEvents: 2,
            interventionEvents: 4,
            denominator: 100,
            timeframe: 'in 5 Jahren',
          },
        ],
      },
    ]);
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="section-title">Optionen vergleichen</h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Vergleichen Sie mehrere Optionen mit getrennten Nutzen- und Schadensendpunkten. Die
            Demo-Zahlen sind editierbar und dienen nur als Kommunikationsbeispiel.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="btn-secondary" type="button" onClick={() => setOptions(comparisonOptions)}>
            <RotateCcw size={18} aria-hidden="true" />
            Demo zurücksetzen
          </button>
          <button className="btn-primary" type="button" onClick={addOption}>
            <Plus size={18} aria-hidden="true" />
            Option hinzufügen
          </button>
        </div>
      </section>

      <section className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="border-b border-line px-4 py-3 font-semibold">Option</th>
                <th className="border-b border-line px-4 py-3 font-semibold">Endpunkt</th>
                <th className="border-b border-line px-4 py-3 font-semibold">Art</th>
                <th className="border-b border-line px-4 py-3 font-semibold">Baseline</th>
                <th className="border-b border-line px-4 py-3 font-semibold">Intervention</th>
                <th className="border-b border-line px-4 py-3 font-semibold">Differenz</th>
                <th className="border-b border-line px-4 py-3 font-semibold">NNT/NNH</th>
              </tr>
            </thead>
            <tbody>
              {flattened.map(({ option, outcome, metrics }) => (
                <tr
                  key={`${option.id}-${outcome.id}`}
                  className={outcome.kind === 'harm' && metrics.absoluteDifference > 0 ? 'bg-rose-50' : 'bg-white'}
                >
                  <td className="border-b border-line px-4 py-3 align-top">
                    <div className="font-semibold text-ink">{option.name}</div>
                    <div className="mt-1 max-w-xs text-xs leading-5 text-muted">{option.description}</div>
                  </td>
                  <td className="border-b border-line px-4 py-3 align-top">{outcome.label}</td>
                  <td className="border-b border-line px-4 py-3 align-top">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-semibold ${
                        outcome.kind === 'harm'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-teal-100 text-teal-700'
                      }`}
                    >
                      {outcome.kind === 'harm' ? 'Schaden' : 'Nutzen'}
                    </span>
                  </td>
                  <td className="border-b border-line px-4 py-3 align-top">
                    <RiskNumberInput
                      value={outcome.baselineEvents}
                      outcome={outcome}
                      onChange={(value) => updateOutcome(option.id, outcome.id, 'baselineEvents', value)}
                    />
                  </td>
                  <td className="border-b border-line px-4 py-3 align-top">
                    <RiskNumberInput
                      value={outcome.interventionEvents}
                      outcome={outcome}
                      onChange={(value) =>
                        updateOutcome(option.id, outcome.id, 'interventionEvents', value)
                      }
                    />
                  </td>
                  <td className="border-b border-line px-4 py-3 align-top font-medium">
                    {metrics.absoluteDifferenceLabel}
                  </td>
                  <td className="border-b border-line px-4 py-3 align-top">
                    {metrics.nntOrNnhLabel ?? 'Keine Differenz'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        {options.map((option) => (
          <article key={option.id} className="panel panel-pad space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-ink">{option.name}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{option.description}</p>
            </div>
            {option.outcomes.map((outcome) => {
              const metrics = calculateRiskMetrics(
                outcome.baselineEvents,
                outcome.interventionEvents,
                outcome.denominator,
                outcome.kind,
              );
              return (
                <div key={outcome.id} className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold text-slate-800">{outcome.label}</h3>
                    <span className="text-sm text-muted">{outcome.timeframe}</span>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <IconArray label="Baseline" events={outcome.baselineEvents} denominator={outcome.denominator} />
                    <IconArray
                      label="Intervention"
                      events={outcome.interventionEvents}
                      denominator={outcome.denominator}
                      tone={outcome.kind === 'harm' ? 'harm' : 'benefit'}
                    />
                  </div>
                  <p
                    className={`rounded-lg p-3 text-sm font-semibold ${
                      outcome.kind === 'harm' && metrics.absoluteDifference > 0
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {metrics.absoluteDifferenceLabel}
                  </p>
                </div>
              );
            })}
          </article>
        ))}
      </section>

      <section className="panel panel-pad">
        <h2 className="text-xl font-semibold text-ink">Zusammenfassung</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {options.map((option) => (
            <div key={option.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-ink">{option.name}</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                {option.outcomes.map((outcome) => {
                  const metrics = calculateRiskMetrics(
                    outcome.baselineEvents,
                    outcome.interventionEvents,
                    outcome.denominator,
                    outcome.kind,
                  );
                  return (
                    <li key={outcome.id}>
                      <span className="font-medium">{outcome.label}:</span>{' '}
                      {metrics.absoluteDifferenceLabel}{' '}
                      {metrics.nntOrNnhLabel ? `(${metrics.nntOrNnhLabel})` : ''}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function RiskNumberInput({
  value,
  outcome,
  onChange,
}: {
  value: number;
  outcome: RiskOutcome;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex min-w-32 items-center gap-2">
      <input
        className="w-20 rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
        min={0}
        max={outcome.denominator}
        type="number"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <span className="text-xs text-muted">von {outcome.denominator}</span>
    </label>
  );
}
