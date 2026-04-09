'use client'

import { useState } from 'react'
import { CreditCard, Download, CheckCircle2, Zap, Star, Building2, Check, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Starter',
    price: 29,
    description: 'Perfect for small stores just getting started',
    features: ['Up to 500 orders/month', '2 team members', 'Basic analytics', 'Email support', '5 GB storage'],
    current: false,
    icon: Zap,
    color: 'text-slate-400',
    bg: 'bg-slate-500/10',
  },
  {
    name: 'Pro',
    price: 79,
    description: 'For growing businesses that need more power',
    features: ['Unlimited orders', '10 team members', 'Advanced analytics', 'Priority support', '50 GB storage', 'Custom reports', 'API access'],
    current: true,
    icon: Star,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    name: 'Enterprise',
    price: 199,
    description: 'For large-scale operations and teams',
    features: ['Unlimited everything', 'Unlimited team members', 'Custom analytics', 'Dedicated support', 'Unlimited storage', 'White-label option', 'SLA guarantee', 'SSO / SAML'],
    current: false,
    icon: Building2,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
]

const invoices = [
  { id: 'INV-2026-04', date: 'Apr 1, 2026', amount: 79.00, status: 'paid', period: 'Apr 2026' },
  { id: 'INV-2026-03', date: 'Mar 1, 2026', amount: 79.00, status: 'paid', period: 'Mar 2026' },
  { id: 'INV-2026-02', date: 'Feb 1, 2026', amount: 79.00, status: 'paid', period: 'Feb 2026' },
  { id: 'INV-2026-01', date: 'Jan 1, 2026', amount: 79.00, status: 'paid', period: 'Jan 2026' },
  { id: 'INV-2025-12', date: 'Dec 1, 2025', amount: 79.00, status: 'paid', period: 'Dec 2025' },
  { id: 'INV-2025-11', date: 'Nov 1, 2025', amount: 29.00, status: 'paid', period: 'Nov 2025' },
]

export default function BillingPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">

      {/* Current Plan Banner */}
      <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-primary/5 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">
                <CheckCircle2 className="h-3.5 w-3.5" /> Active Plan
              </span>
            </div>
            <h2 className="mt-2 text-2xl font-bold text-foreground font-mono">Pro · $79<span className="text-base font-normal text-muted-foreground">/mo</span></h2>
            <p className="mt-1 text-sm text-muted-foreground">Next billing date: <span className="font-medium text-foreground">May 1, 2026</span></p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Usage this month</p>
            <p className="mt-1 text-2xl font-bold font-mono text-foreground">1,429<span className="text-sm font-normal text-muted-foreground"> orders</span></p>
            <div className="mt-2 h-1.5 w-40 rounded-full bg-border">
              <div className="h-1.5 w-[60%] rounded-full bg-primary" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Unlimited — no cap</p>
          </div>
        </div>
        {/* decorative */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
      </div>

      {/* Plans */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Plans</h3>
          {/* Billing toggle */}
          <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 p-1">
            {(['monthly', 'yearly'] as const).map(b => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={cn(
                  'rounded-md px-3 py-1 text-xs font-medium capitalize transition-all',
                  billing === b ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {b}
                {b === 'yearly' && <span className="ml-1 text-emerald-500 font-semibold">−20%</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {plans.map((plan) => {
            const Icon = plan.icon
            const price = billing === 'yearly' ? Math.round(plan.price * 0.8) : plan.price
            return (
              <div
                key={plan.name}
                className={cn(
                  'relative rounded-xl border p-5 transition-shadow hover:shadow-md',
                  plan.current
                    ? 'border-primary/40 bg-primary/5 shadow-sm'
                    : 'border-border bg-card'
                )}
              >
                {plan.current && (
                  <span className="absolute right-3 top-3 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">Current</span>
                )}
                <div className={cn('mb-3 flex h-8 w-8 items-center justify-center rounded-lg', plan.bg)}>
                  <Icon className={cn('h-4 w-4', plan.color)} />
                </div>
                <h4 className="font-semibold text-foreground">{plan.name}</h4>
                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{plan.description}</p>
                <p className="mt-3 font-mono text-2xl font-bold text-foreground">
                  ${price}<span className="text-sm font-normal text-muted-foreground">/mo</span>
                </p>
                <ul className="mt-4 space-y-1.5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  size="sm"
                  variant={plan.current ? 'outline' : 'default'}
                  className="mt-5 w-full text-xs"
                  disabled={plan.current}
                >
                  {plan.current ? 'Current plan' : `Upgrade to ${plan.name}`}
                </Button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Payment Method */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Payment Method</h3>
            <p className="text-xs text-muted-foreground">Manage your payment details</p>
          </div>
          <Button size="sm" variant="outline" className="text-xs gap-1.5">
            <CreditCard className="h-3.5 w-3.5" /> Add card
          </Button>
        </div>
        <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4">
          {/* Card graphic */}
          <div className="flex h-10 w-16 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-slate-600 to-slate-800">
            <div className="space-y-1">
              <div className="h-1 w-8 rounded-full bg-white/60" />
              <div className="h-1 w-5 rounded-full bg-white/40" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Visa ending in <span className="font-mono">4242</span></p>
            <p className="text-xs text-muted-foreground">Expires 08 / 2028 · Default</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" className="h-7 text-xs">Edit</Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:text-destructive">Remove</Button>
          </div>
        </div>
      </div>

      {/* Invoices */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Invoices</h3>
            <p className="text-xs text-muted-foreground">Download past invoices for your records</p>
          </div>
          <Button size="sm" variant="outline" className="text-xs gap-1.5">
            <Download className="h-3.5 w-3.5" /> Download all
          </Button>
        </div>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Invoice</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Period</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Date</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Amount</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => (
                <tr
                  key={inv.id}
                  className={cn(
                    'border-b border-border/50 last:border-0 transition-colors hover:bg-muted/30',
                    i % 2 === 0 ? '' : 'bg-muted/10'
                  )}
                >
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{inv.id}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{inv.period}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{inv.date}</td>
                  <td className="px-4 py-3 font-mono text-sm font-medium text-foreground">${inv.amount.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
                      <CheckCircle2 className="h-3 w-3" /> Paid
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground">
                      <Download className="h-3 w-3" /> PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
        <h3 className="text-sm font-semibold text-foreground">Danger Zone</h3>
        <p className="mt-1 text-xs text-muted-foreground">Once cancelled, your plan downgrades to Free at the end of the billing period.</p>
        <div className="mt-4 flex items-center gap-3">
          <Button size="sm" variant="outline" className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive text-xs">
            Cancel subscription
          </Button>
          <Button size="sm" variant="ghost" className="text-xs gap-1 text-muted-foreground">
            <ArrowUpRight className="h-3.5 w-3.5" /> Talk to support
          </Button>
        </div>
      </div>
    </div>
  )
}
