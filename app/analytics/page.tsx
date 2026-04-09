import dynamic from 'next/dynamic'
import DashboardLayout from '@/components/layout/DashboardLayout'
import StatsCard from '@/components/dashboard/StatsCard'
import { Skeleton } from '@/components/ui/skeleton'
import { DollarSign, ShoppingCart, Users, BarChart3 } from 'lucide-react'

const RevenueBarChart = dynamic(() => import('@/components/analytics/RevenueBarChart'), {
  ssr: false,
  loading: () => <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm"><Skeleton className="h-[300px] w-full" /></div>,
})

const WeeklyLineChart = dynamic(() => import('@/components/analytics/WeeklyLineChart'), {
  ssr: false,
  loading: () => <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm"><Skeleton className="h-[300px] w-full" /></div>,
})

const CategoryPieChart = dynamic(() => import('@/components/analytics/CategoryPieChart'), {
  ssr: false,
  loading: () => <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm"><Skeleton className="h-[300px] w-full" /></div>,
})

const CustomerAreaChart = dynamic(() => import('@/components/analytics/CustomerAreaChart'), {
  ssr: false,
  loading: () => <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm"><Skeleton className="h-[300px] w-full" /></div>,
})

const analyticsStats = [
  {
    title: 'Annual Revenue',
    value: '$995,900',
    change: 28.4,
    changeLabel: 'vs. previous year ($775,200)',
    icon: <DollarSign className="h-5 w-5 text-primary" />,
    iconBg: 'bg-primary/10',
  },
  {
    title: 'Total Orders',
    value: '1,826',
    change: 22.1,
    changeLabel: 'vs. previous year (1,495)',
    icon: <ShoppingCart className="h-5 w-5 text-blue-500" />,
    iconBg: 'bg-blue-500/10',
  },
  {
    title: 'Total Customers',
    value: '20',
    change: 33.3,
    changeLabel: 'vs. previous year (15)',
    icon: <Users className="h-5 w-5 text-emerald-500" />,
    iconBg: 'bg-emerald-500/10',
  },
  {
    title: 'Conversion Rate',
    value: '4.28%',
    change: 0.8,
    changeLabel: 'vs. previous year (4.24%)',
    icon: <BarChart3 className="h-5 w-5 text-amber-500" />,
    iconBg: 'bg-amber-500/10',
  },
]

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {analyticsStats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RevenueBarChart />
          <WeeklyLineChart />
          <CustomerAreaChart />
          <CategoryPieChart />
        </div>
      </div>
    </DashboardLayout>
  )
}
