import type { EmployeeData } from '../data/employeeData'

export type WorkInfoField = {
  label: string
  value: string
}

/** 个人页工作信息（仅展示门店员工可见项） */
export function buildWorkInfoFields(employee: EmployeeData): WorkInfoField[] {
  return [
    { label: '姓名', value: employee.name },
    { label: '部门', value: employee.department },
    { label: '门店 / 片区', value: employee.store },
    { label: '岗位', value: employee.jobPosition },
  ]
}
