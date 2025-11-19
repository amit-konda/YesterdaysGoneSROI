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
    const nights = Math.round(impact.nightsOffStreet);
    const counselingFraction =
      (debouncedDonation / context.counselingSession) * 100;
    const socialValue = Math.round(impact.socialValueGenerated);
    const sroi = impact.sroiRatio.adjusted.toFixed(2);

    return `Your ${formatCurrency(debouncedDonation)} keeps a mother and child safe for ${nights} night${nights !== 1 ? 's' : ''}, funds ${counselingFraction >= 100 ? 'at least one' : `~${counselingFraction.toFixed(0)}% of a`} counseling session, and generates ~${formatCurrency(socialValue)} in social value—an adjusted SROI of ${sroi}x. Every dollar creates ripples of stability, safety, and hope.`;
  }, [debouncedDonation, impact, context]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                Yesterday's Gone: Your Return
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                A place to live | A place to heal
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-6xl">
        {/* Hero Mission Card */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl">Our Mission</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Yesterday's Gone is dedicated to helping abused and neglected women
              transform into women of strength and dignity. We provide safe housing,
              comprehensive counseling, life coaching, and wraparound support services
              that break cycles of violence and create pathways to economic stability.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Language adapted from{' '}
              <a
                href="https://yesterdaysgone.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary transition-colors"
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
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <ImpactCard
            title="Nights Off the Street"
            value={formatNumber(impact.nightsOffStreet, 0)}
            description="Women + children housed safely"
            icon={Bed}
            tooltip="Calculated as (donation ÷ cost per person-night) × average household size. Shows total person-nights of safe housing funded."
          />
          <ImpactCard
            title="Social Value Generated"
            value={formatCurrency(impact.socialValueGenerated)}
            description="Based on SROI analysis"
            icon={DollarSign}
            tooltip="Social value generated based on person-nights × $72.64 per person-night (balanced calculation: Women Mix 50/50 + Kids Moderate)."
          />
          <ImpactCard
            title="Social Return on Investment"
            value={`${impact.sroiRatio.adjusted.toFixed(2)}x`}
            description="Adjusted (multiplicative)"
            icon={TrendingUp}
            tooltip={`Social Return on Investment ratio. Raw SROI: ${impact.sroiRatio.raw.toFixed(2)}x. Adjusted SROI accounts for deadweight (25%), attribution (20%), and displacement (5%) using multiplicative method.`}
          />
        </div>

        {/* Context Strip */}
        <Card className="mb-8 bg-muted/50">
          <CardContent className="pt-6">
            <div className="grid gap-4 sm:grid-cols-3 text-sm">
              <div>
                <p className="text-muted-foreground">Cost per safe night</p>
                <p className="font-semibold text-foreground">
                  ~{formatCurrency(context.costPerNight)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Counseling session</p>
                <p className="font-semibold text-foreground">
                  {formatCurrency(context.counselingSession)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Life coaching per week</p>
                <p className="font-semibold text-foreground">
                  {formatCurrency(context.coachingPerWeek)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Allocation Chart & Assumptions Side by Side */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <AllocationChart donation={debouncedDonation} />

          {/* Assumptions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About These Estimates</CardTitle>
              <CardDescription>
                All values are conservative placeholders for demonstration. Real
                impact requires program data validation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50 text-sm">
                  <p className="font-medium mb-2 text-foreground">
                    What makes this model transparent?
                  </p>
                  <ul className="space-y-1 text-muted-foreground text-xs list-disc list-inside">
                    <li>All calculations are linear and deterministic</li>
                    <li>Every assumption is documented and editable</li>
                    <li>No black-box algorithms or hidden parameters</li>
                    <li>Clear distinction between actual costs and impact models</li>
                  </ul>
                </div>

                <AssumptionsTrigger onClick={() => setAssumptionsOpen(true)} />

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Calculations are based on the Safe Nights SROI Analysis (2024),
                  using the balanced calculation scenario (Women Mix 50/50 + Kids Moderate).
                  All assumptions and sources are documented in the model assumptions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Story Section */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Your Impact in Context</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed text-foreground">{story}</p>
          </CardContent>
        </Card>

        {/* Call to Action Footer */}
        <Card className="bg-primary text-primary-foreground border-primary print:bg-white print:text-foreground">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Ready to Make a Difference?</h2>
              <p className="text-primary-foreground/90 max-w-2xl mx-auto print:text-foreground">
                Every donation—no matter the size—creates real, measurable impact in
                the lives of women and children escaping violence and rebuilding their
                futures.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 no-print">
                <a
                  href="https://yesterdaysgone.org/donate/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-11 rounded-md px-8 bg-white text-primary hover:bg-white/90 border border-white"
                >
                  Donate Now
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="https://yesterdaysgone.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-11 rounded-md px-8 hover:bg-white/10 text-primary-foreground border border-white/50 print:hidden"
                >
                  Learn More
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Attribution */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
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

