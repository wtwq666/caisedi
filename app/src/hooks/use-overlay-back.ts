import { useCallback, useEffect, useRef } from 'react'
import { useRegisterBackHandler } from '../context/BackNavigationContext'

/**
 * 手机浮层/详情：写入 history + 监听 popstate，与系统返回键、左滑返回一致。
 * 关闭时请调用 requestClose()（会 history.back()），不要直接 onClose()。
 */
export function useOverlayBack(open: boolean, onClose: () => void, id: string) {
  const onCloseRef = useRef(onClose)
  const pushedRef = useRef(false)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!open) return

    window.history.pushState({ overlayBack: id }, '')
    pushedRef.current = true

    const onPopState = () => {
      pushedRef.current = false
      onCloseRef.current()
    }

    window.addEventListener('popstate', onPopState)
    return () => {
      window.removeEventListener('popstate', onPopState)
      if (pushedRef.current) {
        pushedRef.current = false
        window.history.back()
      }
    }
  }, [open, id])

  const requestClose = useCallback(() => {
    if (pushedRef.current) {
      window.history.back()
    } else {
      onCloseRef.current()
    }
  }, [])

  useRegisterBackHandler(id, open, requestClose)

  return { requestClose }
}
