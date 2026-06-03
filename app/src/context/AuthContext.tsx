import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { USE_MOCK, getAccessToken } from '../api/config'
import { findAuthAccount } from '../data/authAccounts'
import { allEmployees, type EmployeeData } from '../data/employeeData'
import { authApi } from '../services/authApi'
import { newsService } from '../services/newsService'
import { initUserStateFromApi, invalidateUserStateCache } from '../services/userStateApi'
import { initRecentLearningFromApi } from '../lib/recentLearningStorage'

const SESSION_KEY = 'caisedi_session_v1'

interface SessionPayload {
  employeeId: number
  username: string
}

interface AuthContextValue {
  user: EmployeeData | null
  username: string | null
  isLoading: boolean
  login: (
    username: string,
    password: string,
  ) => Promise<{ ok: true } | { ok: false; message: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function loadMockSession(): SessionPayload | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as SessionPayload
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<EmployeeData | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const bootstrap = async () => {
      if (USE_MOCK) {
        const session = loadMockSession()
        if (session) {
          setUsername(session.username)
          setUser(allEmployees.find((e) => e.id === session.employeeId) ?? null)
        }
        setIsLoading(false)
        return
      }
      if (getAccessToken()) {
        const me = await authApi.me()
        if (me) {
          setUser(me)
          setUsername(me.employeeNo)
          await Promise.all([
            initUserStateFromApi(me.id),
            initRecentLearningFromApi(),
            newsService.initReadStatus(),
          ])
        } else {
          authApi.logout()
        }
      }
      setIsLoading(false)
    }
    void bootstrap()
  }, [])

  const login = useCallback(async (u: string, password: string) => {
    if (USE_MOCK) {
      const account = findAuthAccount(u, password)
      if (!account) {
        return { ok: false as const, message: '手机号/工号或密码错误，或账号未开通' }
      }
      const employee = allEmployees.find((e) => e.id === account.employeeId)
      if (!employee) {
        return { ok: false as const, message: '员工档案不存在，请联系管理员' }
      }
      const payload: SessionPayload = { employeeId: account.employeeId, username: account.username }
      localStorage.setItem(SESSION_KEY, JSON.stringify(payload))
      setUsername(account.username)
      setUser(employee)
      return { ok: true as const }
    }
    const result = await authApi.login(u, password)
    if (!result.ok) return result
    setUser(result.user)
    setUsername(result.user.employeeNo)
    await Promise.all([
      initUserStateFromApi(result.user.id),
      initRecentLearningFromApi(),
      newsService.initReadStatus(),
    ])
    return { ok: true as const }
  }, [])

  const logout = useCallback(() => {
    if (USE_MOCK) {
      localStorage.removeItem(SESSION_KEY)
    } else {
      authApi.logout()
    }
    invalidateUserStateCache()
    setUser(null)
    setUsername(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      username,
      isLoading,
      login,
      logout,
    }),
    [user, username, isLoading, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
