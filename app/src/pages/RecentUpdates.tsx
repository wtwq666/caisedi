import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import {
  getContentUpdateTypeBadge,
  getRecentContentUpdates,
} from '../lib/recentContentUpdates'

export default function RecentUpdates() {
  useDocumentTitle('最近更新')
  const items = getRecentContentUpdates()

  return (
    <div className="max-w-[720px] mx-auto">
      <div className="mb-4">
        <h1 className="app-page-local-title text-xl md:text-2xl font-semibold text-[#262626]">最近更新</h1>
        <p className="app-page-local-subtitle text-sm text-muted-foreground mt-1">
          通知、培训文档、商品与面料等资料的最新动态
        </p>
      </div>

      <div className="bg-white rounded-lg border border-[#F0F0F0] overflow-hidden">
        {items.length === 0 ? (
          <p className="text-sm text-[#8C8C8C] text-center py-12">暂无更新记录</p>
        ) : (
          <ul className="divide-y divide-[#F0F0F0]">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.to}
                  state={item.state}
                  className="flex items-start gap-3 px-4 py-3.5 hover:bg-[#FAFAFA] transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${getContentUpdateTypeBadge(item.type)}`}
                      >
                        {item.type}
                      </span>
                      <span className="text-xs text-[#8C8C8C]">{item.dateLabel}</span>
                    </div>
                    <p className="text-sm font-medium text-[#262626]">{item.title}</p>
                    {item.subtitle && (
                      <p className="text-xs text-[#8C8C8C] mt-0.5">{item.subtitle}</p>
                    )}
                  </div>
                  <ChevronRight size={16} className="text-[#D9D9D9] shrink-0 mt-1" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
