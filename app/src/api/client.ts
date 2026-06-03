import { API_BASE_URL, clearTokens, getAccessToken, getRefreshToken, setTokens } from './config'

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

type RequestOptions = RequestInit & {
  skipAuth?: boolean
  /** 内部：401 刷新后重试标记 */
  _retried?: boolean
}

let refreshInFlight: Promise<boolean> | null = null

async function tryRefreshToken(): Promise<boolean> {
  const refresh = getRefreshToken()
  if (!refresh) return false
  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: refresh }),
        })
        if (!res.ok) return false
        const data = (await res.json()) as { accessToken: string; refreshToken: string }
        setTokens(data.accessToken, data.refreshToken)
        return true
      } catch (err) {
        console.error('[api] refresh failed', err)
        return false
      } finally {
        refreshInFlight = null
      }
    })()
  }
  return refreshInFlight
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { skipAuth, _retried, headers, ...rest } = options
  const h = new Headers(headers)
  if (!h.has('Content-Type') && rest.body) {
    h.set('Content-Type', 'application/json')
  }
  if (!skipAuth) {
    const token = getAccessToken()
    if (token) h.set('Authorization', `Bearer ${token}`)
  }

  let res: Response
  try {
    res = await fetch(`${API_BASE_URL}${path}`, { ...rest, headers: h })
  } catch (err) {
    console.error('[api] network error', path, err)
    throw new ApiError(0, '无法连接学习平台服务，请检查网络或稍后重试')
  }

  if (res.status === 401 && !skipAuth && !_retried) {
    const refreshed = await tryRefreshToken()
    if (refreshed) {
      return apiRequest<T>(path, { ...options, _retried: true })
    }
    clearTokens()
    throw new ApiError(401, '未登录或会话已过期')
  }

  if (!res.ok) {
    let msg = res.statusText
    try {
      const data = await res.json()
      if (data.detail) msg = typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail)
    } catch {
      /* ignore */
    }
    if (res.status >= 500) {
      console.error('[api]', res.status, path, msg)
    }
    throw new ApiError(res.status, msg)
  }
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

/** 健康检查（不附带 JWT） */
export async function checkApiHealth(): Promise<boolean> {
  const root = API_BASE_URL.replace(/\/api\/v1\/?$/, '')
  try {
    const res = await fetch(`${root}/health`, { method: 'GET' })
    if (!res.ok) return false
    const data = (await res.json()) as { status?: string }
    return data.status === 'ok'
  } catch {
    return false
  }
}
