export interface NewStaffDoc {
  id: string
  title: string
  description: string
  filename: string
  fileType: 'docx' | 'pptx' | 'pdf'
  fileSize: string
  category: string
  tags: string[]
}

export const newStaffDocs: NewStaffDoc[] = [
  {
    id: 'ns1',
    title: '凯施迪新员工10天培训手册',
    description: '新员工带教手册，包含10天完整训练计划的详细内容。涵盖每日学习目标、带教要点、实操演练安排及考核标准，是新员工入职培训的核心指导文档。',
    filename: '凯施迪新员工10天培训手册(1).docx',
    fileType: 'docx',
    fileSize: '30KB',
    category: '训练计划',
    tags: ['10天培训', '带教手册', '新员工', '入职', '考核'],
  },
  {
    id: 'ns2',
    title: '十天培训手册 - 带教老师专用',
    description: '培训师专用带教课件，核心内容为销售服务八步曲：亲切迎宾→关心顾客→请顾客随便看→留意顾客需要→邀请试穿→附加推销→美程服务→售后回访。含各步骤动作要领与话术标准。',
    filename: '十天培训手册 - 带教老师专用.pdf',
    fileType: 'pdf',
    fileSize: '5.1MB',
    category: '带教师资',
    tags: ['培训师', '带教', '八步曲', '销售服务', '话术'],
  },
  {
    id: 'ns3',
    title: '品牌知识 - 员工培训手册',
    description: '品牌文化与产品知识培训手册，包含品牌简介、产品知识、服务标准三大板块，附30道品牌知识考核题及答案，用于检验新员工对品牌文化的掌握程度。',
    filename: '品牌知识-员工培训手册.docx',
    fileType: 'docx',
    fileSize: '26KB',
    category: '品牌知识',
    tags: ['品牌文化', '产品知识', '考核题', '服务标准', '品牌简介'],
  },
  {
    id: 'ns4',
    title: '凯施迪店铺运营手册 - 带教专用',
    description: '店铺运营基础标准带教手册，涵盖店铺日常运营的基本规范、人员管理、货品管理、陈列维护等基础运营标准的带教指引。',
    filename: '凯施迪店铺运营手册-带教专用.docx',
    fileType: 'docx',
    fileSize: '26KB',
    category: '运营标准',
    tags: ['店铺运营', '带教', '基础标准', '日常管理'],
  },
  {
    id: 'ns5',
    title: '凯施迪男装销售服务流程培训',
    description: '男装销售服务八步曲系统化培训课件，包含完整销售流程分解、各步骤核心话术、肢体语言规范、实战演练案例，是新员工销售技能培训的核心课件。',
    filename: '凯施迪男装销售服务流程培训.pptx',
    fileType: 'pptx',
    fileSize: '2.5MB',
    category: '销售服务',
    tags: ['销售流程', '八步曲', '话术', '培训课件', '实战'],
  },
  {
    id: 'ns6',
    title: '凯施迪新员工10天训练计划',
    description: '新员工10天训练计划系统化课件，按天设计训练内容：品牌文化→产品知识→面料知识→服务标准→销售技巧→陈列基础→系统操作→实战演练，每天包含学习目标与考核要点。',
    filename: '凯施迪新员工10天训练计划.pptx',
    fileType: 'pptx',
    fileSize: '13.2MB',
    category: '训练计划',
    tags: ['10天计划', '训练课件', '系统培训', '每日目标', '考核'],
  },
]

export const newStaffCategories = [
  { key: 'all', label: '全部' },
  { key: '训练计划', label: '训练计划' },
  { key: '品牌知识', label: '品牌知识' },
  { key: '运营标准', label: '运营标准' },
  { key: '销售服务', label: '销售服务' },
  { key: '带教师资', label: '带教师资' },
]
