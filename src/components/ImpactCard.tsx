import React, { useEffect, useState } from 'react';
import { LucideIcon, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ImpactCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  tooltip?: string;
  className?: string;
}

export function ImpactCard({
  title,
  value,
  description,
  icon: Icon,
  tooltip,
  className,
}: ImpactCardProps) {
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setMounted(false);
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <Card className={cn('transition-all duration-300', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <CardTitle className="text-base font-medium">{title}</CardTitle>
          </div>
          {tooltip && (
            <div className="relative">
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
                className="rounded-full p-1 hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="More information"
              >
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
              {showTooltip && (
                <div
                  role="tooltip"
                  className="absolute right-0 top-8 z-10 w-64 rounded-lg bg-popover p-3 text-xs text-popover-foreground shadow-lg border animate-in fade-in-0 zoom-in-95"
                >
                  {tooltip}
                  <div className="absolute -top-1 right-4 h-2 w-2 rotate-45 bg-popover border-t border-l" />
                </div>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            'text-4xl font-bold text-foreground mb-2 transition-all duration-300',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          )}
        >
          {value}
        </div>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

