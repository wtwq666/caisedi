import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Building2,
  ChevronRight,
  Newspaper,
  Package,
  Search,
  Shirt,
  X,
} from 'lucide-react'
import { apiRequest } from '../api/client'
import { USE_MOCK } from '../api/config'
import {
  buildGlobalSearchIndex,
  filterGlobalSearch,
  groupSearchResults,
  globalSearchGroups,
  type GlobalSearchGroup,
  type GlobalSearchItem,
  type GlobalSearchNavigate,
} from '../lib/globalSearchIndex'

const groupIcons: Record<GlobalSearchGroup, React.ElementType> = {
  商品: Package,
  面料: Shirt,
  新闻: Newspaper,
  文档: BookOpen,
  门店: Building2,
}

const groupBadgeClass: Record<GlobalSearchGroup, string> = {
  商品: 'bg-[#F6FFED] text-[#389E0D]',
  面料: 'bg-[#FFF7E6] text-[#D48806]',
  新闻: 'bg-[#FFF1F0] text-[#CF1322]',
  文档: 'bg-[#E6F7FF] text-[#1890FF]',
  门店: 'bg-[#F9F0FF] text-[#722ED1]',
}

type GlobalSearchBarProps = {
  /** 顶栏完整宽度 | 手机 Tab 页第二行 | 手机仅图标（点开展开条） */
  variant?: 'header' | 'mobile-bar' | 'icon-only'
  className?: string
}

function navigateToItem(navigate: ReturnType<typeof useNavigate>, item: GlobalSearchItem) {
  const nav = item.navigate
  switch (nav.type) {
    case 'product':
      navigate('/products', { state: { productId: nav.productId } })
      break
    case 'fabric':
      navigate('/knowledge', { state: { tab: 'fabric', fabricId: nav.fabricId } })
      break
    case 'news':
      navigate(`/news/${nav.newsId}`)
      break
    case 'knowledge':
      navigate('/knowledge', {
        state: { tab: nav.tab, albumId: nav.albumId, docId: nav.docId },
      })
      break
    case 'page':
      navigate(nav.path)
      break
  }
}

