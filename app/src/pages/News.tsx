import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Newspaper, Pin, Eye, Clock, Search, X } from 'lucide-react'
import { newsService } from '../services/newsService'
import type { NewsItem } from '../data/newsData'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PageBreadcrumb from '../components/PageBreadcrumb'

const tagFilters = [
  { key: 'all', label: '全部' },
  { key: '重要', label: '重要' },
  { key: '培训', label: '培训' },
  { key: '通知', label: '通知' },
  { key: '系统', label: '系统' },
]

function NewsListCard({
  news,
  pinned,
  unread,
}: {
  news: NewsItem
  pinned?: boolean
  unread?: boolean
}) {
  const views = newsService.getViewCount(news.id, news.views)
  return (
    <Link
      to={`/news/${news.id}`}
      className={`block bg-card rounded-lg p-4 md:p-5 hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary app-news-card ${
        pinned ? 'border-l-[3px] border-[#FAAD14]' : ''
      } ${unread ? 'ring-1 ring-primary/20' : ''}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            {unread && (
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" aria-label="未读" />
            )}
            <h3
              className={`text-base text-foreground ${unread ? 'font-semibold' : 'font-medium'}`}
            >
              {news.title}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded flex-shrink-0 ${news.tagColor}`}>{news.tag}</span>
            {pinned && <Pin size={12} className="text-[#FAAD14] flex-shrink-0" aria-label="置顶" />}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{news.summary}</p>
          <div className="flex items-center gap-4 mt-2.5 text-xs text-muted-foreground flex-wrap">
            <span>{news.author}</span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {news.publishTime}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={11} />
              {views} 次阅读
            </span>
          </div>
        </div>
        {news.coverImage && (
          <img
            src={news.coverImage}
            alt=""
            className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover flex-shrink-0 border border-[#F0F0F0] bg-[#FAFAFA]"
          />
        )}
      </div>
    </Link>
  )
}

export default function News() {
  useDocumentTitle('新闻通知')
  const [activeTag, setActiveTag] = useState('all')
  const [searchText, setSearchText] = useState('')

  const allNews = newsService.list()

  const filtered = useMemo(() => {
    let list = [...allNews]
    if (activeTag !== 'all') list = list.filter((n) => n.tag === activeTag)
    if (searchText) {
      const kw = searchText.toLowerCase()
      list = list.filter(
        (n) =>
          n.title.includes(kw) ||
          n.summary.includes(kw) ||
          n.author.includes(kw) ||
          n.content.includes(kw)
      )
    }
    list.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
    })
    return list
  }, [activeTag, searchText, allNews])

  const unreadCount = newsService.unreadCount()

  const pinnedList = filtered.filter((n) => n.pinned)
  const normalList = filtered.filter((n) => !n.pinned)

  return (
    <div className="max-w-[1200px] mx-auto">
      <PageBreadcrumb items={[{ label: '学习平台', to: '/' }, { label: '新闻通知' }]} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div>
          <h1 className="app-page-local-title text-xl md:text-2xl font-semibold text-foreground">新闻通知</h1>
          <p className="app-page-local-subtitle text-sm text-muted-foreground mt-1">
            查看公司最新动态、培训通知与重要公告
            {unreadCount > 0 && (
              <span className="ml-2 text-primary font-medium">{unreadCount} 条未读</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 h-10 md:h-9 rounded-lg border border-input bg-card w-full md:w-[280px] shrink-0">
          <Search size={14} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索标题、内容..."
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

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {tagFilters.map((t) => (
          <button
            key={t.key}
            type="button"
            aria-pressed={activeTag === t.key}
            className={`app-filter-chip px-3.5 py-2 text-sm rounded-full transition-colors ${
              activeTag === t.key
                ? 'bg-primary text-white'
                : 'bg-card text-[#595959] hover:text-primary hover:bg-[#E6F7FF]'
            }`}
            onClick={() => setActiveTag(t.key)}
          >
            {t.label}
          </button>
        ))}
        <span className="text-xs text-muted-foreground ml-auto">共 {filtered.length} 条</span>
      </div>

      {pinnedList.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-2 px-1">
            <Pin size={14} className="text-[#FAAD14]" />
            <span className="text-xs font-medium text-[#FAAD14]">置顶</span>
          </div>
          <div className="space-y-3">
            {pinnedList.map((news) => (
              <NewsListCard
                key={news.id}
                news={news}
                pinned
                unread={!newsService.isRead(news.id)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {normalList.map((news) => (
          <NewsListCard
            key={news.id}
            news={news}
            unread={!newsService.isRead(news.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Newspaper size={48} className="text-[#D9D9D9] mb-4" />
          <p className="text-sm text-muted-foreground">暂无相关通知</p>
        </div>
      )}
    </div>
  )
}
