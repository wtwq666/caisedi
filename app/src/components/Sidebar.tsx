import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Search,
  BookOpen,
  Building2,
  Newspaper,
  History,
  ClipboardCheck,
} from 'lucide-react'

export const navItems = [
  { path: '/', label: '学习平台', icon: LayoutDashboard },
  { path: '/culture', label: '公司文化', icon: Building2 },
  { path: '/knowledge', label: '知识管理', icon: BookOpen },
  { path: '/products', label: '商品速查', icon: Search },
  { path: '/quiz-records', label: '我的答题', icon: ClipboardCheck },
  { path: '/news', label: '新闻通知', icon: Newspaper },
  { path: '/changelog', label: '更新公告', icon: History },
]

type SidebarNavProps = {
  onNavigate?: () => void
  variant?: 'sidebar' | 'drawer'
}

export function SidebarNav({ onNavigate, variant = 'sidebar' }: SidebarNavProps) {
  const isDrawer = variant === 'drawer'

  return (
    <>
      <div
        className={
          isDrawer
            ? 'nav-drawer-brand'
            : 'h-14 flex items-center px-5 shrink-0 border-b border-[#F0F0F0] md:border-0'
        }
      >
        <span className="sidebar-brand text-base md:text-lg font-extrabold leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1890FF] to-[#36CFC9]">
            凯施迪
          </span>
          <span className="text-[#69C0FF] text-xs md:text-sm font-bold tracking-widest ml-1.5">
            CAISEDI
          </span>
        </span>
      </div>

      <nav
        className={
          isDrawer
            ? 'flex-1 overflow-y-auto'
            : 'flex-1 px-3 py-2 space-y-1 overflow-y-auto'
        }
      >
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={onNavigate}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-md text-sm transition-colors duration-200 border-l-[3px]',
                  isDrawer ? 'nav-drawer-link' : 'h-10 px-3',
                  isActive
                    ? 'bg-[#E6F7FF] text-primary border-primary font-medium'
                    : 'text-[#595959] border-transparent hover:bg-[#F5F5F5]',
                ].join(' ')
              }
            >
              <Icon size={isDrawer ? 20 : 18} className="shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </>
  )
}

export default function Sidebar() {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[200px] bg-white border-r border-[#F0F0F0] flex-col z-50">
      <SidebarNav />
    </aside>
  )
}
