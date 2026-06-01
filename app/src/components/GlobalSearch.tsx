import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Building2,
  Newspaper,
  Package,
  Search,
  Shirt,
} from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command'
import {
  buildGlobalSearchIndex,
  filterGlobalSearch,
  globalSearchGroups,
  type GlobalSearchGroup,
  type GlobalSearchItem,
} from '../lib/globalSearchIndex'

const groupIcons: Record<GlobalSearchGroup, React.ElementType> = {
  商品: Package,
  面料: Shirt,
  新闻: Newspaper,
  文档: BookOpen,
  门店: Building2,
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GlobalSearchTrigger({
  onClick,
  variant = 'full',
}: {
  onClick: () => void
  variant?: 'full' | 'icon'
}) {
  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={onClick}
        className="global-search-trigger global-search-trigger--icon flex items-center justify-center rounded-full bg-[#F5F5F5] text-[#595959] active:bg-[#E8E8E8] shrink-0"
        aria-label="搜索"
      >
        <Search size={20} />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="global-search-trigger flex items-center gap-2 flex-1 md:flex-none md:w-[min(100%,400px)] h-9 px-3 rounded-md border border-[#D9D9D9] bg-white min-w-0 text-left hover:border-primary/50 hover:bg-[#FAFAFA] transition-colors"
      aria-label="打开全局搜索"
    >
      <Search size={16} className="text-[#8C8C8C] shrink-0" />
      <span className="flex-1 text-sm text-[#8C8C8C] truncate">搜索商品、面料、新闻…</span>
      <kbd className="global-search-kbd hidden sm:inline-flex h-5 items-center rounded border border-[#F0F0F0] bg-[#FAFAFA] px-1.5 text-[10px] text-[#8C8C8C]">
        Ctrl K
      </kbd>
    </button>
  )
}

export default function GlobalSearch({ open, onOpenChange }: Props) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const index = useMemo(() => buildGlobalSearchIndex(), [])

  const results = useMemo(() => filterGlobalSearch(index, query), [index, query])

  const grouped = useMemo(() => {
    const map = new Map<GlobalSearchGroup, GlobalSearchItem[]>()
    for (const g of globalSearchGroups) {
      map.set(g, [])
    }
    for (const item of results) {
      map.get(item.group)?.push(item)
    }
    return map
  }, [results])

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const runNavigate = useCallback(
    (item: GlobalSearchItem) => {
      onOpenChange(false)
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
            state: {
              tab: nav.tab,
              albumId: nav.albumId,
              docId: nav.docId,
            },
          })
          break
        case 'page':
          navigate(nav.path)
          break
      }
    },
    [navigate, onOpenChange],
  )

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="全站搜索"
      description="搜索商品货号、面料、新闻与培训文档"
      className="max-w-[min(32rem,calc(100vw-2rem))]"
      shouldFilter={false}
    >
      <CommandInput
        placeholder="输入货号、面料名、新闻标题…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="max-h-[min(60vh,420px)]">
        <CommandEmpty>未找到相关内容，请换个关键词试试</CommandEmpty>
        {globalSearchGroups.map((group, gi) => {
          const items = grouped.get(group) ?? []
          if (items.length === 0) return null
          const Icon = groupIcons[group]
          return (
            <div key={group}>
              {gi > 0 && <CommandSeparator />}
              <CommandGroup heading={group}>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${item.id} ${item.title} ${item.subtitle ?? ''}`}
                    onSelect={() => runNavigate(item)}
                    className="flex items-center gap-3"
                  >
                    <Icon size={16} className="text-[#8C8C8C] shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm truncate">{item.title}</p>
                      {item.subtitle && (
                        <p className="text-xs text-[#8C8C8C] truncate">{item.subtitle}</p>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          )
        })}
      </CommandList>
    </CommandDialog>
  )
}

export function useGlobalSearchShortcut(onOpen: () => void) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpen()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onOpen])
}
