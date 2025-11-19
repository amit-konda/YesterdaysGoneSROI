import { Info, ExternalLink } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ASSUMPTIONS, SOURCES } from '@/lib/assumptions';
import { formatCurrency, formatDecimal, formatPercent, formatNumber } from '@/lib/format';

interface AssumptionsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AssumptionRow {
  label: string;
  value: string;
  description: string;
}

export function AssumptionsSheet({ open, onOpenChange }: AssumptionsSheetProps) {
  const assumptions: AssumptionRow[] = [
    {
      label: 'Shelter capacity',
      value: `${ASSUMPTIONS.shelterCapacity.women} women + ${ASSUMPTIONS.shelterCapacity.children} children`,
      description: `Total capacity: ${ASSUMPTIONS.shelterCapacity.total} people at any given time.`,
    },
    {
      label: 'Operating budget (2024)',
      value: formatCurrency(ASSUMPTIONS.operatingExpensesAnnual),
      description: 'Annual operating expenses for the shelter program.',
    },
    {
      label: 'Cost per person-night',
      value: formatCurrency(ASSUMPTIONS.costPerBedNight),
      description:
        'Cost per safe night for one person (housing, utilities, overhead). Calculated as operating budget ÷ person-nights per year.',
    },
    {
      label: 'Cost per household-night',
      value: formatCurrency(ASSUMPTIONS.costPerHouseholdNight),
      description: 'Cost per safe night for one household (family unit).',
    },
    {
      label: 'Avg household size',
      value: formatDecimal(ASSUMPTIONS.avgHouseholdSize, 2),
      description:
        'Average number of people per household (women + children). Calculated as total people ÷ number of households.',
    },
    {
      label: 'Person-nights per year',
      value: formatNumber(ASSUMPTIONS.personNightsPerYear, 0),
      description: 'Total person-nights per year based on capacity (21 people × 365 days).',
    },
    {
      label: 'Household-nights per year',
      value: formatNumber(ASSUMPTIONS.householdNightsPerYear, 0),
      description: 'Total household-nights per year (9 households × 365 days).',
    },
    {
      label: 'Social value per person-night',
      value: formatCurrency(ASSUMPTIONS.socialValuePerPersonNight),
      description:
        'Social value generated per person-night. Based on balanced calculation (Women Mix 50/50 + Kids Moderate).',
    },
    {
      label: 'Social value per household-night',
      value: formatCurrency(ASSUMPTIONS.socialValuePerHouseholdNight),
      description: 'Social value generated per household-night (family unit).',
    },
    {
      label: 'Annual social value',
      value: formatCurrency(ASSUMPTIONS.annualSocialValue),
      description: 'Total annual social value generated (balanced calculation scenario).',
    },
    {
      label: 'Raw SROI',
      value: `${ASSUMPTIONS.rawSROI.toFixed(2)}x`,
      description: 'Social Return on Investment before additionality adjustments.',
    },
    {
      label: 'Adjusted SROI (multiplicative)',
      value: `${ASSUMPTIONS.adjustedSROIMultiplicative.toFixed(2)}x`,
      description:
        'SROI after applying multiplicative adjustment for deadweight, attribution, and displacement.',
    },
    {
      label: 'Adjusted SROI (subtractive)',
      value: `${ASSUMPTIONS.adjustedSROISubtractive.toFixed(2)}x`,
      description:
        'SROI after applying subtractive adjustment for deadweight, attribution, and displacement.',
    },
    {
      label: 'Deadweight',
      value: formatPercent(ASSUMPTIONS.deadweight, 0),
      description: 'Percentage of outcomes that would have happened anyway (25%).',
    },
    {
      label: 'Attribution',
      value: formatPercent(ASSUMPTIONS.attribution, 0),
      description: 'Percentage of outcomes contributed by others (20%).',
    },
    {
      label: 'Displacement',
      value: formatPercent(ASSUMPTIONS.displacement, 0),
      description: 'Percentage of outcomes moved elsewhere (5%).',
    },
    {
      label: 'Counseling session cost',
      value: formatCurrency(ASSUMPTIONS.counselingSessionCost),
      description: 'Per session with licensed professional. Context for donation scale.',
    },
    {
      label: 'Life coaching per week',
      value: formatCurrency(ASSUMPTIONS.coachingCostPerWeek),
      description: 'Life-coaching support and case navigation. Part of wraparound services.',
    },
    {
      label: 'Childcare support per week',
      value: formatCurrency(ASSUMPTIONS.childcareSupportPerWeek),
      description:
        'Partial childcare assistance. Enables mothers to participate and seek employment.',
    },
    {
      label: 'Transportation per week',
      value: formatCurrency(ASSUMPTIONS.transportationSupportPerWeek),
      description:
        'Bus passes, gas cards, etc. Removes barriers to appointments and services.',
    },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent onClose={() => onOpenChange(false)}>
        <SheetHeader>
          <SheetTitle>Model Assumptions</SheetTitle>
          <SheetDescription>
            Based on Safe Nights SROI Analysis (2024). Balanced calculation scenario:
            Women Mix 50/50 + Kids Moderate.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {assumptions.map((assumption, index) => (
            <div
              key={index}
              className="rounded-lg border bg-card p-4 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">
                    {assumption.label}
                  </p>
                  <p className="text-2xl font-bold text-primary mt-1">
                    {assumption.value}
                  </p>
                </div>
                <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {assumption.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-muted/50 text-xs text-muted-foreground">
          <p className="font-medium mb-1">About This Model</p>
          <p>
            All calculations are linear and deterministic for transparency. Values are
            based on the Safe Nights SROI Analysis (2024), using the balanced calculation
            scenario. The model accounts for additionality adjustments (deadweight,
            attribution, displacement) using both subtractive and multiplicative methods.
          </p>
        </div>

        {/* Sources Section */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Sources & References</h3>
          <div className="space-y-2">
            {SOURCES.map((source, index) => (
              <div
                key={index}
                className="text-xs text-muted-foreground p-2 rounded border bg-card"
              >
                <p className="font-medium text-foreground mb-1">
                  {source.author} ({source.year})
                </p>
                <p className="mb-1">{source.title}</p>
                {source.organization && (
                  <p className="text-xs opacity-75 mb-1">{source.organization}</p>
                )}
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  {source.url}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function AssumptionsTrigger({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="gap-2"
    >
      <Info className="h-4 w-4" />
      View Model Assumptions
    </Button>
  );
}

