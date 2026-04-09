import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { OrderStatus } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function getStatusColor(status: OrderStatus): string {
  const colors = {
    delivered: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    shipped: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20',
    pending: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20',
    cancelled: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20',
  }
  return colors[status]
}

export function calcChange(current: number, previous: number): number {
  return Math.round(((current - previous) / previous) * 100 * 10) / 10
}
