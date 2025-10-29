# Getting Started with Yesterday's Gone SROI Estimator

## 📦 Installation

```bash
# Navigate to project directory
cd "/Users/amitk./Downloads/SROI Visual"

# Install all dependencies
npm install
```

This will install:
- React 18 + TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- Recharts (charts)
- Lucide React (icons)
- Vitest (testing)
- All other dependencies

## 🚀 Running the App

```bash
# Start development server
npm run dev
```

The app will start at `http://localhost:5173/`

Open your browser and navigate to that URL. You should see the SROI calculator with:
- A donation input slider
- Three impact metric cards
- An allocation chart
- A story section

Try changing the donation amount and watch the metrics update in real-time!

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

All tests should pass. The test suite covers:
- All three SROI calculation functions
- Number and currency formatting
- Edge cases ($10, $10,000)
- Real-world scenarios ($50, $100, $1,000)

## 🏗️ Building for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` directory.

## 🎨 Customizing the App

### 1. Update Assumptions (IMPORTANT!)

⚠️ **Before deploying publicly, you MUST update the placeholder values.**

Open `src/lib/assumptions.ts` and update all values:

```typescript
export const ASSUMPTIONS = {
  costPerBedNight: 65,  // ← Replace with actual cost
  avgHouseholdSize: 1.6, // ← Replace with actual data
  // ... etc
}
```

Each assumption has extensive documentation explaining what it means.

### 2. Change Colors

Brand colors are defined in `src/index.css`:

```css
:root {
  --yg-ink: #191919;
  --yg-accent: hsl(200 60% 40%);
  --yg-bg: #f8fafc;
}
```

### 3. Modify Quick Amount Chips

In `src/components/DonationInput.tsx`:

```typescript
const QUICK_AMOUNTS = [50, 100, 250, 500, 1000]; // ← Change these
```

### 4. Adjust Allocation Percentages

In `src/components/AllocationChart.tsx`:

```typescript
const ALLOCATION: AllocationItem[] = [
  { label: 'Housing & Utilities', value: 0.55 }, // ← Adjust percentages
  // ...
];
```

### 5. Update Mission Text

In `src/App.tsx`, search for "Our Mission" and update the card content.

## 🐛 Troubleshooting

### "Cannot find module 'react'" errors

**Solution:** Run `npm install` first. These errors occur when dependencies aren't installed yet.

### Slider not working

**Solution:** Clear browser cache and reload. Sometimes Vite's hot reload can cause issues.

### Tests failing

**Solution:** Ensure you have Node.js 18+ installed:
```bash
node --version  # Should be v18 or higher
```

### Port 5173 already in use

**Solution:** Vite will automatically use the next available port (5174, 5175, etc.). Check the terminal output for the actual URL.

## 📱 Testing on Mobile

To test on a mobile device on the same network:

1. Start the dev server: `npm run dev`
2. Find your computer's IP address:
   - Mac: `ifconfig | grep "inet "`
   - Windows: `ipconfig`
3. On your phone, navigate to `http://YOUR_IP:5173`

Example: `http://192.168.1.10:5173`

## 🖨️ Print Testing

1. Open the app in a browser
2. Press `Cmd + P` (Mac) or `Ctrl + P` (Windows)
3. Set paper size to A4 portrait
4. Verify layout fits on one page
5. Check that interactive elements are hidden

## 📊 Understanding the Calculations

### Nights Off the Street
```
nights = (donation / $65) × 1.6
```
Simple cost-per-night calculation with household multiplier.

### Violence Prevented
```
weeks = nights / 7
incidents = weeks × 0.002 × 1.6
```
Expected-value model. Update with real program data.

### Future Earnings
```
months = nights / 30
earnings = months × $350
```
Lifetime present value model. Update with employment data.

## 🎯 Next Steps

1. ✅ Run `npm install`
2. ✅ Run `npm run dev` to see the app
3. ✅ Run `npm test` to verify tests pass
4. ⚠️ Update `src/lib/assumptions.ts` with real data
5. 🎨 Customize colors and content as needed
6. 🚀 Build and deploy: `npm run build`

## 💬 Questions?

- Check the main `README.md` for detailed documentation
- Open `src/lib/assumptions.ts` to understand the model
- Review `src/lib/calculations.ts` to see the formulas
- Visit [yesterdaysgone.org](https://yesterdaysgone.org) for more about the organization

---

**Ready to start?** Run `npm install` now! 🚀

