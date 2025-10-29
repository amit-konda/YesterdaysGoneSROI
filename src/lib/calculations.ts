/**
 * SROI impact calculations for Yesterday's Gone
 * 
 * All functions are deterministic and use linear models for transparency.
 * These are conservative placeholder calculations that should be validated
 * and refined with actual program data.
 */

import { ASSUMPTIONS } from './assumptions';

export interface ImpactMetrics {
  nightsOffStreet: number;
  violencePrevented: number;
  futureEarnings: number;
}

/**
 * Calculate nights off the street for women and children
 * 
 * Formula: (donation / costPerBedNight) * avgHouseholdSize
 * 
 * @param donation - Donation amount in USD
 * @returns Number of nights (decimal)
 */
export function calculateNightsOffStreet(donation: number): number {
  return (donation / ASSUMPTIONS.costPerBedNight) * ASSUMPTIONS.avgHouseholdSize;
}

/**
 * Calculate expected instances of violence prevented
 * 
 * Model:
 * 1. Convert donation to participant-weeks of stability
 * 2. Apply baseline risk reduction rate
 * 3. Multiply by household size
 * 
 * ⚠️ This is an expected-value estimate, not a causal claim.
 * 
 * @param donation - Donation amount in USD
 * @returns Expected incidents avoided (decimal, typically < 1)
 */
export function calculateViolencePrevented(donation: number): number {
  const participantWeeks =
    (donation / ASSUMPTIONS.costPerBedNight) * ASSUMPTIONS.weeksPerNight;
  
  const expectedIncidentsAvoided =
    participantWeeks *
    ASSUMPTIONS.baselineRiskReductionPerStabilizedWeek *
    ASSUMPTIONS.avgHouseholdSize;

  return expectedIncidentsAvoided;
}

/**
 * Calculate future earnings added (lifetime present value)
 * 
 * Model:
 * 1. Convert nights to stabilized months (30 nights ≈ 1 month)
 * 2. Multiply by lifetime PV per stabilized month
 * 
 * ⚠️ This is a simplified economic mobility model.
 * 
 * @param donation - Donation amount in USD
 * @returns Lifetime present value of earnings increase (USD)
 */
export function calculateFutureEarnings(donation: number): number {
  const nights = calculateNightsOffStreet(donation);
  const stabilizedMonths = nights / 30;
  const futureEarningsPV = stabilizedMonths * ASSUMPTIONS.lifetimePVPerStabilizedMonth;

  return futureEarningsPV;
}

/**
 * Calculate all impact metrics at once
 * 
 * @param donation - Donation amount in USD
 * @returns Object with all three impact metrics
 */
export function calculateImpact(donation: number): ImpactMetrics {
  return {
    nightsOffStreet: calculateNightsOffStreet(donation),
    violencePrevented: calculateViolencePrevented(donation),
    futureEarnings: calculateFutureEarnings(donation),
  };
}

/**
 * Context metrics for the "Every $X funds..." strip
 */
export interface ContextMetrics {
  costPerNight: number;
  counselingSession: number;
  coachingPerWeek: number;
}

/**
 * Get context metrics for display
 */
export function getContextMetrics(): ContextMetrics {
  return {
    costPerNight: ASSUMPTIONS.costPerBedNight / ASSUMPTIONS.avgHouseholdSize,
    counselingSession: ASSUMPTIONS.counselingSessionCost,
    coachingPerWeek: ASSUMPTIONS.coachingCostPerWeek,
  };
}

