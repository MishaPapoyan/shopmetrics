'use client'

import { useState } from 'react'
import { Camera, Mail, User, Phone, MapPin, Globe, Shield, Eye, EyeOff, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const tabs = ['Profile', 'Security', 'Notifications', 'Preferences'] as const
type Tab = typeof tabs[number]

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 items-start gap-4">
      <label className="pt-2 text-sm font-medium text-muted-foreground">{label}</label>
      <div className="col-span-2">{children}</div>
    </div>
  )
}

function Toggle({ label, description, defaultOn = false }: { label: string; description: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={cn(
          'relative h-6 w-11 rounded-full transition-colors duration-200',
          on ? 'bg-primary' : 'bg-muted-foreground/30'
        )}
      >
        <span className={cn(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200',
          on ? 'translate-x-5' : 'translate-x-0.5'
        )} />
      </button>
    </div>
  )
}

function SavedBadge({ show }: { show: boolean }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 text-xs font-medium text-emerald-500 transition-opacity duration-300',
      show ? 'opacity-100' : 'opacity-0'
    )}>
      <Check className="h-3.5 w-3.5" /> Saved
    </span>
  )
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Profile')
  const [saved, setSaved] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      {/* Tab bar */}
      <div className="flex gap-1 rounded-xl border border-border bg-muted/40 p-1">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all',
              activeTab === tab
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'Profile' && (
        <div className="space-y-4">
          {/* Avatar */}
          <Section title="Profile Photo" description="Update your profile picture">
            <div className="flex items-center gap-5">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">AO</AvatarFallback>
                </Avatar>
                <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow">
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Alex Owen</p>
                <p className="text-xs text-muted-foreground">Administrator · alex@shopmetrics.io</p>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline" className="h-7 text-xs">Upload photo</Button>
                  <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:text-destructive">Remove</Button>
                </div>
              </div>
            </div>
          </Section>

          {/* Personal Info */}
          <Section title="Personal Information" description="Your name, email and contact details">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">First name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                    <Input defaultValue="Alex" className="pl-9 text-sm" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Last name</label>
                  <Input defaultValue="Owen" className="text-sm" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                  <Input defaultValue="alex@shopmetrics.io" className="pl-9 text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Phone number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                    <Input defaultValue="+1 (555) 012-3456" className="pl-9 text-sm" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Website</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                    <Input defaultValue="shopmetrics.io" className="pl-9 text-sm" />
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                  <Input defaultValue="San Francisco, CA" className="pl-9 text-sm" />
                </div>
              </div>
            </div>
          </Section>

          <div className="flex items-center justify-end gap-3">
            <SavedBadge show={saved} />
            <Button variant="outline" size="sm">Cancel</Button>
            <Button size="sm" onClick={handleSave}>Save changes</Button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'Security' && (
        <div className="space-y-4">
          <Section title="Change Password" description="Choose a strong password you don't use elsewhere">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Current password</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                  <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="pl-9 pr-9 text-sm" />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">New password</label>
                <Input type="password" placeholder="••••••••" className="text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Confirm new password</label>
                <Input type="password" placeholder="••••••••" className="text-sm" />
              </div>
              <Button size="sm" onClick={handleSave}>Update password</Button>
            </div>
          </Section>

          <Section title="Two-Factor Authentication" description="Add an extra layer of security to your account">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Authenticator app</p>
                <p className="text-xs text-muted-foreground">Use an authenticator app to generate one-time codes</p>
              </div>
              <Button size="sm" variant="outline">Enable 2FA</Button>
            </div>
          </Section>

          <Section title="Active Sessions" description="Manage where you're signed in">
            {[
              { device: 'MacBook Pro — Chrome', location: 'San Francisco, CA', time: 'Active now', current: true },
              { device: 'iPhone 15 — Safari', location: 'San Francisco, CA', time: '2 hours ago', current: false },
              { device: 'Windows PC — Edge', location: 'New York, NY', time: '3 days ago', current: false },
            ].map((session) => (
              <div key={session.device} className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground flex items-center gap-2">
                    {session.device}
                    {session.current && (
                      <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-medium text-emerald-500">current</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{session.location} · {session.time}</p>
                </div>
                {!session.current && (
                  <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:text-destructive">Revoke</Button>
                )}
              </div>
            ))}
          </Section>

          <div className="flex justify-end">
            <SavedBadge show={saved} />
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'Notifications' && (
        <div className="space-y-4">
          <Section title="Email Notifications" description="Choose what updates you receive by email">
            <Toggle label="New orders" description="Get notified when a new order is placed" defaultOn />
            <Toggle label="Order status changes" description="Updates when orders are shipped or delivered" defaultOn />
            <Toggle label="Low stock alerts" description="Alert when a product stock drops below 10 units" defaultOn />
            <Toggle label="Customer registrations" description="When a new customer creates an account" />
            <Toggle label="Monthly revenue report" description="Receive a summary report each month" defaultOn />
          </Section>
          <Section title="Push Notifications" description="In-app and browser push notifications">
            <Toggle label="Real-time order alerts" description="Instant alerts for new orders in the dashboard" defaultOn />
            <Toggle label="Payment confirmations" description="When a payment is successfully processed" defaultOn />
            <Toggle label="Cancellations" description="When an order is cancelled by a customer" />
            <Toggle label="System updates" description="Maintenance windows and product updates" />
          </Section>
          <div className="flex justify-end">
            <Button size="sm" onClick={handleSave}>Save preferences</Button>
          </div>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'Preferences' && (
        <div className="space-y-4">
          <Section title="Display" description="Customize how the dashboard looks">
            <div className="space-y-3">
              <Field label="Language">
                <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>French</option>
                  <option>Spanish</option>
                </select>
              </Field>
              <Field label="Timezone">
                <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
                  <option>Pacific Time (UTC-8)</option>
                  <option>Eastern Time (UTC-5)</option>
                  <option>UTC</option>
                  <option>Central European Time (UTC+1)</option>
                </select>
              </Field>
              <Field label="Currency">
                <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
                  <option>USD — US Dollar</option>
                  <option>EUR — Euro</option>
                  <option>GBP — British Pound</option>
                  <option>CAD — Canadian Dollar</option>
                </select>
              </Field>
              <Field label="Date format">
                <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
                  <option>MMM D, YYYY (Apr 7, 2026)</option>
                  <option>DD/MM/YYYY (07/04/2026)</option>
                  <option>MM/DD/YYYY (04/07/2026)</option>
                  <option>YYYY-MM-DD (2026-04-07)</option>
                </select>
              </Field>
            </div>
          </Section>
          <div className="flex justify-end">
            <Button size="sm" onClick={handleSave}>Save preferences</Button>
          </div>
          <div className="flex justify-end">
            <SavedBadge show={saved} />
          </div>
        </div>
      )}
    </div>
  )
}
