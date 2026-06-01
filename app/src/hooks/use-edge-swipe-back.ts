import { useEffect } from 'react'
import { useIsMobile } from './use-mobile'
import { useBackNavigation } from '../context/BackNavigationContext'

const EDGE_WIDTH = 28
const MIN_SWIPE = 72
const MAX_VERTICAL = 64

/** 屏幕左缘右滑触发返回（手机端） */
export function useEdgeSwipeBack(enabled = true) {
  const isMobile = useIsMobile()
  const { performBack } = useBackNavigation()

  useEffect(() => {
    if (!enabled || !isMobile) return

    let startX = 0
    let startY = 0
    let tracking = false

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return
      const t = e.touches[0]
      if (t.clientX > EDGE_WIDTH) return
      startX = t.clientX
      startY = t.clientY
      tracking = true
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!tracking || e.touches.length !== 1) return
      const t = e.touches[0]
      const dx = t.clientX - startX
      const dy = Math.abs(t.clientY - startY)
      if (dx > MIN_SWIPE && dy < MAX_VERTICAL) {
        tracking = false
        performBack()
      }
    }

    const onTouchEnd = () => {
      tracking = false
    }

    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchmove', onTouchMove, { passive: true })
    document.addEventListener('touchend', onTouchEnd, { passive: true })
    document.addEventListener('touchcancel', onTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
      document.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [enabled, isMobile, performBack])
}
