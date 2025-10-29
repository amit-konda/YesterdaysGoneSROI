import React, { useState, useEffect, useMemo } from 'react';
import { Bed, Shield, TrendingUp, ExternalLink } from 'lucide-react';
import { DonationInput } from '@/components/DonationInput';
import { ImpactCard } from '@/components/ImpactCard';
import { AllocationChart } from '@/components/AllocationChart';
import { AssumptionsSheet, AssumptionsTrigger } from '@/components/AssumptionsSheet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { calculateImpact, getContextMetrics } from '@/lib/calculations';
import { formatCurrency, formatNumber, formatDecimal } from '@/lib/format';

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

  // Generate human-centered story based on impact
  const story = useMemo(() => {
    const nights = Math.round(impact.nightsOffStreet);
    const counselingFraction =
      (debouncedDonation / context.counselingSession) * 100;
    const earnings = Math.round(impact.futureEarnings);

    return `Your ${formatCurrency(debouncedDonation)} keeps a mother and child safe for ${nights} night${nights !== 1 ? 's' : ''}, funds ${counselingFraction >= 100 ? 'at least one' : `~${counselingFraction.toFixed(0)}% of a`} counseling session, and adds ~${formatCurrency(earnings)} in lifetime earnings potential. Every dollar creates ripples of stability, safety, and hope.`;
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
              . Calculations are illustrative placeholders pending stakeholder review.
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
            tooltip="Calculated as (donation ÷ cost per bed-night) × average household size. Shows total person-nights of safe housing funded."
          />
          <ImpactCard
            title="Violence Prevented"
            value={formatDecimal(impact.violencePrevented, 3)}
            description="Expected incidents avoided"
            icon={Shield}
            tooltip="Expected-value estimate. Each week of stable housing + counseling reduces risk by a small probability. Placeholder—update with program data and peer-reviewed methodology."
          />
          <ImpactCard
            title="Future Earnings Added"
            value={formatCurrency(impact.futureEarnings)}
            description="Lifetime present value"
            icon={TrendingUp}
            tooltip="Simplified economic mobility model. Each month of stability + coaching increases employment likelihood and wage trajectory. Conservative placeholder requiring longitudinal validation."
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
                  Violence prevention and economic mobility figures are simplified
                  expected-value models. Update with longitudinal outcome data and
                  peer-reviewed methodology before public use.
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
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-primary hover:bg-white/90 border-white"
                  asChild
                >
                  <a
                    href="https://yesterdaysgone.org/donate/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Donate Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-primary-foreground border-white/50 hover:bg-white/10 hover:text-primary-foreground print:hidden"
                  asChild
                >
                  <a
                    href="https://yesterdaysgone.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
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

