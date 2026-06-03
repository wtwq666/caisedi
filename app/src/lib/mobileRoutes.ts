import {
  LayoutDashboard,
  Search,
  BookOpen,
  UserCircle,
  type LucideIcon,
} from 'lucide-react'

/** 底部 Tab 一级页面（4 个） */
export const MOBILE_TAB_PATHS = ['/', '/knowledge', '/products', '/profile'] as const

export type MobileTabPath = (typeof MOBILE_TAB_PATHS)[number]

export type MobileTabItem = {
  path: MobileTabPath
  label: string
  icon: LucideIcon
  end?: boolean
}

export const mobileTabItems: MobileTabItem[] = [
  { path: '/', label: '学习平台', icon: LayoutDashboard, end: true },
  { path: '/knowledge', label: '知识', icon: BookOpen },
  { path: '/products', label: '商品', icon: Search },
  { path: '/profile', label: '我的', icon: UserCircle },
]

/** 手机端一级页（含 Tab + 需返回键的入口页） */
export const MOBILE_ROOT_PATHS = [
  ...MOBILE_TAB_PATHS,
  '/culture',
  '/news',
  '/changelog',
] as const

const TAB_ORDER = MOBILE_TAB_PATHS.reduce<Record<string, number>>((acc, path, i) => {
  acc[path] = i
  return acc
}, {})

export function isMobileTabPath(pathname: string): boolean {
  return (MOBILE_TAB_PATHS as readonly string[]).includes(pathname)
}

export function isMobileRootPath(pathname: string): boolean {
  return (MOBILE_ROOT_PATHS as readonly string[]).includes(pathname)
}

export function getTabSwitchDirection(from: string, to: string): number {
  const a = TAB_ORDER[from] ?? 0
  const b = TAB_ORDER[to] ?? 0
  if (a === b) return 0
  return b > a ? 1 : -1
}

/** 仅详情页等「固定父级」路由需要明确返回目标；其余走浏览器历史栈 */
export function getMobileRouteBackTarget(pathname: string): string | null {
  if (/^\/news\/[^/]+$/.test(pathname)) return '/news'
  return null
}

/** 无浮层时：优先 history 返回上一页，仅在没有可退历史时用兜底 Tab */
export function getMobileBackFallback(pathname: string): string {
  if (pathname.startsWith('/news')) return '/'
  if (pathname === '/culture') return '/'
  if (['/quiz-records', '/recent-updates', '/changelog'].includes(pathname)) return '/profile'
  return '/'
}

export function canNavigateBackInApp(): boolean {
  return window.history.length > 1
}

export function getMobilePageTitle(pathname: string): string {
  if (/^\/news\/[^/]+$/.test(pathname)) return '通知详情'
  const titles: Record<string, string> = {
    '/': '学习平台',
    '/profile': '我的',
    '/quiz-records': '我的答题',
    '/recent-updates': '资料更新',
    '/changelog': '资料更新',
    '/products': '商品速查',
    '/knowledge': '知识管理',
    '/culture': '公司文化',
    '/news': '新闻通知',
  }
  return titles[pathname] ?? '凯施迪'
}
