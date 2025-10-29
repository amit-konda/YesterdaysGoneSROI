import { describe, it, expect } from 'vitest';
import {
  calculateNightsOffStreet,
  calculateViolencePrevented,
  calculateFutureEarnings,
  calculateImpact,
  getContextMetrics,
} from './calculations';
import { ASSUMPTIONS } from './assumptions';

describe('SROI Calculations', () => {
  describe('calculateNightsOffStreet', () => {
    it('should calculate nights correctly for $100 donation', () => {
      const donation = 100;
      const expected =
        (donation / ASSUMPTIONS.costPerBedNight) * ASSUMPTIONS.avgHouseholdSize;
      expect(calculateNightsOffStreet(donation)).toBeCloseTo(expected, 2);
    });

    it('should return proportional nights for different amounts', () => {
      const donation1 = 100;
      const donation2 = 200;
      const nights1 = calculateNightsOffStreet(donation1);
      const nights2 = calculateNightsOffStreet(donation2);
      expect(nights2).toBeCloseTo(nights1 * 2, 2);
    });

    it('should handle minimum donation', () => {
      const donation = 10;
      const result = calculateNightsOffStreet(donation);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(1);
    });

    it('should handle maximum donation', () => {
      const donation = 10000;
      const result = calculateNightsOffStreet(donation);
      expect(result).toBeGreaterThan(100);
    });
  });

  describe('calculateViolencePrevented', () => {
    it('should calculate violence prevented for $100 donation', () => {
      const donation = 100;
      const participantWeeks =
        (donation / ASSUMPTIONS.costPerBedNight) * ASSUMPTIONS.weeksPerNight;
      const expected =
        participantWeeks *
        ASSUMPTIONS.baselineRiskReductionPerStabilizedWeek *
        ASSUMPTIONS.avgHouseholdSize;
      
      expect(calculateViolencePrevented(donation)).toBeCloseTo(expected, 4);
    });

    it('should return a small positive number for typical donations', () => {
      const donation = 100;
      const result = calculateViolencePrevented(donation);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(1); // Expected value should be fractional for typical donations
    });

    it('should scale linearly with donation amount', () => {
      const donation1 = 100;
      const donation2 = 500;
      const result1 = calculateViolencePrevented(donation1);
      const result2 = calculateViolencePrevented(donation2);
      expect(result2).toBeCloseTo(result1 * 5, 4);
    });
  });

  describe('calculateFutureEarnings', () => {
    it('should calculate future earnings for $100 donation', () => {
      const donation = 100;
      const nights = calculateNightsOffStreet(donation);
      const stabilizedMonths = nights / 30;
      const expected = stabilizedMonths * ASSUMPTIONS.lifetimePVPerStabilizedMonth;
      
      expect(calculateFutureEarnings(donation)).toBeCloseTo(expected, 2);
    });

    it('should return positive earnings for any donation', () => {
      const donation = 50;
      const result = calculateFutureEarnings(donation);
      expect(result).toBeGreaterThan(0);
    });

    it('should scale linearly with donation amount', () => {
      const donation1 = 100;
      const donation2 = 300;
      const result1 = calculateFutureEarnings(donation1);
      const result2 = calculateFutureEarnings(donation2);
      expect(result2).toBeCloseTo(result1 * 3, 2);
    });
  });

  describe('calculateImpact', () => {
    it('should return all three metrics for $100 donation', () => {
      const donation = 100;
      const impact = calculateImpact(donation);

      expect(impact).toHaveProperty('nightsOffStreet');
      expect(impact).toHaveProperty('violencePrevented');
      expect(impact).toHaveProperty('futureEarnings');

      expect(impact.nightsOffStreet).toBeGreaterThan(0);
      expect(impact.violencePrevented).toBeGreaterThan(0);
      expect(impact.futureEarnings).toBeGreaterThan(0);
    });

    it('should match individual calculation functions', () => {
      const donation = 250;
      const impact = calculateImpact(donation);

      expect(impact.nightsOffStreet).toBe(calculateNightsOffStreet(donation));
      expect(impact.violencePrevented).toBe(calculateViolencePrevented(donation));
      expect(impact.futureEarnings).toBe(calculateFutureEarnings(donation));
    });

    it('should handle edge case of $10 donation', () => {
      const donation = 10;
      const impact = calculateImpact(donation);

      expect(impact.nightsOffStreet).toBeGreaterThan(0);
      expect(impact.nightsOffStreet).toBeLessThan(0.5);
      expect(impact.violencePrevented).toBeGreaterThan(0);
      expect(impact.violencePrevented).toBeLessThan(0.01);
      expect(impact.futureEarnings).toBeGreaterThan(0);
    });

    it('should handle edge case of $10,000 donation', () => {
      const donation = 10000;
      const impact = calculateImpact(donation);

      expect(impact.nightsOffStreet).toBeGreaterThan(100);
      expect(impact.violencePrevented).toBeGreaterThan(0.1);
      expect(impact.futureEarnings).toBeGreaterThan(1000);
    });
  });

  describe('getContextMetrics', () => {
    it('should return context metrics', () => {
      const context = getContextMetrics();

      expect(context).toHaveProperty('costPerNight');
      expect(context).toHaveProperty('counselingSession');
      expect(context).toHaveProperty('coachingPerWeek');

      expect(context.costPerNight).toBeGreaterThan(0);
      expect(context.counselingSession).toBe(ASSUMPTIONS.counselingSessionCost);
      expect(context.coachingPerWeek).toBe(ASSUMPTIONS.coachingCostPerWeek);
    });

    it('should calculate cost per night correctly', () => {
      const context = getContextMetrics();
      const expected = ASSUMPTIONS.costPerBedNight / ASSUMPTIONS.avgHouseholdSize;
      expect(context.costPerNight).toBeCloseTo(expected, 2);
    });
  });

  describe('Real-world scenarios', () => {
    it('$50 donation should provide ~1.2 nights', () => {
      const donation = 50;
      const nights = calculateNightsOffStreet(donation);
      expect(nights).toBeGreaterThan(1);
      expect(nights).toBeLessThan(1.5);
    });

    it('$100 donation should provide ~2.5 nights', () => {
      const donation = 100;
      const nights = calculateNightsOffStreet(donation);
      expect(nights).toBeGreaterThan(2);
      expect(nights).toBeLessThan(3);
    });

    it('$1000 donation should provide ~24 nights', () => {
      const donation = 1000;
      const nights = calculateNightsOffStreet(donation);
      expect(nights).toBeGreaterThan(20);
      expect(nights).toBeLessThan(30);
    });

    it('$100 donation should show measurable but small violence prevention', () => {
      const donation = 100;
      const prevented = calculateViolencePrevented(donation);
      expect(prevented).toBeGreaterThan(0.001);
      expect(prevented).toBeLessThan(0.1);
    });

    it('$100 donation should show meaningful future earnings impact', () => {
      const donation = 100;
      const earnings = calculateFutureEarnings(donation);
      expect(earnings).toBeGreaterThan(50);
      expect(earnings).toBeLessThan(200);
    });
  });
});

