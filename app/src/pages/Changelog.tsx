import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, FileText, Search, X } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PageBreadcrumb from '../components/PageBreadcrumb'
import {
  getContentUpdateActionBadge,
  getContentUpdateTypeBadge,
  type ContentUpdateAction,
  type ContentUpdateType,
  type ContentUpdateItem,
} from '../lib/recentContentUpdates'
import { contentUpdatesService } from '../services/contentUpdatesService'

const actionFilters: { key: 'all' | ContentUpdateAction; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: '新增', label: '新增' },
  { key: '修改', label: '修改' },
]

const typeFilters: { key: 'all' | ContentUpdateType; label: string }[] = [
  { key: 'all', label: '全部类型' },
  { key: '文档', label: '文档' },
  { key: '通知', label: '通知' },
  { key: '商品', label: '商品' },
  { key: '面料', label: '面料' },
  { key: '门店', label: '门店' },
]

export default function Changelog() {
  useDocumentTitle('资料更新')
  const [activeAction, setActiveAction] = useState<'all' | ContentUpdateAction>('all')
  const [activeType, setActiveType] = useState<'all' | ContentUpdateType>('all')
  const [searchText, setSearchText] = useState('')
  const [items, setItems] = useState<ContentUpdateItem[]>(() => contentUpdatesService.list())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const t = window.setTimeout(() => {
      setLoading(true)
      setError('')
      void contentUpdatesService
        .fetchAll({
          action: activeAction,
          type: activeType,
          q: searchText.trim() || undefined,
        })
        .then(setItems)
        .catch((e) => {
          console.error('[changelog] fetch failed', e)
          setError('加载失败，请稍后重试')
          setItems([])
        })
        .finally(() => setLoading(false))
    }, searchText ? 300 : 0)
    return () => window.clearTimeout(t)
  }, [activeAction, activeType, searchText])

  return (
    <div className="max-w-[900px] mx-auto">
      <PageBreadcrumb items={[{ label: '学习平台', to: '/' }, { label: '资料更新' }]} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div>
          <h1 className="app-page-local-title text-xl md:text-2xl font-semibold text-foreground">
            资料更新
          </h1>
          <p className="app-page-local-subtitle text-sm text-muted-foreground mt-1">
            查看网站最新新增或修改的文档、商品、面料与通知
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 h-9 rounded border border-input bg-card w-full md:w-[280px] shrink-0">
          <Search size={14} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索文档、通知、商品..."
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {searchText && (
            <button type="button" onClick={() => setSearchText('')} aria-label="清除">
              <X size={14} className="text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {actionFilters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActiveAction(f.key)}
            className={`app-filter-chip px-3 py-1 rounded-full text-xs ${
              activeAction === f.key ? 'bg-primary text-white' : 'bg-[#F5F5F5] text-[#595959]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {typeFilters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActiveType(f.key)}
            className={`app-filter-chip px-3 py-1 rounded-full text-xs ${
              activeType === f.key ? 'bg-primary text-white' : 'bg-[#F5F5F5] text-[#595959]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error && (
        <p className="text-sm text-[#CF1322] bg-[#FFF1F0] border border-[#FFA39E] rounded-lg px-3 py-2 mb-4">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-muted-foreground py-8 text-center">加载中…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">暂无匹配的更新记录</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                to={item.to}
                state={item.state}
                className="flex items-center gap-3 p-4 bg-card rounded-lg border border-[#F0F0F0] hover:border-primary/30 hover:shadow-sm transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#E6F7FF] flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${getContentUpdateTypeBadge(item.type)}`}
                    >
                      {item.type}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${getContentUpdateActionBadge(item.action)}`}
                    >
                      {item.action}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.dateLabel}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground truncate group-hover:text-primary">
                    {item.title}
                  </p>
                  {item.subtitle && (
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{item.subtitle}</p>
                  )}
                </div>
                <ChevronRight
                  size={16}
                  className="text-[#D9D9D9] group-hover:text-primary shrink-0"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
