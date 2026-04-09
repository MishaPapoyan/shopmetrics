'use client'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { categoryRevenue } from '@/lib/mockData'
import { formatCurrency } from '@/lib/utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-xl">
        <p className="mb-1 text-sm font-medium text-foreground">{data.category}</p>
        <p className="font-mono text-sm font-semibold" style={{ color: data.color }}>
          {formatCurrency(data.revenue)}
        </p>
        <p className="text-xs text-muted-foreground">{data.percentage}% of total</p>
      </div>
    )
  }
  return null
}

export default function CategoryPieChart() {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">Revenue by Category</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">Category distribution</p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={categoryRevenue}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="revenue"
            startAngle={90}
            endAngle={-270}
          >
            {categoryRevenue.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-3 space-y-2">
        {categoryRevenue.map((item) => (
          <div key={item.category} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-muted-foreground flex-1">{item.category}</span>
            <span className="font-mono text-xs font-medium text-foreground">{item.percentage}%</span>
            <span className="font-mono text-xs text-muted-foreground">{formatCurrency(item.revenue)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
