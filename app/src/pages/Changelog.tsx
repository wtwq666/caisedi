import { useMemo, useState } from 'react'
import { History, Search, X, Sparkles, Wrench, TrendingUp } from 'lucide-react'
import {
  changelogEntries,
  changeTypeColors,
  changeTypeLabels,
  currentVersion,
  type ChangelogChangeType,
} from '../data/changelogData'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PageBreadcrumb from '../components/PageBreadcrumb'

const typeFilters: { key: 'all' | ChangelogChangeType; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'feature', label: '新功能' },
  { key: 'fix', label: '修复' },
  { key: 'improve', label: '优化' },
]

const typeIcons: Record<ChangelogChangeType, React.ElementType> = {
  feature: Sparkles,
  fix: Wrench,
  improve: TrendingUp,
}

export default function Changelog() {
  useDocumentTitle('更新公告')
  const [activeType, setActiveType] = useState<'all' | ChangelogChangeType>('all')
  const [searchText, setSearchText] = useState('')

  const filtered = useMemo(() => {
    const kw = searchText.trim().toLowerCase()
    return changelogEntries
      .map((entry) => {
        const changes =
          activeType === 'all'
            ? entry.changes
            : entry.changes.filter((c) => c.type === activeType)
        if (changes.length === 0) return null
        if (!kw) return { ...entry, changes }
        const matchEntry =
          entry.version.toLowerCase().includes(kw) ||
          entry.title.toLowerCase().includes(kw) ||
          (entry.summary?.toLowerCase().includes(kw) ?? false) ||
          changes.some((c) => c.text.toLowerCase().includes(kw))
        if (!matchEntry) return null
        const matchedChanges = changes.filter((c) => c.text.toLowerCase().includes(kw))
        return {
          ...entry,
          changes: kw && matchedChanges.length > 0 ? matchedChanges : changes,
        }
      })
      .filter(Boolean) as typeof changelogEntries
  }, [activeType, searchText])

  return (
    <div className="max-w-[900px] mx-auto">
      <PageBreadcrumb items={[{ label: '学习平台', to: '/' }, { label: '更新公告' }]} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div>
          <h1 className="app-page-local-title text-xl md:text-2xl font-semibold text-foreground">更新公告</h1>
          <p className="app-page-local-subtitle text-sm text-muted-foreground mt-1">
            查看系统历史版本与功能更新记录 · 当前版本{' '}
            <span className="text-primary font-medium">{currentVersion}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 h-9 rounded border border-input bg-card w-full md:w-[280px] shrink-0">
          <Search size={14} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索版本、更新内容..."
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {searchText && (
            <button type="button" onClick={() => setSearchText('')} aria-label="清除搜索">
              <X size={14} className="text-muted-foreground hover:text-destructive" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {typeFilters.map((t) => (
          <button
            key={t.key}
            type="button"
            aria-pressed={activeType === t.key}
            className={`px-3.5 py-1.5 text-sm rounded transition-colors ${
              activeType === t.key
                ? 'bg-primary text-white'
                : 'bg-card text-[#595959] hover:text-primary hover:bg-[#E6F7FF]'
            }`}
            onClick={() => setActiveType(t.key)}
          >
            {t.label}
          </button>
        ))}
        <span className="text-xs text-muted-foreground ml-auto">共 {filtered.length} 个版本</span>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-lg">
          <History size={48} className="text-[#D9D9D9] mb-4" />
          <p className="text-sm text-muted-foreground">暂无匹配的更新记录</p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[#F0F0F0] hidden sm:block" aria-hidden />
          <div className="space-y-6">
            {filtered.map((entry) => (
              <article
                key={entry.id}
                className="relative bg-card rounded-lg border border-[#F0F0F0] overflow-hidden"
              >
                <div className="flex items-start gap-4 p-5 pb-4 border-b border-[#F0F0F0] bg-[#FAFAFA]/80">
                  <div
                    className={`hidden sm:flex w-8 h-8 rounded-full items-center justify-center flex-shrink-0 z-10 ${
                      entry.latest ? 'bg-primary text-white' : 'bg-white border-2 border-[#D9D9D9] text-[#8C8C8C]'
                    }`}
                  >
                    <History size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-primary">{entry.version}</span>
                      {entry.latest && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary text-white">
                          当前版本
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">{entry.date}</span>
                    </div>
                    <h2 className="text-base font-medium text-foreground mt-1">{entry.title}</h2>
                    {entry.summary && (
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{entry.summary}</p>
                    )}
                  </div>
                </div>
                <ul className="p-5 pt-4 space-y-2.5">
                  {entry.changes.map((change, idx) => {
                    const Icon = typeIcons[change.type]
                    return (
                      <li key={idx} className="flex items-start gap-2.5 text-sm">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs flex-shrink-0 mt-0.5 ${changeTypeColors[change.type]}`}
                        >
                          <Icon size={11} />
                          {changeTypeLabels[change.type]}
                        </span>
                        <span className="text-[#595959] leading-relaxed flex-1">{change.text}</span>
                      </li>
                    )
                  })}
                </ul>
              </article>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center mt-8">
        后续版本更新请维护{' '}
        <code className="px-1 py-0.5 bg-[#F5F5F5] rounded text-[#595959]">src/data/changelogData.ts</code>
      </p>
    </div>
  )
}
