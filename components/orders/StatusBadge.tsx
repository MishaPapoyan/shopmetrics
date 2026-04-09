import { OrderStatus } from '@/lib/types'
import { getStatusColor } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: OrderStatus
}

const statusLabels: Record<OrderStatus, string> = {
  delivered: 'Delivered',
  shipped: 'Shipped',
  pending: 'Pending',
  cancelled: 'Cancelled',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium capitalize',
        getStatusColor(status)
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {statusLabels[status]}
    </span>
  )
}
