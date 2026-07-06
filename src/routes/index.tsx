import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, CalendarDays, Coins, ReceiptText, Settings2, UserRoundPlus, Wallet } from 'lucide-react'

import { AppShell } from '@/components/layout/app-shell'
import { PageSection } from '@/components/layout/page-section'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="-mb-4 -mt-2">
          <img
            src="/cover.png"
            alt="Go Funny"
            className="block h-auto w-full object-contain object-center drop-shadow-[0_14px_28px_rgba(105,154,164,0.16)]"
          />
        </section>

        <section className="rounded-3xl border border-none bg-[linear-gradient(135deg,rgba(95,168,184,0.92),rgba(127,167,138,0.82))] text-white shadow-float">
          <div className="space-y-4 px-5 py-4">
            <div className="space-y-2">
              <p className="text-sm text-white/80">這次旅行，帳目清清楚楚</p>
              <h1 className="text-base font-semibold leading-tight">
                用最自然的方式記錄每一筆旅途花費。
              </h1>
              <p className="text-sm leading-6 text-white/85">
                這個版本先把旅程、成員、一般支出、公積金與結算的頁面責任分開，後續功能會依 OpenSpec 逐步補齊。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/16 px-3 py-2 backdrop-blur-sm">
                <p className="text-xs text-white/75">核心頁面</p>
                <p className="mt-1 text-xl font-semibold">6</p>
              </div>
              <div className="rounded-2xl bg-white/16 px-3 py-2 backdrop-blur-sm">
                <p className="text-xs text-white/75">模式</p>
                <p className="mt-1 text-xl font-semibold">混合</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/trips"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-primary shadow-soft transition-all hover:bg-white/90"
              >
                前往旅程清單
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/trip/$tripId"
                params={{ tripId: 'demo-trip' }}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/35 bg-white/18 px-4 text-sm font-medium text-white shadow-soft transition-all hover:bg-white/22"
              >
                查看旅程範例
              </Link>
            </div>
          </div>
        </section>

        <PageSection title="快速入口" description="先把主要頁面骨架接起來，後續再填入真實資料與互動。">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link to="/trips" className="group rounded-2xl border border-border bg-white p-4 transition-colors hover:border-primary/40 hover:bg-[#F9FCFD]">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-[#EAF5F7] p-2 text-primary">
                  <CalendarDays className="size-5" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium">旅程清單</h3>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="text-sm text-muted-foreground">查看所有旅程與進度</p>
                </div>
              </div>
            </Link>
            <Link to="/trip/$tripId" params={{ tripId: 'demo-trip' }} className="group rounded-2xl border border-border bg-white p-4 transition-colors hover:border-primary/40 hover:bg-[#F9FCFD]">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-[#EAF5F7] p-2 text-primary">
                  <ReceiptText className="size-5" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium">旅程明細</h3>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="text-sm text-muted-foreground">看支出、成員與結算</p>
                </div>
              </div>
            </Link>
            <Link to="/trip/$tripId/new-record" params={{ tripId: 'demo-trip' }} className="group rounded-2xl border border-border bg-white p-4 transition-colors hover:border-primary/40 hover:bg-[#F9FCFD]">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-[#EAF5F7] p-2 text-primary">
                  <Wallet className="size-5" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium">新增記錄</h3>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="text-sm text-muted-foreground">記錄一般支出或公積金</p>
                </div>
              </div>
            </Link>
            <Link to="/trip/$tripId/settlement" params={{ tripId: 'demo-trip' }} className="group rounded-2xl border border-border bg-white p-4 transition-colors hover:border-primary/40 hover:bg-[#F9FCFD]">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-[#EAF5F7] p-2 text-primary">
                  <Coins className="size-5" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium">結算結果</h3>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="text-sm text-muted-foreground">看一般結算與公積金結算</p>
                </div>
              </div>
            </Link>
            <Link to="/trip/$tripId/manage" params={{ tripId: 'demo-trip' }} className="group rounded-2xl border border-border bg-white p-4 transition-colors hover:border-primary/40 hover:bg-[#F9FCFD]">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-[#EAF5F7] p-2 text-primary">
                  <Settings2 className="size-5" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium">旅程管理</h3>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="text-sm text-muted-foreground">管理成員與旅程設定</p>
                </div>
              </div>
            </Link>
            <Link to="/invitations/$token" params={{ token: 'demo-token' }} className="group rounded-2xl border border-border bg-white p-4 transition-colors hover:border-primary/40 hover:bg-[#F9FCFD]">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-[#EAF5F7] p-2 text-primary">
                  <UserRoundPlus className="size-5" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium">邀請接受</h3>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="text-sm text-muted-foreground">加入旅程邀請流程</p>
                </div>
              </div>
            </Link>
          </div>
        </PageSection>
      </div>
    </AppShell>
  )
}
