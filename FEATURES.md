# Features & Component Guide

## 🎨 Page Layout (Top to Bottom)

### 1. Sticky Header
- **Title:** "Yesterday's Gone — SROI Estimator"
- **Tagline:** "A place to live | A place to heal"
- **Icon:** Heart icon (desktop only)
- Stays at top when scrolling

### 2. Mission Card
- **Gradient background** (primary accent)
- Organization mission statement
- Link to yesterdaysgone.org
- Small footnote about placeholder values

### 3. Donation Input Card
```
┌─────────────────────────────────────┐
│ Your donation amount                │
│ [$] [    100    ] ← number input    │
│ [━━━━●━━━━━━━━━━] ← slider          │
│ $10                        $10,000  │
│                                     │
│ Quick amounts:                      │
│ [$50] [$100] [$250] [$500] [$1000] │
└─────────────────────────────────────┘
```
- Number input with dollar icon
- Synchronized slider (150ms debounce)
- 5 quick-select chips
- Min: $10, Max: $10,000, Step: $10

### 4. Impact Cards (3-column grid)

**Card 1: Nights Off the Street**
```
┌─────────────────────────────┐
│ 🛏️  Nights Off the Street   │
│                             │
│       2.5                   │
│                             │
│ Women + children housed     │
│ safely                      │
│                         ℹ️   │
└─────────────────────────────┘
```
- Bed icon
- Big animated number
- Description text
- Tooltip with formula explanation

**Card 2: Violence Prevented**
```
┌─────────────────────────────┐
│ 🛡️  Violence Prevented      │
│                             │
│      0.004                  │
│                             │
│ Expected incidents avoided  │
│                         ℹ️   │
└─────────────────────────────┘
```
- Shield icon
- 3 decimal places
- Warning in tooltip about expected-value model

**Card 3: Future Earnings Added**
```
┌─────────────────────────────┐
│ 📈 Future Earnings Added    │
│                             │
│      $29                    │
│                             │
│ Lifetime present value      │
│                         ℹ️   │
└─────────────────────────────┘
```
- Trending up icon
- Currency format
- Tooltip explains simplified economic model

### 5. Context Strip
```
┌─────────────────────────────────────────────┐
│ Cost per safe night    Counseling    Coach  │
│       ~$41                $120        $45   │
└─────────────────────────────────────────────┘
```
- 3-column grid (responsive: stacks on mobile)
- Shows program cost context
- Helps donors understand scale

### 6. Two-Column Section

**Left: Allocation Chart**
```
┌─────────────────────────────┐
│ How Your Donation Is Used   │
│                             │
│        ╱─────╲              │
│       │   ○   │  Donut      │
│        ╲─────╱   Chart      │
│                             │
│ ▪️ Housing 55%              │
│ ▪️ Counseling 15%           │
│ ▪️ Coaching 10%             │
│ ... (6 slices total)        │
└─────────────────────────────┘
```
- Recharts donut chart
- 6 allocation categories
- Hover tooltips show $ amounts
- Neutral colors, accent on largest slice

**Right: Assumptions Info**
```
┌─────────────────────────────┐
│ About These Estimates       │
│                             │
│ What makes this transparent?│
│ • Linear calculations       │
│ • Documented assumptions    │
│ • No black boxes            │
│ • Clear cost vs. impact     │
│                             │
│ [ℹ️  View Model Assumptions]│
│                             │
│ ⚠️ Update before public use │
└─────────────────────────────┘
```
- Brief transparency statement
- Button to open assumptions sheet
- Warning about placeholder values

### 7. Story Section
```
┌─────────────────────────────────────────────┐
│ Your Impact in Context                      │
│                                             │
│ Your $100 keeps a mother and child safe for │
│ 2 nights, funds ~83% of a counseling        │
│ session, and adds ~$29 in lifetime earnings │
│ potential. Every dollar creates ripples of  │
│ stability, safety, and hope.                │
└─────────────────────────────────────────────┘
```
- Dynamically generated based on donation
- Plain English, empathetic tone
- Humanizes the numbers
- 8th grade reading level

### 8. Call-to-Action Footer
```
┌─────────────────────────────────────────────┐
│         Ready to Make a Difference?         │
│                                             │
│ Every donation creates real, measurable     │
│ impact in the lives of women and children   │
│ escaping violence...                        │
│                                             │
│    [Donate Now ↗]  [Learn More ↗]          │
└─────────────────────────────────────────────┘
```
- Primary accent background
- White text
- Two prominent buttons
- Links open in new tabs
- Hidden in print view

### 9. Footer Attribution
- Small text
- Links to yesterdaysgone.org
- Disclaimer about SROI estimates

## 🎭 Modal: Assumptions Sheet

Triggered by "View Model Assumptions" button:

