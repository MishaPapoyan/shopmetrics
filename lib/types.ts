export type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled'
export type CustomerStatus = 'active' | 'inactive'
export type ProductCategory = 'Electronics' | 'Clothing' | 'Books' | 'Home & Garden' | 'Sports'

export interface Order {
  id: string
  customerId: string
  customerName: string
  product: string
  category: ProductCategory
  date: string
  amount: number
  status: OrderStatus
}

export interface Customer {
  id: string
  name: string
  email: string
  totalOrders: number
  totalSpent: number
  joinDate: string
  status: CustomerStatus
  initials: string
  avatarColor: string
}

export interface Product {
  id: string
  name: string
  category: ProductCategory
  price: number
  stock: number
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
  gradient: string
}

export interface MonthlyRevenue {
  month: string
  revenue: number
  orders: number
  customers: number
}

export interface WeeklyOrders {
  week: string
  orders: number
  revenue: number
}

export interface CategoryRevenue {
  category: string
  revenue: number
  percentage: number
  color: string
}

export interface StatsCardData {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: string
}

export type NotificationType = 'order' | 'alert' | 'payment' | 'customer' | 'system'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  time: string
  read: boolean
}
