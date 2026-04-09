'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { monthlyRevenue } from '@/lib/mockData'
import { formatCurrency } from '@/lib/utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-xl">
        <p className="mb-1.5 text-sm font-medium text-foreground">{label}</p>
        <p className="font-mono text-sm font-semibold text-primary">
          {formatCurrency(payload[0]?.value as number)}
        </p>
      </div>
    )
  }
  return null
}

export default function RevenueBarChart() {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-foreground">Monthly Revenue</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">Revenue per month across 2025</p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={monthlyRevenue} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', radius: 4 }} />
          <Bar
            dataKey="revenue"
            fill="hsl(var(--primary))"
            radius={[6, 6, 0, 0]}
            opacity={0.85}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
