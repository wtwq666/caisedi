import { ChevronLeft } from 'lucide-react'

type Props = {
  onBack: () => void
  label?: string
}

export default function MobileDetailBackBar({ onBack, label = '返回' }: Props) {
  return (
    <div className="mobile-detail-back md:hidden shrink-0 border-b border-[#F0F0F0] bg-white px-1 py-0.5 sticky top-0 z-10">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-0.5 min-h-[44px] px-2 text-[15px] text-[#1890FF] font-medium active:opacity-70"
      >
        <ChevronLeft size={22} strokeWidth={2.25} />
        {label}
      </button>
    </div>
  )
}
