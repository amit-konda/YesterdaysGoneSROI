/**
 * Formatting utilities for numbers, currency, and percentages
 */

/**
 * Format a number as USD currency
 * @param amount - The amount to format
 * @param options - Optional Intl.NumberFormat options
 */
export function formatCurrency(
  amount: number,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  }).format(amount);
}

/**
 * Format a number with specified decimal places
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 1)
 */
export function formatNumber(value: number, decimals: number = 1): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format a small decimal number (e.g., for violence prevention metric)
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 3)
 */
export function formatDecimal(value: number, decimals: number = 3): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format a number as a percentage
 * @param value - The decimal value (e.g., 0.55 for 55%)
 * @param decimals - Number of decimal places (default: 0)
 */
export function formatPercent(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format currency with full cents (for small amounts)
 */
export function formatCurrencyWithCents(amount: number): string {
  return formatCurrency(amount, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

