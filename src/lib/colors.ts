/**
 * Color utilities for Yesterday's Gone brand
 * 
 * Attempts to read CSS variables from the page root,
 * with safe fallbacks if sampling fails.
 */

export interface YGColors {
  ink: string;
  accent: string;
  bg: string;
}

/**
 * Get Yesterday's Gone brand colors from CSS custom properties
 * Falls back to safe defaults if not available
 */
export function getYGColors(): YGColors {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    // SSR fallback
    return {
      ink: '#191919',
      accent: '#8E5B33',
      bg: '#f8fafc',
    };
  }

  try {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);

    return {
      ink: computedStyle.getPropertyValue('--yg-ink')?.trim() || '#191919',
      accent: computedStyle.getPropertyValue('--yg-accent')?.trim() || '#8E5B33',
      bg: computedStyle.getPropertyValue('--yg-bg')?.trim() || '#f8fafc',
    };
  } catch (error) {
    console.warn('Could not read YG brand colors from CSS, using defaults:', error);
    return {
      ink: '#191919',
      accent: '#8E5B33',
      bg: '#f8fafc',
    };
  }
}

/**
 * Chart colors for allocation visualization
 * Neutral tones with accent for the primary slice
 */
export const CHART_COLORS = [
  'hsl(26 47% 40%)',  // Primary (housing) - brand accent
  'hsl(26 25% 62%)',  // Secondary (warm neutral)
  'hsl(26 20% 72%)',  // Tertiary
  'hsl(26 15% 78%)',  // Quaternary
  'hsl(26 10% 84%)',  // Quinary
  'hsl(26 6% 88%)',   // Senary
] as const;

