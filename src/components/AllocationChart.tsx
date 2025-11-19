import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CHART_COLORS } from '@/lib/colors';
import { formatCurrency } from '@/lib/format';

interface AllocationItem {
  label: string;
  value: number; // percentage (0-1)
}

interface AllocationChartProps {
  donation: number;
}

const ALLOCATION: AllocationItem[] = [
  { label: 'Housing & Utilities', value: 0.55 },
  { label: 'Counseling', value: 0.15 },
  { label: 'Life Coaching', value: 0.10 },
  { label: 'Childcare', value: 0.10 },
  { label: 'Transportation', value: 0.05 },
  { label: 'Program Ops', value: 0.05 },
];

export function AllocationChart({ donation }: AllocationChartProps) {
  const data = ALLOCATION.map((item) => ({
    name: item.label,
    value: donation * item.value,
    percentage: item.value,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <div className="rounded-lg bg-popover p-3 shadow-lg border text-sm">
          <p className="font-medium text-popover-foreground">{item.name}</p>
          <p className="text-primary font-semibold">{formatCurrency(item.value)}</p>
          <p className="text-muted-foreground text-xs">
            {(item.payload.percentage * 100).toFixed(0)}% of donation
          </p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="grid grid-cols-2 gap-2 text-xs">
        {payload.map((entry: any, index: number) => (
          <li key={`legend-${index}`} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground truncate">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">How Your Donation Is Used</CardTitle>
        <CardDescription>
          Typical program cost allocation (illustrative)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={false}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                content={renderLegend}
                verticalAlign="bottom"
                height={60}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

