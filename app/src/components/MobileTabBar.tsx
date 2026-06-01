import { NavLink, useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { mobileTabItems } from '../lib/mobileRoutes'
import { newsService } from '../services/newsService'

export default function MobileTabBar() {
  const location = useLocation()
  const unreadCount = useMemo(() => newsService.unreadCount(), [location.key])

  return (
    <nav className="app-tab-bar md:hidden" aria-label="主导航">
      <div className="app-tab-bar-inner">
        {mobileTabItems.map((item) => {
          const Icon = item.icon
          const showBadge = item.path === '/profile' && unreadCount > 0
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                ['app-tab-item', isActive ? 'app-tab-item--active' : ''].filter(Boolean).join(' ')
              }
            >
              <span className="app-tab-icon-wrap">
                <Icon size={23} strokeWidth={1.75} />
                {showBadge && (
                  <span className="app-tab-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
                )}
              </span>
              <span
                className={`app-tab-label${item.label.length > 2 ? ' app-tab-label--long' : ''}`}
              >
                {item.label}
              </span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
