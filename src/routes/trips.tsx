import { createFileRoute, Link } from '@tanstack/react-router'
import { CalendarDays, MapPinned, Plus } from 'lucide-react'

import { AppShell } from '@/components/layout/app-shell'
import { PageSection } from '@/components/layout/page-section'

const trips = [
  {
    id: 'demo-trip',
    title: '東京旅遊',
    location: '日本東京',
    date: '2026-07-06 — 2026-07-12',
    mode: '一般為主',
  },
]

export const Route = createFileRoute('/trips')({
  component: TripsPage,
})

function TripsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">旅程</p>
            <h1 className="text-3xl font-semibold tracking-tight">旅程清單</h1>
          </div>
          <Link
            to="/"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D8E8EB] bg-[#F4FAFB] text-primary transition-colors hover:bg-[#EAF4F7]"
          >
            <Plus className="size-4" />
          </Link>
        </section>

        <PageSection title="目前旅程" description="先用骨架把入口接起來，後續會再串上真實資料。">
          <div className="space-y-3">
            {trips.map(trip => (
              <Link
                key={trip.id}
                to="/trip/$tripId"
                params={{ tripId: trip.id }}
                className="block rounded-2xl border border-border bg-white p-4 transition-colors hover:border-primary/40 hover:bg-[#F9FCFD]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPinned className="size-4" />
                      <span>{trip.location}</span>
                    </div>
                    <h2 className="text-lg font-semibold">{trip.title}</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="size-4" />
                      <span>{trip.date}</span>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#EAF5F7] px-3 py-1 text-xs font-medium text-primary">{trip.mode}</span>
                </div>
              </Link>
            ))}
          </div>
        </PageSection>
      </div>
    </AppShell>
  )
}
