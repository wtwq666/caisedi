import { Link, Navigate } from 'react-router-dom'
import {
  Building2,
  ClipboardCheck,
  History,
  Newspaper,
} from 'lucide-react'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useIsMobile } from '../hooks/use-mobile'
import { buildWorkInfoFields } from '../lib/employeeDisplay'
import { newsService } from '../services/newsService'

const profileLinks = [
  { to: '/news', label: '新闻通知', icon: Newspaper, showUnread: true },
  { to: '/culture', label: '公司文化', icon: Building2 },
  { to: '/quiz-records', label: '我的答题', icon: ClipboardCheck },
  { to: '/changelog', label: '资料更新', icon: History },
]

export default function Profile() {
  useDocumentTitle('我的')
  const { user, isLoading } = useAuth()
  const isMobile = useIsMobile()
  const location = useLocation()
  const unreadNews = useMemo(() => newsService.unreadCount(), [location.key])

  if (!isLoading && !user) {
    return <Navigate to="/login" replace />
  }

  if (!user) {
    return null
  }

  const fields = buildWorkInfoFields(user)

  return (
    <div className="max-w-[560px] mx-auto">
      {isMobile && (
        <section className="mb-4 md:hidden">
          <h2 className="text-xs font-medium text-[#8C8C8C] mb-2 px-0.5">常用功能</h2>
          <nav className="profile-mobile-links" aria-label="常用功能">
            {profileLinks.map((item) => {
              const Icon = item.icon
              const badge =
                item.showUnread && unreadNews > 0
                  ? unreadNews > 9
                    ? '9+'
                    : String(unreadNews)
                  : null
              return (
                <Link key={item.to} to={item.to} className="profile-mobile-link">
                  <Icon size={18} className="text-[#1890FF] shrink-0" />
                  <span className="flex-1 min-w-0 truncate">{item.label}</span>
                  {badge && (
                    <span className="profile-link-badge">{badge}</span>
                  )}
                </Link>
              )
            })}
          </nav>
        </section>
      )}

      <section className="bg-white rounded-lg border border-[#F0F0F0] overflow-hidden">
        <div className="px-4 py-3 border-b border-[#F0F0F0]">
          <h2 className="text-sm font-medium text-[#262626]">工作信息</h2>
          <p className="text-xs text-muted-foreground mt-0.5 hidden md:block">本人岗位与组织信息</p>
        </div>
        <dl className="divide-y divide-[#F0F0F0]">
          {fields.map((field) => (
            <div
              key={field.label}
              className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 px-4 py-3.5"
            >
              <dt className="text-xs text-[#8C8C8C] sm:w-24 shrink-0">{field.label}</dt>
              <dd className="text-sm text-[#262626] flex-1 break-words">{field.value || '—'}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  )
}