```
┌─────────────────────────────────────┐
│ Model Assumptions              [×]  │
│                                     │
│ These are conservative placeholders │
│ ...                                 │
│                                     │
│ ┌─────────────────────────────┐    │
│ │ Cost per bed-night      ℹ️   │    │
│ │      $65                    │    │
│ │ Cost per safe night for one │    │
│ │ person (housing, utilities, │    │
│ │ overhead)...                │    │
│ └─────────────────────────────┘    │
│                                     │
│ (9 assumption cards total)          │
│                                     │
│ ⚠️ Important Note                   │
│ All calculations are linear...      │
│                                     │
│         [Close]                     │
└─────────────────────────────────────┐
```

Each assumption card shows:
- Label
- **Large formatted value**
- ℹ️ Info icon
- Detailed description

9 assumptions total:
1. Cost per bed-night ($65)
2. Avg household size (1.6)
3. Counseling session cost ($120)
4. Life coaching per week ($45)
5. Childcare support per week ($80)
6. Transportation per week ($25)
7. Risk reduction per week (0.0020)
8. Lifetime PV per month ($350)
9. Discount rate (3.0%)

## ✨ Interactive Features

### Animations
- **Fade in/out** when impact numbers change
- **Slide up** effect for new values (150ms)
- Smooth **hover states** on all buttons
- **Focus rings** for keyboard navigation

### Debouncing
- 150ms debounce on donation input
- Prevents excessive recalculation
- Smooth user experience

### Tooltips
- Appear on **hover** (desktop)
- Appear on **focus** (keyboard)
- Auto-position to avoid overflow
- Include detailed explanations

### Responsive Behavior
- **Mobile:** Single column layout
- **Tablet:** 2-column for some sections
- **Desktop:** 3-column for impact cards
- Touch-friendly tap targets (44×44px minimum)

### Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to activate buttons
- Escape to close modal
- Focus visible with rings

### Print Optimization
- A4 portrait layout
- Remove background colors
- Hide interactive elements (no-print class)
- Show full URLs for links
- 2cm margins

## 🎨 Design System

### Colors
- **Primary:** `hsl(200 60% 40%)` - Blue-green accent
- **Ink:** `#191919` - Near-black text
- **Background:** `#f8fafc` - Soft gray-white
- **Muted:** `hsl(200 20% 96%)` - Light gray
- **Border:** `hsl(200 20% 90%)` - Subtle borders

### Typography
- **System font stack** (no web fonts)
- **Headings:** 600 weight, tight tracking
- **Body:** 400 weight, relaxed line-height
- **Numbers:** 700 weight, tabular figures

### Spacing
- **Generous whitespace** between sections
- **Padding:** 1.5rem (24px) standard
- **Gaps:** 1.5-2rem between cards
- **Container max-width:** 72rem (1152px)

### Borders & Shadows
- **Border radius:** 1rem (16px) - "rounded-2xl"
- **Card shadows:** Soft, subtle depth
- **No harsh lines** - all borders muted

### Icons
- **Lucide React** icon set
- **Size:** 1.25rem (20px) standard
- **Color:** Primary or muted-foreground
- **Semantic usage:** Bed, Shield, TrendUp, Heart, Info, etc.

## 📱 Responsive Breakpoints

```css
sm:  640px   /* Tablets */
md:  768px   /* Small laptops */
lg:  1024px  /* Desktops */
```

### Mobile (< 640px)
- Single column layout
- Stacked cards
- Full-width buttons
- Simplified header

### Tablet (640px - 1024px)
- 2-column for some sections
- Impact cards 2-wide, then 1
- Side-by-side buttons

### Desktop (> 1024px)
- 3-column impact cards
- 2-column chart + assumptions
- Maximum content width

## ♿ Accessibility Features

- ✅ **ARIA labels** on all inputs
- ✅ **ARIA-describedby** for tooltips
- ✅ **Role attributes** (tooltip, etc.)
- ✅ **Focus management** in modal
- ✅ **Semantic HTML** (header, main, footer)
- ✅ **Alt text** for decorative icons (aria-hidden)
- ✅ **Color contrast** meets WCAG AA
- ✅ **Keyboard navigation** fully supported
- ✅ **Screen reader** friendly labels
- ✅ **Focus visible** indicators

## 🔢 Number Formatting

- **Currency:** `$1,234` (no cents for whole dollars)
- **Currency (precise):** `$12.34` (when needed)
- **Decimals:** `2.5` (1 decimal for nights)
- **Small decimals:** `0.004` (3 decimals for violence)
- **Percentages:** `55%` (no decimals)
- **Thousands separator:** Always included

## 🧪 Test Coverage

**Unit tests for:**
- ✅ All 3 SROI calculations
- ✅ All number formatters
- ✅ Edge cases ($10, $10,000)
- ✅ Real scenarios ($50, $100, $1,000)
- ✅ Linear scaling verification
- ✅ Context metrics

**Manual testing checklist:**
- [ ] Slider syncs with number input
- [ ] Quick chips update both inputs
- [ ] Impact cards animate on change
- [ ] Tooltips appear on hover/focus
- [ ] Modal opens/closes correctly
- [ ] Links open in new tabs
- [ ] Responsive layout works
- [ ] Keyboard navigation works
- [ ] Print layout looks good
- [ ] Tests pass: `npm test`

---

**Ready to see it in action?** Run `npm install && npm run dev`! 🚀

