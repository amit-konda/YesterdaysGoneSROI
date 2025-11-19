# Yesterday's Gone — SROI Estimator

A clean, modern, mobile-friendly React + Vite application that visualizes the Social Return on Investment (SROI) for donations to **Yesterday's Gone**, an Austin nonprofit helping abused and neglected women transform into women of strength and dignity.

## 🎯 Features

- **Interactive donation calculator** with slider, number input, and quick-select chips
- **Three live-updating impact metrics:**
  - Nights off the street (women + children)
  - Social value generated (based on SROI analysis)
  - SROI ratio (raw and adjusted)
- **Transparent assumptions drawer** with clearly documented values and sources
- **Allocation chart** showing how donations fund program costs
- **Human-centered story section** that translates numbers into plain English
- **Fully accessible** with proper ARIA labels, focus management, and keyboard navigation
- **Mobile-responsive** design with TailwindCSS
- **Print-friendly** layout (A4 portrait)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173/`

## 🏗️ Tech Stack

- **Framework:** React 18 + TypeScript
- **Build tool:** Vite 5
- **Styling:** TailwindCSS 3
- **UI Components:** Custom shadcn/ui components
- **Icons:** lucide-react
- **Charts:** Recharts
- **Testing:** Vitest

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/               # shadcn/ui base components
│   │   ├── card.tsx
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── sheet.tsx
│   ├── DonationInput.tsx       # Donation input with slider and chips
│   ├── ImpactCard.tsx          # Individual impact metric card
│   ├── AllocationChart.tsx     # Recharts donut visualization
│   └── AssumptionsSheet.tsx    # Modal with model assumptions
├── lib/
│   ├── assumptions.ts    # ⚠️ ALL MODEL ASSUMPTIONS (edit here!)
│   ├── calculations.ts   # SROI calculation functions
│   ├── format.ts         # Number/currency formatters
│   ├── colors.ts         # Brand color utilities
│   └── utils.ts          # General utilities (cn, etc.)
├── App.tsx               # Main application layout
├── main.tsx              # Vite entry point
└── index.css             # Global styles + Tailwind imports
```

## 📊 SROI Analysis

**All calculations are based on the Safe Nights SROI Analysis (2024).**

The model uses the balanced calculation scenario:
- **Women proxy**: Mix 50/50 ($19,200 per woman per year)
- **Children proxy**: Moderate ($32,000 per child per year)
- **Social value per person-night**: $72.64
- **Raw SROI**: 2.21x
- **Adjusted SROI (multiplicative)**: 1.26x

All assumptions, proxy values, and additionality adjustments are documented in the model assumptions panel, along with source citations.

## 🧮 SROI Model

The model uses three main calculations:

### 1. Nights Off the Street
```
nights = (donation / costPerBedNight) × avgHouseholdSize
```
Straightforward cost-per-night calculation multiplied by household size.

### 2. Social Value Generated
```
socialValue = nights × socialValuePerPersonNight
```
Social value based on person-nights × $72.64 per person-night (balanced calculation).

### 3. SROI Ratio
```
rawSROI = socialValue / donation
adjustedSROI = rawSROI × multiplicativeMultiplier
```
Social Return on Investment ratio, with adjustments for deadweight (25%), attribution (20%), and displacement (5%).

## 🧪 Testing

Unit tests cover all calculation functions with realistic scenarios:

```bash
npm test
```

Tests validate:
- Correct formula implementation
- Linear scaling with donation amount
- Edge cases ($10, $10,000)
- Real-world scenarios ($50, $100, $1,000)

## 🎨 Design System

The app uses Yesterday's Gone's brand colors (sampled from [yesterdaysgone.org](https://yesterdaysgone.org)):

- **Ink:** `#191919` (headings, body text)
- **Accent:** `hsl(200 60% 40%)` (CTAs, highlights)
- **Background:** `#f8fafc` (page background)

All components use:
- **Rounded corners:** `rounded-2xl` for cards
- **Generous whitespace** for readability
- **Soft shadows** for depth
- **System font stack** for performance

## ♿ Accessibility

- All inputs have proper labels and ARIA attributes
- Tooltips use `role="tooltip"` and `aria-describedby`
- Focus rings on all interactive elements
- Sufficient color contrast (WCAG AA)
- Keyboard navigation support
- Screen reader friendly

## 📱 Responsive Design

- **Mobile-first** approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px)
- Touch-friendly tap targets (min 44×44px)
- Optimized for phones, tablets, and desktop

## 🖨️ Print Support

The page is optimized for printing on A4 portrait paper:
- Background colors removed
- Interactive elements hidden (`.no-print`)
- Page breaks optimized
- Links show full URLs

## 📚 Additional Documentation

- **[Quick Reference](./QUICK_REFERENCE.md)** - Essential commands and key values
- **[Getting Started Guide](./GETTING_STARTED.md)** - Detailed setup and customization instructions
- **[WordPress Integration](./wordpress-plugin/INSTALLATION.md)** - Elementor widget installation guide

## 📄 License

This project is built for Yesterday's Gone, an Austin-based 501(c)(3) nonprofit organization.

For more information, visit [yesterdaysgone.org](https://yesterdaysgone.org)

---

**Questions or suggestions?** Open an issue or contact Yesterday's Gone directly through their website.

