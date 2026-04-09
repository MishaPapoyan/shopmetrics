'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { orders } from '@/lib/mockData'

const statusData = [
  { name: 'Delivered', value: 0, color: '#10b981' },
  { name: 'Shipped', value: 0, color: '#6366f1' },
  { name: 'Pending', value: 0, color: '#f59e0b' },
  { name: 'Cancelled', value: 0, color: '#ef4444' },
]

orders.forEach((o) => {
  const idx = statusData.findIndex((s) => s.name.toLowerCase() === o.status)
  if (idx !== -1) statusData[idx].value++
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border bg-card px-3 py-2 shadow-xl">
        <p className="text-sm font-medium text-foreground">{payload[0].name}</p>
        <p className="font-mono text-sm text-muted-foreground">{payload[0].value} orders</p>
      </div>
    )
  }
  return null
}

export default function OrdersDonut() {
  const total = statusData.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">Order Status</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">Breakdown by status</p>
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-mono text-2xl font-bold text-foreground">{total}</p>
          <p className="text-xs text-muted-foreground">Total Orders</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-2 grid grid-cols-2 gap-2">
        {statusData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-muted-foreground">{item.name}</span>
            <span className="ml-auto font-mono text-xs font-medium text-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
