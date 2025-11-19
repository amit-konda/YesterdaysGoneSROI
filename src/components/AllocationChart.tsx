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
        <div className="rounded-xl glass p-4 shadow-xl text-base">
          <p className="font-semibold text-foreground mb-1.5">{item.name}</p>
          <p className="text-primary font-bold text-xl">{formatCurrency(item.value)}</p>
          <p className="text-muted-foreground text-sm mt-1.5">
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
      <ul className="grid grid-cols-2 gap-4 text-sm">
        {payload.map((entry: any, index: number) => (
          <li key={`legend-${index}`} className="flex items-center gap-3">
            <span
              className="h-5 w-5 rounded-md flex-shrink-0 shadow-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-foreground truncate font-medium">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card className="overflow-hidden glass">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">How Your Donation Is Used</CardTitle>
        <CardDescription className="text-lg text-foreground/75">
          Typical program cost allocation (illustrative)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
                label={false}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                content={renderLegend}
                verticalAlign="bottom"
                height={70}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

