import type {
  RiskComparisonOption,
  RiskDenominator,
  RiskMetrics,
  RiskOutcome,
  RiskScenario,
  RiskValidationResult,
} from '../types/risk';

const allowedDenominators: RiskDenominator[] = [100, 1000, 10000];

export function isRiskDenominator(value: number): value is RiskDenominator {
  return allowedDenominators.includes(value as RiskDenominator);
}

export function clampEvents(value: number, denominator: RiskDenominator): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(Math.max(Math.round(value), 0), denominator);
}

export function normalizeEvents(
  events: number,
  fromDenominator: RiskDenominator,
  toDenominator: RiskDenominator,
): number {
  return Math.round((events / fromDenominator) * toDenominator);
}

export function formatNaturalFrequency(events: number, denominator: RiskDenominator): string {
  const safeEvents = clampEvents(events, denominator);
  return `${safeEvents} von ${denominator} Personen`;
}

export function calculateRiskMetrics(
  baselineEvents: number,
  interventionEvents: number,
  denominator: RiskDenominator,
  kind: RiskOutcome['kind'] = 'benefit',
): RiskMetrics {
  const baseline = clampEvents(baselineEvents, denominator);
  const intervention = clampEvents(interventionEvents, denominator);
  const absoluteDifference = intervention - baseline;
  const absoluteMagnitude = Math.abs(absoluteDifference);
  const relativeRisk = baseline === 0 ? null : intervention / baseline;
  const relativeRiskReduction = relativeRisk === null ? null : 1 - relativeRisk;
  const nntOrNnh = absoluteMagnitude === 0 ? null : Math.ceil(denominator / absoluteMagnitude);

  const changeWord =
    absoluteDifference === 0
      ? 'keine Veränderung'
      : absoluteDifference > 0
        ? `${absoluteMagnitude} mehr`
        : `${absoluteMagnitude} weniger`;

  const label =
    absoluteDifference === 0
      ? `Es zeigt sich keine absolute Veränderung pro ${denominator} Personen.`
      : `${changeWord} von ${denominator} Personen haben das Ereignis.`;

  const nntOrNnhLabel =
    nntOrNnh === null
      ? null
      : kind === 'harm' || absoluteDifference > 0
        ? `NNH etwa ${nntOrNnh}`
        : `NNT etwa ${nntOrNnh}`;

  return {
    absoluteDifference,
    absoluteDifferenceLabel: label,
    relativeRisk,
    relativeRiskReduction,
    nntOrNnh,
    nntOrNnhLabel,
  };
}

export function validateScenario(scenario: RiskScenario): RiskValidationResult {
  const errors: string[] = [];

  if (!scenario.event.trim()) {
    errors.push('Bitte benennen Sie das Ereignis.');
  }

  if (!isRiskDenominator(scenario.denominator)) {
    errors.push('Bitte nutzen Sie einen festen Nenner: 100, 1000 oder 10000.');
  }

  if (scenario.baselineEvents < 0 || scenario.interventionEvents < 0) {
    errors.push('Ereigniszahlen duerfen nicht negativ sein.');
  }

  if (
    scenario.baselineEvents > scenario.denominator ||
    scenario.interventionEvents > scenario.denominator
  ) {
    errors.push('Ereigniszahlen duerfen nicht groesser sein als der Nenner.');
  }

  if (!scenario.timeframe.trim()) {
    errors.push('Bitte geben Sie einen Zeitraum an, zum Beispiel "in 5 Jahren".');
  }

  if (!scenario.targetGroup.trim()) {
    errors.push('Bitte beschreiben Sie die Zielgruppe.');
  }

  if (!scenario.source.title.trim()) {
    errors.push('Bitte geben Sie eine Quelle an.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateNoRelativeOnlyInput(input: {
  baselineEvents?: number | null;
  interventionEvents?: number | null;
  relativeRisk?: number | null;
}): RiskValidationResult {
  const hasAbsolute =
    typeof input.baselineEvents === 'number' && typeof input.interventionEvents === 'number';
  const hasRelativeOnly = !hasAbsolute && typeof input.relativeRisk === 'number';

  return {
    valid: !hasRelativeOnly,
    errors: hasRelativeOnly
      ? ['Relative Risiken duerfen nicht ohne absolute Ausgangszahlen genutzt werden.']
      : [],
  };
}

export function buildPlainLanguageText(scenario: RiskScenario): string {
  const baseline = formatNaturalFrequency(scenario.baselineEvents, scenario.denominator);
  const intervention = formatNaturalFrequency(scenario.interventionEvents, scenario.denominator);
  const metrics = calculateRiskMetrics(
    scenario.baselineEvents,
    scenario.interventionEvents,
    scenario.denominator,
  );

  const tonePrefix =
    scenario.tone === 'beruhigend'
      ? 'Kurz gesagt: '
      : scenario.tone === 'direkt'
        ? 'Wichtig ist: '
        : '';

  return `${tonePrefix}Bei ${scenario.targetGroup} haben ohne die Massnahme ${baseline} ${scenario.event} ${scenario.timeframe}. Mit der Massnahme sind es ${intervention}. ${metrics.absoluteDifferenceLabel}`;
}

export function buildTeachBackQuestion(scenario: RiskScenario): string {
  return `Wie wuerden Sie in eigenen Worten beschreiben, was "${formatNaturalFrequency(
    scenario.interventionEvents,
    scenario.denominator,
  )}" fuer Sie ${scenario.timeframe} bedeutet?`;
}

export function buildMarkdownExport(scenario: RiskScenario): string {
  const metrics = calculateRiskMetrics(
    scenario.baselineEvents,
    scenario.interventionEvents,
    scenario.denominator,
  );
  const relativeLine =
    scenario.showRelativeRisk && metrics.relativeRisk !== null
      ? `\n- Relatives Risiko: ${(metrics.relativeRisk * 100).toFixed(0)} % des Ausgangsrisikos`
      : '';

  return `# ${scenario.event}

**Zielgruppe:** ${scenario.targetGroup}
**Zeitraum:** ${scenario.timeframe}

## Absolute Zahlen
- Ohne Massnahme: ${formatNaturalFrequency(scenario.baselineEvents, scenario.denominator)}
- Mit Massnahme: ${formatNaturalFrequency(scenario.interventionEvents, scenario.denominator)}
- Absolute Differenz: ${metrics.absoluteDifferenceLabel}${relativeLine}

## Einfache Erklaerung
${buildPlainLanguageText(scenario)}

## Teach-Back
${buildTeachBackQuestion(scenario)}

## Quelle
${scenario.source.title}${scenario.source.url ? `\n${scenario.source.url}` : ''}

## Hinweis
Keine aerztliche Beratung. Diese Darstellung ist nur eine Kommunikationshilfe.`;
}

export function summarizeComparisonOption(option: RiskComparisonOption): RiskOutcome[] {
  return option.outcomes.map((outcome) => ({
    ...outcome,
    baselineEvents: clampEvents(outcome.baselineEvents, outcome.denominator),
    interventionEvents: clampEvents(outcome.interventionEvents, outcome.denominator),
  }));
}
