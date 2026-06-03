import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { removeStaleDocViewerPortals, resetBodyScrollLock } from '../lib/docViewerCleanup'

/** 修复预览层异常退出后 body 锁滚动、全屏白罩残留导致整页空白 */
export default function AppBootstrap({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()

  useEffect(() => {
    removeStaleDocViewerPortals()
    resetBodyScrollLock()
  }, [])

  useEffect(() => {
    resetBodyScrollLock()
  }, [pathname])

  return children
}