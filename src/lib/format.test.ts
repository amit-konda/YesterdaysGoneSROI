import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatNumber,
  formatDecimal,
  formatPercent,
  formatCurrencyWithCents,
} from './format';

describe('Format Utilities', () => {
  describe('formatCurrency', () => {
    it('should format whole dollar amounts without cents', () => {
      expect(formatCurrency(100)).toBe('$100');
      expect(formatCurrency(1000)).toBe('$1,000');
      expect(formatCurrency(10000)).toBe('$10,000');
    });

    it('should round to nearest dollar by default', () => {
      expect(formatCurrency(100.49)).toBe('$100');
      expect(formatCurrency(100.51)).toBe('$101');
    });

    it('should handle zero', () => {
      expect(formatCurrency(0)).toBe('$0');
    });

    it('should handle negative amounts', () => {
      expect(formatCurrency(-100)).toBe('-$100');
    });

    it('should respect custom options', () => {
      const result = formatCurrency(100, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      expect(result).toBe('$100.00');
    });
  });

  describe('formatNumber', () => {
    it('should format numbers with 1 decimal by default', () => {
      expect(formatNumber(2.46)).toBe('2.5');
      expect(formatNumber(10.12)).toBe('10.1');
    });

    it('should format whole numbers with specified decimals', () => {
      expect(formatNumber(5, 1)).toBe('5.0');
      expect(formatNumber(5, 0)).toBe('5');
    });

    it('should handle custom decimal places', () => {
      expect(formatNumber(3.14159, 2)).toBe('3.14');
      expect(formatNumber(3.14159, 3)).toBe('3.142');
    });

    it('should add thousands separator', () => {
      expect(formatNumber(1234.5, 1)).toBe('1,234.5');
    });
  });

  describe('formatDecimal', () => {
    it('should format small decimals with 3 places by default', () => {
      expect(formatDecimal(0.00456)).toBe('0.005');
      expect(formatDecimal(0.123)).toBe('0.123');
    });

    it('should handle custom decimal places', () => {
      expect(formatDecimal(0.00456, 4)).toBe('0.0046');
      expect(formatDecimal(0.00456, 2)).toBe('0.00');
    });

    it('should handle zero', () => {
      expect(formatDecimal(0, 3)).toBe('0.000');
    });
  });

  describe('formatPercent', () => {
    it('should format decimal as percentage with no decimals by default', () => {
      expect(formatPercent(0.55)).toBe('55%');
      expect(formatPercent(0.1)).toBe('10%');
      expect(formatPercent(1)).toBe('100%');
    });

    it('should handle custom decimal places', () => {
      expect(formatPercent(0.555, 1)).toBe('55.5%');
      expect(formatPercent(0.5555, 2)).toBe('55.55%');
    });

    it('should handle zero and one', () => {
      expect(formatPercent(0)).toBe('0%');
      expect(formatPercent(1)).toBe('100%');
    });
  });

  describe('formatCurrencyWithCents', () => {
    it('should always show cents', () => {
      expect(formatCurrencyWithCents(100)).toBe('$100.00');
      expect(formatCurrencyWithCents(100.5)).toBe('$100.50');
      expect(formatCurrencyWithCents(100.99)).toBe('$100.99');
    });

    it('should handle small amounts precisely', () => {
      expect(formatCurrencyWithCents(0.99)).toBe('$0.99');
      expect(formatCurrencyWithCents(12.34)).toBe('$12.34');
    });
  });
});

