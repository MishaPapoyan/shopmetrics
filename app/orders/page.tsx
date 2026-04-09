import DashboardLayout from '@/components/layout/DashboardLayout'
import OrdersTable from '@/components/orders/OrdersTable'

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <OrdersTable />
    </DashboardLayout>
  )
}
