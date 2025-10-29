import React, { useEffect, useState } from 'react';
import { DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';

interface DonationInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const QUICK_AMOUNTS = [50, 100, 250, 500, 1000];

export function DonationInput({
  value,
  onChange,
  min = 10,
  max = 10000,
  step = 10,
}: DonationInputProps) {
  const [localValue, setLocalValue] = useState(String(value));

  // Sync local value when prop changes
  useEffect(() => {
    setLocalValue(String(value));
  }, [value]);

  const clamp = (val: number) => Math.max(min, Math.min(max, val));

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setLocalValue(raw);

    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) {
      onChange(clamp(Math.round(parsed / step) * step));
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onChange(clamp(val));
  };

  const handleQuickAmount = (amount: number) => {
    onChange(clamp(amount));
  };

  return (
    <Card className="border-primary/20">
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Number Input */}
          <div>
            <label
              htmlFor="donation-amount"
              className="block text-sm font-medium mb-2 text-foreground"
            >
              Your donation amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="donation-amount"
                type="number"
                min={min}
                max={max}
                step={step}
                value={localValue}
                onChange={handleNumberChange}
                className="pl-10 text-lg font-semibold"
                aria-describedby="donation-range"
              />
            </div>
          </div>

          {/* Slider */}
          <div>
            <input
              id="donation-range"
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={handleSliderChange}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              aria-label="Donation amount slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{formatCurrency(min)}</span>
              <span>{formatCurrency(max)}</span>
            </div>
          </div>

          {/* Quick Amount Chips */}
          <div>
            <p className="text-sm font-medium mb-2 text-muted-foreground">
              Quick amounts
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK_AMOUNTS.map((amount) => (
                <Button
                  key={amount}
                  variant={value === amount ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleQuickAmount(amount)}
                  className={cn(
                    'transition-all',
                    value === amount && 'ring-2 ring-ring ring-offset-2'
                  )}
                >
                  {formatCurrency(amount)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

