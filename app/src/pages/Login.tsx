import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { checkApiHealth } from '../api/client'
import { USE_MOCK } from '../api/config'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { user, login, isLoading } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [apiOffline, setApiOffline] = useState(false)

  useEffect(() => {
    if (USE_MOCK) return
    void checkApiHealth().then((ok) => setApiOffline(!ok))
  }, [])

  if (!isLoading && user) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const result = await login(username, password)
    setSubmitting(false)
    if (result.ok) {
      navigate('/', { replace: true })
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="login-screen min-h-screen bg-gradient-to-br from-[#E6F7FF] via-white to-[#F0F5FF] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] bg-white rounded-xl shadow-lg border border-[#F0F0F0] p-8">
        <div className="login-brand mb-8 text-center">
          <div className="login-brand-main">
            <span className="login-brand-cn">凯施迪</span>
            <span className="login-brand-en">CAISEDI</span>
          </div>
          <p className="text-sm text-[#69c0ff] mt-2.5 font-medium tracking-wide">学习平台 · 企业信息系统</p>
        </div>

        {apiOffline && (
          <p className="mb-4 text-sm text-[#AD6800] bg-[#FFFBE6] border border-[#FFE58F] rounded-lg px-3 py-2">
            无法连接学习平台服务（端口 8100）。请先启动 API，或检查网络后重试。
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#262626] mb-1.5">
              手机号 / 工号
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              placeholder="门店员工填手机号，如 13046313228"
              className="w-full h-10 px-3 rounded-lg border border-[#D9D9D9] text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#262626] mb-1.5">
              密码
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="请输入密码"
              className="w-full h-10 px-3 rounded-lg border border-[#D9D9D9] text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-[#CF1322] bg-[#FFF1F0] border border-[#FFA39E] rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full h-10 rounded-lg bg-primary text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-60"
          >
            <LogIn size={16} />
            {submitting ? '登录中…' : '登录'}
          </button>
        </form>

        <p className="mt-6 text-xs text-[#8C8C8C] text-center leading-relaxed">
          账号由后台统一开通，不支持自助注册。
          <br />
          门店员工：手机号 + 初始密码 123456；演示账号工号 KS20250001～10，密码 123456
        </p>
      </div>
    </div>
  )
}
