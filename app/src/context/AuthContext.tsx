import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { findAuthAccount } from '../data/authAccounts'
import { allEmployees, type EmployeeData } from '../data/employeeData'

const SESSION_KEY = 'caisedi_session_v1'

interface SessionPayload {
  employeeId: number
  username: string
}

interface AuthContextValue {
  user: EmployeeData | null
  username: string | null
  isLoading: boolean
  login: (username: string, password: string) => { ok: true } | { ok: false; message: string }
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function loadSession(): SessionPayload | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as SessionPayload
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionPayload | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setSession(loadSession())
    setIsLoading(false)
  }, [])

  const user = useMemo(() => {
    if (!session) return null
    return allEmployees.find((e) => e.id === session.employeeId) ?? null
  }, [session])

  const login = useCallback((username: string, password: string) => {
    const account = findAuthAccount(username, password)
    if (!account) {
      return { ok: false as const, message: '工号或密码错误，或账号未开通' }
    }
    const employee = allEmployees.find((e) => e.id === account.employeeId)
    if (!employee) {
      return { ok: false as const, message: '员工档案不存在，请联系管理员' }
    }
    const payload: SessionPayload = { employeeId: account.employeeId, username: account.username }
    localStorage.setItem(SESSION_KEY, JSON.stringify(payload))
    setSession(payload)
    return { ok: true as const }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setSession(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      username: session?.username ?? null,
      isLoading,
      login,
      logout,
    }),
    [user, session?.username, isLoading, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
