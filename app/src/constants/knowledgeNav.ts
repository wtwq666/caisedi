export type KnowledgeTab = { key: string; label: string }

export const knowledgeNavGroups: { label: string; tabs: KnowledgeTab[] }[] = [
  {
    label: '产品资料',
    tabs: [
      { key: 'fabric', label: '面料知识' },
      { key: 'product', label: '商品资料' },
      { key: 'management', label: '管理制度' },
      { key: 'brand', label: '品牌介绍' },
      { key: 'store-image', label: '门店风采' },
    ],
  },
  {
    label: '培训话术',
    tabs: [
      { key: 'manager', label: '店长培训' },
      { key: 'sales', label: '销售话术' },
      { key: 'new-staff', label: '新员工' },
    ],
  },
]

export const knowledgeTabs = knowledgeNavGroups.flatMap((g) => g.tabs)

export const KNOWLEDGE_QUIZ_TAB_KEYS = new Set(['fabric', 'product'])
