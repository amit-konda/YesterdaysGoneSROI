/**
 * SROI ASSUMPTIONS FOR YESTERDAY'S GONE
 * 
 * Based on Safe Nights SROI Analysis (2024)
 * Balanced calculation scenario: Women Mix 50/50 + Kids Moderate
 * 
 * All dollar amounts are in USD. All rates are annual unless noted.
 */

export const ASSUMPTIONS = {
  // ═══════════════════════════════════════════════════════════════════
  // CAPACITY & BUDGET
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Shelter capacity at any given time
   */
  shelterCapacity: {
    women: 9,
    children: 12,
    total: 21,
  },

  /**
   * Operating budget for 2024
   */
  operatingExpensesAnnual: 252000,

  /**
   * Person-nights per year (capacity basis)
   * 21 people × 365 days = 7,665 person-nights
   */
  personNightsPerYear: 7665,

  /**
   * Household-nights per year (family nights)
   * 9 households × 365 days = 3,285 household-nights
   */
  householdNightsPerYear: 3285,

  /**
   * Cost per bed-night for one person (housing, utilities, overhead)
   * $252,000 / 7,665 = $32.85 per person-night
   */
  costPerBedNight: 32.85,

  /**
   * Cost per household-night
   * $252,000 / 3,285 = $76.71 per household-night
   */
  costPerHouseholdNight: 76.71,

  /**
   * Average household size: women + dependent children served per unit
   * 21 people / 9 households = 2.33
   */
  avgHouseholdSize: 2.33,

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
  // PROXY VALUES (for different scenarios)
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Social value proxies per woman per year
   */
  proxiesWomen: {
    conservative: 6400,
    mix: 19200, // 50/50 average of conservative and upper
    upper: 32000,
  },

  /**
   * Social value proxies per child per year
   */
  proxiesChildren: {
    conservative: 12800, // 2× adult conservative
    moderate: 32000,
    upper: 83092.80,
  },

  // ═══════════════════════════════════════════════════════════════════
  // SOCIAL VALUE METRICS (Balanced Calculation)
  // Women Mix 50/50 + Kids Moderate
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Social value per person-night
   * Based on balanced calculation: $72.64
   */
  socialValuePerPersonNight: 72.64,

  /**
   * Social value per household-night
   * Based on balanced calculation: $169.50
   */
  socialValuePerHouseholdNight: 169.50,

  /**
   * Annual social value (total)
   * Based on balanced calculation: $556,800
   */
  annualSocialValue: 556800,

  /**
   * Raw SROI ratio
   * Annual social value / operating expenses = 2.21x
   */
  rawSROI: 2.21,

  /**
   * Adjusted SROI (multiplicative method)
   * Raw SROI × multiplicative multiplier = 1.26x
   */
  adjustedSROIMultiplicative: 1.26,

  /**
   * Adjusted SROI (subtractive method)
   * Raw SROI × subtractive multiplier = 1.11x
   */
  adjustedSROISubtractive: 1.11,

  // ═══════════════════════════════════════════════════════════════════
  // ADDITIONALITY ADJUSTMENTS
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Deadweight: outcomes that would've happened anyway
   * 25% = 0.25
   */
  deadweight: 0.25,

  /**
   * Attribution: outcomes contributed by others
   * 20% = 0.20
   */
  attribution: 0.20,

  /**
   * Displacement: outcomes moved elsewhere
   * 5% = 0.05
   */
  displacement: 0.05,

  /**
   * Subtractive multiplier
   * 1 - (deadweight + attribution + displacement) = 0.50
   */
  subtractiveMultiplier: 0.50,

  /**
   * Multiplicative multiplier
   * (1 - deadweight) × (1 - attribution) × (1 - displacement) = 0.57
   */
  multiplicativeMultiplier: 0.57,
} as const;

// Type helper for TypeScript consumers
export type Assumptions = typeof ASSUMPTIONS;

// ═══════════════════════════════════════════════════════════════════
// SOURCES & REFERENCES
// ═══════════════════════════════════════════════════════════════════

export const SOURCES = [
  {
    author: 'U.S. Department of Justice – National Institute of Justice',
    year: 2017,
    title: 'The economic burden of intimate partner violence in the United States',
    url: 'https://nij.ojp.gov/',
    organization: undefined,
  },
  {
    author: 'Centers for Disease Control and Prevention',
    year: 2022,
    title: 'Preventing intimate partner violence',
    url: 'https://www.cdc.gov/violenceprevention/intimatepartnerviolence',
    organization: undefined,
  },
  {
    author: 'U.S. Department of Health and Human Services',
    year: 2020,
    title: 'The economic burden of child maltreatment in the United States, 2015',
    url: 'https://aspe.hhs.gov/',
    organization: undefined,
  },
  {
    author: 'Home Office',
    year: 2019,
    title: 'The economic and social costs of domestic abuse',
    organization: 'UK Government',
    url: 'https://www.gov.uk/government/publications/economic-and-social-costs-of-domestic-abuse',
  },
  {
    author: 'New Economics Foundation',
    year: 2009,
    title: 'Measuring the impact of services for women survivors of domestic violence: A Social Return on Investment (SROI) analysis',
    url: 'https://neweconomics.org',
    organization: undefined,
  },
  {
    author: 'HACT & Simetrica-Jacobs',
    year: 2022,
    title: 'Social Value Bank: Wellbeing valuation methodology',
    url: 'https://www.hact.org.uk/social-value-bank',
    organization: undefined,
  },
  {
    author: 'The SROI Network',
    year: 2012,
    title: 'A guide to Social Return on Investment',
    url: 'https://socialvalueint.org/resources',
    organization: undefined,
  },
] as const;