export function GlobalSearchBar({ variant = 'header', className = '' }: GlobalSearchBarProps) {
  const navigate = useNavigate()
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [expanded, setExpanded] = useState(variant !== 'icon-only')
  const [focused, setFocused] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [apiResults, setApiResults] = useState<GlobalSearchItem[]>([])
  const index = useMemo(() => (USE_MOCK ? buildGlobalSearchIndex() : []), [])

  const showPanel = expanded && focused && (variant !== 'icon-only' || query.length > 0)

  useEffect(() => {
    if (USE_MOCK || query.trim().length < 1) {
      setApiResults([])
      return
    }
    const t = window.setTimeout(() => {
      void apiRequest<
        Array<{
          id: string
          group: GlobalSearchGroup
          title: string
          subtitle?: string
          navigate: GlobalSearchNavigate
        }>
      >(`/search?q=${encodeURIComponent(query.trim())}`).then((rows) =>
        setApiResults(
          rows.map((r) => ({
            id: r.id,
            group: r.group,
            title: r.title,
            subtitle: r.subtitle,
            searchText: [r.title, r.subtitle ?? ''].join(' '),
            navigate: r.navigate,
          })),
        ),
      )
    }, 200)
    return () => window.clearTimeout(t)
  }, [query])

  const results = useMemo(() => {
    if (USE_MOCK) return filterGlobalSearch(index, query)
    if (!query.trim()) return []
    return apiResults
  }, [index, query, apiResults])

  const grouped = useMemo(() => groupSearchResults(results), [results])
  const flatResults = useMemo(() => {
    const list: GlobalSearchItem[] = []
    for (const g of globalSearchGroups) {
      for (const item of grouped.get(g) ?? []) list.push(item)
    }
    return list
  }, [grouped])

  useEffect(() => {
    setActiveIndex(0)
  }, [query, flatResults.length])

  useEffect(() => {
    if (!showPanel) return
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setFocused(false)
        if (variant === 'icon-only') setExpanded(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [showPanel, variant])

  const close = useCallback(() => {
    setFocused(false)
    setQuery('')
    if (variant === 'icon-only') setExpanded(false)
  }, [variant])

  const selectItem = useCallback(
    (item: GlobalSearchItem) => {
      navigateToItem(navigate, item)
      close()
    },
    [navigate, close],
  )

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      close()
      inputRef.current?.blur()
      return
    }
    if (!flatResults.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (i + 1) % flatResults.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => (i - 1 + flatResults.length) % flatResults.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = flatResults[activeIndex]
      if (item) selectItem(item)
    }
  }

  useEffect(() => {
    const onGlobalKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (variant === 'icon-only') setExpanded(true)
        setFocused(true)
        requestAnimationFrame(() => inputRef.current?.focus())
      }
    }
    window.addEventListener('keydown', onGlobalKey)
    return () => window.removeEventListener('keydown', onGlobalKey)
  }, [variant])

  const openIconSearch = () => {
    setExpanded(true)
    setFocused(true)
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  if (variant === 'icon-only' && !expanded) {
    return (
      <button
        type="button"
        onClick={openIconSearch}
        className={`global-search-trigger global-search-trigger--icon flex items-center justify-center rounded-full bg-[#F5F5F5] text-[#595959] active:bg-[#E8E8E8] shrink-0 ${className}`}
        aria-label="搜索"
      >
        <Search size={20} />
      </button>
    )
  }

  const inputRow = (
    <div
      className={`flex items-center gap-2 h-9 px-3 rounded-lg border bg-white transition-colors ${
        focused ? 'border-primary ring-2 ring-primary/15' : 'border-[#D9D9D9] hover:border-[#BFBFBF]'
      } ${variant === 'mobile-bar' ? 'w-full' : 'w-full md:w-[min(100%,420px)]'}`}
    >
      <Search size={16} className="text-[#8C8C8C] shrink-0" />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onKeyDown={onKeyDown}
        placeholder="搜索货号、面料、新闻、文档…"
        className="flex-1 min-w-0 text-sm text-[#262626] bg-transparent outline-none placeholder:text-[#BFBFBF]"
        aria-label="全站搜索"
        aria-expanded={showPanel}
        aria-controls="global-search-results"
        autoComplete="off"
      />
      {query ? (
        <button
          type="button"
          onClick={() => setQuery('')}
          className="p-0.5 rounded text-[#8C8C8C] hover:text-[#262626] hover:bg-[#F5F5F5]"
          aria-label="清除"
        >
          <X size={14} />
        </button>
      ) : (
        <kbd className="global-search-kbd hidden sm:inline-flex h-5 items-center rounded border border-[#F0F0F0] bg-[#FAFAFA] px-1.5 text-[10px] text-[#8C8C8C]">
          Ctrl K
        </kbd>
      )}
    </div>
  )

  let flatIdx = -1

  return (
    <div ref={rootRef} className={`relative z-50 ${className}`}>
      {variant === 'icon-only' && expanded ? (
        <div className="flex items-center gap-2">
          {inputRow}
          <button
            type="button"
            onClick={close}
            className="shrink-0 text-xs text-[#8C8C8C] px-2 py-1 rounded hover:bg-[#F5F5F5]"
          >
            收起
          </button>
        </div>
      ) : (
        inputRow
      )}

      {showPanel && (
        <div
          id="global-search-results"
          role="listbox"
          className={`absolute left-0 right-0 mt-1.5 bg-white rounded-lg border border-[#F0F0F0] shadow-lg overflow-hidden ${
            variant === 'mobile-bar' ? 'max-h-[min(52vh,360px)]' : 'max-h-[min(56vh,400px)]'
          }`}
        >
          <div className="overflow-y-auto max-h-[inherit] py-1">
            {!query.trim() ? (
              <p className="px-4 py-6 text-sm text-center text-[#8C8C8C]">
                输入货号、商品名、面料或新闻标题开始搜索
              </p>
            ) : flatResults.length === 0 ? (
              <p className="px-4 py-6 text-sm text-center text-[#8C8C8C]">
                未找到「{query.trim()}」相关内容
              </p>
            ) : (
              globalSearchGroups.map((group) => {
                const items = grouped.get(group) ?? []
                if (!items.length) return null
                const Icon = groupIcons[group]
                return (
                  <div key={group} className="py-1">
                    <p className="px-3 py-1.5 text-[11px] font-medium text-[#8C8C8C] tracking-wide">
                      {group}
                    </p>
                    <ul>
                      {items.map((item) => {
                        flatIdx += 1
                        const idx = flatIdx
                        const isActive = idx === activeIndex
                        return (
                          <li key={item.id}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={isActive}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                                isActive ? 'bg-[#E6F7FF]' : 'hover:bg-[#FAFAFA]'
                              }`}
                              onMouseEnter={() => setActiveIndex(idx)}
                              onClick={() => selectItem(item)}
                            >
                              <span
                                className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${groupBadgeClass[group]}`}
                              >
                                <Icon size={16} />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-sm font-medium text-[#262626] truncate">
                                  {item.title}
                                </span>
                                {item.subtitle && (
                                  <span className="block text-xs text-[#8C8C8C] truncate mt-0.5">
                                    {item.subtitle}
                                  </span>
                                )}
                              </span>
                              <ChevronRight size={14} className="text-[#D9D9D9] shrink-0" />
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/** @deprecated 使用 GlobalSearchBar */
export default function GlobalSearch() {
  return null
}

export function GlobalSearchTrigger() {
  return null
}

export function useGlobalSearchShortcut() {
  /* 快捷键已内置在 GlobalSearchBar */
}
