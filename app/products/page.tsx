'use client'

import { useState, useMemo } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ProductCard from '@/components/products/ProductCard'
import { products } from '@/lib/mockData'
import { ProductCategory } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDebounce } from '@/hooks/useDebounce'

const categories: Array<ProductCategory | 'All'> = [
  'All', 'Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports',
]

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'All'>('All')
  const debouncedSearch = useDebounce(search, 300)

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = activeCategory === 'All' || p.category === activeCategory
      const matchSearch =
        !debouncedSearch ||
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [activeCategory, debouncedSearch])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-150',
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-mono font-medium text-foreground">{filtered.length}</span> products
        </p>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border/60 bg-card py-16">
            <p className="text-muted-foreground text-sm">No products match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
