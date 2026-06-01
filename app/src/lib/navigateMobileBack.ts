import type { NavigateFunction } from 'react-router-dom'
import {
  canNavigateBackInApp,
  getMobileBackFallback,
  getMobileRouteBackTarget,
  isMobileTabPath,
} from '../lib/mobileRoutes'

/** 手机端页面级返回：优先回到历史上一页，而非固定跳首页 */
export function navigateMobileBack(navigate: NavigateFunction, pathname: string): void {
  const fixedParent = getMobileRouteBackTarget(pathname)
  if (fixedParent) {
    navigate(fixedParent)
    return
  }

  if (isMobileTabPath(pathname)) {
    return
  }

  if (canNavigateBackInApp()) {
    navigate(-1)
    return
  }

  navigate(getMobileBackFallback(pathname), { replace: true })
}
