import { products } from '@/lib/mockData'
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'

const MAX_STOCK = 100

const statusColors: Record<string, string> = {
  'in-stock': 'bg-emerald-500',
  'low-stock': 'bg-amber-500',
  'out-of-stock': 'bg-red-500',
}

export default function TopProducts() {
  const topProducts = [...products].sort((a, b) => b.price - a.price).slice(0, 5)

  return (
    <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-foreground">Top Products</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">By price & stock level</p>
      </div>

      <div className="space-y-4">
        {topProducts.map((product) => {
          const stockPct = Math.min((product.stock / MAX_STOCK) * 100, 100)
          return (
            <div key={product.id} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Color dot */}
                  <div className={cn('h-2.5 w-2.5 shrink-0 rounded-full', statusColors[product.status])} />
                  <p className="truncate text-sm font-medium text-foreground">{product.name}</p>
                </div>
                <div className="ml-4 flex shrink-0 items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-foreground">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground w-12 text-right">
                    {product.stock} left
                  </span>
                </div>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={cn('h-full rounded-full transition-all', statusColors[product.status])}
                  style={{ width: `${stockPct}%`, opacity: 0.7 }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
