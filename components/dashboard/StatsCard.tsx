import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: React.ReactNode
  iconBg?: string
}

export default function StatsCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  iconBg = 'bg-primary/10',
}: StatsCardProps) {
  const isPositive = change >= 0

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-border">
      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent to-muted/20" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', iconBg)}>
            {icon}
          </div>
          <span
            className={cn(
              'flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
              isPositive
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'bg-red-500/10 text-red-600 dark:text-red-400'
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {isPositive ? '+' : ''}{change}%
          </span>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 font-mono text-2xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
        </div>

        <p className="mt-2 text-xs text-muted-foreground">{changeLabel}</p>
      </div>
    </div>
  )
}
