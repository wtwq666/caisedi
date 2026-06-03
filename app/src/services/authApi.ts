import { apiRequest } from '../api/client'
import { setTokens, clearTokens } from '../api/config'
import type { EmployeeData } from '../data/employeeData'

type LoginResponse = {
  accessToken: string
  refreshToken: string
  user: EmployeeData & { employeeNo: string; jobPosition: string; primaryMobile: string; avatarUrl: string }
}

function mapUser(raw: LoginResponse['user']): EmployeeData {
  const extra = (raw as { extra?: Partial<EmployeeData> }).extra || {}
  return {
    ...extra,
    id: raw.id,
    employeeNo: raw.employeeNo,
    name: raw.name,
    gender: raw.gender || extra.gender || '',
    store: raw.store || extra.store || '',
    department: raw.department || extra.department || '',
    jobPosition: raw.jobPosition || extra.jobPosition || '',
    primaryMobile: raw.primaryMobile || extra.primaryMobile || '',
    avatarUrl: raw.avatarUrl || extra.avatarUrl || '',
    status: raw.status || extra.status || '在职',
  } as EmployeeData
}

export const authApi = {
  async login(username: string, password: string): Promise<{ ok: true; user: EmployeeData } | { ok: false; message: string }> {
    try {
      const res = await apiRequest<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        skipAuth: true,
      })
      setTokens(res.accessToken, res.refreshToken)
      return { ok: true, user: mapUser(res.user) }
    } catch (e) {
      const message = e instanceof Error ? e.message : '登录失败'
      return { ok: false, message }
    }
  },

  async me(): Promise<EmployeeData | null> {
    try {
      const raw = await apiRequest<LoginResponse['user']>('/auth/me')
      return mapUser(raw)
    } catch {
      return null
    }
  },

  logout(): void {
    clearTokens()
  },
}
