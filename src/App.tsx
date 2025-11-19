import { useState, useEffect, useMemo } from 'react';
import { Bed, TrendingUp, DollarSign, ExternalLink } from 'lucide-react';
import { DonationInput } from '@/components/DonationInput';
import { ImpactCard } from '@/components/ImpactCard';
import { AllocationChart } from '@/components/AllocationChart';
import { AssumptionsSheet, AssumptionsTrigger } from '@/components/AssumptionsSheet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateImpact, getContextMetrics } from '@/lib/calculations';
import { formatCurrency, formatNumber } from '@/lib/format';

function App() {
  const [donation, setDonation] = useState(100);
  const [debouncedDonation, setDebouncedDonation] = useState(100);
  const [assumptionsOpen, setAssumptionsOpen] = useState(false);

  // Debounce donation changes for smooth UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedDonation(donation);
    }, 150);
    return () => clearTimeout(timer);
  }, [donation]);

  const impact = useMemo(
    () => calculateImpact(debouncedDonation),
    [debouncedDonation]
  );

  const context = useMemo(() => getContextMetrics(), []);

  // Auto-resize iframe height when embedded (for WordPress/Elementor)
  useEffect(() => {
    // Only run if we're in an iframe
    if (window.parent === window) return;

    const sendHeight = () => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage(
        {
          type: 'sroi-height',
          height: height,
        },
        '*'
      );
    };

    // Send height on mount
    sendHeight();

    // Send height on resize
    const resizeObserver = new ResizeObserver(sendHeight);
    resizeObserver.observe(document.body);

    window.addEventListener('resize', sendHeight);

    // Also send height when content changes (e.g., when assumptions sheet opens)
    const mutationObserver = new MutationObserver(sendHeight);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    // Send height when assumptions sheet opens/closes
    const handleAssumptionsChange = () => {
      setTimeout(sendHeight, 100); // Small delay to allow animation
    };
    handleAssumptionsChange();

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('resize', sendHeight);
    };
  }, [assumptionsOpen]);

  // Generate human-centered story based on impact
  const story = useMemo(() => {
    const nights = impact.nightsOffStreet;
    const nightsFormatted = nights === 0 
      ? '0.00' 
      : nights < 1 
        ? formatNumber(nights, 2) 
        : nights < 10 
          ? formatNumber(nights, 1) 
          : Math.round(nights).toString();
    const nightsText = nights === 1 ? 'night' : 'nights';
    
    const counselingFraction =
      (debouncedDonation / context.counselingSession) * 100;
    const socialValue = impact.socialValueGenerated;
    const socialValueFormatted = socialValue === 0
      ? formatCurrency(0, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : socialValue < 1
        ? formatCurrency(socialValue, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : formatCurrency(socialValue);
    const sroi = impact.sroiRatio.raw.toFixed(2);

    return `Your ${formatCurrency(debouncedDonation)} keeps a mother and child safe for ${nightsFormatted} ${nightsText}, funds ${counselingFraction >= 100 ? 'at least one' : `~${counselingFraction.toFixed(0)}% of a`} counseling session, and generates ~${socialValueFormatted} in social value—a raw SROI of ${sroi}x. Every dollar creates ripples of stability, safety, and hope.`;
  }, [debouncedDonation, impact, context]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(142,91,51,0.03),transparent_50%)]" />
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b glass shadow-sm">
        <div className="container mx-auto px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                Yesterday's Gone: Your Return
              </h1>
              <p className="text-base text-muted-foreground mt-1.5 font-medium">
                A place to live | A place to heal
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        {/* Hero Mission Card */}
        <Card className="mb-10 glass-strong overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-50 group-hover:opacity-75 transition-opacity" />
          <CardHeader className="relative">
            <CardTitle className="text-4xl font-bold tracking-tight text-foreground">Our Mission</CardTitle>
            <CardDescription className="text-lg leading-relaxed mt-4 text-foreground/85">
              Yesterday's Gone is dedicated to helping abused and neglected women
              transform into women of strength and dignity. We provide safe housing,
              comprehensive counseling, life coaching, and wraparound support services
              that break cycles of violence and create pathways to economic stability.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-sm text-muted-foreground">
              Language adapted from{' '}
              <a
                href="https://yesterdaysgone.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary transition-colors font-medium"
              >
                Yesterday's Gone
              </a>
              . Calculations based on Safe Nights SROI Analysis (2024).
            </p>
          </CardContent>
        </Card>

        {/* Donation Input */}
        <div className="mb-8">
          <DonationInput value={donation} onChange={setDonation} />
        </div>

        {/* Impact Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3 mb-10">
          <ImpactCard
            title="Nights Off the Street"
            value={impact.nightsOffStreet === 0 
              ? '0.00' 
              : formatNumber(impact.nightsOffStreet, impact.nightsOffStreet < 1 ? 2 : 1)}
            description="Women + children housed safely"
            icon={Bed}
            tooltip="Calculated as (donation ÷ cost per person-night) × average household size. Shows total person-nights of safe housing funded."
          />
          <ImpactCard
            title="Social Value Generated"
            value={impact.socialValueGenerated === 0
              ? formatCurrency(0, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              : impact.socialValueGenerated < 1 
                ? formatCurrency(impact.socialValueGenerated, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                : formatCurrency(impact.socialValueGenerated)}
            description="Based on SROI analysis"
            icon={DollarSign}
            tooltip="Social value generated based on person-nights × $72.64 per person-night (balanced calculation: Women Mix 50/50 + Kids Moderate)."
          />
          <ImpactCard
            title="Social Return on Investment"
            value={`${impact.sroiRatio.raw.toFixed(2)}x`}
            description="Raw SROI ratio"
            icon={TrendingUp}
            tooltip={`Social Return on Investment ratio. This is the raw SROI before additionality adjustments. Adjusted SROI (accounting for deadweight, attribution, and displacement) is ${impact.sroiRatio.adjusted.toFixed(2)}x.`}
          />
        </div>

        {/* Context Strip */}
        <Card className="mb-10 glass-tinted">
          <CardContent className="pt-6">
            <div className="grid gap-6 sm:grid-cols-3 text-sm">
              <div className="text-center sm:text-left">
                <p className="text-muted-foreground mb-1.5 text-sm uppercase tracking-wide font-medium">Cost per safe night</p>
                <p className="font-bold text-xl text-foreground">
                  ~{formatCurrency(context.costPerNight)}
                </p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-muted-foreground mb-1.5 text-sm uppercase tracking-wide font-medium">Counseling session</p>
                <p className="font-bold text-xl text-foreground">
                  {formatCurrency(context.counselingSession)}
                </p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-muted-foreground mb-1.5 text-sm uppercase tracking-wide font-medium">Life coaching per week</p>
                <p className="font-bold text-xl text-foreground">
                  {formatCurrency(context.coachingPerWeek)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Allocation Chart & Assumptions Side by Side */}
        <div className="grid gap-6 lg:grid-cols-2 mb-10">
          <AllocationChart donation={debouncedDonation} />

          {/* Assumptions Card */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">About These Estimates</CardTitle>
              <CardDescription className="text-base text-foreground/75">
                All values are conservative placeholders for demonstration. Real
                impact requires program data validation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg glass-light text-sm">
                  <p className="font-medium mb-2 text-foreground">
                    What makes this model transparent?
                  </p>
                  <ul className="space-y-1.5 text-muted-foreground text-sm list-disc list-inside">
                    <li>All calculations are linear and deterministic</li>
                    <li>Every assumption is documented and editable</li>
                    <li>No black-box algorithms or hidden parameters</li>
                    <li>Clear distinction between actual costs and impact models</li>
                  </ul>
                </div>

                <AssumptionsTrigger onClick={() => setAssumptionsOpen(true)} />

                <p className="text-sm text-muted-foreground leading-relaxed">
                  Calculations are based on the Safe Nights SROI Analysis (2024),
                  using the balanced calculation scenario (Women Mix 50/50 + Kids Moderate).
                  All assumptions and sources are documented in the model assumptions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Story Section */}
        <Card className="mb-10 glass">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground">Your Impact in Context</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-foreground font-medium">{story}</p>
          </CardContent>
        </Card>

        {/* Call to Action Footer */}
        <Card className="bg-primary text-primary-foreground border-primary shadow-2xl print:bg-white print:text-foreground overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
          <CardContent className="pt-8 pb-8 relative">
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-bold tracking-tight">Ready to Make a Difference?</h2>
              <p className="text-primary-foreground/95 max-w-2xl mx-auto text-xl leading-relaxed print:text-foreground">
                Every donation—no matter the size—creates real, measurable impact in
                the lives of women and children escaping violence and rebuilding their
                futures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 no-print">
                <a
                  href="https://yesterdaysgone.org/donate/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary h-12 px-8 bg-white text-primary hover:bg-white/95 hover:shadow-xl hover:scale-105 border-2 border-white"
                >
                  Donate Now
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="https://yesterdaysgone.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary h-12 px-8 hover:bg-white/20 text-primary-foreground border-2 border-white/60 hover:border-white/80 print:hidden"
                >
                  Learn More
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Attribution */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Built for Yesterday's Gone • Austin, TX •{' '}
            <a
              href="https://yesterdaysgone.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary transition-colors"
            >
              yesterdaysgone.org
            </a>
          </p>
          <p className="mt-2">
            SROI estimates are for planning and communication purposes. Not financial
            advice.
          </p>
        </div>
      </main>

      {/* Assumptions Sheet (Modal) */}
      <AssumptionsSheet
        open={assumptionsOpen}
        onOpenChange={setAssumptionsOpen}
      />
    </div>
  );
}

export default App;

