import { describe, expect, it } from 'vitest';
import {
  buildMarkdownExport,
  calculateRiskMetrics,
  validateNoRelativeOnlyInput,
  validateScenario,
} from './riskMath';
import type { RiskScenario } from '../types/risk';

const scenario: RiskScenario = {
  event: 'einen Herzinfarkt',
  baselineEvents: 10,
  interventionEvents: 7,
  denominator: 100,
  timeframe: 'in 5 Jahren',
  targetGroup: 'Erwachsene mit erhoehtem kardiovaskulaerem Risiko',
  tone: 'neutral',
  source: {
    title: 'Demo-Quelle',
    url: 'https://example.org',
  },
  showRelativeRisk: true,
};

describe('risk math', () => {
  it('validates required absolute fields and denominator limits', () => {
    expect(validateScenario(scenario).valid).toBe(true);

    const invalid = validateScenario({
      ...scenario,
      baselineEvents: 120,
    });

    expect(invalid.valid).toBe(false);
    expect(invalid.errors.join(' ')).toContain('groesser');
  });

  it('rejects relative-risk-only input', () => {
    expect(validateNoRelativeOnlyInput({ relativeRisk: 0.7 }).valid).toBe(false);
    expect(
      validateNoRelativeOnlyInput({
        baselineEvents: 10,
        interventionEvents: 7,
        relativeRisk: 0.7,
      }).valid,
    ).toBe(true);
  });

  it('calculates absolute difference for benefit and harm', () => {
    const benefit = calculateRiskMetrics(10, 7, 100, 'benefit');
    expect(benefit.absoluteDifference).toBe(-3);
    expect(benefit.absoluteDifferenceLabel).toContain('3 weniger');

    const harm = calculateRiskMetrics(2, 5, 100, 'harm');
    expect(harm.absoluteDifference).toBe(3);
    expect(harm.absoluteDifferenceLabel).toContain('3 mehr');
  });

  it('hides NNT or NNH when the absolute difference is zero', () => {
    const metrics = calculateRiskMetrics(5, 5, 100);
    expect(metrics.nntOrNnh).toBeNull();
    expect(metrics.nntOrNnhLabel).toBeNull();
  });

  it('rounds NNT and NNH conservatively', () => {
    const metrics = calculateRiskMetrics(10, 7, 100);
    expect(metrics.nntOrNnh).toBe(34);
    expect(metrics.nntOrNnhLabel).toBe('NNT etwa 34');
  });

  it('exports markdown with core communication fields and disclaimer', () => {
    const markdown = buildMarkdownExport(scenario);

    expect(markdown).toContain('einen Herzinfarkt');
    expect(markdown).toContain('10 von 100 Personen');
    expect(markdown).toContain('in 5 Jahren');
    expect(markdown).toContain('Erwachsene mit erhoehtem kardiovaskulaerem Risiko');
    expect(markdown).toContain('Demo-Quelle');
    expect(markdown).toContain('Keine aerztliche Beratung');
  });
});
