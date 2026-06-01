import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useIsMobile } from '../hooks/use-mobile'
import { isNativeApp } from '../lib/initNativeApp'
import { isMobileTabPath } from '../lib/mobileRoutes'
import { navigateMobileBack } from '../lib/navigateMobileBack'

type BackHandlerEntry = {
  id: string
  handler: () => void
}

type BackNavigationContextValue = {
  registerHandler: (entry: BackHandlerEntry) => void
  unregisterHandler: (id: string) => void
  performBack: () => boolean
}

const BackNavigationContext = createContext<BackNavigationContextValue | null>(null)

export function BackNavigationProvider({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile()
  const location = useLocation()
  const navigate = useNavigate()
  const handlersRef = useRef<Map<string, () => void>>(new Map())
  const orderRef = useRef<string[]>([])
  const [, bump] = useState(0)

  const registerHandler = useCallback(({ id, handler }: BackHandlerEntry) => {
    handlersRef.current.set(id, handler)
    orderRef.current = [...orderRef.current.filter((x) => x !== id), id]
    bump((n) => n + 1)
  }, [])

  const unregisterHandler = useCallback((id: string) => {
    handlersRef.current.delete(id)
    orderRef.current = orderRef.current.filter((x) => x !== id)
    bump((n) => n + 1)
  }, [])

  const performBack = useCallback(() => {
    for (let i = orderRef.current.length - 1; i >= 0; i--) {
      const id = orderRef.current[i]
      const handler = handlersRef.current.get(id)
      if (handler) {
        handler()
        return true
      }
    }

    if (isMobile && !isMobileTabPath(location.pathname)) {
      navigateMobileBack(navigate, location.pathname)
      return true
    }

    if (isNativeApp() && isMobileTabPath(location.pathname)) {
      void import('@capacitor/app').then(({ App }) => App.minimizeApp())
      return true
    }

    return false
  }, [isMobile, location.pathname, navigate])

  useEffect(() => {
    const onAppBack = () => {
      performBack()
    }
    window.addEventListener('app-back', onAppBack)
    return () => window.removeEventListener('app-back', onAppBack)
  }, [performBack])

  const value = useMemo(
    () => ({ registerHandler, unregisterHandler, performBack }),
    [registerHandler, unregisterHandler, performBack],
  )

  return (
    <BackNavigationContext.Provider value={value}>
      {children}
    </BackNavigationContext.Provider>
  )
}

export function useBackNavigation() {
  const ctx = useContext(BackNavigationContext)
  if (!ctx) {
    throw new Error('useBackNavigation must be used within BackNavigationProvider')
  }
  return ctx
}

/** 注册一层可关闭浮层/详情的返回处理（硬件返回、左滑共用） */
export function useRegisterBackHandler(
  id: string,
  enabled: boolean,
  onBack: () => void,
) {
  const { registerHandler, unregisterHandler } = useBackNavigation()
  const onBackRef = useRef(onBack)
  onBackRef.current = onBack

  useEffect(() => {
    if (!enabled) {
      unregisterHandler(id)
      return
    }
    registerHandler({
      id,
      handler: () => onBackRef.current(),
    })
    return () => unregisterHandler(id)
  }, [enabled, id, registerHandler, unregisterHandler])
}
