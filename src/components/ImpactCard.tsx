import { useEffect, useState } from 'react';
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
    <Card className={cn('glass transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group', className)}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-3 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 shadow-md">
              <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <CardTitle className="text-lg font-semibold leading-tight text-foreground">{title}</CardTitle>
          </div>
          {tooltip && (
            <div className="relative">
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
                className="rounded-full p-1.5 hover:bg-secondary/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:scale-110"
                aria-label="More information"
              >
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
              {showTooltip && (
                <div
                  role="tooltip"
                  className="absolute right-0 top-10 z-10 w-80 rounded-xl glass p-4 text-sm text-foreground shadow-xl animate-in fade-in-0 zoom-in-95"
                >
                  {tooltip}
                  <div className="absolute -top-1.5 right-4 h-3 w-3 rotate-45 glass border-t border-l" />
                </div>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            'text-6xl font-bold mb-4 transition-all duration-500 text-foreground',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          )}
        >
          {value}
        </div>
        <CardDescription className="text-base font-medium text-muted-foreground">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

