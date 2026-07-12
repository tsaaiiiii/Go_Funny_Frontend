import { Link, useLocation } from '@tanstack/react-router'
import { Home, PlusCircle, ReceiptText, WalletCards } from 'lucide-react'

import { cn } from '@/lib/utils'

const demoTripId = 'demo-trip'

export function BottomNav() {
  const location = useLocation()

  return (
    <nav
      aria-label="主要頁面切換"
      className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] left-1/2 z-20 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-full border border-white/70 bg-card/90 p-2 shadow-float backdrop-blur-xl sm:max-w-lg"
    >
      <ul className="grid grid-cols-4 gap-1">
        <li>
          <Link
            to="/"
            aria-current={location.pathname === '/' ? 'page' : undefined}
            className={cn(
              'flex min-h-14 w-full touch-manipulation flex-col items-center justify-center gap-1 rounded-full px-2 py-2 text-[11px] font-medium transition-colors',
              location.pathname === '/' ? 'bg-[#E9F3F5] text-primary' : 'text-muted-foreground',
            )}
          >
            <Home className="h-4 w-4" />
            <span>首頁</span>
          </Link>
        </li>
        <li>
          <Link
            to="/trip/$tripId"
            params={{ tripId: demoTripId }}
            aria-current={location.pathname === `/trip/${demoTripId}` ? 'page' : undefined}
            className={cn(
              'flex min-h-14 w-full touch-manipulation flex-col items-center justify-center gap-1 rounded-full px-2 py-2 text-[11px] font-medium transition-colors',
              location.pathname === `/trip/${demoTripId}` ? 'bg-[#E9F3F5] text-primary' : 'text-muted-foreground',
            )}
          >
            <ReceiptText className="h-4 w-4" />
            <span>明細</span>
          </Link>
        </li>
        <li>
          <Link
            to="/trip/$tripId/new-record"
            params={{ tripId: demoTripId }}
            aria-current={location.pathname === `/trip/${demoTripId}/new-record` ? 'page' : undefined}
            className={cn(
              'flex min-h-14 w-full touch-manipulation flex-col items-center justify-center gap-1 rounded-full px-2 py-2 text-[11px] font-medium transition-colors',
              location.pathname === `/trip/${demoTripId}/new-record` ? 'bg-[#E9F3F5] text-primary' : 'text-muted-foreground',
            )}
          >
            <PlusCircle className="h-4 w-4" />
            <span>新增</span>
          </Link>
        </li>
        <li>
          <Link
            to="/trip/$tripId/settlement"
            params={{ tripId: demoTripId }}
            aria-current={location.pathname === `/trip/${demoTripId}/settlement` ? 'page' : undefined}
            className={cn(
              'flex min-h-14 w-full touch-manipulation flex-col items-center justify-center gap-1 rounded-full px-2 py-2 text-[11px] font-medium transition-colors',
              location.pathname === `/trip/${demoTripId}/settlement` ? 'bg-[#E9F3F5] text-primary' : 'text-muted-foreground',
            )}
          >
            <WalletCards className="h-4 w-4" />
            <span>結算</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
