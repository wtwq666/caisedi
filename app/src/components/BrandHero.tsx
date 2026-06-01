import type { ReactNode } from 'react'

type BrandHeroProps = {
  title: string
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export default function BrandHero({ title, icon, children, className = '' }: BrandHeroProps) {
  return (
    <div
      className={`rounded-lg bg-gradient-to-r from-primary to-[#36CFC9] p-4 md:p-8 ${className}`}
    >
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      <div className="text-sm text-white/90 leading-relaxed max-w-[800px] space-y-3">{children}</div>
    </div>
  )
}
