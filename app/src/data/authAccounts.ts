import { storeStaffAuthAccounts } from './storeStaffSeed'

/**
 * 账号由后台开通，不支持自助注册。
 * 新增员工：在 employeeData 添加档案后，在此追加 username / password / enabled。
 * 门店员工：username 使用手机号；演示账号仍可使用工号。
 */
export interface AuthAccount {
  employeeId: number
  /** 登录名：门店员工为手机号，演示账号为工号 */
  username: string
  password: string
  enabled: boolean
}

/** 演示环境统一初始密码；生产环境由后台分配后写入此处 */
const DEFAULT_PASSWORD = '123456'

export const authAccounts: AuthAccount[] = [
  { employeeId: 1, username: 'KS20250001', password: DEFAULT_PASSWORD, enabled: true },
  { employeeId: 2, username: 'KS20250002', password: DEFAULT_PASSWORD, enabled: true },
  { employeeId: 3, username: 'KS20250003', password: DEFAULT_PASSWORD, enabled: true },
  { employeeId: 4, username: 'KS20250004', password: DEFAULT_PASSWORD, enabled: true },
  { employeeId: 5, username: 'KS20250005', password: DEFAULT_PASSWORD, enabled: true },
  { employeeId: 6, username: 'KS20250006', password: DEFAULT_PASSWORD, enabled: true },
  { employeeId: 7, username: 'KS20250007', password: DEFAULT_PASSWORD, enabled: true },
  { employeeId: 8, username: 'KS20250008', password: DEFAULT_PASSWORD, enabled: true },
  { employeeId: 9, username: 'KS20250009', password: DEFAULT_PASSWORD, enabled: true },
  { employeeId: 10, username: 'KS20250010', password: DEFAULT_PASSWORD, enabled: true },
  ...storeStaffAuthAccounts,
]

export function findAuthAccount(username: string, password: string): AuthAccount | null {
  const u = username.trim()
  return (
    authAccounts.find(
      (a) => a.enabled && a.password === password && a.username.toLowerCase() === u.toLowerCase(),
    ) ?? null
  )
}
