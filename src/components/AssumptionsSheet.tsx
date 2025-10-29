import React from 'react';
import { Info } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ASSUMPTIONS } from '@/lib/assumptions';
import { formatCurrency, formatDecimal, formatPercent } from '@/lib/format';

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
      label: 'Cost per bed-night',
      value: formatCurrency(ASSUMPTIONS.costPerBedNight),
      description:
        'Cost per safe night for one person (housing, utilities, overhead). Base unit for calculations.',
    },
    {
      label: 'Avg household size',
      value: formatDecimal(ASSUMPTIONS.avgHouseholdSize, 1),
      description:
        'Women + dependent children served per unit. Multiplier for impact metrics.',
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
    {
      label: 'Risk reduction per week',
      value: formatDecimal(ASSUMPTIONS.baselineRiskReductionPerStabilizedWeek, 4),
      description:
        'Expected incidents of violence avoided per participant per stabilized week. This is an illustrative expected-value model, not a causal claim. Update with program data.',
    },
    {
      label: 'Lifetime PV per month',
      value: formatCurrency(ASSUMPTIONS.lifetimePVPerStabilizedMonth),
      description:
        'Lifetime present value of earnings increase per participant-month stabilized. Conservative placeholder for economic mobility model.',
    },
    {
      label: 'Discount rate',
      value: formatPercent(ASSUMPTIONS.discountRate, 1),
      description:
        'Real discount rate for present value calculations. Standard assumption for long-term impact.',
    },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent onClose={() => onOpenChange(false)}>
        <SheetHeader>
          <SheetTitle>Model Assumptions</SheetTitle>
          <SheetDescription>
            These are conservative placeholder values. Update with actual program data
            after stakeholder review.
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
          <p className="font-medium mb-1">⚠️ Important Note</p>
          <p>
            All calculations are linear and deterministic for transparency. Violence
            prevention and economic mobility models are simplified expected-value
            estimates. Real impact assessment requires longitudinal data, control
            groups, and peer-reviewed methodology.
          </p>
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

