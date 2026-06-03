import { API_ROOT_URL, ASSETS_BASE_URL, USE_MOCK } from '../api/config'

/** 浏览器内请求静态资源用的 base（开发走 Vite 代理同源 /assets，避免 docx 预览跨域失败） */
function getClientAssetsBase(): string {
  if (USE_MOCK) return ''
  const configured = import.meta.env.VITE_ASSETS_BASE_URL?.replace(/\/$/, '') || ''
  if (import.meta.env.DEV && (!configured || /localhost:8100|127\.0\.0\.1:8100/.test(configured))) {
    return '/assets'
  }
  return configured || `${API_ROOT_URL}/assets`
}

/** 对 storage 相对路径各段做 URL 编码（中文文件名等） */
export function encodeAssetKey(key: string): string {
  const normalized = key.replace(/^\//, '')
  if (!normalized) return ''
  return normalized
    .split('/')
    .map((seg) => {
      try {
        return encodeURIComponent(decodeURIComponent(seg))
      } catch {
        return encodeURIComponent(seg)
      }
    })
    .join('/')
}

/** 从完整 assets URL 或 /stores/... 路径提取 storage 相对 key */
export function toAssetKey(path: string): string {
  if (!path) return ''
  const assetsPrefix = `${ASSETS_BASE_URL}/`
  if (path.startsWith(assetsPrefix)) {
    return path.slice(assetsPrefix.length).split('/').map(decodeURIComponent).join('/')
  }
  const generic = path.match(/\/assets\/(.+)$/)
  if (generic) {
    return generic[1].split('/').map((s) => {
      try {
        return decodeURIComponent(s)
      } catch {
        return s
      }
    }).join('/')
  }
  return path.replace(/^\//, '')
}

/** Resolve document/image URL: API assets base in online mode, legacy public path in mock. */
export function getAssetUrl(path: string): string {
  if (!path) return ''
  // 商品 OSS 等外链：联调/生产均原样使用
  if (path.startsWith('http://') || path.startsWith('https://')) {
    if (USE_MOCK) {
      const m = path.match(/\/assets\/(.+)$/)
      if (m) return `/${encodeAssetKey(m[1])}`
    }
    const assetsMatch = path.match(/\/assets\/(.+)$/)
    if (assetsMatch && typeof window !== 'undefined') {
      const key = assetsMatch[1]
        .split('/')
        .map((s) => {
          try {
            return decodeURIComponent(s)
          } catch {
            return s
          }
        })
        .join('/')
      return `${getClientAssetsBase()}/${encodeAssetKey(key)}`
    }
    return path
  }
  if (USE_MOCK) {
    return path.startsWith('/') ? path : `/${path}`
  }
  const key = encodeAssetKey(toAssetKey(path))
  if (!key) return ''
  const base = typeof window !== 'undefined' ? getClientAssetsBase() : ASSETS_BASE_URL
  return `${base}/${key}`
}

export function getTrainingDocUrl(filename: string): string {
  return getAssetUrl(`training/${filename}`)
}

/** 知识库文档预览地址（统一编码，避免中文文件名 404） */
export function resolveDocumentFileUrl(doc: { filename: string; fileUrl?: string }): string {
  if (doc.fileUrl) return getAssetUrl(doc.fileUrl)
  return getTrainingDocUrl(doc.filename)
}
