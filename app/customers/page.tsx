import DashboardLayout from '@/components/layout/DashboardLayout'
import CustomersTable from '@/components/customers/CustomersTable'

export default function CustomersPage() {
  return (
    <DashboardLayout>
      <CustomersTable />
    </DashboardLayout>
  )
}
