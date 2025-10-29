/**
 * SROI ASSUMPTIONS FOR YESTERDAY'S GONE
 * 
 * ⚠️ IMPORTANT: These are PLACEHOLDER VALUES for demonstration only.
 * 
 * Before deploying this tool publicly:
 * 1. Schedule a meeting with Yesterday's Gone program staff
 * 2. Replace these estimates with actual program data
 * 3. Validate the violence prevention and economic mobility models with research
 * 4. Document all sources and methodology clearly
 * 
 * All dollar amounts are in USD. All rates are annual unless noted.
 */

export const ASSUMPTIONS = {
  // ═══════════════════════════════════════════════════════════════════
  // PROGRAM COST REFERENCE
  // Used for allocation chart and context. Update with real operating data.
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Cost per bed-night for one person (housing, utilities, overhead)
   * This is the denominator for "nights off the street" calculations.
   * Update with actual cost per participant per night.
   */
  costPerBedNight: 65,

  /**
   * Average household size: women + dependent children served per unit
   * Yesterday's Gone serves women and children; this multiplier accounts
   * for the fact that each housing unit typically serves more than one person.
   */
  avgHouseholdSize: 1.6,

  /**
   * Cost per counseling session with a licensed professional
   * Used to provide context about what donations fund.
   */
  counselingSessionCost: 120,

  /**
   * Life-coaching support and case navigation per week
   * Part of the wraparound services model.
   */
  coachingCostPerWeek: 45,

  /**
   * Partial childcare assistance per week
   * Enables mothers to participate in programs and seek employment.
   */
  childcareSupportPerWeek: 80,

  /**
   * Transportation support per week (bus passes, gas cards, etc.)
   * Removes barriers to appointments, job interviews, and services.
   */
  transportationSupportPerWeek: 25,

  // ═══════════════════════════════════════════════════════════════════
  // VIOLENCE PREVENTION MODELING
  // This is a simplified expected-value model. NOT causal proof.
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Expected incidents of violence avoided per participant per stabilized week
   * 
   * Model: Each week of stable housing + counseling reduces risk by a small probability.
   * We map: dollars → stabilized weeks → expected incidents avoided.
   * 
   * ⚠️ This is illustrative only. Real impact requires:
   *   - Longitudinal outcome data
   *   - Control group comparisons
   *   - Published research validation
   * 
   * Placeholder value: 0.002 incidents/participant-week
   * (Implies ~10% annual risk reduction for a participant housed year-round)
   */
  baselineRiskReductionPerStabilizedWeek: 0.002,

  /**
   * Conversion factor: nights → weeks
   * Used to translate bed-nights into "stabilized weeks" for the violence model.
   */
  weeksPerNight: 1 / 7,

  // ═══════════════════════════════════════════════════════════════════
  // ECONOMIC MOBILITY MODELING
  // Lifetime present value of earnings increase per stabilized month.
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Lifetime present value of earnings increase per participant-month stabilized
   * 
   * Model: Each month of stability + coaching/counseling increases:
   *   - Employment probability
   *   - Wage trajectory
   *   - Career longevity
   * 
   * We express this as a lifetime PV using a real discount rate.
   * 
   * ⚠️ This is a conservative placeholder. Real calculation requires:
   *   - Longitudinal employment data
   *   - Wage progression analysis
   *   - Comparison to counterfactual
   * 
   * Placeholder: $350/participant-month
   */
  lifetimePVPerStabilizedMonth: 350,

  /**
   * Real discount rate for present value calculations
   * Standard assumption for long-term social impact analysis.
   */
  discountRate: 0.03,
} as const;

// Type helper for TypeScript consumers
export type Assumptions = typeof ASSUMPTIONS;

