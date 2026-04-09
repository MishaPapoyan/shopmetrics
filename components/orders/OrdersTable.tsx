'use client'

import { useState, useMemo } from 'react'
import { Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import { orders, customers } from '@/lib/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useDebounce } from '@/hooks/useDebounce'
import { usePagination } from '@/hooks/usePagination'
import StatusBadge from './StatusBadge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const ITEMS_PER_PAGE = 10

function getCustomerColor(customerId: string): string {
  const customer = customers.find((c) => c.id === customerId)
  return customer?.avatarColor ?? '#6366f1'
}

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase()
}

export default function OrdersTable() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const debouncedSearch = useDebounce(search, 300)

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const matchSearch =
        !debouncedSearch ||
        order.customerName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        order.id.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        order.product.toLowerCase().includes(debouncedSearch.toLowerCase())
      const matchStatus = statusFilter === 'all' || order.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [debouncedSearch, statusFilter])

  const { currentPage, totalPages, goToPage, nextPage, prevPage } = usePagination(
    filtered.length,
    ITEMS_PER_PAGE
  )

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders, customers, products..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); goToPage(1) }}
            className="pl-9 h-9 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); goToPage(1) }}>
            <SelectTrigger className="w-36 h-9 text-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Order</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide hidden md:table-cell">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Date</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wide">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground text-sm">
                    No orders found matching your search.
                  </td>
                </tr>
              ) : (
                paginated.map((order) => (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-muted/40 cursor-pointer"
                  >
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-xs font-medium text-muted-foreground">
                        {order.id}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                          style={{ backgroundColor: getCustomerColor(order.customerId) }}
                        >
                          {getInitials(order.customerName)}
                        </div>
                        <span className="font-medium text-foreground text-sm">{order.customerName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <div>
                        <p className="text-foreground text-sm">{order.product}</p>
                        <p className="text-xs text-muted-foreground">{order.category}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground text-sm hidden lg:table-cell">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="font-mono text-sm font-semibold text-foreground">
                        {formatCurrency(order.amount)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3 bg-muted/20">
          <p className="text-xs text-muted-foreground">
            Showing{' '}
            <span className="font-mono font-medium text-foreground">
              {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}
            </span>{' '}
            of{' '}
            <span className="font-mono font-medium text-foreground">{filtered.length}</span> orders
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const page = i + 1
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'ghost'}
                  size="icon"
                  className="h-8 w-8 text-xs font-mono"
                  onClick={() => goToPage(page)}
                >
                  {page}
                </Button>
              )
            })}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
