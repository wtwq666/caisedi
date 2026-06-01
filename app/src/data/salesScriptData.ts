export interface SalesScriptDoc {
  id: string
  title: string
  description: string
  filename: string
  fileType: 'docx'
  fileSize: string
  category: string
  tags: string[]
}

export const salesScriptDocs: SalesScriptDoc[] = [
  {
    id: 'ss1',
    title: '20种常见场景销售话术手册',
    description: '凯施迪（CAISEDI）终端门店销售话术手册，涵盖20个常见销售场景的完整话术方案。包括四步成交法、异议处理三步法、8大核心销售场景话术、连带销售技巧、快速话术卡及培训考核表。适用于全国各门店导购、店长、市场管理人员。',
    filename: '20种常见场景销售话术手册.docx',
    fileType: 'docx',
    fileSize: '59KB',
    category: '销售话术',
    tags: ['20个场景', '四步成交法', '异议处理', '连带销售', '快速话术卡'],
  },
]

export const salesScriptCategories = [
  { key: 'all', label: '全部' },
  { key: '销售话术', label: '销售话术' },
]
