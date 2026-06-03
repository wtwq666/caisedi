import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { ensureCatalog, getCatalogLoadError, isCatalogReady } from '../lib/catalogStore'
import { USE_MOCK } from '../api/config'

export default function CatalogLoader({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(() =>
    isCatalogReady() || USE_MOCK ? 'ready' : 'loading',
  )
  const [errorMsg, setErrorMsg] = useState('')

  const load = useCallback(() => {
    if (USE_MOCK) {
      setStatus('ready')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    ensureCatalog()
      .then(() => setStatus('ready'))
      .catch(() => {
        setErrorMsg(getCatalogLoadError() || '无法连接学习平台服务')
        setStatus('error')
      })
  }, [])

  useEffect(() => {
    load()
  }, [load])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
        <RefreshCw size={20} className="animate-spin text-primary" />
        正在加载资料库…
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
        <AlertCircle size={40} className="text-[#FAAD14]" />
        <p className="text-sm text-[#262626] font-medium">无法连接学习平台服务</p>
        <p className="text-xs text-muted-foreground max-w-sm">{errorMsg}</p>
        <p className="text-xs text-muted-foreground">
          请确认 API 已启动（端口 8100），并已执行{' '}
          <code className="text-[11px] bg-[#F5F5F5] px-1 rounded">python -m scripts.sync_public_assets</code>
        </p>
        <button
          type="button"
          onClick={load}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-white text-sm hover:bg-primary/90"
        >
          <RefreshCw size={14} />
          重试
        </button>
      </div>
    )
  }

  return <>{children}</>
}
