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
  min = 0,
  max = 10000,
  step = 10,
}: DonationInputProps) {
  const [localValue, setLocalValue] = useState(String(value));
  const [isFocused, setIsFocused] = useState(false);

  // Sync local value when prop changes (but not while user is typing)
  useEffect(() => {
    if (!isFocused) {
      setLocalValue(String(value));
    }
  }, [value, isFocused]);

  const clamp = (val: number) => Math.max(min, Math.min(max, val));

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setLocalValue(raw);

    // Only update parent if it's a valid number, but don't round while typing
    const parsed = parseFloat(raw);
    if (!isNaN(parsed) && raw !== '' && raw !== '-') {
      // Allow any value while typing, just clamp it
      const clamped = clamp(parsed);
      onChange(clamped);
    } else if (raw === '' || raw === '-') {
      // Allow empty or minus sign while typing
      // Don't update parent yet
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    const parsed = parseFloat(localValue);
    if (!isNaN(parsed)) {
      // Just clamp to min/max, no rounding
      const clamped = clamp(parsed);
      setLocalValue(String(clamped));
      onChange(clamped);
    } else {
      // If invalid, reset to current value
      setLocalValue(String(value));
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
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
    <Card className="glass shadow-xl">
      <CardContent className="pt-8 pb-8">
        <div className="space-y-8">
          {/* Number Input */}
          <div>
            <label
              htmlFor="donation-amount"
              className="block text-base font-semibold mb-4 text-foreground uppercase tracking-wide"
            >
              Your donation amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-primary z-10" />
              <Input
                id="donation-amount"
                type="number"
                min={min}
                max={max}
                step={step}
                value={localValue}
                onChange={handleNumberChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                className="pl-12 text-3xl font-bold h-20 border-2 bg-background/50 backdrop-blur-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
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
              className="w-full h-3 bg-secondary rounded-full appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
              style={{
                background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${((value - min) / (max - min)) * 100}%, hsl(var(--secondary)) ${((value - min) / (max - min)) * 100}%, hsl(var(--secondary)) 100%)`
              }}
              aria-label="Donation amount slider"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2 font-medium">
              <span>{formatCurrency(min)}</span>
              <span>{formatCurrency(max)}</span>
            </div>
          </div>

          {/* Quick Amount Chips */}
          <div>
            <p className="text-base font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
              Quick amounts
            </p>
            <div className="flex flex-wrap gap-3">
              {QUICK_AMOUNTS.map((amount) => (
                <Button
                  key={amount}
                  variant={value === amount ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleQuickAmount(amount)}
                  className={cn(
                    'transition-all duration-200 font-semibold',
                    value === amount 
                      ? 'ring-2 ring-primary ring-offset-2 shadow-md scale-105' 
                      : 'hover:scale-105 hover:shadow-sm'
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

