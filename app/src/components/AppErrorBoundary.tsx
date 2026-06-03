import { Component, type ErrorInfo, type ReactNode } from 'react'
import { removeStaleDocViewerPortals, resetBodyScrollLock } from '../lib/docViewerCleanup'

type Props = { children: ReactNode }

type State = { error: Error | null }

/** 避免单页组件报错导致整站白屏 */
export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[AppErrorBoundary]', error, info.componentStack)
    resetBodyScrollLock()
    queueMicrotask(() => removeStaleDocViewerPortals())
  }

  private handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 bg-[#F5F5F5]">
          <p className="text-base font-medium text-[#262626]">页面加载出错</p>
          <p className="text-sm text-[#8C8C8C] text-center max-w-md">
            {this.state.error.message || '未知错误'}
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="px-5 py-2.5 rounded-lg bg-[#1890FF] text-white text-sm"
          >
            刷新页面
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
