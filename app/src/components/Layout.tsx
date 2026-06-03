import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Menu,
  LogOut,
  UserCircle,
  ChevronDown,
  ClipboardCheck,
  ChevronLeft,
  Building2,
  History,
} from 'lucide-react'
import Sidebar, { SidebarNav } from './Sidebar'
import { Sheet, SheetContent } from './ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { GlobalSearchBar } from './GlobalSearch'
import AnimatedOutlet from './AnimatedOutlet'
import MobileTabBar from './MobileTabBar'
import { useAuth } from '../context/AuthContext'
import { useIsMobile } from '../hooks/use-mobile'
import { useNativeApp } from '../hooks/use-native-app'
import { useRegisterBackHandler } from '../context/BackNavigationContext'
import { useEdgeSwipeBack } from '../hooks/use-edge-swipe-back'
import {
  getMobilePageTitle,
  isMobileRootPath,
  isMobileTabPath,
} from '../lib/mobileRoutes'
import { navigateMobileBack } from '../lib/navigateMobileBack'

export default function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const isNative = useNativeApp()
  const isMobile = useIsMobile()
  const useMobileShell = isMobile
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const showTabBar = useMobileShell && isMobileTabPath(location.pathname)
  const showMobileBack = useMobileShell && !isMobileTabPath(location.pathname)
  const showMobileMenu = useMobileShell && isMobileRootPath(location.pathname) && !isMobileTabPath(location.pathname)
  const mobileTitle = getMobilePageTitle(location.pathname)

  const shellClass = [
    'app-shell',
    showTabBar ? 'app-shell--tabs' : '',
    showMobileBack ? 'app-shell--back' : '',
  ]
    .filter(Boolean)
    .join(' ')

  useEdgeSwipeBack(useMobileShell)

  useRegisterBackHandler('layout-nav', mobileNavOpen, () => setMobileNavOpen(false))

  const handleMobileBack = () => {
    navigateMobileBack(navigate, location.pathname)
  }

  const userMenu = user && (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`flex items-center gap-1.5 rounded-md text-xs text-[#595959] hover:bg-[#F5F5F5] transition-colors ${
            useMobileShell ? 'app-user-trigger h-10 px-2.5 max-w-[7.5rem]' : 'h-9 px-2.5 max-w-[200px]'
          }`}
          aria-label="用户菜单"
        >
          <span className="truncate font-medium text-[#262626]">{user.name}</span>
          <ChevronDown size={14} className="text-[#8C8C8C] shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5 text-xs text-[#8C8C8C]">
          {user.store} · {user.jobPosition}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
            <UserCircle size={14} />
            工作信息
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/culture" className="flex items-center gap-2 cursor-pointer">
            <Building2 size={14} />
            公司文化
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/quiz-records" className="flex items-center gap-2 cursor-pointer">
            <ClipboardCheck size={14} />
            我的答题
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/changelog" className="flex items-center gap-2 cursor-pointer">
            <History size={14} />
            资料更新
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="text-[#CF1322] focus:text-[#CF1322] cursor-pointer"
        >
          <LogOut size={14} className="mr-2" />
          退出登录
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <div className={useMobileShell ? shellClass : 'min-h-screen bg-background'}>
      <Sidebar />

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent
          side="left"
          className={
            isNative
              ? 'nav-drawer p-0 flex flex-col bg-white gap-0'
              : 'w-[min(17.5rem,84vw)] sm:max-w-[min(17.5rem,84vw)] p-0 flex flex-col bg-white border-[#F0F0F0]'
          }
        >
          <SidebarNav variant="drawer" onNavigate={() => setMobileNavOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className={`${useMobileShell ? 'app-body' : 'md:ml-[200px] min-h-screen flex flex-col'}`}>
        <header
          className={
            useMobileShell
              ? `app-header ${showTabBar ? 'app-header--tabs' : 'app-header--compact'}`
              : 'h-14 bg-white border-b border-[#F0F0F0] flex items-center gap-3 px-4 md:px-6 sticky top-0 z-40'
          }
        >
          {useMobileShell && <div className="app-safe-area-spacer" aria-hidden="true" />}
          <div className={useMobileShell ? 'app-header-body' : 'contents'}>
          {useMobileShell ? (
            showTabBar ? (
              <div className="app-header-tabs-layout">
                <div className="app-header-row">
                  <div className="app-header-title-block">
                    <div className="app-header-brand" aria-label="凯施迪 CAISEDI">
                      <span className="app-header-brand-cn">凯施迪</span>
                      <span className="app-header-brand-en">CAISEDI</span>
                    </div>
                    <h1 className="app-header-title">{mobileTitle}</h1>
                  </div>
                  <div className="app-header-actions shrink-0">{userMenu}</div>
                </div>
                <GlobalSearchBar variant="mobile-bar" className="w-full" />
              </div>
            ) : (
              <div className="app-header-compact-layout">
                {showMobileBack ? (
                  <button
                    type="button"
                    className="app-menu-btn flex items-center justify-center rounded-lg text-[#262626] active:bg-[#F5F5F5] shrink-0"
                    onClick={handleMobileBack}
                    aria-label="返回"
                  >
                    <ChevronLeft size={24} strokeWidth={2.25} />
                  </button>
                ) : showMobileMenu ? (
                  <button
                    type="button"
                    className="app-menu-btn flex items-center justify-center rounded-lg text-[#595959] active:bg-[#F5F5F5] shrink-0"
                    onClick={() => setMobileNavOpen(true)}
                    aria-label="打开菜单"
                  >
                    <Menu size={20} />
                  </button>
                ) : null}
                <h1 className="app-header-title app-header-title--single truncate flex-1 min-w-0">
                  {mobileTitle}
                </h1>
                <GlobalSearchBar variant="icon-only" />
              </div>
            )
          ) : (
            <>
              <button
                type="button"
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-md hover:bg-[#F5F5F5] text-[#595959]"
                onClick={() => setMobileNavOpen(true)}
                aria-label="打开菜单"
              >
                <Menu size={20} />
              </button>
              <GlobalSearchBar variant="header" className="flex-1 min-w-0 max-w-[420px]" />
              <div className="flex items-center gap-2 md:gap-3 ml-auto shrink-0">{userMenu}</div>
            </>
          )}
          </div>
        </header>

        <main className={useMobileShell ? 'app-main' : 'flex-1 p-4 md:p-6'}>
          {useMobileShell ? (
            <AnimatedOutlet />
          ) : (
            <div className="page-enter">
              <AnimatedOutlet />
            </div>
          )}
        </main>

        {showTabBar && <MobileTabBar />}
      </div>
    </div>
  )
}
