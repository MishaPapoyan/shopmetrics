import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { orders, customers } from '@/lib/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'
import StatusBadge from '@/components/orders/StatusBadge'
import { Button } from '@/components/ui/button'

const recentOrders = orders.slice(0, 5)

function getCustomerColor(customerId: string): string {
  const customer = customers.find((c) => c.id === customerId)
  return customer?.avatarColor ?? '#6366f1'
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export default function RecentOrders() {
  return (
    <div className="rounded-xl border border-border/60 bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">Recent Orders</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">Latest 5 transactions</p>
        </div>
        <Button variant="ghost" size="sm" asChild className="text-xs text-muted-foreground hover:text-foreground">
          <Link href="/orders" className="flex items-center gap-1.5">
            View All
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>

      <div className="divide-y divide-border">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-muted/40"
          >
            {/* Avatar */}
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: getCustomerColor(order.customerId) }}
            >
              {getInitials(order.customerName)}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{order.customerName}</p>
              <p className="truncate text-xs text-muted-foreground">{order.product}</p>
            </div>

            {/* Date */}
            <p className="shrink-0 text-xs text-muted-foreground hidden sm:block">
              {formatDate(order.date)}
            </p>

            {/* Amount */}
            <p className="shrink-0 font-mono text-sm font-semibold text-foreground">
              {formatCurrency(order.amount)}
            </p>

            {/* Status */}
            <div className="shrink-0">
              <StatusBadge status={order.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
