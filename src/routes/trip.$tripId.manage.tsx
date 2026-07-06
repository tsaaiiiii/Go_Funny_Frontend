import { createFileRoute } from '@tanstack/react-router'
import { AppShell } from '@/components/layout/app-shell'
import { PageSection } from '@/components/layout/page-section'

export const Route = createFileRoute('/trip/$tripId/manage')({
  component: TripManagePage,
})

function TripManagePage() {
  const { tripId } = Route.useParams()

  return (
    <AppShell>
      <div className="space-y-6">
        <section className="space-y-2">
          <p className="text-sm text-muted-foreground">旅程管理</p>
          <h1 className="text-3xl font-semibold tracking-tight">管理旅程設定</h1>
          <p className="text-sm text-muted-foreground">
            旅程 ID:
            {tripId}
          </p>
        </section>

        <PageSection title="管理項目" description="成員、模式、旅程資訊與邀請都會放在這裡。">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>成員管理</li>
            <li>預設模式</li>
            <li>旅程資訊</li>
            <li>邀請設定</li>
          </ul>
        </PageSection>
      </div>
    </AppShell>
  )
}
