import { createFileRoute } from '@tanstack/react-router'

import { AppShell } from '@/components/layout/app-shell'
import { PageSection } from '@/components/layout/page-section'

export const Route = createFileRoute('/invitations/$token')({
  component: InvitationAcceptPage,
})

function InvitationAcceptPage() {
  const { token } = Route.useParams()

  return (
    <AppShell>
      <div className="space-y-6">
        <section className="space-y-2">
          <p className="text-sm text-muted-foreground">邀請接受</p>
          <h1 className="text-3xl font-semibold tracking-tight">加入旅程</h1>
          <p className="text-sm text-muted-foreground">
            Token:
            {token}
          </p>
        </section>

        <PageSection title="邀請流程" description="後續會接上實際驗證與加入旅程邏輯。">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>檢查邀請</li>
            <li>顯示旅程資訊</li>
            <li>確認加入</li>
          </ul>
        </PageSection>
      </div>
    </AppShell>
  )
}
