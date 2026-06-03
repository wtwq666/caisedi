export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:8100/api/v1'

/** API 根地址（健康检查等，不含 /api/v1） */
export const API_ROOT_URL =
  import.meta.env.VITE_API_ROOT_URL?.replace(/\/$/, '') ||
  API_BASE_URL.replace(/\/api\/v1\/?$/, '') ||
  'http://localhost:8100'

export const ASSETS_BASE_URL =
  import.meta.env.VITE_ASSETS_BASE_URL?.replace(/\/$/, '') || 'http://localhost:8100/assets'

const TOKEN_KEY = 'caisedi_access_token_v1'
const REFRESH_KEY = 'caisedi_refresh_token_v1'

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setTokens(access: string, refresh: string): void {
  localStorage.setItem(TOKEN_KEY, access)
  localStorage.setItem(REFRESH_KEY, refresh)
}

export function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY)
}
