import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Search,
  BookOpen,
  Building2,
  Bell,
  ChevronRight,
  Newspaper,
  ClipboardCheck,
  UserCircle,
  Sparkles,
  History,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { newsService } from '../services/newsService'
import {
  getRecentLearning,
  getRecentLearningLink,
} from '../lib/recentLearningStorage'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import BrandHero from '../components/BrandHero'
import { useAuth } from '../context/AuthContext'
import { useIsMobile } from '../hooks/use-mobile'
import { getTagModuleProgress } from '../lib/quizRecordsStorage'
import {
  getContentUpdateTypeBadge,
  getRecentContentUpdates,
} from '../lib/recentContentUpdates'

const quickEntries = [
  { title: '公司文化', desc: '了解企业文化与门店风采', icon: Building2, path: '/culture' },
  { title: '知识管理', desc: '学习产品知识与销售技巧', icon: BookOpen, path: '/knowledge' },
  { title: '商品速查', desc: '快速查询商品信息', icon: Search, path: '/products' },
  { title: '新闻通知', desc: '查看最新公告与培训通知', icon: Newspaper, path: '/news' },
]

/** 手机端 Tab 已覆盖知识/商品，首页只保留次要入口 */
const mobileQuickEntries = [
  { title: '公司文化', desc: '品牌与门店风采', icon: Building2, path: '/culture' },
  { title: '新闻通知', desc: '公告与培训通知', icon: Newspaper, path: '/news' },
  { title: '我的答题', desc: '测验成绩与记录', icon: ClipboardCheck, path: '/quiz-records' },
  { title: '最近更新', desc: '资料与内容动态', icon: Sparkles, path: '/recent-updates' },
]

