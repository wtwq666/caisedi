import type { EmployeeData } from '../data/employeeData'

const STATUS_LABELS: Record<string, string> = {
  active: '在职',
  probation: '试用期',
}

export function getEmploymentStatusLabel(status: string): string {
  return STATUS_LABELS[status] ?? status
}

export type WorkInfoField = {
  label: string
  value: string
}

/** 个人页仅展示工作相关信息 */
export function buildWorkInfoFields(employee: EmployeeData): WorkInfoField[] {
  return [
    { label: '姓名', value: employee.name },
    { label: '工号', value: employee.employeeNo },
    { label: '部门', value: employee.department },
    { label: '门店 / 片区', value: employee.store },
    { label: '岗位', value: employee.jobPosition },
    { label: '职级', value: employee.positionLevel },
    { label: '用工性质', value: employee.employmentNature },
    { label: '在职状态', value: getEmploymentStatusLabel(employee.status) },
  ]
}
