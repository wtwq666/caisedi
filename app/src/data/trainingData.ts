export interface TrainingDoc {
  id: string
  title: string
  description: string
  filename: string
  fileType: 'pptx' | 'docx'
  fileSize: string
  category: string
  tags: string[]
}

export const trainingDocs: TrainingDoc[] = [
  {
    id: '1',
    title: '凯施迪运营手册 - 店长管理册',
    description: '店铺运营SOP标准手册，涵盖店长认知、工作流程、销售管理、会议管理、员工培训管理、运营标准化工具（IIS/MSP）六大模块。是凯施迪店铺运营管理的统一执行标准。',
    filename: '凯施迪运营手册_店长管理册_A4版修正 (1)(1).docx',
    fileType: 'docx',
    fileSize: '114KB',
    category: '运营标准',
    tags: ['SOP', '店长职责', '工作流程', '销售管理', '会议管理'],
  },
  {
    id: '2',
    title: '新晋店长10天完整培训课件',
    description: '基于《凯施迪运营手册_店长管理册》制作的系统化培训课件，10天学习路径覆盖：角色认知→岗位职责→销售数据→控场管理→会议管理→带教体系→标准化工具→综合考核。',
    filename: '店长 10天完整培训课件.pptx',
    fileType: 'pptx',
    fileSize: '1.7MB',
    category: '系统培训',
    tags: ['10天培训', '店长入门', '课件', '完整闭环'],
  },
  {
    id: '3',
    title: '店长能力进阶 - 五大场景话术培训',
    description: '五大核心销售场景话术培训指南：场景一会员充值话术、场景二大单销售话术、场景三连带推荐话术、场景四VIP邀约话术、场景五异议处理话术。含基础/进阶/高阶三级话术模板。',
    filename: '店长能力进阶-五大场景话术培训.docx',
    fileType: 'docx',
    fileSize: '29KB',
    category: '销售话术',
    tags: ['话术培训', '充值', '大单', '连带', 'VIP', '异议处理'],
  },
  {
    id: '4',
    title: '店长能力进阶 - 数据分析',
    description: '门店KPI指标体系与话术场景关联应用手册。涵盖店铺整体诊断指标（业绩维度）、细节追踪指标（员工个体诊断）、KPI与话术手册的联动考核表。',
    filename: '店长能力进阶-数据分析.docx',
    fileType: 'docx',
    fileSize: '19KB',
    category: '数据分析',
    tags: ['KPI', '业绩诊断', '话术关联', '考核标准'],
  },
  {
    id: '5',
    title: '店长卓越能力进阶 - 培训能力',
    description: '店长教练手册：从优秀到卓越的五项核心带教能力——数据分析与发现问题、情景总结与制定标准、培训计划制定、带教与组织互练、复盘与流程优化。',
    filename: '店长卓越能力进阶-培训能力.docx',
    fileType: 'docx',
    fileSize: '1.7MB',
    category: '带教能力',
    tags: ['店长教练', '五项能力', 'SOP提炼', '互练机制', '复盘'],
  },
]

export const trainingCategories = [
  { key: 'all', label: '全部' },
  { key: '运营标准', label: '运营标准' },
  { key: '系统培训', label: '系统培训' },
  { key: '销售话术', label: '销售话术' },
  { key: '数据分析', label: '数据分析' },
  { key: '带教能力', label: '带教能力' },
]
