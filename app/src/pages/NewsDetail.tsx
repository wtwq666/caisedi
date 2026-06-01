import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Eye, User, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { newsService } from '../services/newsService'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PageBreadcrumb from '../components/PageBreadcrumb'

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const news = id ? newsService.getById(id) : undefined
  const [viewCount, setViewCount] = useState(news?.views ?? 0)
  useDocumentTitle(news?.title ?? '新闻详情')

  useEffect(() => {
    if (!news) return
    newsService.markRead(news.id)
    setViewCount(newsService.recordView(news.id, news.views))
  }, [news?.id])

  if (!news) {
    return (
      <div className="max-w-[1200px] mx-auto text-center py-20">
        <p className="text-[#8C8C8C]">通知不存在或已被删除</p>
        <button
          className="mt-4 px-4 py-2 text-sm text-[#1890FF] border border-[#1890FF] rounded hover:bg-[#E6F7FF]"
          onClick={() => navigate('/news')}
        >
          返回列表
        </button>
      </div>
    )
  }

  // Parse content: split by headings
  const contentLines = news.content.split('\n')

  const handleShare = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: news.title, text: news.summary, url })
        toast.success('分享成功')
      } else {
        await navigator.clipboard.writeText(url)
        toast.success('链接已复制到剪贴板')
      }
    } catch {
      toast.error('分享失败，请重试')
    }
  }

  return (
    <div className="max-w-[900px] mx-auto">
      <PageBreadcrumb
        items={[
          { label: '学习平台', to: '/' },
          { label: '新闻通知', to: '/news' },
          { label: news.title },
        ]}
      />
      <Link
        to="/news"
        className="hidden md:inline-flex items-center gap-1.5 text-sm text-[#595959] hover:text-primary mb-4 transition-colors"
      >
        <ArrowLeft size={16} />
        返回新闻列表
      </Link>

      {/* Article Card */}
      <div className="bg-white rounded-lg">
        {/* Header */}
        <div className="p-4 md:p-6 pb-4 border-b border-[#F0F0F0]">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs px-2 py-0.5 rounded ${news.tagColor}`}>{news.tag}</span>
            {news.pinned && (
              <span className="text-xs px-2 py-0.5 rounded bg-[#FFF7E6] text-[#FAAD14]">置顶</span>
            )}
          </div>
          <h1 className="text-xl font-semibold text-[#262626] leading-snug">{news.title}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs text-[#8C8C8C]">
            <span className="flex items-center gap-1">
              <User size={12} />
              {news.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {news.publishTime}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={12} />
              {viewCount} 次阅读
            </span>
          </div>
        </div>

        {/* Cover */}
        {news.coverImage && (
          <div className="px-4 md:px-6 pt-5">
            <img
              src={news.coverImage}
              alt={news.title}
              className="w-full max-h-[520px] object-contain rounded-xl bg-[#FAFAFA]"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 pt-5">
          <div className="text-sm text-[#262626] leading-[1.85] space-y-3">
            {contentLines.map((line, idx) => {
              const trimmed = line.trim()
              if (!trimmed) return null
              // Heading like **text**
              if (trimmed.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-base font-semibold text-[#262626] mt-5 mb-2">
                    {trimmed.replace('## ', '')}
                  </h2>
                )
              }
              // Bold text
              if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                return (
                  <p key={idx} className="font-semibold text-[#262626] mt-3">
                    {trimmed.replace(/\*\*/g, '')}
                  </p>
                )
              }
              // Table-like content
              if (trimmed.includes('|')) {
                return (
                  <div key={idx} className="my-2 overflow-x-auto">
                    <table className="w-full text-xs border border-[#F0F0F0] rounded">
                      <tbody>
                        {trimmed.split('|').filter(Boolean).map((cell, cIdx) => (
                          <tr key={cIdx} className={cIdx % 2 === 0 ? 'bg-[#FAFAFA]' : 'bg-white'}>
                            {cell.split('|').filter(Boolean).map((c, ci) => (
                              <td key={ci} className="px-3 py-2 border border-[#F0F0F0] text-[#595959]">
                                {c.trim()}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              }
              // Bullet points
              if (trimmed.startsWith('- ') || trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ') || trimmed.startsWith('4. ')) {
                return (
                  <p key={idx} className="pl-4 text-[#595959]">
                    <span className="text-[#1890FF] mr-1.5">
                      {trimmed.startsWith('- ') ? '•' : trimmed.split('.')[0] + '.'}
                    </span>
                    {trimmed.replace(/^(- |\d+\. )/, '')}
                  </p>
                )
              }
              // Blockquote-style
              if (trimmed.startsWith('「') && trimmed.endsWith('」')) {
                return (
                  <p key={idx} className="pl-4 border-l-2 border-[#1890FF] text-[#1890FF] italic my-2">
                    {trimmed}
                  </p>
                )
              }
              return (
                <p key={idx} className="text-[#595959] leading-relaxed">
                  {trimmed}
                </p>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#F0F0F0] flex items-center justify-between">
          <div className="text-xs text-[#8C8C8C]">
            本文作者：{news.author} · 发布时间：{news.publishTime}
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#595959] border border-[#D9D9D9] rounded hover:bg-[#F5F5F5] transition-colors"
            onClick={handleShare}
            aria-label="分享文章"
          >
            <Share2 size={12} />
            分享
          </button>
        </div>
      </div>
    </div>
  )
}
