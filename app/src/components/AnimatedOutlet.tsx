import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigationType } from 'react-router-dom'
import {
  getMobileRouteBackTarget,
  getTabSwitchDirection,
  isMobileTabPath,
} from '../lib/mobileRoutes'

export type PageTransitionKind = 'tab-forward' | 'tab-back' | 'push' | 'pop' | 'fade'

function resolveTransition(
  prevPath: string,
  nextPath: string,
  navType: 'POP' | 'PUSH' | 'REPLACE',
): PageTransitionKind {
  if (isMobileTabPath(prevPath) && isMobileTabPath(nextPath) && prevPath !== nextPath) {
    const dir = getTabSwitchDirection(prevPath, nextPath)
    return dir >= 0 ? 'tab-forward' : 'tab-back'
  }

  const backTarget = getMobileRouteBackTarget(nextPath)
  if (backTarget && backTarget === prevPath) return 'push'
  if (navType === 'POP') return 'pop'

  const prevDepth = prevPath.split('/').filter(Boolean).length
  const nextDepth = nextPath.split('/').filter(Boolean).length
  if (nextDepth > prevDepth) return 'push'
  if (nextDepth < prevDepth) return 'pop'
  return 'fade'
}

const transitionClass: Record<PageTransitionKind, string> = {
  'tab-forward': 'page-transition-tab-forward',
  'tab-back': 'page-transition-tab-back',
  push: 'page-transition-push',
  pop: 'page-transition-pop',
  fade: 'page-transition-fade',
}

export default function AnimatedOutlet() {
  const location = useLocation()
  const navType = useNavigationType()
  const prevPathRef = useRef(location.pathname)
  const [transition, setTransition] = useState<PageTransitionKind>('fade')

  useEffect(() => {
    const kind = resolveTransition(prevPathRef.current, location.pathname, navType)
    prevPathRef.current = location.pathname
    setTransition(kind)
  }, [location.pathname, navType])

  return (
    <div
      key={location.pathname}
      className={`app-page-content ${transitionClass[transition]}`}
    >
      <Outlet />
    </div>
  )
}
