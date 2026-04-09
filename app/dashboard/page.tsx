import dynamic from 'next/dynamic'
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
} from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import StatsCard from '@/components/dashboard/StatsCard'
import RecentOrders from '@/components/dashboard/RecentOrders'
import TopProducts from '@/components/dashboard/TopProducts'
import { Skeleton } from '@/components/ui/skeleton'

const RevenueChart = dynamic(() => import('@/components/dashboard/RevenueChart'), {
  ssr: false,
  loading: () => <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm"><Skeleton className="h-[320px] w-full" /></div>,
})

const OrdersDonut = dynamic(() => import('@/components/dashboard/OrdersDonut'), {
  ssr: false,
  loading: () => <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm"><Skeleton className="h-[320px] w-full" /></div>,
})

const stats = [
  {
    title: 'Total Revenue',
    value: '$138,900',
    change: 11.4,
    changeLabel: 'vs. last month ($124,700)',
    icon: <DollarSign className="h-5 w-5 text-primary" />,
    iconBg: 'bg-primary/10',
  },
  {
    title: 'Total Orders',
    value: '1,826',
    change: 11.4,
    changeLabel: 'vs. last month (1,640)',
    icon: <ShoppingCart className="h-5 w-5 text-blue-500" />,
    iconBg: 'bg-blue-500/10',
  },
  {
    title: 'Active Customers',
    value: '18',
    change: 8.3,
    changeLabel: 'out of 20 total customers',
    icon: <Users className="h-5 w-5 text-emerald-500" />,
    iconBg: 'bg-emerald-500/10',
  },
  {
    title: 'Avg. Order Value',
    value: '$76.07',
    change: -2.1,
    changeLabel: 'vs. last month ($77.72)',
    icon: <TrendingUp className="h-5 w-5 text-amber-500" />,
    iconBg: 'bg-amber-500/10',
  },
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div>
            <OrdersDonut />
          </div>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentOrders />
          </div>
          <div>
            <TopProducts />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
