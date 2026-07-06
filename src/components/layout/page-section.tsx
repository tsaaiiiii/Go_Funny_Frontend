import { cn } from '@/lib/utils'

export function PageSection({
  title,
  description,
  className,
  children,
}: {
  title: string
  description?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={cn('space-y-3 rounded-3xl border border-white/70 bg-card/95 p-4 shadow-soft backdrop-blur-sm sm:p-5', className)}>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </section>
  )
}
