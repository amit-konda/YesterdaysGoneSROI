# Quick Reference Card

## Essential Commands

```bash
# First time setup
npm install

# Development
npm run dev          # Start dev server at http://localhost:5173

# Testing
npm test             # Run tests once
npm test -- --watch  # Run tests in watch mode

# Production
npm run build        # Build for production
npm run preview      # Preview production build
```

## Key Files to Edit

| File | Purpose |
|------|---------|
| `src/lib/assumptions.ts` | **All model assumptions and sources** |
| `src/lib/calculations.ts` | SROI calculation functions |
| `src/index.css` | Brand colors (lines 5-7) |
| `src/App.tsx` | Mission text, story content |
| `src/components/DonationInput.tsx` | Quick amount chips (line 14) |
| `src/components/AllocationChart.tsx` | Program allocation % (lines 19-26) |

## Project Structure

```
src/
├── lib/
│   ├── assumptions.ts    ← ⚠️ EDIT THIS FIRST
│   ├── calculations.ts   ← SROI formulas
│   └── format.ts         ← Number formatting
├── components/
│   ├── DonationInput.tsx
│   ├── ImpactCard.tsx
│   ├── AllocationChart.tsx
│   └── AssumptionsSheet.tsx
└── App.tsx               ← Main layout
```

## SROI Formulas

```typescript
// Nights off street
nights = (donation / costPerBedNight) × avgHouseholdSize

// Social value generated
socialValue = nights × socialValuePerPersonNight

// SROI ratio
rawSROI = socialValue / donation
adjustedSROI = rawSROI × multiplicativeMultiplier
```

## Key Values (Based on Safe Nights SROI Analysis 2024)

- Cost per person-night: **$32.85**
- Cost per household-night: **$76.71**
- Avg household size: **2.33**
- Social value per person-night: **$72.64**
- Social value per household-night: **$169.50**
- Raw SROI: **2.21x**
- Adjusted SROI (multiplicative): **1.26x**
- Operating budget (2024): **$252,000**
- Shelter capacity: **9 women + 12 children (21 total)**

## Donation Range

- Minimum: **$10**
- Maximum: **$10,000**
- Step: **$10**
- Default: **$100**

## Quick Amounts

$50, $100, $250, $500, $1,000

## Colors

- Primary (accent): `hsl(200 60% 40%)`
- Ink (text): `#191919`
- Background: `#f8fafc`

## Tech Stack

- React 18 + TypeScript
- Vite 5
- TailwindCSS 3
- Recharts (charts)
- Lucide React (icons)
- Vitest (testing)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Chrome Android 90+

## Links

- [Yesterday's Gone](https://yesterdaysgone.org)
- [Donate](https://yesterdaysgone.org/donate/)
- [Full Documentation](./README.md)
- [Getting Started Guide](./GETTING_STARTED.md)

