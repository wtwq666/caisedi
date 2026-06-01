export type ChangelogChangeType = 'feature' | 'fix' | 'improve'

export interface ChangelogChange {
  type: ChangelogChangeType
  text: string
}

export interface ChangelogEntry {
  id: string
  version: string
  date: string
  title: string
  summary?: string
  changes: ChangelogChange[]
  /** 标记为当前最新版本 */
  latest?: boolean
}

export const changeTypeLabels: Record<ChangelogChangeType, string> = {
  feature: '新功能',
  fix: '修复',
  improve: '优化',
}

export const changeTypeColors: Record<ChangelogChangeType, string> = {
  feature: 'bg-[#E6F7FF] text-[#1890FF]',
  fix: 'bg-[#FFF1F0] text-[#CF1322]',
  improve: 'bg-[#F6FFED] text-[#389E0D]',
}

/** 按时间倒序维护；发布新版本时在数组最前面追加一条 */
export const changelogEntries: ChangelogEntry[] = [
  {
    id: 'v0-2-0',
    version: 'v0.2.0',
    date: '2026-05-20',
    title: '更新公告与体验优化',
    summary: '新增系统更新公告模块，修复部署与资料库相关问题。',
    latest: true,
    changes: [
      { type: 'feature', text: '新增「更新公告」页面，以时间线展示历史版本与更新说明' },
      { type: 'feature', text: '新闻通知支持行政放假通知展示（含海报与详情页）' },
      { type: 'fix', text: '修复子路径刷新出现 404 的部署问题（SPA 路由回退）' },
      { type: 'fix', text: '修正新员工培训资料「十天培训手册」文件名错别字（带都→带教）' },
      { type: 'fix', text: '修复知识管理页 TypeScript 构建错误' },
      { type: 'improve', text: '新闻列表支持封面缩略图，详情页海报完整展示' },
    ],
  },
  {
    id: 'v0-1-0',
    version: 'v0.1.0',
    date: '2026-04-15',
    title: '系统正式上线',
    summary: '凯施迪企业信息管理系统首版发布，核心模块可用。',
    changes: [
      { type: 'feature', text: '工作台：快捷入口与最新通知汇总' },
      { type: 'feature', text: '商品速查：货号、名称、面料成份搜索与筛选' },
      { type: 'feature', text: '知识管理：产品资料、培训话术等文档分类查阅' },
      { type: 'feature', text: '公司文化：品牌介绍、门店风采等内容展示' },
      { type: 'feature', text: '新闻通知：公司公告列表与详情阅读' },
    ],
  },
]

export const currentVersion =
  changelogEntries.find((e) => e.latest)?.version ?? changelogEntries[0]?.version ?? 'v0.0.0'
