export type RiskDenominator = 100 | 1000 | 10000;

export type RiskTone = 'neutral' | 'beruhigend' | 'direkt';

export type RiskOutcomeKind = 'benefit' | 'harm';

export interface RiskSource {
  title: string;
  url?: string;
  note?: string;
}

export interface RiskScenario {
  event: string;
  baselineEvents: number;
  interventionEvents: number;
  denominator: RiskDenominator;
  timeframe: string;
  targetGroup: string;
  tone: RiskTone;
  source: RiskSource;
  showRelativeRisk: boolean;
}

export interface RiskOutcome {
  id: string;
  label: string;
  kind: RiskOutcomeKind;
  baselineEvents: number;
  interventionEvents: number;
  denominator: RiskDenominator;
  timeframe: string;
}

export interface RiskComparisonOption {
  id: string;
  name: string;
  description: string;
  outcomes: RiskOutcome[];
  source?: RiskSource;
}

export interface RiskMetrics {
  absoluteDifference: number;
  absoluteDifferenceLabel: string;
  relativeRisk: number | null;
  relativeRiskReduction: number | null;
  nntOrNnh: number | null;
  nntOrNnhLabel: string | null;
}

export interface RiskValidationResult {
  valid: boolean;
  errors: string[];
}
