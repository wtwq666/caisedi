export interface ManagementDoc {
  id: string
  title: string
  description: string
  filename: string
  fileType: 'pdf' | 'docx'
  fileSize: string
  category: string
  tags: string[]
}

export const managementDocs: ManagementDoc[] = [
  {
    id: 'm1',
    title: '2026年门店制度手册',
    description: '凯施迪门店运营管理制度总纲，涵盖门店日常运营、员工管理、销售规范、货品管理、客户服务等方面的制度规范。',
    filename: '2026年门店制度手册PDF.pdf',
    fileType: 'pdf',
    fileSize: '6.6MB',
    category: '门店制度',
    tags: ['2026', '门店运营', '制度规范', '总纲'],
  },
  {
    id: 'm2',
    title: '货品退货打包及其他说明',
    description: '中山市凯施迪服装有限公司货品退货打包规范及操作说明。包含三条核心红线（次品退货/大货退货/收货准确性）、退货操作流程（正常退货与次品退货）、违禁行为、包装说明、收货与寄货规范、乐捐标准。',
    filename: '货品退货打包及其他说明260418.docx',
    fileType: 'docx',
    fileSize: '27KB',
    category: '退货规范',
    tags: ['退货打包', '次品仓', '总部仓库', '收货规范', '乐捐'],
  },
  {
    id: 'm3',
    title: '门店次品及退货管理规定',
    description: '凯施迪服装有限公司门店次品及退货管理规定（2026.4.18修订版）。包含五大核心规则（次品定义/人为原因/店长防损/退货时间包装/责任判定）、次品退货规范细则、退货时间要求、紧急及转季退货、打包系统做单说明、收货寄货规范、乐捐标准、次品卡填写说明。',
    filename: '门店次品及退货管理规定260418.docx',
    fileType: 'docx',
    fileSize: '273KB',
    category: '次品管理',
    tags: ['次品标准', '退货规定', '乐捐标准', '次品卡', '打包规范'],
  },
]

export const managementCategories = [
  { key: 'all', label: '全部' },
  { key: '门店制度', label: '门店制度' },
  { key: '退货规范', label: '退货规范' },
  { key: '次品管理', label: '次品管理' },
]
