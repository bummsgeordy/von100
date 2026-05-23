import type { RiskDenominator } from '../types/risk';

interface IconArrayProps {
  label: string;
  events: number;
  denominator: RiskDenominator;
  tone?: 'benefit' | 'harm' | 'neutral';
}

function getDisplay(events: number, denominator: RiskDenominator) {
  if (denominator <= 1000) {
    return {
      totalIcons: denominator,
      activeIcons: Math.round(events),
      peoplePerIcon: 1,
    };
  }

  return {
    totalIcons: 1000,
    activeIcons: Math.round(events / 10),
    peoplePerIcon: 10,
  };
}

export default function IconArray({
  label,
  events,
  denominator,
  tone = 'neutral',
}: IconArrayProps) {
  const { totalIcons, activeIcons, peoplePerIcon } = getDisplay(events, denominator);
  const activeColor =
    tone === 'harm' ? 'bg-rose-500' : tone === 'benefit' ? 'bg-teal-600' : 'bg-brand-600';
  const cols = totalIcons <= 100 ? 'grid-cols-10' : 'grid-cols-[repeat(40,minmax(0,1fr))]';
  const size = totalIcons <= 100 ? 'h-3.5 w-3.5' : 'h-1.5 w-1.5';

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">{label}</h3>
          <p className="text-sm text-muted">
            {events} von {denominator} Personen
          </p>
        </div>
        {peoplePerIcon > 1 ? (
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
            1 Symbol = {peoplePerIcon} Personen
          </span>
        ) : null}
      </div>

      <div className={`grid ${cols} gap-1`} aria-label={`${events} von ${denominator} Personen`}>
        {Array.from({ length: totalIcons }, (_, index) => (
          <span
            key={index}
            className={`${size} rounded-sm ${index < activeIcons ? activeColor : 'bg-slate-200'}`}
            aria-hidden="true"
          />
        ))}
      </div>
    </section>
  );
}