export default function Dashboard() {
  useDocumentTitle('学习平台')
  const location = useLocation()
  const { user } = useAuth()
  const isMobile = useIsMobile()
  const entries = isMobile ? mobileQuickEntries : quickEntries
  const unreadNewsCount = useMemo(() => newsService.unreadCount(), [location.key])
  const recentLearning = useMemo(() => getRecentLearning(3), [location.key])
  const fabricTagProgress = user ? getTagModuleProgress(user.id, 'fabric') : []
  const productTagProgress = user ? getTagModuleProgress(user.id, 'product') : []
  const countTestedModules = (tags: ReturnType<typeof getTagModuleProgress>) =>
    tags.reduce((n, t) => n + t.modules.filter((m) => m.attemptCount > 0).length, 0)
  const countTotalModules = (tags: ReturnType<typeof getTagModuleProgress>) =>
    tags.reduce((n, t) => n + t.modules.length, 0)
  const fabricTested = countTestedModules(fabricTagProgress)
  const fabricTotal = countTotalModules(fabricTagProgress)
  const productTested = countTestedModules(productTagProgress)
  const productTotal = countTotalModules(productTagProgress)

  const latestNotifications = newsService
    .list()
    .sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime())
    .slice(0, 4)

  const recentContentUpdates = getRecentContentUpdates(6)

  return (
    <div className="max-w-[1200px] mx-auto space-y-4">
      <BrandHero
        title={user ? `欢迎回来，${user.name}` : '欢迎回来'}
        icon={<Bell size={20} className="text-white" />}
        className="brand-hero-native !p-4 md:!p-6"
      >
        <p>凯施迪学习平台 — 商品、知识、文化、通知一站查阅。</p>
        {user && (
          <p className="text-sm text-white/85 mt-2">
            答题进度：面料 {fabricTested}/{fabricTotal} 模块（按标签） · 商品 {productTested}/{productTotal} 模块（按系列）
          </p>
        )}
      </BrandHero>

      {user && (
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            to="/profile"
            className="flex items-center justify-between bg-card rounded-lg p-4 border border-[#F0F0F0] hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#E6F7FF] flex items-center justify-center shrink-0">
                <UserCircle size={20} className="text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">工作信息</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {user.jobPosition} · {user.store}
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-muted-foreground shrink-0" />
          </Link>
          <Link
            to="/quiz-records"
            className="flex items-center justify-between bg-card rounded-lg p-4 border border-[#F0F0F0] hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E6F7FF] flex items-center justify-center">
                <ClipboardCheck size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">我的答题</p>
                <p className="text-xs text-muted-foreground mt-0.5">查看各模块测验成绩与历史记录</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </Link>
        </div>
      )}

      <div>
        <h1 className="app-page-local-title text-xl md:text-2xl font-semibold text-foreground">学习平台</h1>
        <p className="app-page-subtitle text-sm text-muted-foreground mt-1">快捷入口与最新通知</p>
      </div>

      <div className="app-quick-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {entries.map((item) => {
          const Icon = item.icon
          const showUnread = item.path === '/news' && unreadNewsCount > 0
          return (
            <Link
              key={item.title}
              to={item.path}
              className="quick-card relative bg-card rounded-lg p-5 flex flex-col items-center text-center min-h-[120px] md:h-[140px] justify-center cursor-pointer border border-[#F0F0F0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {showUnread && (
                <span className="absolute top-3 right-3 min-w-[18px] h-[18px] px-1 rounded-full bg-[#F5222D] text-white text-[10px] font-medium flex items-center justify-center">
                  {unreadNewsCount}
                </span>
              )}
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon size={24} className="text-primary" />
              </div>
              <div className="mt-3 text-base font-medium text-foreground">{item.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{item.desc}</div>
            </Link>
          )
        })}
      </div>

      {recentLearning.length > 0 && (
        <div className="bg-card rounded-lg p-4 md:p-6 border border-[#F0F0F0]">
          <div className="flex items-center gap-2 mb-4">
            <History size={16} className="text-primary" />
            <h3 className="text-base font-medium text-foreground">继续学习</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recentLearning.map((item) => {
              const link = getRecentLearningLink(item)
              return (
                <Link
                  key={`${item.type}-${item.id}`}
                  to={link.to}
                  state={link.state}
                  className="flex items-center gap-3 p-3 rounded-lg border border-[#F0F0F0] hover:border-primary/40 hover:bg-[#FAFAFA] transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-[#E6F7FF] flex items-center justify-center shrink-0">
                    {item.type === 'fabric' ? (
                      <BookOpen size={16} className="text-primary" />
                    ) : (
                      <Search size={16} className="text-primary" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.type === 'fabric' ? '面料知识' : '商品资料'}
                      {item.subtitle ? ` · ${item.subtitle}` : ''}
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-[#D9D9D9] shrink-0 ml-auto" />
                </Link>
              )
            })}
          </div>
        </div>
      )}

      <div className="bg-card rounded-lg p-4 md:p-6 border border-[#F0F0F0]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell size={16} className="text-primary" />
            <h3 className="text-base font-medium text-foreground">最新通知</h3>
          </div>
          <Link
            to="/news"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            查看全部
            <ChevronRight size={14} />
          </Link>
        </div>
        <div className="space-y-0">
          {latestNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Bell size={32} className="text-[#D9D9D9] mb-2" />
              <p className="text-sm text-muted-foreground">暂无通知</p>
            </div>
          ) : (
            latestNotifications.map((note) => {
              const unread = !newsService.isRead(note.id)
              return (
              <Link
                key={note.id}
                to={`/news/${note.id}`}
                className="flex items-start gap-3 py-3 border-b border-[#F0F0F0] last:border-b-0 hover:bg-[#F5F5F5] -mx-2 px-2 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dashboard-section-link"
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                    unread ? 'bg-[#F5222D]' : note.pinned ? 'bg-[#FAAD14]' : 'bg-primary'
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`text-sm text-foreground truncate ${unread ? 'font-semibold' : ''}`}
                    >
                      {note.title}
                    </div>
                    <span className={`text-xs px-1.5 py-0.5 rounded flex-shrink-0 ${note.tagColor}`}>
                      {note.tag}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {note.author} · {note.publishTime}
                  </div>
                </div>
                <ChevronRight size={14} className="text-[#D9D9D9] flex-shrink-0 mt-1" />
              </Link>
              )
            })
          )}
        </div>
      </div>

      <div className="bg-card rounded-lg p-4 md:p-6 border border-[#F0F0F0]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-primary" />
            <h3 className="text-base font-medium text-foreground">最近更新</h3>
          </div>
          <Link
            to="/recent-updates"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            查看全部
            <ChevronRight size={14} />
          </Link>
        </div>
        <div className="space-y-0">
          {recentContentUpdates.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">暂无资料更新</p>
          ) : (
            recentContentUpdates.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                state={item.state}
                className="flex items-start gap-3 py-3 border-b border-[#F0F0F0] last:border-b-0 hover:bg-[#F5F5F5] -mx-2 px-2 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dashboard-section-link"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${getContentUpdateTypeBadge(item.type)}`}
                    >
                      {item.type}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.dateLabel}</span>
                  </div>
                  <div className="text-sm text-foreground line-clamp-1">{item.title}</div>
                  {item.subtitle && (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{item.subtitle}</p>
                  )}
                </div>
                <ChevronRight size={14} className="text-[#D9D9D9] flex-shrink-0 mt-1" />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
