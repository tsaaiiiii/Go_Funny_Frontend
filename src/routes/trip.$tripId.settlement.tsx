import { createFileRoute } from '@tanstack/react-router'

import { AppShell } from '@/components/layout/app-shell'
import { PageSection } from '@/components/layout/page-section'

export const Route = createFileRoute('/trip/$tripId/settlement')({
  component: SettlementPage,
})

function SettlementPage() {
  const { tripId } = Route.useParams()

  return (
    <AppShell>
      <div className="space-y-6">
        <section className="space-y-2">
          <p className="text-sm text-muted-foreground">結算結果</p>
          <h1 className="text-3xl font-semibold tracking-tight">一般結算 / 公積金結算</h1>
          <p className="text-sm text-muted-foreground">
            旅程 ID:
            {tripId}
          </p>
        </section>

        <PageSection title="結算視圖" description="後續會依幣別拆分一般結算與公積金結算。">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>一般結算 tab</li>
            <li>公積金結算 tab</li>
            <li>幣別分組</li>
          </ul>
        </PageSection>
      </div>
    </AppShell>
  )
}
