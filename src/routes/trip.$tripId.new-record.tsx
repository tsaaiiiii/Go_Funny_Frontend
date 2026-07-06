import { createFileRoute } from '@tanstack/react-router'

import { AppShell } from '@/components/layout/app-shell'
import { PageSection } from '@/components/layout/page-section'

export const Route = createFileRoute('/trip/$tripId/new-record')({
  component: NewRecordPage,
})

function NewRecordPage() {
  const { tripId } = Route.useParams()

  return (
    <AppShell>
      <div className="space-y-6">
        <section className="space-y-2">
          <p className="text-sm text-muted-foreground">新增記錄</p>
          <h1 className="text-3xl font-semibold tracking-tight">新增一般支出 / 公積金</h1>
          <p className="text-sm text-muted-foreground">
            旅程 ID:
            {tripId}
          </p>
        </section>

        <PageSection title="記錄類型" description="後續會依 OpenSpec 實作表單與分支流程。">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>一般支出</li>
            <li>公積金存入</li>
            <li>公積金支出</li>
          </ul>
        </PageSection>
      </div>
    </AppShell>
  )
}
