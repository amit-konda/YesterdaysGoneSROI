/**
 * SROI impact calculations for Yesterday's Gone
 * 
 * Based on Safe Nights SROI Analysis (2024)
 * Balanced calculation scenario: Women Mix 50/50 + Kids Moderate
 * 
 * All functions are deterministic and use linear models for transparency.
 */

import { ASSUMPTIONS } from './assumptions';

export interface ImpactMetrics {
  nightsOffStreet: number;
  socialValueGenerated: number;
  sroiRatio: {
    raw: number;
    adjusted: number;
  };
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
 * Calculate social value generated from donation
 * 
 * Formula: person-nights × social value per person-night
 * 
 * @param donation - Donation amount in USD
 * @returns Social value generated (USD)
 */
export function calculateSocialValueGenerated(donation: number): number {
  const nights = calculateNightsOffStreet(donation);
  return nights * ASSUMPTIONS.socialValuePerPersonNight;
}

/**
 * Calculate SROI ratio (raw and adjusted)
 * 
 * Formula:
 * - Raw SROI: social value generated / donation
 * - Adjusted SROI: raw SROI × multiplicative multiplier
 * 
 * @param donation - Donation amount in USD
 * @returns Object with raw and adjusted SROI ratios
 */
export function calculateSROIRatio(donation: number): {
  raw: number;
  adjusted: number;
} {
  const socialValue = calculateSocialValueGenerated(donation);
  const raw = socialValue / donation;
  const adjusted = raw * ASSUMPTIONS.multiplicativeMultiplier;

  return {
    raw,
    adjusted,
  };
}

/**
 * Calculate all impact metrics at once
 * 
 * @param donation - Donation amount in USD
 * @returns Object with all impact metrics
 */
export function calculateImpact(donation: number): ImpactMetrics {
  return {
    nightsOffStreet: calculateNightsOffStreet(donation),
    socialValueGenerated: calculateSocialValueGenerated(donation),
    sroiRatio: calculateSROIRatio(donation),
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
    costPerNight: ASSUMPTIONS.costPerBedNight,
    counselingSession: ASSUMPTIONS.counselingSessionCost,
    coachingPerWeek: ASSUMPTIONS.coachingCostPerWeek,
  };
}

