import { Capacitor } from '@capacitor/core'

const ANDROID_SAFE_TOP_MIN = '40px'
const IOS_SAFE_TOP_MIN = '20px'

/** 在 Capacitor 原生壳中启用 APP 专用样式（安全区、触控尺寸等） */
export function initNativeApp(): void {
  if (!Capacitor.isNativePlatform()) return

  const root = document.documentElement
  root.classList.add('native-app')
  const platform = Capacitor.getPlatform()
  root.dataset.platform = platform

  root.style.setProperty(
    '--native-safe-top-min',
    platform === 'ios' ? IOS_SAFE_TOP_MIN : ANDROID_SAFE_TOP_MIN,
  )

  void setupNativeShell()
}

async function setupNativeShell(): Promise<void> {
  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar')
    await StatusBar.setStyle({ style: Style.Light })
    await StatusBar.setBackgroundColor({ color: '#FFFFFF' })
    // 内容延伸到状态栏下，由 CSS safe-area + 最小留白统一处理（兼容各机型 WebView）
    await StatusBar.setOverlaysWebView({ overlay: true })
  } catch {
    // 插件不可用时依赖 CSS fallback
  }

  try {
    const { App } = await import('@capacitor/app')
    await App.addListener('backButton', () => {
      window.dispatchEvent(new CustomEvent('app-back'))
    })
  } catch {
    // ignore
  }
}

export function isNativeApp(): boolean {
  return Capacitor.isNativePlatform()
}
