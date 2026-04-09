import { Product } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

const statusConfig = {
  'in-stock': { label: 'In Stock', className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
  'low-stock': { label: 'Low Stock', className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
  'out-of-stock': { label: 'Out of Stock', className: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' },
}

export default function ProductCard({ product }: ProductCardProps) {
  const status = statusConfig[product.status]

  return (
    <div className="group flex flex-col rounded-xl border border-border/60 bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:border-border overflow-hidden">
      {/* Gradient Image Placeholder */}
      <div className={cn('h-36 bg-gradient-to-br', product.gradient, 'relative overflow-hidden')}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-3 left-3">
          <span className="rounded-md bg-black/30 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
            {product.name}
          </h3>
          <span
            className={cn(
              'shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium',
              status.className
            )}
          >
            {status.label}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/60">
          <div>
            <p className="font-mono text-lg font-bold text-foreground">
              {formatCurrency(product.price)}
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-sm font-semibold text-foreground">{product.stock}</p>
            <p className="text-xs text-muted-foreground">in stock</p>
          </div>
        </div>
      </div>
    </div>
  )
}
