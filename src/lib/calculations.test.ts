import { describe, it, expect } from 'vitest';
import {
  calculateNightsOffStreet,
  calculateSocialValueGenerated,
  calculateSROIRatio,
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

  describe('calculateSocialValueGenerated', () => {
    it('should calculate social value for $100 donation', () => {
      const donation = 100;
      const nights = calculateNightsOffStreet(donation);
      const expected = nights * ASSUMPTIONS.socialValuePerPersonNight;
      
      expect(calculateSocialValueGenerated(donation)).toBeCloseTo(expected, 2);
    });

    it('should return positive value for any donation', () => {
      const donation = 50;
      const result = calculateSocialValueGenerated(donation);
      expect(result).toBeGreaterThan(0);
    });

    it('should scale linearly with donation amount', () => {
      const donation1 = 100;
      const donation2 = 300;
      const result1 = calculateSocialValueGenerated(donation1);
      const result2 = calculateSocialValueGenerated(donation2);
      expect(result2).toBeCloseTo(result1 * 3, 2);
    });
  });

  describe('calculateSROIRatio', () => {
    it('should calculate SROI ratio for $100 donation', () => {
      const donation = 100;
      const result = calculateSROIRatio(donation);
      
      expect(result).toHaveProperty('raw');
      expect(result).toHaveProperty('adjusted');
      expect(result.raw).toBeGreaterThan(0);
      expect(result.adjusted).toBeGreaterThan(0);
      expect(result.adjusted).toBeLessThan(result.raw);
    });

    it('should return consistent ratios for different amounts', () => {
      const donation1 = 100;
      const donation2 = 500;
      const result1 = calculateSROIRatio(donation1);
      const result2 = calculateSROIRatio(donation2);
      
      // SROI ratios should be similar regardless of donation amount
      expect(result1.raw).toBeCloseTo(result2.raw, 2);
      expect(result1.adjusted).toBeCloseTo(result2.adjusted, 2);
    });
  });

  describe('calculateImpact', () => {
    it('should return all metrics for $100 donation', () => {
      const donation = 100;
      const impact = calculateImpact(donation);

      expect(impact).toHaveProperty('nightsOffStreet');
      expect(impact).toHaveProperty('socialValueGenerated');
      expect(impact).toHaveProperty('sroiRatio');

      expect(impact.nightsOffStreet).toBeGreaterThan(0);
      expect(impact.socialValueGenerated).toBeGreaterThan(0);
      expect(impact.sroiRatio.raw).toBeGreaterThan(0);
      expect(impact.sroiRatio.adjusted).toBeGreaterThan(0);
    });

    it('should match individual calculation functions', () => {
      const donation = 250;
      const impact = calculateImpact(donation);

      expect(impact.nightsOffStreet).toBe(calculateNightsOffStreet(donation));
      expect(impact.socialValueGenerated).toBe(calculateSocialValueGenerated(donation));
      expect(impact.sroiRatio.raw).toBe(calculateSROIRatio(donation).raw);
      expect(impact.sroiRatio.adjusted).toBe(calculateSROIRatio(donation).adjusted);
    });

    it('should handle edge case of $10 donation', () => {
      const donation = 10;
      const impact = calculateImpact(donation);

      expect(impact.nightsOffStreet).toBeGreaterThan(0);
      expect(impact.nightsOffStreet).toBeLessThan(0.5);
      expect(impact.socialValueGenerated).toBeGreaterThan(0);
      expect(impact.sroiRatio.adjusted).toBeGreaterThan(0);
    });

    it('should handle edge case of $10,000 donation', () => {
      const donation = 10000;
      const impact = calculateImpact(donation);

      expect(impact.nightsOffStreet).toBeGreaterThan(100);
      expect(impact.socialValueGenerated).toBeGreaterThan(1000);
      expect(impact.sroiRatio.adjusted).toBeGreaterThan(0);
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

    it('$100 donation should show meaningful social value', () => {
      const donation = 100;
      const socialValue = calculateSocialValueGenerated(donation);
      expect(socialValue).toBeGreaterThan(100);
      expect(socialValue).toBeLessThan(500);
    });

    it('$100 donation should show positive SROI ratio', () => {
      const donation = 100;
      const sroi = calculateSROIRatio(donation);
      expect(sroi.raw).toBeGreaterThan(1);
      expect(sroi.adjusted).toBeGreaterThan(0.5);
    });
  });
});

