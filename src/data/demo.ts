import type { RiskComparisonOption, RiskScenario } from '../types/risk';

export const demoScenario: RiskScenario = {
  event: 'einen Herzinfarkt',
  baselineEvents: 12,
  interventionEvents: 8,
  denominator: 100,
  timeframe: 'in den naechsten 5 Jahren',
  targetGroup: 'Erwachsene mit erhoehtem kardiovaskulaerem Risiko',
  tone: 'neutral',
  source: {
    title: 'Demo-Daten fuer Kommunikationszwecke',
    note: 'Bitte fuer echte Beratung durch lokale Leitlinien und Studiendaten ersetzen.',
  },
  showRelativeRisk: false,
};

export const comparisonOptions: RiskComparisonOption[] = [
  {
    id: 'statin',
    name: 'Option A: Statin-Therapie',
    description: 'Demo fuer Nutzen und moegliche Nebenwirkung in einer Risikobesprechung.',
    outcomes: [
      {
        id: 'cvd',
        label: 'Herzinfarkt oder Schlaganfall',
        kind: 'benefit',
        baselineEvents: 12,
        interventionEvents: 8,
        denominator: 100,
        timeframe: 'in 5 Jahren',
      },
      {
        id: 'muscle',
        label: 'belastende Muskelschmerzen',
        kind: 'harm',
        baselineEvents: 2,
        interventionEvents: 5,
        denominator: 100,
        timeframe: 'in 5 Jahren',
      },
    ],
  },
  {
    id: 'lifestyle',
    name: 'Option B: Lebensstil-Programm',
    description: 'Demo fuer nicht-medikamentoese Option mit kleinerem Nebenwirkungsprofil.',
    outcomes: [
      {
        id: 'cvd',
        label: 'Herzinfarkt oder Schlaganfall',
        kind: 'benefit',
        baselineEvents: 12,
        interventionEvents: 10,
        denominator: 100,
        timeframe: 'in 5 Jahren',
      },
      {
        id: 'injury',
        label: 'belastende Trainingsbeschwerden',
        kind: 'harm',
        baselineEvents: 1,
        interventionEvents: 3,
        denominator: 100,
        timeframe: 'in 5 Jahren',
      },
    ],
  },
];
