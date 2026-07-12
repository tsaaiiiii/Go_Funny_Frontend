import type { PropsWithChildren } from 'react'
import { useLocation } from '@tanstack/react-router'
import { useEffect } from 'react'

import { BottomNav } from '@/components/layout/bottom-nav'
import { cn } from '@/lib/utils'

export function AppShell({ children }: PropsWithChildren) {
  const location = useLocation()
  const showBottomNav = true

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div
      className={cn(
        'mx-auto min-h-screen w-full max-w-md bg-travel-wash px-4 pt-5 sm:max-w-lg sm:px-5',
        showBottomNav ? 'pb-[calc(env(safe-area-inset-bottom)+6.75rem)]' : 'pb-6',
      )}
    >
      <main className="space-y-4">{children}</main>
      {showBottomNav ? <BottomNav /> : null}
    </div>
  )
}
