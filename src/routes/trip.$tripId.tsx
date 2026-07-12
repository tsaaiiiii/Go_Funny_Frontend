import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Coins, Settings2, UserRoundPlus, Wallet } from 'lucide-react'

import { AppShell } from '@/components/layout/app-shell'
import { PageSection } from '@/components/layout/page-section'

export const Route = createFileRoute('/trip/$tripId')({
  component: TripDetailPage,
})

function TripDetailPage() {
  const { tripId } = Route.useParams()

  return (
    <AppShell>
      <div className="space-y-6">
        <section className="space-y-2">
          <p className="text-sm text-muted-foreground">旅程明細</p>
          <h1 className="text-3xl font-semibold tracking-tight">Demo 旅程</h1>
          <p className="text-sm text-muted-foreground">
            旅程 ID:
            {tripId}
          </p>
        </section>

        <PageSection title="核心資訊" description="這裡會放旅程總覽、記錄列表與主要入口。">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#FAFCFC] p-4">
              <p className="text-sm text-muted-foreground">狀態</p>
              <p className="mt-1 font-semibold">已建立骨架</p>
            </div>
            <div className="rounded-2xl bg-[#FAFCFC] p-4">
              <p className="text-sm text-muted-foreground">模式</p>
              <p className="mt-1 font-semibold">一般為主</p>
            </div>
            <div className="rounded-2xl bg-[#FAFCFC] p-4">
              <p className="text-sm text-muted-foreground">幣別</p>
              <p className="mt-1 font-semibold">多幣別預留</p>
            </div>
          </div>
        </PageSection>

        <PageSection title="快速入口" description="先把旅程常用入口放在一起。">
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              to="/trip/$tripId/manage"
              params={{ tripId }}
              className="flex h-auto items-center justify-between gap-3 rounded-2xl border border-border bg-white px-4 py-4 transition-colors hover:border-primary/40 hover:bg-[#F9FCFD]"
            >
              <span className="flex items-center gap-3">
                <Settings2 className="size-4" />
                <span>旅程管理</span>
              </span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/trip/$tripId/new-record"
              params={{ tripId }}
              className="flex h-auto items-center justify-between gap-3 rounded-2xl border border-border bg-white px-4 py-4 transition-colors hover:border-primary/40 hover:bg-[#F9FCFD]"
            >
              <span className="flex items-center gap-3">
                <Wallet className="size-4" />
                <span>新增記錄</span>
              </span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/trip/$tripId/settlement"
              params={{ tripId }}
              className="flex h-auto items-center justify-between gap-3 rounded-2xl border border-border bg-white px-4 py-4 transition-colors hover:border-primary/40 hover:bg-[#F9FCFD]"
            >
              <span className="flex items-center gap-3">
                <Coins className="size-4" />
                <span>結算結果</span>
              </span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/invitations/$token"
              params={{ token: 'demo-token' }}
              className="flex h-auto items-center justify-between gap-3 rounded-2xl border border-border bg-white px-4 py-4 transition-colors hover:border-primary/40 hover:bg-[#F9FCFD]"
            >
              <span className="flex items-center gap-3">
                <UserRoundPlus className="size-4" />
                <span>邀請接受</span>
              </span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </PageSection>
      </div>
    </AppShell>
  )
}
