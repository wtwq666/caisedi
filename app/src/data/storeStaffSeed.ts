import type { EmployeeData } from './employeeData'

/** 门店新员工初始密码（无身份证信息时统一使用，首次登录后建议修改） */
export const STORE_STAFF_INITIAL_PASSWORD = '123456'

type StoreStaffInput = {
  id: number
  employeeNo: string
  name: string
  gender: string
  primaryMobile: string
  store: string
  jobPosition: string
  entryDate: string
  personalEmail?: string
  status?: 'active' | 'probation'
}

function buildMinimalEmployee(input: StoreStaffInput): EmployeeData {
  const status = input.status ?? 'active'
  return {
    id: input.id,
    employeeNo: input.employeeNo,
    name: input.name,
    gender: input.gender,
    nation: '汉族',
    birthDate: '',
    idCard: '',
    politicalStatus: '群众',
    maritalStatus: '',
    heightCm: '',
    weightKg: '',
    bloodType: '',
    nativePlace: '广东中山',
    householdRegisterLocation: '',
    householdRegisterType: '',
    residentialAddress: '',
    primaryMobile: input.primaryMobile,
    secondaryMobile: '',
    wechatId: '',
    personalEmail: input.personalEmail ?? '',
    highestEducation: '',
    graduateSchool: '',
    major: '',
    graduationDate: '',
    educationNature: '',
    entryDate: input.entryDate,
    probationEndDate: '',
    regularDate: '',
    contractEndDate: '',
    employmentNature: '正式',
    department: '销售部',
    store: input.store,
    jobPosition: input.jobPosition,
    positionLevel: input.jobPosition === '店长' ? '高级' : '初级',
    bankAccount: '',
    bankName: '',
    backupBankAccount: '',
    backupBankName: '',
    emergencyContact1Name: '',
    emergencyContact1Relation: '',
    emergencyContact1Phone: '',
    emergencyContact1Address: '',
    emergencyContact2Name: '',
    emergencyContact2Relation: '',
    emergencyContact2Phone: '',
    emergencyContact2Address: '',
    avatarUrl: '',
    status,
  }
}

/** 西区（天悦城）、小榄片区（含坦洲优越城）— 来源：企业微信通讯录 */
export const storeStaffEmployees: EmployeeData[] = [
  buildMinimalEmployee({
    id: 11,
    employeeNo: 'KS20250011',
    name: '杨金燕',
    gender: '女',
    primaryMobile: '13046313228',
    store: '中山西区天悦城店',
    jobPosition: '导购',
    entryDate: '2025-12-10',
    personalEmail: '1115216420@qq.com',
  }),
  buildMinimalEmployee({
    id: 12,
    employeeNo: 'KS20250012',
    name: '赵贵义',
    gender: '男',
    primaryMobile: '18586783961',
    store: '中山西区天悦城店',
    jobPosition: '导购',
    entryDate: '2026-05-17',
    status: 'probation',
  }),
  buildMinimalEmployee({
    id: 13,
    employeeNo: 'KS20250013',
    name: '陈金连',
    gender: '女',
    primaryMobile: '15019786653',
    store: '中山坦洲优越城店',
    jobPosition: '店长',
    entryDate: '2022-01-01',
  }),
  buildMinimalEmployee({
    id: 14,
    employeeNo: 'KS20250014',
    name: '林朱成',
    gender: '男',
    primaryMobile: '13798952720',
    store: '中山坦洲优越城店',
    jobPosition: '导购',
    entryDate: '2023-11-17',
  }),
  buildMinimalEmployee({
    id: 15,
    employeeNo: 'KS20250015',
    name: '罗娇花',
    gender: '女',
    primaryMobile: '18476084400',
    store: '中山坦洲优越城店',
    jobPosition: '导购',
    entryDate: '2022-09-18',
  }),
  buildMinimalEmployee({
    id: 16,
    employeeNo: 'KS20250016',
    name: '黄闰桂',
    gender: '女',
    primaryMobile: '18927487689',
    store: '中山西区天悦城店',
    jobPosition: '导购',
    entryDate: '2025-12-08',
  }),
]

export const storeStaffAuthAccounts = storeStaffEmployees.map((emp) => ({
  employeeId: emp.id,
  username: emp.primaryMobile,
  password: STORE_STAFF_INITIAL_PASSWORD,
  enabled: true,
}))
