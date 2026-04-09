'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { customers } from '@/lib/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useDebounce } from '@/hooks/useDebounce'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export default function CustomersTable() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      if (!debouncedSearch) return true
      return (
        c.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        c.email.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    })
  }, [debouncedSearch])

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9 text-sm"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide hidden md:table-cell">Email</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wide">Orders</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Spent</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Joined</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground text-sm">
                    No customers found.
                  </td>
                </tr>
              ) : (
                filtered.map((customer) => (
                  <tr
                    key={customer.id}
                    className="transition-colors hover:bg-muted/40 cursor-pointer"
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                          style={{ backgroundColor: customer.avatarColor }}
                        >
                          {customer.initials}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{customer.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{customer.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground text-sm hidden md:table-cell">
                      {customer.email}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="font-mono text-sm font-semibold text-foreground">
                        {customer.totalOrders}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="font-mono text-sm font-semibold text-foreground">
                        {formatCurrency(customer.totalSpent)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground text-sm hidden lg:table-cell">
                      {formatDate(customer.joinDate)}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
                          customer.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                            : 'bg-muted text-muted-foreground border-border'
                        )}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {customer.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-border px-4 py-3 bg-muted/20">
          <p className="text-xs text-muted-foreground">
            <span className="font-mono font-medium text-foreground">{filtered.length}</span> customers found
          </p>
        </div>
      </div>
    </div>
  )
}
